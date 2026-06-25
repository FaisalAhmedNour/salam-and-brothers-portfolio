-- MySQL Database Schema for SEECO Power Limited
-- Execute this script in phpMyAdmin or command-line MySQL to initialize database tables.

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(100) PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(50) NOT NULL,
  image_path VARCHAR(255),
  title_en VARCHAR(255) NOT NULL,
  title_bn VARCHAR(255) NOT NULL,
  subtitle_en VARCHAR(255),
  subtitle_bn VARCHAR(255),
  description_en TEXT,
  description_bn TEXT,
  overview_en TEXT,
  overview_bn TEXT,
  spec_rating_en VARCHAR(100),
  spec_rating_bn VARCHAR(100),
  spec_voltage_en VARCHAR(100),
  spec_voltage_bn VARCHAR(100),
  spec_standard_en VARCHAR(100),
  spec_standard_bn VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id VARCHAR(100) PRIMARY KEY,
  publish_date DATE NOT NULL,
  author_en VARCHAR(100) NOT NULL,
  author_bn VARCHAR(100) NOT NULL,
  read_time_en VARCHAR(50) NOT NULL,
  read_time_bn VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image VARCHAR(255),
  title_en VARCHAR(255) NOT NULL,
  title_bn VARCHAR(255) NOT NULL,
  excerpt_en TEXT,
  excerpt_bn TEXT,
  content_en TEXT,
  content_bn TEXT
);

CREATE TABLE IF NOT EXISTS notices (
  id VARCHAR(100) PRIMARY KEY,
  ref_no VARCHAR(100) NOT NULL UNIQUE,
  publish_date DATE NOT NULL,
  category VARCHAR(50) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  title_bn VARCHAR(255) NOT NULL,
  content_en TEXT,
  content_bn TEXT,
  signatory_en VARCHAR(150),
  signatory_bn VARCHAR(150),
  designation_en VARCHAR(150),
  designation_bn VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS notice_files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  notice_id VARCHAR(100) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  name_bn VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  size VARCHAR(50),
  FOREIGN KEY (notice_id) REFERENCES notices(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  mobile VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'unread' -- 'unread', 'read', 'resolved'
);

-- Insert default admin user: username 'admin', password 'admin' (hashed using SHA-256)
-- Password hash: 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918')
ON DUPLICATE KEY UPDATE username = username;

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT NOT NULL
);

-- Insert default site settings: primaryColor #dc2626 (Crimson Red), primaryColorHover #b91c1c
INSERT INTO site_settings (setting_key, setting_value)
VALUES ('primaryColor', '#dc2626')
ON DUPLICATE KEY UPDATE setting_key = setting_key;

INSERT INTO site_settings (setting_key, setting_value)
VALUES ('primaryColorHover', '#b91c1c')
ON DUPLICATE KEY UPDATE setting_key = setting_key;

-- Media Library Table
CREATE TABLE IF NOT EXISTS media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL UNIQUE,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_size VARCHAR(50) NOT NULL,
  url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hero Section Slides Table
CREATE TABLE IF NOT EXISTS hero_slides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_path VARCHAR(255) NOT NULL,
  badge_en VARCHAR(255),
  badge_bn VARCHAR(255),
  title_en VARCHAR(255) NOT NULL,
  title_bn VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_bn TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Alter Products Table to include rich details
ALTER TABLE products ADD COLUMN IF NOT EXISTS advantages_en TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS advantages_bn TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS applications_en TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS applications_bn TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS specs_table_en TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS specs_table_bn TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS accessories_en TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS accessories_bn TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS quality_text_en TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS quality_text_bn TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS cta_title_en VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS cta_title_bn VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS cta_text_en TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS cta_text_bn TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS cta_btn_en VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS cta_btn_bn VARCHAR(255);

-- Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
  id VARCHAR(100) PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_bn VARCHAR(255) NOT NULL,
  authority_en VARCHAR(255) NOT NULL,
  authority_bn VARCHAR(255) NOT NULL,
  desc_en TEXT,
  desc_bn TEXT,
  image VARCHAR(255),
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(100) PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_bn VARCHAR(255) NOT NULL,
  desc_en TEXT,
  desc_bn TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

