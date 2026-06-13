'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (data.success) {
      router.push('/');
      router.refresh();
    } else {
      setError('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่');
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Sarabun', 'Noto Sans Thai', sans-serif; }
        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image:
            radial-gradient(ellipse 1000px 800px at 88% -8%, rgba(154,158,141,0.35), transparent 60%),
            radial-gradient(ellipse 900px 700px at -10% 105%, rgba(217,142,92,0.12), transparent 60%),
            linear-gradient(160deg, #F4F5EE 0%, #EFF1E8 45%, #E7E9DC 100%);
          padding: 1.5rem;
        }
        .login-card {
          background: #FFFFFF;
          border: 1px solid rgba(90,100,70,0.12);
          border-radius: 1.25rem;
          box-shadow: 0 1px 2px rgba(120,80,40,0.04), 0 20px 48px -16px rgba(120,80,40,0.16);
          width: 100%;
          max-width: 400px;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .login-logo {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: rgba(217,142,92,0.1);
          border: 1px solid rgba(217,142,92,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .login-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #4A4F40;
          letter-spacing: 0.04em;
          margin-bottom: 0.25rem;
        }
        .login-subtitle {
          font-size: 0.8rem;
          color: #9A9E8D;
          margin-bottom: 2rem;
        }
        .login-form { width: 100%; display: flex; flex-direction: column; gap: 0.875rem; }
        .login-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #4A4F40;
          margin-bottom: 0.4rem;
          display: block;
          letter-spacing: 0.02em;
        }
        .login-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(90,100,70,0.18);
          border-radius: 0.625rem;
          font-size: 0.95rem;
          font-family: inherit;
          color: #4A4F40;
          background: #FBFAFE;
          transition: border-color 0.15s, box-shadow 0.15s;
          outline: none;
        }
        .login-input:focus {
          border-color: rgba(217,142,92,0.5);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(217,142,92,0.12);
        }
        .login-error {
          font-size: 0.8rem;
          color: #C0604A;
          background: rgba(192,96,74,0.08);
          border: 1px solid rgba(192,96,74,0.18);
          border-radius: 0.5rem;
          padding: 0.6rem 0.875rem;
          text-align: center;
        }
        .login-btn {
          width: 100%;
          padding: 0.8rem 1rem;
          background: #D98E5C;
          color: #fff;
          border: none;
          border-radius: 0.625rem;
          font-size: 0.95rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s, opacity 0.15s;
          letter-spacing: 0.02em;
        }
        .login-btn:hover:not(:disabled) { background: #c87d4a; }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .login-footer {
          margin-top: 1.75rem;
          font-size: 0.75rem;
          color: #9A9E8D;
          text-align: center;
        }
      `}</style>

      <div className="login-root">
        <div className="login-card">
          <div className="login-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C9 2 6 4.5 6 8c0 2 1 3.5 2.5 4.5L7 22h10l-1.5-9.5C17 11.5 18 10 18 8c0-3.5-3-6-6-6z" fill="#D98E5C" opacity=".25"/>
              <path d="M12 3c-2.5 0-5 2-5 5 0 1.8.9 3.2 2.3 4.1L8 21h8l-1.3-8.9C16.1 11.2 17 9.8 17 8c0-3-2.5-5-5-5z" stroke="#D98E5C" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
              <line x1="12" y1="8" x2="12" y2="14" stroke="#8A9B6E" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="9.5" y1="10" x2="12" y2="8" stroke="#8A9B6E" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="14.5" y1="11" x2="12" y2="9.5" stroke="#8A9B6E" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="login-title">TAMBOON GARDEN</div>
          <div className="login-subtitle">Enterprise System · กรุณาเข้าสู่ระบบ</div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <label className="login-label" htmlFor="password">รหัสผ่าน</label>
              <input
                id="password"
                type="password"
                className="login-input"
                placeholder="กรอกรหัสผ่านเพื่อเข้าใช้งาน"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
                required
              />
            </div>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-btn" disabled={loading || !password}>
              {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>

          <p className="login-footer">บริษัท แต้มบุญ การ์เด้น จำกัด</p>
        </div>
      </div>
    </>
  );
}
