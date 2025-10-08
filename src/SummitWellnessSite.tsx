import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  Droplet,
  ThermometerSnowflake,
  Flame,
  HeartPulse,
  Activity,
  PhoneCall,
  MapPin,
  Clock,
  Syringe,
  Timer,
  Users,
  Sparkles,
  ChevronDown,
} from "lucide-react";

const paths = {
  logo: "/images/logo.jpg",
  hero: "/images/summit.jpg",
  iv: "/images/IV.jpg",
  injections: "/images/injections.jpg",
  plunge: "/images/plunge.jpg",
  sauna: "/images/sauna.jpg",
  hbot: "/images/hyperbaric.jpg",
  compression: "/images/normatec.jpg",
  staff: "/images/staff.jpg",
  services: "/images/services.jpg",
  gi: "/images/GI.jpg",
  // keep both; we’ll try .jpg first, then .jpj as a fallback in the rotator
  supplements1_jpg: "/images/supplements1.jpg",
  supplements1_jpj: "/images/supplements1.jpj",
  supplements2: "/images/supplements2.jpg",
  supplements3: "/images/supplements3.jpg",
  salt: "/images/salt.jpg",
  team2: "/images/team2.jpg",
};
const enc = (p: string) => p.replace(/ /g, "%20");
const IMG = Object.fromEntries(Object.entries(paths).map(([k, v]) => [k, enc(v as string)])) as Record<string, string>;

