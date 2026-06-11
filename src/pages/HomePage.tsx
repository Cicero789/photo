import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
              Every moment
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                has a home
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600 sm:text-xl">
              Create your family or business photo space in seconds. Share life&apos;s moments with
              the people who matter — protected by your own gate key. Free, beautiful, and yours.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/signup"
                className="rounded-xl bg-primary-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary-200 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-300 active:scale-[0.98]"
              >
                Create your space &rarr;
              </Link>
              <Link
                to="/photographers"
                className="rounded-xl border border-border bg-white px-8 py-4 text-lg font-medium text-neutral-700 transition-all hover:border-primary-300 hover:text-primary-700"
              >
                I&apos;m a photographer
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative grid */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
            How it works
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={i} className="group rounded-2xl border border-border bg-white p-8 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-2xl font-bold text-primary-600">
                  {i + 1}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to build your photo home?
          </h2>
          <p className="mt-4 text-lg text-primary-100">
            Free forever. Set up in under 60 seconds.
          </p>
          <Link
            to="/signup"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary-700 shadow-lg transition-all hover:bg-primary-50 active:scale-[0.98]"
          >
            Start now &mdash; it&apos;s free
          </Link>
        </div>
      </section>
    </div>
  );
}

const STEPS = [
  {
    title: "Create your space",
    desc: "Pick a name, set a gate key password, and your family or team space is live in seconds.",
  },
  {
    title: "Upload & organize",
    desc: "Create events, upload photos and videos. They're compressed beautifully and mapped by location.",
  },
  {
    title: "Share with your people",
    desc: "Give out your link and gate key. Only the people you trust get in. You're in control.",
  },
];
