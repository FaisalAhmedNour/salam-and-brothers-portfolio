"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

/**
 * LoginPage Component.
 * Implements a glassmorphic login panel using premium gradients,
 * backdrop blur filters, custom micro-animations, and input validations.
 */
export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  // Check login state upon page render to prevent double login screens
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/spl-dashboard/auth");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            if (onLoginSuccess) {
              onLoginSuccess();
            } else {
              router.push("/spl-dashboard");
            }
            return;
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setCheckingAuth(false);
      }
    }
    checkAuth();
  }, [router, onLoginSuccess]);

  /**
   * Submits credentials to the server API session route.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/spl-dashboard/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          router.push("/spl-dashboard");
        }
      } else {
        setError(data.error || "Login failed. Please verify credentials.");
      }
    } catch (err) {
      setError("A networking error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-neutral-950 flex items-center justify-center p-6 overflow-hidden font-arone text-white select-none">
      
      {/* Decorative Neon Spheres for glassmorphism backdrop */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Login Card Wrapper */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10 relative z-10 animate-fade-in">
        
        {/* Brand Banner */}
        <div className="text-center mb-8 flex flex-col items-center gap-3">
          <Image
            src="/images/SEECOI1.png"
            alt="SEECO Power Logo"
            width={170}
            height={42}
            priority
            className="brightness-200 contrast-200"
          />
          <h2 className="text-[14px] font-bold uppercase tracking-widest text-neutral-400 mt-2">
            Control Panel Login
          </h2>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Error notice banner */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-[14px] font-medium flex items-center gap-2.5">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[12px] font-extrabold uppercase tracking-wider text-neutral-300">
              Username
            </label>
            <input
              type="text"
              required
              disabled={loading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter administrator username"
              className="w-full bg-white/5 border border-white/10 focus:border-red-500/40 rounded-2xl px-5 py-3.5 text-[15px] focus:outline-hidden transition-all text-white placeholder-neutral-500 font-semibold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-extrabold uppercase tracking-wider text-neutral-300">
              Password
            </label>
            <input
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 focus:border-red-500/40 rounded-2xl px-5 py-3.5 text-[15px] focus:outline-hidden transition-all text-white placeholder-neutral-500 font-semibold"
            />
          </div>

          {/* Action trigger button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-red-600/10 hover:shadow-red-500/20 active:scale-98 transition-all text-[15px] cursor-pointer mt-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
