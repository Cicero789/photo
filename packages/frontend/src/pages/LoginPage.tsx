import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../data/queries/useAuth.js';
import { Button } from '../components/ui/Button.js';

export function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) { navigate('/dashboard'); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try { await login(email, password); navigate('/dashboard'); }
    catch (err) { setError(err instanceof Error ? err.message : 'Login failed'); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center">Log in to FrameNest</h1>
        {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <Button type="submit" className="w-full">Log in</Button>
        </form>
        <p className="mt-4 text-sm text-center text-neutral-600">
          <Link to="/forgot-password" className="text-primary-600 hover:underline">Forgot password?</Link>
        </p>
        <p className="mt-2 text-sm text-center text-neutral-600">
          Don't have an account? <Link to="/signup" className="text-primary-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
