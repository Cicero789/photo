import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.js';
import { api } from '../lib/api-client.js';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try { await api.post('/auth/reset-password', { token, password }); setDone(true); }
    catch (err) { setError(err instanceof Error ? err.message : 'Reset failed'); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center">Set New Password</h1>
        {done ? (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            Password reset successfully. <Link to="/login" className="text-primary-600 hover:underline">Log in</Link>
          </div>
        ) : (
          <>
            {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">New Password (min 8 characters)</label>
                <input type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <Button type="submit" className="w-full">Reset Password</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
