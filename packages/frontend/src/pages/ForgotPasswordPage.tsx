import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.js';
import { api } from '../lib/api-client.js';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try { await api.post('/auth/forgot-password', { email }); setSent(true); }
    catch (err) { setError(err instanceof Error ? err.message : 'Failed'); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        {sent ? (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            If an account exists for {email}, we've sent a reset link.
          </div>
        ) : (
          <>
            {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <Button type="submit" className="w-full">Send Reset Link</Button>
            </form>
          </>
        )}
        <p className="mt-4 text-sm text-center text-neutral-600">
          <Link to="/login" className="text-primary-600 hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  );
}
