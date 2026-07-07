import { Link } from 'react-router-dom';
import { Button, LinkButton } from '../components/ui/Button.js';
import { useEffect, useState } from 'react';
import { api } from '../lib/api-client.js';
import type { ProfessionalResponse } from '@framenest/shared';

export function HomePage() {
  const [photographers, setPhotographers] = useState<ProfessionalResponse[]>([]);

  useEffect(() => {
    api.get<{ items: ProfessionalResponse[] }>('/professionals/public')
      .then(d => setPhotographers(d.items?.slice(0, 4) ?? []))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-primary-50 to-white">
        <h1 className="text-5xl font-display font-bold text-neutral-900 tracking-tight">
          Your Photos, <span className="text-primary-600">Beautifully Shared</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
          Private photo sharing for families. Professional portfolios for photographers.
          Beautiful websites for local businesses. All in one platform.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link to="/signup"><Button size="lg">Get Started Free</Button></Link>
          <Link to="/s/demo"><LinkButton variant="secondary" size="lg" href="/s/demo">View Demo</LinkButton></Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Private Sharing', desc: 'Create spaces for your family. Share photos and videos with a simple gate key.' },
            { title: 'Photographer Platform', desc: 'Showcase your work, get booked, and deliver photos — all from one profile.' },
            { title: 'Client Websites', desc: 'Build and manage websites for local businesses. 263 templates across 20 industries.' },
          ].map(f => (
            <div key={f.title} className="p-6 rounded-xl border border-neutral-200 bg-white">
              <h3 className="text-lg font-bold text-neutral-900">{f.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photographers */}
      {photographers.length > 0 && (
        <section className="py-16 px-4 bg-neutral-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center">Featured Photographers</h2>
            <div className="mt-8 grid md:grid-cols-4 gap-6">
              {photographers.map(p => (
                <Link key={p.id} to={`/${p.slug}`} className="p-4 rounded-lg bg-white border border-neutral-200 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-neutral-900">{p.name}</p>
                  <p className="text-sm text-neutral-500 mt-1">{p.tagline || p.serviceArea}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-display font-bold">Ready to get started?</h2>
        <p className="mt-2 text-neutral-600">Create your FrameNest space in seconds.</p>
        <div className="mt-6">
          <Link to="/signup"><Button size="lg">Create Free Account</Button></Link>
        </div>
      </section>
    </div>
  );
}
