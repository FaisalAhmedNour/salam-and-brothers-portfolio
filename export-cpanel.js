/**
 * @file export-cpanel.js
 * @description A deployment utility script for Next.js projects on cPanel.
 * This script automates building the application, copying static files into 
 * the standalone bundle, and packaging the result into a clean ZIP archive.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * Checks if the 'archiver' library is installed, and automatically installs
 * it temporarily if it is not present in the environment.
 * 
 * @returns {void}
 */
function ensureArchiverInstalled() {
  try {
    // Attempt to resolve the package to check if it is already installed
    require.resolve("archiver");
  } catch (error) {
    console.log("'archiver' package is not installed. Installing it temporarily...");
    // We install using --no-save to avoid modifying package.json permanently
    execSync("npm install archiver --no-save", { stdio: "inherit" });
  }
}

/**
 * Executes the production build command for Next.js.
 * This triggers Next.js to compile pages and generate the standalone output folder.
 * 
 * @returns {void}
 */
function buildNextProject() {
  console.log("Building Next.js application in production mode...");
  // We use the package.json build script to ensure any project-specific configurations are respected
  execSync("npm run build", { stdio: "inherit" });
}

/**
 * Copies the public assets and compiled static resources into the standalone directory.
 * By default, Next.js standalone output does not include these folders as they are normally
 * expected to be served from a CDN. For cPanel hosting, they must be served locally.
 * 
 * @returns {void}
 */
function copyStaticAssets() {
  const standalonePath = path.join(__dirname, ".next", "standalone");
  const publicSource = path.join(__dirname, "public");
  const publicDestination = path.join(standalonePath, "public");
  const staticSource = path.join(__dirname, ".next", "static");
  const staticDestination = path.join(standalonePath, ".next", "static");

  console.log("Copying static assets and public directory to standalone folder...");

  // Copy public folder if it exists in the project root
  if (fs.existsSync(publicSource)) {
    fs.cpSync(publicSource, publicDestination, { recursive: true });
  }

  // Copy Next.js generated static styling and script files
  if (fs.existsSync(staticSource)) {
    fs.cpSync(staticSource, staticDestination, { recursive: true });
  }

  // Copy scripts directory for database seeding on cPanel
  const scriptsSource = path.join(__dirname, "scripts");
  const scriptsDestination = path.join(standalonePath, "scripts");
  if (fs.existsSync(scriptsSource)) {
    console.log("Copying scripts directory for database seeding...");
    fs.cpSync(scriptsSource, scriptsDestination, { recursive: true });
  }

  // Copy src/data directory containing local JSON data files to seed
  const dataSource = path.join(__dirname, "src", "data");
  const dataDestination = path.join(standalonePath, "src", "data");
  if (fs.existsSync(dataSource)) {
    console.log("Copying src/data directory containing JSON files...");
    fs.cpSync(dataSource, dataDestination, { recursive: true });
  }
}

/**
 * Compresses the standalone application files into a single ZIP archive.
 * 
 * @param {string} sourceDir - The path to the folder to be zipped.
 * @param {string} outputFilePath - The target path for the generated ZIP file.
 * @returns {Promise<void>} Resolves when the file archiving is complete.
 */
function archiveStandaloneFolder(sourceDir, outputFilePath) {
  return new Promise((resolve, reject) => {
    const archiverModule = require("archiver");
    const outputStream = fs.createWriteStream(outputFilePath);
    
    let archive;
    // Support both modern class-based exports (v8+) and legacy function-based exports
    if (typeof archiverModule === "function") {
      archive = archiverModule("zip", { zlib: { level: 9 } });
    } else if (archiverModule && archiverModule.ZipArchive) {
      archive = new archiverModule.ZipArchive({ zlib: { level: 9 } });
    } else {
      return reject(new Error("Unable to initialize archiver library. Unknown exports format."));
    }

    // Handle standard stream closing once the zip utility completes writing
    outputStream.on("close", () => {
      console.log(`ZIP package created successfully! Total size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
      resolve();
    });

    // Capture errors emitted by the archiver library
    archive.on("error", (error) => {
      reject(error);
    });

    // Pipe the compression streams together
    archive.pipe(outputStream);

    // Add all files from standalone build directory, putting them directly in the root of the archive
    archive.directory(sourceDir, false);

    // Finalize the archive creation process
    archive.finalize();
  });
}

/**
 * Orchestrates the main deployment preparation pipeline.
 * 
 * @returns {Promise<void>}
 */
async function main() {
  try {
    const standaloneDir = path.join(__dirname, ".next", "standalone");
    const outputZip = path.join(__dirname, "cpanel-deploy.zip");

    // Ensure our zip dependency is ready
    ensureArchiverInstalled();

    // Compile the project with Next.js build
    buildNextProject();

    // Verify standalone build was successful before proceeding
    if (!fs.existsSync(standaloneDir)) {
      throw new Error("Standalone directory not found. Please ensure Next.js is configured with output: 'standalone'.");
    }

    // Merge static and public folders for standalone hosting
    copyStaticAssets();

    // Clean up node_modules in standalone directory to avoid bloating zip file and let cPanel manage dependencies
    const nodeModulesPath = path.join(standaloneDir, "node_modules");
    if (fs.existsSync(nodeModulesPath)) {
      console.log("Cleaning up node_modules inside standalone folder to comply with CloudLinux NodeJS Selector...");
      fs.rmSync(nodeModulesPath, { recursive: true, force: true });
    }

    console.log(`Zipping standalone files from: ${standaloneDir}`);
    // Package files for production deployment
    await archiveStandaloneFolder(standaloneDir, outputZip);
    console.log(`Your deployment bundle is ready at: ${outputZip}`);
  } catch (error) {
    console.error("An error occurred during packaging:", error);
    process.exit(1);
  }
}

// Execute the packaging script
main();
