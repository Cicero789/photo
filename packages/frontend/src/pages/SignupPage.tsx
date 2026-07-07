import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../data/queries/useAuth.js';
import { Button } from '../components/ui/Button.js';

export function SignupPage() {
  const { signup, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', spaceName: '', spaceSlug: '', gateKey: '' });
  const [error, setError] = useState('');

  if (user) { navigate('/dashboard'); return null; }

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(s => ({ ...s, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try { await signup(form); navigate('/dashboard'); }
    catch (err) { setError(err instanceof Error ? err.message : 'Signup failed'); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center">Create your FrameNest</h1>
        {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700">Your Name</label>
            <input type="text" required value={form.name} onChange={update('name')}
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Email</label>
            <input type="email" required value={form.email} onChange={update('email')}
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Password</label>
            <input type="password" required minLength={8} value={form.password} onChange={update('password')}
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Space Name</label>
            <input type="text" required value={form.spaceName} onChange={update('spaceName')}
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Space URL</label>
            <div className="mt-1 flex items-center rounded-lg border border-neutral-300 overflow-hidden">
              <span className="bg-neutral-50 px-3 py-2 text-sm text-neutral-500">framenest.photos/s/</span>
              <input type="text" required value={form.spaceSlug} onChange={update('spaceSlug')}
                className="flex-1 px-0 py-2 text-sm focus:outline-none" placeholder="my-family" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Gate Key</label>
            <input type="password" required value={form.gateKey} onChange={update('gateKey')}
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            <p className="mt-1 text-xs text-neutral-500">Share this with family to let them in</p>
          </div>
          <Button type="submit" className="w-full">Create Account</Button>
        </form>
        <p className="mt-4 text-sm text-center text-neutral-600">
          Already have an account? <Link to="/login" className="text-primary-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
