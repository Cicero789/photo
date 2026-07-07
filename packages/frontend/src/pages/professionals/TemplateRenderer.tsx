// Single renderer — replaces 323 individual template components
import type { TemplateDefinition, TemplateProps, SectionDefinition } from '@framenest/shared/templates/types';

export function TemplateRenderer({ template, profile }: {
  template: TemplateDefinition;
  profile: TemplateProps;
}) {
  const style = {
    '--color-primary': template.colors.primary,
    '--color-secondary': template.colors.secondary,
    '--color-accent': template.colors.accent,
    '--color-background': template.colors.background,
    '--color-text': template.colors.text,
    '--font-heading': template.fonts.heading,
    '--font-body': template.fonts.body,
    '--max-width': maxWidthMap[template.layout.maxWidth],
  } as React.CSSProperties;

  return (
    <div className="template-root" style={style}>
      <div className="mx-auto px-4" style={{ maxWidth: 'var(--max-width)' }}>
        {template.sections.map((section, i) => (
          <SectionRenderer
            key={`${section.type}-${i}`}
            section={section}
            profile={profile}
            isFirst={i === 0}
            isLast={i === template.sections.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

const maxWidthMap: Record<string, string> = {
  narrow: '720px',
  medium: '960px',
  wide: '1200px',
  full: '100%',
};

function SectionRenderer({ section, profile, isFirst }: {
  section: SectionDefinition;
  profile: TemplateProps;
  isFirst: boolean;
  isLast: boolean;
}) {
  switch (section.type) {
    case 'hero':
      return <HeroSection config={section.config} profile={profile} isFirst={isFirst} />;
    case 'about':
      return <AboutSection config={section.config} profile={profile} />;
    case 'gallery':
      return <GallerySection config={section.config} photos={profile.portfolio} onPhotoClick={profile.onPhotoClick} />;
    case 'services':
      return <ServicesSection config={section.config} specialties={profile.specialties} />;
    case 'pricing':
      return <PricingSection config={section.config} pricing={profile.pricing} />;
    case 'testimonials':
      return <TestimonialsSection config={section.config} />;
    case 'contact':
      return <ContactSection config={section.config} profile={profile} onHire={profile.onHire} />;
    case 'blog':
      return <BlogSection config={section.config} />;
    case 'cta':
      return <CTASection config={section.config} profile={profile} />;
    default:
      return null;
  }
}

function HeroSection({ config, profile, isFirst }: { config: Record<string, unknown>; profile: TemplateProps; isFirst: boolean }) {
  const fullScreen = config.fullScreen === true;
  const showBadge = config.showBadge !== false;
  return (
    <section className={`${fullScreen ? 'min-h-[70vh]' : 'py-20'} flex flex-col items-center justify-center text-center ${isFirst ? '' : 'mt-16'}`}
      style={{ backgroundColor: 'var(--color-background)' }}>
      {showBadge && profile.verified && (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
          ✓ Verified Professional
        </span>
      )}
      <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
        {profile.name}
      </h1>
      {profile.tagline && (
        <p className="text-xl md:text-2xl mb-8 max-w-2xl" style={{ color: 'var(--color-secondary)' }}>
          {profile.tagline}
        </p>
      )}
      {config.ctaText ? (
        <button className="px-8 py-3 rounded-lg text-white font-semibold transition-transform hover:scale-105"
          style={{ backgroundColor: 'var(--color-primary)' }}>
          {String(config.ctaText)}
        </button>
      ) : null}
    </section>
  );
}

function AboutSection({ config, profile }: { config: Record<string, unknown>; profile: TemplateProps }) {
  return (
    <section className="py-16" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className={`flex flex-col ${config.layout === 'split' ? 'md:flex-row gap-12' : 'text-center'}`}>
        <div className={config.layout === 'split' ? 'md:w-1/2' : 'max-w-3xl mx-auto'}>
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            About {profile.name.split(' ')[0]}
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text)', opacity: 0.8 }}>
            {profile.bio || 'Professional serving the community with dedication and expertise.'}
          </p>
          {profile.serviceArea && (
            <p className="mt-4 text-sm" style={{ color: 'var(--color-accent)' }}>
              📍 Serving: {profile.serviceArea}
            </p>
          )}
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noopener noreferrer"
              className="inline-block mt-4 text-sm font-medium hover:underline" style={{ color: 'var(--color-primary)' }}>
              Visit Website →
            </a>
          )}
        </div>
        {!!config.showPhoto && (
          <div className={config.layout === 'split' ? 'md:w-1/2' : 'mt-8 max-w-md mx-auto'}>
            <div className="aspect-square rounded-2xl bg-neutral-200 flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-secondary)', opacity: 0.5 }}>
              <span className="text-4xl">📷</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function GallerySection({ config, photos, onPhotoClick }: {
  config: Record<string, unknown>;
  photos: TemplateProps['portfolio'];
  onPhotoClick?: (i: number) => void;
}) {
  const cols = (config.columns as number) || 3;
  if (!photos?.length) return null;
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
        Portfolio
      </h2>
      <div className={`grid gap-${config.gap === 'sm' ? '2' : '4'}`}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {photos.slice(0, 9).map((photo, i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-neutral-200"
            onClick={() => onPhotoClick?.(i)}
            style={{ backgroundColor: 'var(--color-secondary)' }}>
            {photo.url ? (
              <img src={photo.url} alt={photo.filename || `Photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">🖼</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesSection({ config, specialties }: { config: Record<string, unknown>; specialties: string[] }) {
  const cols = (config.columns as number) || 3;
  const items = specialties?.length ? specialties : ['Professional Service', 'Expert Consultation', 'Quality Results'];
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
        Services
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '1.5rem' }}>
        {items.map((item, i) => (
          <div key={i} className="p-6 rounded-xl border transition-shadow hover:shadow-md"
            style={{ borderColor: 'var(--color-secondary)', backgroundColor: 'var(--color-background)' }}>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{item}</h3>
            <p className="text-sm" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
              Professional {item.toLowerCase()} tailored to your needs.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingSection({ config, pricing }: { config: Record<string, unknown>; pricing: TemplateProps['pricing'] }) {
  if (!pricing || Object.keys(pricing).length === 0) return null;
  const tiers = Array.isArray(pricing) ? pricing : Object.entries(pricing).map(([name, price]) => ({ name, price }));
  return (
    <section className="py-16" style={{ backgroundColor: 'var(--color-secondary)', opacity: 0.95 }}>
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
        Pricing
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${tiers.length > 3 ? 3 : tiers.length}, 1fr)`, gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
        {tiers.map((tier, i) => (
          <div key={i} className="p-6 rounded-xl text-center border bg-white"
            style={{
              borderColor: config.highlightMiddle && i === 1 ? 'var(--color-primary)' : 'var(--color-secondary)',
              transform: config.highlightMiddle && i === 1 ? 'scale(1.05)' : 'none',
            }}>
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-text)' }}>{String(tier.name)}</h3>
            <p className="text-3xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>{String(tier.price)}</p>
            <button className="px-6 py-2 rounded-lg text-white text-sm font-medium"
              style={{ backgroundColor: 'var(--color-primary)' }}>
              Select
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection({ config }: { config: Record<string, unknown> }) {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
        What Clients Say
      </h2>
      <div className={`${config.layout === 'carousel' ? 'flex overflow-x-auto gap-6' : 'grid grid-cols-2 gap-6'}`}>
        {[1, 2, 3].map(i => (
          <div key={i} className="p-6 rounded-xl border flex-shrink-0 w-80" style={{ borderColor: 'var(--color-secondary)' }}>
            <p className="text-sm italic mb-3" style={{ color: 'var(--color-text)', opacity: 0.8 }}>
              "Excellent service! Highly recommended for anyone looking for quality work."
            </p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>— Happy Client {i}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ config, profile, onHire }: {
  config: Record<string, unknown>;
  profile: TemplateProps;
  onHire?: () => void;
}) {
  return (
    <section className="py-16" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className={`${config.layout === 'split' ? 'flex flex-col md:flex-row gap-12' : 'text-center'}`}>
        <div className={config.layout === 'split' ? 'md:w-1/2' : 'max-w-lg mx-auto'}>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            Get in Touch
          </h2>
          <p className="mb-6" style={{ color: 'var(--color-text)', opacity: 0.8 }}>
            Ready to work together? Reach out and let's discuss how I can help.
          </p>
          {onHire && (
            <button onClick={onHire} className="px-8 py-3 rounded-lg text-white font-semibold"
              style={{ backgroundColor: 'var(--color-primary)' }}>
              Hire Me
            </button>
          )}
        </div>
        {!!config.showMap && (
          <div className={config.layout === 'split' ? 'md:w-1/2' : 'mt-8'}>
            <div className="h-48 rounded-xl bg-neutral-200 flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-secondary)', opacity: 0.5 }}>
              <span className="text-2xl">📍 {profile.serviceArea || 'Service Area'}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function BlogSection({ config }: { config: Record<string, unknown> }) {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
        Latest Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--color-secondary)' }}>
            <div className="h-40 bg-neutral-200 flex items-center justify-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <span className="text-3xl">📝</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>Blog Post {i}</h3>
              <p className="text-xs" style={{ color: 'var(--color-text)', opacity: 0.6 }}>Read more →</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ config, profile }: { config: Record<string, unknown>; profile: TemplateProps }) {
  return (
    <section className="py-20 text-center rounded-2xl my-16" style={{ backgroundColor: 'var(--color-primary)' }}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
        Ready to Get Started?
      </h2>
      <p className="text-lg mb-8 text-white opacity-90 max-w-md mx-auto">
        Work with {profile.name} and experience the difference.
      </p>
      {profile.onHire && (
        <button onClick={profile.onHire}
          className="px-8 py-3 rounded-lg font-semibold bg-white hover:bg-neutral-100 transition-colors"
          style={{ color: 'var(--color-primary)' }}>
          Book Now
        </button>
      )}
    </section>
  );
}