const fallbackSVG = (label: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<?xml version='1.0'?><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 720'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#0a0a0a'/><stop offset='1' stop-color='#18181b'/></linearGradient></defs><rect width='1200' height='720' fill='url(#g)'/><text x='50%' y='50%' fill='#a1a1aa' font-size='42' font-family='system-ui,Segoe UI,Roboto' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`
  );

function ImageWithFallback({
  src,
  alt,
  className,
  fallbackLabel,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel: string;
  loading?: "eager" | "lazy";
}) {
  const [current, setCurrent] = React.useState(src);
  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setCurrent(fallbackSVG(fallbackLabel))}
    />
  );
}


function ImageMulti({
  srcs,
  alt,
  className,
  fallbackLabel,
  loading = "lazy",
}: {
  srcs: string[];
  alt: string;
  className?: string;
  fallbackLabel: string;
  loading?: "eager" | "lazy";
}) {
  const [attempt, setAttempt] = React.useState(0);
  const [fallback, setFallback] = React.useState<string | null>(null);
  const src = fallback ?? srcs[attempt];

  const handleError = () => {
    if (attempt < srcs.length - 1) setAttempt((a) => a + 1);
    else setFallback(fallbackSVG(fallbackLabel));
  };

  return <img src={src} alt={alt} className={className} loading={loading} onError={handleError} />;
}

const section = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
const h2 = "text-3xl md:text-4xl font-semibold tracking-tight";
const p = "text-base md:text-lg text-zinc-300";

const features = [
  { icon: Droplet, id: "iv", title: "IV Therapy", desc: "Hydration, performance, recovery, and immunity protocols. Treatment available on-site or in-home." },
  { icon: Syringe, id: "injections", title: "Injections", desc: "High-dose Vitamin C, NAD+, B12, Super B, lipo, and more performance blends administered by licensed nurses." },
  { icon: ThermometerSnowflake, id: "plunge", title: "Cold Plunge", desc: "Low-temp immersion for recovery and resilience. Pair with sauna for contrast therapy." },
  { icon: Flame, id: "sauna", title: "Full-Spectrum IR Sauna", desc: "Detox, circulation, and relaxation with infrared heat across all wavelengths at temperatures up to 160 degrees." },
  { icon: HeartPulse, id: "hbot", title: "Hyperbaric Chamber", desc: "1:1 sessions focused on recovery and healing. First-time and package discounts available." },
  { icon: Activity, id: "compression", title: "NormaTec Compression", desc: "Air compression tech to speed recovery and reduce soreness between training blocks." },
] as const;

const protocols = [
  { name: "Recovery Stack", bullets: ["Performance IV (post-training)", "NormaTec 30 min", "Cold Plunge 5–10 min"], notes: "Designed for athletes and active adults." },
  { name: "Contrast Therapy", bullets: ["IR Sauna 30–45 min", "Cold Plunge 3–5 min", "Breathwork guidance"], notes: "Great for resilience and metabolic benefits." },
  { name: "Hyperbaric Chamber + Rebuild", bullets: ["Hyperbaric session", "B-Complex/NAD+ injection", "Hydration IV add-on"], notes: "Support tissue recovery and cognitive clarity." },
] as const;

const faqs = [
  { q: "Who is Summit Wellness for?", a: "Young, health-minded locals and visiting athletes who want fast recovery, more energy, and long-term performance." },
  { q: "Do you offer mobile IVs?", a: "Yes. Our nursing team can come to your home, hotel, gym, or event. Subject to travel and call-out fees." },
  { q: "How much is Hyperbaric?", a: "$125 per session. First-time discount and multi-session packages available." },
  { q: "Do you have memberships?", a: "Yes. Monthly options include unlimited sauna, cold plunge, and compression. IVs and Hyperbaric therapy offered as add-ons or packages." },
  { q: "Do you provide medical oversight?", a: "Yes. In-house Nurse Practitioner and an off-site Medical Director." },
  { q: "Do you offer functional medicine testing?", a: "Yes—GI-MAP stool testing, vitamin deficiency panels, peptide consults, and targeted protocols." },
] as const;

const priceTiles = [
  { title: "Hyperbaric Therapy", price: "$125", sub: "/ session", items: ["First-time discount available", "5 and 10-pack pricing", "Proven results"] },
  { title: "Mobile IV Therapy", price: "From $165*", sub: " + call-out", items: ["Hydration, Performance, Immunity", "Group/Event discounts", "Hotel, home, or gym"] },
  { title: "Unlimited Recovery", price: "$250", sub: "/ month", items: ["Unlimited Sauna + Cold Plunge", "Unlimited NormaTec Compression", "IV/Hyperbaric therapy add-on rates"] },
] as const;

const testimonials: string[] = [
  "The nurse was super friendly and professional; the in-home service for our group made it easy. The IV helped tremendously and the whole process was smooth—highly recommend.",
  "Amazing ambiance and a spotless facility. I did an IV with glutathione, NormaTec sessions, infrared sauna with kombucha, and a cold plunge—left with so much energy. Will be back to try the hyperbaric chamber.",
  "They sent a nurse to us the same day—kind and caring. I felt the difference almost immediately and finally enjoyed the beach without pain. Will definitely use them again.",
  "When I’m drained or dehydrated, an IV here brings me back fast. The team is knowledgeable and points you in the right direction—now part of my routine for hydration and migraines.",
  "GI-MAP testing was extremely informative and gave me a plan without prescriptions. My rash is already improving with less inflammation and itch—I’m grateful for the natural approach.",
  "Tried hyperbaric oxygen and the nursing staff checked on me throughout—great experience. I’m glad there’s a reliable spot for HBOT here.",
];

const functionalCards = [
  { title: "GI-MAP Testing", desc: "Identify hidden gut imbalances—such as bacteria, parasites, or inflammation—that may be affecting your digestion, energy, and overall health, giving you a clear roadmap for targeted care and lasting wellness." },
  { title: "Vitamin & Micronutrient Panels", desc: "Comprehensive panels measure key vitamins, minerals, and antioxidants to reveal hidden deficiencies, optimize energy, and support long-term health with a personalized plan." },
  { title: "Peptide Therapy", desc: "Personalized peptide protocols to support recovery, sleep, body composition, and performance—selected by your clinician, monitored, and adjusted to your response." },
  { title: "Weight-Loss Consults", desc: "Evidence-based coaching with labs-informed guidance and medication options when appropriate—built to improve energy, metabolism, and long-term habits, not just the scale." },
  { title: "NAD+ Support", desc: "Targeted NAD+ injections and IV add-ons to boost cellular energy, focus, and recovery—dosed for effectiveness while minimizing side effects." },
  { title: "Customized Protocols", desc: "Your Nurse Practitioner designs a step-by-step plan from your labs and goals—then refines it over time for measurable, sustainable results." },
] as const;

function SectionHeader({ overline, title, desc }: { overline?: string; title: string; desc?: string }) {
  return (
    <div className="text-center mb-10">
      {overline && (
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400">
          <Sparkles className="h-4 w-4" />
          {overline}
        </div>
      )}
      <h2 className={`${h2} mt-3 text-white`}>{title}</h2>
      {desc && <p className={`mt-4 ${p}`}>{desc}</p>}
    </div>
  );
}

function FeatureGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((f) => (
        <Card key={f.title} className="bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900/80 transition h-full flex flex-col">
          <CardHeader className="flex-none">
            <div className="flex items-center gap-3">
              <f.icon className="h-6 w-6 text-zinc-200" />
              <CardTitle className="text-zinc-100">{f.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col grow">
            <p className="text-zinc-300 leading-relaxed">{f.desc}</p>
            <a href={`#${(f as any).id}`} className="mt-auto self-end inline-flex items-center gap-1 text-zinc-200 hover:text-white font-semibold">
              Learn More <span aria-hidden="true">→</span>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ProtocolCards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {protocols.map((pSet) => (
        <Card key={pSet.name} className="bg-zinc-900/60 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-100">{pSet.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-zinc-300">
              {pSet.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="h-5 w-5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-zinc-400 mt-4">{pSet.notes}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function PriceTiles() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {priceTiles.map((t) => (
        <Card key={t.title} className="bg-zinc-900/60 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-100">{t.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-white">{t.price}</span>
              <span className="text-zinc-400">{t.sub}</span>
            </div>
            <ul className="mt-4 space-y-2 text-zinc-300">
              {t.items.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
            <Button asChild className="w-full mt-6">
              <a href="#contact">Book Now</a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FAQ() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {faqs.map((f, idx) => (
        <Card key={idx} className="bg-zinc-900/60 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-100">{f.q}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-300">{f.a}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ContactForm() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="bg-zinc-900/60 border-zinc-800 order-2 lg:order-1">
        <CardHeader>
          <CardTitle className="text-zinc-100">Send us a message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Your name" />
            <Input type="email" placeholder="Email" />
          </div>
          <Input placeholder="Phone (optional)" />
          <Textarea placeholder="How can we help?" rows={6} />
          <Button className="w-full">Submit</Button>
        </CardContent>
      </Card>
      <div className="order-1 lg:order-2 space-y-6">
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-zinc-100">Visit Summit Wellness</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>3099 Loop Rd. Unit 4, Orange Beach, AL 36561</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Mon–Fri 8a–4p • Sat 8a–12p</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5" />
              <span>251-241-8260</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/** Hover-to-play video with image poster fallback */
function HoverVideoPoster({
  poster,
  videoSrc,
  alt,
  className,
  fallbackLabel = "Media",
}: {
  poster: string;
  videoSrc: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}) {
  const [playing, setPlaying] = React.useState(false);
  const [ready, setReady] = React.useState(false); // video can render
  const [reduced, setReduced] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Respect reduced motion
  React.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(!!mq?.matches);
    apply(); mq?.addEventListener?.("change", apply);
    return () => mq?.removeEventListener?.("change", apply);
  }, []);

  // Pause/reset when off-screen
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setPlaying(false);
      }
    }, { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);

  const start = () => {
    if (reduced || !videoRef.current) return;
    videoRef.current.play().catch(() => {});
    setPlaying(true);
  };
  const stop = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setPlaying(false);
  };

  const toggleTouch = () => (playing ? stop() : start());

  return (
    <div
      ref={containerRef}
      className={`relative ${className ?? ""}`}
      onMouseEnter={start}
      onMouseLeave={stop}
      onTouchStart={toggleTouch}
    >
      {/* Always-visible poster (with fallback) */}
      <ImageWithFallback
        src={poster}
        alt={alt}
        fallbackLabel={fallbackLabel}
        className="absolute inset-0 h-full w-full object-cover z-[1]"
      />

      {/* Video fades on top; no black frame because poster sits underneath */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 z-[2] ${
          playing && ready && !reduced ? "opacity-100" : "opacity-0"
        }`}
        muted
        playsInline
        preload="metadata"
        loop
        poster={poster}
        onCanPlay={() => setReady(true)}
        onLoadedData={() => setReady(true)}
        onError={() => {
          setReady(false);
          setPlaying(false);
          console.warn("Video failed to load:", videoSrc);
        }}
        tabIndex={-1}
        aria-label={alt}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Subtle overlay for readability */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/10 z-[3]" />
    </div>
  );
}

function ServiceBlock({
  id,
  title,
  desc,
  bullets,
  imageSrc,
  imageAlt,
  reverse = false,
  primaryCta,
  secondaryCta,
  extra,
  videoSrc,
}: {
  id: string;
  title: string;
  desc: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  primaryCta?: string;
  secondaryCta?: string;
  extra?: React.ReactNode;
  videoSrc?: string;
}) {
  return (
    <section id={id} className={`${section} py-12 md:py-16`}>
      <div className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>

        {/* MEDIA */}
        <div
          className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative"
          // Inline style guarantees height even if Tailwind’s arbitrary classes don’t compile
          style={{ aspectRatio: "16 / 9", minHeight: 360 }}
        >
          {videoSrc ? (
            // Video fades in on hover/tap; poster is underneath
            <HoverVideoPoster
              poster={imageSrc}
              videoSrc={videoSrc}
              alt={imageAlt}
              fallbackLabel={title}
              className="absolute inset-0"
            />
          ) : (
            // IMPORTANT: not absolute—so it paints even if the container collapses
            <ImageWithFallback
              src={imageSrc}
              alt={imageAlt}
              fallbackLabel={title}
              className="block h-full w-full object-cover"
            />
          )}
          {/* subtle readability overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
        </div>

        {/* COPY */}
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-white">{title}</h3>
          <p className={`${p} mt-3`}>{desc}</p>
          <ul className="mt-5 space-y-2 text-zinc-300">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check className="h-5 w-5 shrink-0" /> <span>{b}</span>
              </li>
            ))}
          </ul>
          {typeof extra === "string" ? <p className="text-zinc-300 mt-4">{extra}</p> : extra}
          <div className="mt-6 flex flex-wrap gap-3">
            {primaryCta && (
              <Button asChild>
                <a href="#contact">{primaryCta}</a>
              </Button>
            )}
            {secondaryCta && (
              <Button asChild variant="outline" className="border-zinc-700 text-zinc-200 hover:bg-zinc-900">
                <a href="#contact">{secondaryCta}</a>
              </Button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}


/** Image rotator with fallback for the ‘supplements1.jpj’ slip */
function FunctionalRotator() {
  const slides: string[][] = [
    [IMG.gi],
    [IMG.supplements1_jpg, IMG.supplements1_jpj], // try .jpg, then .jpj if that’s the saved file
    [IMG.supplements2],
    [IMG.supplements3],
    [IMG.salt],
  ];
  const [idx, setIdx] = React.useState(0);
  const [dir, setDir] = React.useState(1);

  React.useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
      setDir(1);
    }, 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%" }),
    center: { x: 0 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%" }),
  } as const;

  const nextSrc = slides[(idx + 1) % slides.length][0];

  return (
    <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-zinc-800">
      <img src={nextSrc} alt="" className="hidden" />
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={idx}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.55, ease: "easeOut" }}
          className="absolute inset-0"
          style={{ willChange: "transform" }}
        >
          <ImageMulti
            srcs={slides[idx]}
            alt="Functional medicine visuals"
            fallbackLabel="Functional"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-3 right-3 flex gap-1">
        {slides.map((_, i) => (
          <div key={i} className={`h-1.5 w-5 rounded-full ${i === idx ? "bg-white" : "bg-white/40"}`} />
        ))}
      </div>
    </div>
  );
}

function useSmoothAnchors(offset: number = 80) {
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      const a = t?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("#") || href.length < 2) return;
      const el = document.querySelector(href) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [offset]);
}

function ServicesDropdown() {
  const items = [
    { href: "#iv", label: "IV Therapy" },
    { href: "#injections", label: "Injections" },
    { href: "#plunge", label: "Cold Plunge" },
    { href: "#sauna", label: "Infrared Sauna" },
    { href: "#hbot", label: "Hyperbaric Chamber" },
    { href: "#compression", label: "NormaTec Compression" },
    { href: "#functional", label: "Functional Medicine & Testing" },
  ];

  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="hover:text-white inline-flex items-center gap-1"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Services
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      <div
        role="menu"
        className={`absolute left-0 top-full mt-2 min-w-[240px] rounded-xl border border-zinc-800 bg-zinc-950/95 backdrop-blur shadow-xl p-2 ${
          open ? "block" : "hidden"
        }`}
      >
        {items.map((i) => (
          <a
            key={i.href}
            href={i.href}
            role="menuitem"
            className="block px-3 py-2 rounded-md text-zinc-200 hover:bg-zinc-800/60"
            onClick={() => setOpen(false)}
          >
            {i.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SummitWellnessSite() {
  useSmoothAnchors(80);
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-200">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/70 border-b border-zinc-800">
        <div className={`${section} flex items-center justify-between h-16`}>
          <div className="flex items-center gap-2">
            <ImageWithFallback src={IMG.logo} fallbackLabel="Summit Wellness" alt="Summit Wellness" className="h-8 w-auto" />
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-200">
            <ServicesDropdown />
            <a href="#packages" className="hover:text-white">Packages</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="hidden md:inline-flex"><a href="#contact">Book Now</a></Button>
          </div>
        </div>
      </header>

      <section className={`${section} pt-12 md:pt-20 pb-12`}>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
              Performance & Recovery, <span className="text-zinc-300">Done Right</span>
            </h1>
            <p className={`${p} mt-6 max-w-2xl`}>
              IVs, injections, contrast therapy, hyperbaric oxygen, and compression—built for active locals and high-performance travelers. Mobile nurses available.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button asChild><a href="#contact">Book an IV</a></Button>
              <Button asChild variant="outline" className="border-zinc-700 text-zinc-200 hover:bg-zinc-900"><a href="#contact">Explore Memberships</a></Button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-zinc-400 text-sm">
              <div className="flex items-center gap-2"><Timer className="h-4 w-4" />Same-day mobile slots</div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4" />Group & event rates</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.8 }}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
              <ImageWithFallback src={IMG.hero} fallbackLabel="Summit" alt="Summit Wellness" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-black/30" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800"><Droplet className="h-5 w-5 mb-2" />IV Therapy</div>
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800"><HeartPulse className="h-5 w-5 mb-2" />Hyperbaric Chamber</div>
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800"><ThermometerSnowflake className="h-5 w-5 mb-2" />Cold Plunge</div>
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800"><Flame className="h-5 w-5 mb-2" />IR Sauna</div>
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800"><Activity className="h-5 w-5 mb-2" />Compression</div>
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800"><Syringe className="h-5 w-5 mb-2" />Injections</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className={`${section} py-12 md:py-16`}>
        <SectionHeader overline="What We Offer" title="Core Services" desc="A high-performance menu built around rapid recovery and sustained wellness." />
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          <Card className="lg:col-span-2 bg-zinc-900/60 border-zinc-800 overflow-hidden">
            <div className="relative aspect-[16/9]">
              <ImageWithFallback src={IMG.services} fallbackLabel="Services" alt="Summit Wellness services" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <CardContent className="pt-6"><FeatureGrid /></CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800 overflow-hidden flex flex-col">
            <div className="relative aspect-[16/14]">
              <ImageWithFallback src={IMG.staff} fallbackLabel="Team" alt="Summit Wellness staff" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <CardContent className="pt-6 text-zinc-300 flex-1">
              <p className="text-sm">
                We started Summit Wellness to make performance medicine straightforward: fast recovery when you need it, and data-driven care when it matters.
                Too many active people were cycling through IVs, recovery methods and health goals without a plan. We built a clinic that delivers both—quick interventions and long-term direction.
              </p>
              <p className="text-sm mt-3">
                Clients choose us for three reasons – speed, standards, and outcomes. Same-day mobile IVs and efficient in-studio sessions; licensed nurses with an in-house Nurse Practitioner, MD oversight, and athlete-grade sanitation and dosing; protocols that are measured and adjusted, not guessed—based on your needs and goals.
              </p>
              <p className="text-sm mt-3">
                Our team is practical and clinical. Experienced nurses are supported by our in-house Nurse Practitioner and all treatments are cleared by our medical director. We keep the process simple, explain what matters, and skip the noise.
              </p>
              <p className="text-sm mt-3">
                Care is tailored, not templated. If you need quick turnaround, we stack IVs with compression, infrared sauna, or cold plunge. If you need deeper answers, we use GI-MAP and vitamin panels to target deficiencies, then dial in injections (e.g., high-dose Vitamin C, NAD+) and session frequency. Whether you’re training, traveling, or rebuilding, we match the plan to your calendar and goals.
              </p>
            </CardContent>
            <div className="relative aspect-[16/9]">
              <ImageWithFallback src={IMG.team2} fallbackLabel="Team" alt="Summit Wellness team" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
            </div>
          </Card>
        </div>
      </section>

      <section id="packages" className={`${section} py-12 md:py-16`}>
        <SectionHeader overline="Curated Bundles" title="Protocols & Packages" desc="Proven stacks for recovery, resilience, and cognitive clarity." />
        <ProtocolCards />
        <div className="mt-8 text-center"><Button asChild><a href="#contact">See Membership Options</a></Button></div>
      </section>

      <ServiceBlock
        id="iv"
        title="IV Therapy"
        desc="Hydration, performance, immunity, and recovery IVs administered by licensed nurses—in studio or mobile."
        bullets={["Same-day mobile availability", "Group/event discounts", "Custom add-ons (B-complex, NAD+ support)"]}
        imageSrc={IMG.iv}
        imageAlt="IV therapy at Summit Wellness"
        videoSrc="/videos/iv.mp4"
        extra="IV therapy offers rapid hydration and essential nutrients directly into your bloodstream—far beyond what water or oral supplements can do. Fluids shouldn’t be limited to hospital care; they’re an effective tool for recovery, energy, and overall wellness in everyday life. IV bags can be customized with add-ons like vitamins, electrolytes, amino acids, and antioxidants to target your specific needs. Most people feel the effects almost immediately—boosting energy, focus, and recovery within minutes of treatment."
        primaryCta="Book an IV"
      />

      <ServiceBlock
        id="injections"
        title="Injections"
        desc="High-dose Vitamin C, NAD+, B12, and lipo injections tailored to your goals and labs."
        bullets={["Clinician-guided dosing", "Quick visits, big impact", "Add to IVs or stand-alone"]}
        imageSrc={IMG.injections}
        imageAlt="Injection services"
        videoSrc="/videos/injections.mp4"
        extra={
          <>
            <p>Our injection therapies deliver targeted nutrients and medications in minutes—no IV required. From easing pain or nausea to boosting energy, metabolism, and immunity, injections are a fast way to feel your best.</p>
            <p className="mt-3">Options include: Pepcid, Zofran, Toradol, CoQ10, Vitamin D, Vitamin C, Super B + MIC, Glutathione, and NAD+. Each works to support energy, recovery, wellness, and overall performance—so you can get back to living at full speed.</p>
          </>
        }
        reverse
        primaryCta="Book Injections"
      />

      <ServiceBlock
        id="plunge"
        title="Cold Plunge"
        desc="Low-temperature immersion to reduce soreness, build resilience, and accelerate recovery."
        bullets={["3–5 minute guided sessions", "Pair with sauna for contrast therapy", "Unlimited options with membership"]}
        imageSrc={IMG.plunge}
        imageAlt="Cold plunge"
        videoSrc="/videos/plunge.mp4"
        extra="Cold plunge therapy works by triggering your body’s natural fight-or-flight response. When you immerse in cold water, blood vessels constrict, circulation increases, and your nervous system activates—boosting alertness, releasing endorphins, and priming your body for recovery. This powerful reset reduces inflammation, speeds recovery, strengthens mental resilience, and lifts mood and energy almost instantly. Just a few minutes in the plunge leaves you feeling sharper, lighter, and recharged—ready to take on anything."
        primaryCta="Reserve Plunge"
      />

      <ServiceBlock
        id="sauna"
        title="Full-Spectrum Infrared Sauna"
        desc="Detox and relax with near, mid, and far infrared heat—stack with plunge for metabolic benefits."
        bullets={["30–45 minute sessions", "Private suite", "Member unlimited access"]}
        imageSrc={IMG.sauna}
        imageAlt="Infrared sauna"
        videoSrc="/videos/sauna.mp4"
        extra={
          <>
            <p>Unlike traditional saunas that heat the air around you, infrared saunas use light waves to warm your body directly. This deeper penetration helps improve circulation, loosen tight muscles, and promote detox at the cellular level—all while operating at a more comfortable temperature.</p>
            <p className="mt-3">Infrared therapy is known to support recovery, reduce inflammation, improve skin health, and even enhance metabolism. Clients often report better sleep, lower stress, and an overall sense of renewal after each session. The gentle, penetrating heat works with your body—not against it—so you leave feeling lighter, clearer, and recharged.</p>
          </>
        }
        reverse
        primaryCta="Reserve Sauna"
      />

      <ServiceBlock
        id="hbot"
        title="Hyperbaric Oxygen Therapy"
        desc="Targeted protocols for tissue oxygenation, recovery, and neuro support."
        bullets={["$125/session (new client discount available)", "5 & 10-pack options", "Private treatment"]}
        imageSrc={IMG.hbot}
        imageAlt="Hyperbaric chamber"
        videoSrc="/videos/hyperbaric.mp4"
        extra={
          <>
            <p>Inside a hyperbaric chamber, you breathe 100% oxygen at increased pressure, allowing your lungs to absorb far more oxygen than normal. This surge delivers oxygen-rich blood to tissues and unlocks your body’s natural ability to heal at a faster rate.</p>
            <p className="mt-3">Hyperbaric therapy supports recovery from injury, reduces inflammation, boosts energy, and promotes overall wellness. Many clients notice improved focus, faster recovery times, and enhanced resilience. By flooding your system with oxygen, Hyperbaric therapy helps your body repair, restore, and perform at its best.</p>
          </>
        }
        primaryCta="Book Hyperbaric Therapy"
      />

      <ServiceBlock
        id="compression"
        title="NormaTec Compression"
        desc="Air compression technology to flush soreness and support faster turnaround between sessions."
        bullets={["10–20 minute sessions", "Lower body & full-leg options", "Great add-on to IV or sauna"]}
        imageSrc={IMG.compression}
        imageAlt="NormaTec compression"
        videoSrc="/videos/normatec.mp4"
        reverse
        extra={
          <>
            <p>NormaTec compression uses dynamic air pressure to massage your legs, hips, or arms in rhythmic waves—improving circulation, flushing out toxins, and reducing muscle soreness. This active recovery method speeds healing, reduces swelling, and leaves your body feeling refreshed and recharged.</p>
            <p className="mt-3">Many athletes and busy professionals use compression therapy to bounce back faster, fight fatigue, and keep moving at their best. Just one session can help you feel lighter, looser, and ready for whatever comes next.</p>
          </>
        }
        primaryCta="Book Compression"
      />

      <section id="functional" className={`${section} py-12 md:py-16`}>
        <SectionHeader overline="Long-Term Health" title="Functional Medicine & Testing" desc="Move beyond quick fixes. We identify root causes and build targeted protocols." />
        <FunctionalRotator />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {functionalCards.map((b) => (
            <Card key={b.title} className="bg-zinc-900/60 border-zinc-800">
              <CardHeader><CardTitle className="text-zinc-100">{b.title}</CardTitle></CardHeader>
              <CardContent><p className="text-zinc-300">{b.desc}</p></CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8"><Button asChild><a href="#contact">Book a Consult</a></Button></div>
      </section>

      <section id="pricing" className={`${section} py-12 md:py-16`}>
        <SectionHeader overline="Transparent" title="Sample Pricing" desc="Exact pricing varies by formulation, duration, and membership status." />
        <PriceTiles />
        <p className="text-center text-sm text-zinc-400 mt-6">* Mobile visits may include travel/call-out fees. Contact us for a precise quote.</p>
      </section>

      {testimonials.length > 0 && (
        <section className={`${section} py-12 md:py-16`}>
          <SectionHeader overline="Results" title="What Clients Say" />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((quote, idx) => (
              <Card key={idx} className="bg-zinc-900/60 border-zinc-800">
                <CardContent className="pt-6">
                  <p className="text-zinc-300 italic">“{quote}”</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section id="contact" className={`${section} py-12 md:py-20`}>
        <SectionHeader overline="Get In Touch" title="Questions, Teams, Events" desc="Tell us what you need—same-day options often available for mobile IVs and recovery sessions." />
        <ContactForm />
      </section>

      <footer className="border-t border-zinc-800">
        <div className={`${section} py-10 grid md:grid-cols-4 gap-8 text-sm`}>
          <div>
            <div className="flex items-center gap-2">
              <ImageWithFallback src={IMG.logo} fallbackLabel="Summit Wellness" alt="Summit Wellness" className="h-8 w-auto" />
            </div>
            <p className="text-zinc-400 mt-3">Performance & recovery medicine on the Gulf Coast.</p>
          </div>
          <div>
            <div className="text-zinc-300 font-medium mb-3">Services</div>
            <ul className="space-y-2 text-zinc-400">
              <li>IV Therapy (Mobile + In-Studio)</li>
              <li>Injections (Vit C, NAD+, B12)</li>
              <li>IR Sauna & Cold Plunge</li>
              <li>Hyperbaric Oxygen</li>
              <li>NormaTec Compression</li>
            </ul>
          </div>
          <div>
            <div className="text-zinc-300 font-medium mb-3">Programs</div>
            <ul className="space-y-2 text-zinc-4 00">
              <li>Memberships (Unlimited)</li>
              <li>Protocols & Packages</li>
              <li>Functional Medicine</li>
              <li>GI-MAP & Labs</li>
              <li>Peptide Therapy</li>
            </ul>
          </div>
          <div>
            <div className="text-zinc-300 font-medium mb-3">Contact</div>
            <ul className="space-y-2 text-zinc-400">
              <li>251-241-8260</li>
              <li>info@summitwellnessoba.com</li>
              <li>3099 Loop Rd. Unit 4, Orange Beach, AL 36561</li>
            </ul>
            <div className="text-xs text-zinc-500 mt-4">© {new Date().getFullYear()} Summit Wellness. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Minimal smoke tests (unchanged)
(function () {
  try {
    ["logo", "hero", "iv", "injections", "plunge", "sauna", "hbot", "compression"].forEach((k) => {
      const u = (IMG as any)[k];
      console.assert(typeof u === "string" && u.length > 0, `${k} url`);
      console.assert(!u.includes(" "), `${k} no spaces`);
    });
    console.assert(Array.isArray(functionalCards) && functionalCards.length === 6, "6 functional cards");
    console.assert(typeof SummitWellnessSite === "function", "component exported");
    console.assert(typeof ImageMulti === "function", "ImageMulti is a function");
    console.assert(typeof useSmoothAnchors === "function", "smooth hook");
  } catch (e) {
    console.warn("smoke", e);
  }
})();
