import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";
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
  supplements1_jpg: "/images/supplements1.jpg",
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

function useMediaQuery(query: string) {
  const [matches, set] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const on = (e: MediaQueryListEvent | MediaQueryList) => set('matches' in e ? e.matches : (e as MediaQueryList).matches);
    on(mq);
    mq.addEventListener?.('change', on as any);
    return () => mq.removeEventListener?.('change', on as any);
  }, [query]);
  return matches;
}


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
  { icon: Droplet, id: "iv", title: "IV Therapy", desc: "Hydration, performance, recovery, and wellness IV protocols - administered by licensed nurses in-studio or through our mobile service."},
  { icon: Syringe, id: "injections", title: "Injections", desc: "Personalized wellness injections designed to support hydration, recovery, and overall vitality - provided by licensed clinical staff."},
  { icon: ThermometerSnowflake, id: "plunge", title: "Cold Plunge", desc: "Chilled immersion designed to help refresh, reset, and invigorate the body. Pair with sauna sessions for a balanced contrast experience." },
  { icon: Flame, id: "sauna", title: "Full-Spectrum IR Sauna", desc: "Experience gentle, full-spectrum infrared heat at temperatures up to 160 degrees designed to promote relaxation and rejuvenation." },
  { icon: HeartPulse, id: "hbot", title: "Hyperbaric Chamber", desc: "Personalized hyperbaric sessions designed to support relaxation, energy, and overall wellness." },
  { icon: Activity, id: "compression", title: "NormaTec Compression", desc: "Dynamic air compression designed to help refresh tired muscles and support post-activity wellness. A favorite among athletes." },
] as const;

const protocols = [
  { name: "Recovery Stack", description: "Wellness-focused combination featuring an IV session, compression therapy, and cold immersion for a complete refresh experience.", bullets: ["IV hydration session (post-activity)", "NormaTec Compression (30 minutes)", "Cold Plunge (3–5 minutes)"], notes: "Created for active individuals looking to recharge and restore balance." },
  { name: "Cold + Heat Reset", description: "A restorative blend of sauna, cold immersion, and guided breathwork designed to refresh both body and mind.", bullets: ["Full-spectrum Infrared Sauna", "Cold Plunge Session", "Guided Breathwork Experience"], notes: "Experience temperature transitions that promote focus, relaxation, and balanced wellness." },
  { name: "Hyperbaric + Rebuild", description: "A revitalizing wellness combination featuring a hyperbaric session, nutrient injection, and IV hydration add-on. ", bullets: ["Hyperbaric Session", "B-Complex/NAD+ based nutrient injection", "Hydration IV add-on"], notes: "This trio is designed to help restore balance, promote energy, and support overall vitality." },
] as const;



const priceTiles = [
  { title: "Hyperbaric Therapy", price: "$125", sub: "/ session", items: ["First-time discount available", "5 and 10-pack pricing", "Add-on discount availble"] },
  { title: "Mobile IV Therapy", price: "From $165*", sub: "/ each", items: ["Hydration, Energy, Wellness Support", "Group/Event discounts", "Hotel, home, or gym"] },
  { title: "Unlimited Recovery", price: "$250", sub: "/ month", items: ["Unlimited Sauna + Cold Plunge", "Unlimited NormaTec Compression", "Add-on rates for IV & Hyperbaric sessions"] },
] as const;

const testimonials: string[] = [
  "The nurse was super friendly and professional, and the in-home service for our group made everything easy. The IV process was smooth from start to finish—highly recommend.",
  "Amazing ambiance and a spotless facility. I booked an IV with Glutathione, NormaTec sessions, an infrared sauna, and a cold plunge—left feeling refreshed and re-energized. Excited to come back and try the hyperbaric chamber.",
  "They sent a nurse to us the same day—kind, caring, and professional. I noticed the difference right away and finally enjoyed my vacation comfortably. I’ll definitely book again.",
  "When I’m drained or dehydrated, an IV here helps me feel refreshed fast. The team is knowledgeable and always points me in the right direction—now part of my regular wellness routine.",
  "GI-MAP testing was extremely informative and gave me a clear wellness plan. I’ve already noticed improvements and appreciate their natural, educational approach.",
  "I tried a hyperbaric oxygen session and the nursing staff checked on me throughout—such a great experience. I’m glad there’s a reliable wellness spot for this locally.",
];

const functionalCards = [
  { title: "GI-MAP Wellness Testing", desc: "Advanced gut health testing designed to provide insights into your digestive wellness and overall vitality. Our clinical team reviews results and offers personalized guidance to help you make informed choices for long-term balance." },
  { title: "Vitamin & Micronutrient Panels", desc: "Comprehensive wellness panels designed to provide insight into your nutrient balance and overall vitality. Our clinical team reviews results and offers personalized recommendations to help you support energy, recovery, and long-term wellness." },
  { title: "Peptide Consultations", desc: "Personalized wellness consultations focused on education and guidance around peptide-based wellness plans. Our clinicians provide oversight, support, and ongoing evaluation to help you make informed choices that align with your goals." },
  { title: "Metabolic & Lifestyle Consults", desc: "Personalized wellness injections and IV add-ons designed to promote balance, energy, and overall vitality. Each session is guided by licensed clinical staff and tailored to complement your wellness goals." },
  { title: "Cellular Wellness Support", desc: "Targeted NAD+ injections and IV add-ons to boost cellular energy, focus, and recovery—dosed for effectiveness while minimizing side effects." },
  { title: "Customized Wellness Plans", desc: "Your Nurse Practitioner creates a personalized plan based on your wellness goals and health insights—refined over time to support lasting balance and measurable progress." },
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
            <CardTitle className="text-zinc-100">{pSet.name} <h3 className="text-sm text-zinc-400 mt-4">{pSet.description}</h3></CardTitle>
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


function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "sending" | "ok" | "error">("idle");
  const [values, setValues] = React.useState({ name: "", email: "", phone: "", message: "" });
  const [msg, setMsg] = React.useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMsg(null);

    try {
      const form = e.currentTarget;
      const data = new FormData(form);

      // Ensure Netlify knows which form this is
      if (!data.get("form-name")) data.set("form-name", "contact");

      // Netlify expects URL-encoded body for SPA submissions
      const body = new URLSearchParams(data as any).toString();

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (res.ok) {
        setStatus("ok");
        setMsg("Thanks! We’ve received your request. One of our nurses will contact you soon!");
        setValues({ name: "", email: "", phone: "", message: "" });
      } else {
        console.warn("Netlify POST failed:", res.status, res.statusText);
        setStatus("error");
        setMsg("Something went wrong. Please try again or call 251-241-8260.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
      setMsg("Something went wrong. Please try again or call 251-241-8260.");
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="bg-zinc-900/60 border-zinc-800 order-2 lg:order-1">
        <CardHeader>
          <CardTitle className="text-zinc-100">Send us a message</CardTitle>
        </CardHeader>

        {/* Netlify-enabled form with inline confirmation */}
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          {/* Required hidden input so Netlify associates the submission */}
          <input type="hidden" name="form-name" value="contact" />

          {/* Honeypot field to reduce spam (hidden from users) */}
          <p className="hidden">
            <label>Don’t fill this out: <input name="bot-field" /></label>
          </p>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="name" placeholder="Your name" value={values.name} onChange={onChange} required />
              <Input name="email" type="email" placeholder="Email" value={values.email} onChange={onChange} required />
            </div>
            <Input name="phone" placeholder="Phone" value={values.phone} onChange={onChange} />
            <Textarea
              name="message"
              placeholder="How can we help?"
              rows={6}
              value={values.message}
              onChange={onChange}
              required
            />

            <Button className="w-full" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Submit"}
            </Button>

            {/* Inline confirmation / error message at the bottom of the form */}
            <div className="min-h-[24px]" aria-live="polite">
              {msg && (
                <p className={status === "ok" ? "text-emerald-400 text-sm mt-2" : "text-red-400 text-sm mt-2"}>
                  {msg}
                </p>
              )}
            </div>
          </CardContent>
        </form>
      </Card>

      {/* Keep your address/hours card on the right */}
      <div className="order-1 lg:order-2 space-y-6">
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-zinc-100">Visit Summit Wellness</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300 space-y-3">
            <div className="flex items-center gap-2"><MapPin className="h-5 w-5" /><span>3099 Loop Rd. Unit 4, Orange Beach, AL 36561</span></div>
            <div className="flex items-center gap-2"><Clock className="h-5 w-5" /><span>Mon–Fri 8a–4p • Sat 8a–12p</span></div>
            <div className="flex items-center gap-2"><PhoneCall className="h-5 w-5" /><span>251-241-8260</span></div>
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
  const [ready, setReady] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
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
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setPlaying(false);
      }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const start = () => {
    if (reduced || !videoRef.current) return;
    videoRef.current.play().catch(() => { });
    setPlaying(true);
  };
  const stop = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setPlaying(false);
  };
  const toggleTouch = () => (playing ? stop() : start());

  // If the poster 404s, fall back to an inline SVG background
  const bgImage = `url("${poster}")`;
  const fallbackBg = `url("${fallbackSVG(fallbackLabel)}")`;

  return (
    <div
      ref={ref}
      onMouseEnter={start}
      onMouseLeave={stop}
      onTouchStart={toggleTouch}
      aria-label={alt}
      className={`relative ${className ?? ""}`}
      style={{
        // Always-visible poster as CSS background
        backgroundImage: `${bgImage}, ${fallbackBg}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // Ensure the layer paints
        width: "100%",
        height: "100%",
      }}
    >
      {/* Only the video is layered; poster is handled by background */}
      <video
        ref={videoRef}
        className={`absolute transition-opacity duration-300 ${playing && ready && !reduced ? "opacity-100" : "opacity-0"
          }`}
        // Overscan + slight scale to kill seams on *any* edge
        style={{
          // start bigger than the container
          top: -1, left: -1,
          width: "calc(100% + 2px)",
          height: "calc(100% + 2px)",
          objectFit: "cover",
          // eliminate right-edge hairline on iOS/Android by scaling ~1%
          transform: "translateZ(0) scale(1.01)",
          WebkitTransform: "translateZ(0) scale(1.01)",
          transformOrigin: "center center",
          willChange: "opacity, transform",
        }}
        muted
        playsInline
        preload="metadata"
        loop
        poster={poster}
        onCanPlay={() => setReady(true)}
        onLoadedData={() => setReady(true)}
        onError={() => { setReady(false); setPlaying(false); }}
        tabIndex={-1}
        aria-label={alt}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>



      {/* Subtle overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/10" />
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
  overline = "SERVICE",
  showCenteredHeader = true,
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
  overline?: string;
  showCenteredHeader?: boolean;
}) {
  return (
    <section id={id} className={`${section} py-12 md:py-16`}>
      {/* Centered service header (chip + title + desc) */}
      {showCenteredHeader && (
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            <Sparkles className="h-4 w-4" />
            {overline}
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold text-white">{title}</h2>
          <p className={`${p} mt-3 max-w-3xl mx-auto`}>{desc}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* MEDIA COLUMN */}
        <div className={`min-w-0 ${reverse ? "lg:order-2" : ""}`}>
          <div
            className="relative w-full max-w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl z-0"
            // clamp(min, preferred, max): keeps phones compact, desktop tall, no wasted space
            style={{ aspectRatio: "16 / 9", minHeight: "clamp(200px, 45vw, 360px)" }}
          >
            {videoSrc ? (
              <HoverVideoPoster
                poster={imageSrc}
                videoSrc={videoSrc}
                alt={imageAlt}
                fallbackLabel={title}
                className="absolute inset-0"
              />
            ) : (
              <ImageWithFallback
                src={imageSrc}
                alt={imageAlt}
                fallbackLabel={title}
                className="block h-full w-full object-cover"
                loading="eager"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
          </div>
        </div>

        {/* TEXT COLUMN */}
        <div className={`min-w-0 ${reverse ? "lg:order-1" : ""}`}>
          {!showCenteredHeader && (
            <>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                <Sparkles className="h-4 w-4" />
                {overline}
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-white mt-2">{title}</h3>
              <p className={`${p} mt-3`}>{desc}</p>
            </>
          )}

          <ul className="mt-5 mb-5 md:mb-6 space-y-2 text-zinc-300">
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


import { Instagram, Youtube, Facebook, Music2 } from "lucide-react";

/** Compact white social icons for the header */
function SocialLinks() {
  const links = [
    { href: "https://www.instagram.com/summit.wellness.oba", label: "Instagram", Icon: Instagram },
    { href: "https://www.youtube.com/@SummitWellnessOBA",     label: "YouTube",   Icon: Youtube   },
    { href: "https://www.tiktok.com/@summit.wellness.oba",    label: "TikTok",    Icon: Music2    }, // musical note icon
    { href: "https://www.facebook.com/summitwellnessoba",     label: "Facebook",  Icon: Facebook  },
  ];

  return (
    <div className="flex items-center gap-1">
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
          title={label}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </a>
      ))}
    </div>
  );
}


/** Image rotator */
function FunctionalRotator() {
  const slides: string[][] = [
    [IMG.gi],
    [IMG.supplements1_jpg], 
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
    { href: "#iv", label: "IV Hydration" },
    { href: "#injections", label: "Injections" },
    { href: "#plunge", label: "Cold Plunge" },
    { href: "#sauna", label: "Infrared Sauna" },
    { href: "#hbot", label: "Hyperbaric Oxygen" },
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

function useLockBody(locked: boolean) {
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    if (locked) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [locked]);
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useLockBody(open);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const linkCls = "block w-full text-left px-4 py-3 text-zinc-100 hover:bg-white/10 rounded-lg";
  const closeAnd = (cb?: () => void) => () => { onClose(); cb?.(); };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button className="absolute inset-0 bg-black/50" aria-label="Close menu" onClick={onClose}/>
      <div id="mobile-menu" className="absolute right-0 top-0 h-full w-[84%] max-w-sm bg-zinc-950 border-l border-zinc-800 shadow-2xl p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-zinc-300 text-sm tracking-widest">MENU</span>
          <button onClick={onClose} className="p-2 rounded-md text-zinc-300 hover:bg-white/10" aria-label="Close">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="space-y-1">
          <a href="/" className={linkCls} onClick={closeAnd()}>Home</a>

          <div className="mt-2 px-4 pt-3 pb-2 text-xs uppercase tracking-widest text-zinc-400">Services</div>
          <a href="#iv"           className={linkCls} onClick={closeAnd()}>IV Therapy</a>
          <a href="#injections"   className={linkCls} onClick={closeAnd()}>Injections</a>
          <a href="#plunge"       className={linkCls} onClick={closeAnd()}>Cold Plunge</a>
          <a href="#sauna"        className={linkCls} onClick={closeAnd()}>Infrared Sauna</a>
          <a href="#hbot"         className={linkCls} onClick={closeAnd()}>Hyperbaric Chamber</a>
          <a href="#compression"  className={linkCls} onClick={closeAnd()}>NormaTec Compression</a>
          <a href="#functional"   className={linkCls} onClick={closeAnd()}>Functional Medicine & Testing</a>

          <div className="mt-2 px-4 pt-3 pb-2 text-xs uppercase tracking-widest text-zinc-400">Company</div>
          <a href="#reviews" className={linkCls} onClick={closeAnd()}>Reviews</a>
          <a href="#contact" className={linkCls} onClick={closeAnd()}>Contact</a>
          <a
            href="https://blog.summitwellnessoba.com"
            className={linkCls}
            onClick={closeAnd()}
            target="_blank"
            rel="noopener noreferrer"
          >Blog
          </a>


          <div className="mt-4 px-4">
            <Button asChild className="w-full"><a href="#contact" onClick={closeAnd()}>Book Now</a></Button>
          </div>

          <div className="mt-3 px-2">
            <SocialLinks className="justify-start" />
          </div>
        </nav>
      </div>
    </div>
  );
}


export default function SummitWellnessSite() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
            <a
              href="https://blog.summitwellnessoba.com"
              className="hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>

          </nav>

          {/* Right side of header */}
          <div className="flex items-center gap-2">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-md text-white hover:bg-white/10"
              onClick={() => setMobileOpen(true)}
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              aria-label="Open menu"
            >
              <MenuIcon className="h-6 w-6" />
            </button>

            {/* Existing socials + Book Now */}
            <div className="hidden lg:flex">
              <SocialLinks />
            </div>

            <Button asChild className="ml-1">
              <a href="#contact">Book Now</a>
            </Button>
          </div>


        </div>
      </header>

<MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />


      <section className={`${section} pt-12 md:pt-20 pb-12`}>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
              Performance & Recovery, <span className="text-zinc-300">Done Right.</span>
            </h1>
            <p className={`${p} mt-6 max-w-2xl`}>
              Restore, recharge, and perform at your best with wellness services designed for active lifestyles and high-performance travelers.
              Our licensed clinical team offers IV therapy, nutrient injections, contrast therapy, hyperbaric oxygen, and compression sessions—all crafted to support recovery, hydration, and overall wellness.</p>
            <p className={`${p} mt-6 max-w-2xl`}>Available in-studio or mobile:</p>
            <ul className="list-disc list-outside text-zinc-300 mt-2 max-w-2xl pl-8">
              <li>Same-day mobile appointments</li>
              <li>Group and event sessions</li>
              <li>Membership options for ongoing wellness</li>
            </ul>

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
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800"><Droplet className="h-5 w-5 mb-2" />IV Hydration</div>
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800"><HeartPulse className="h-5 w-5 mb-2" />Hyperbaric Oxygen</div>
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800"><ThermometerSnowflake className="h-5 w-5 mb-2" />Cold Plunge</div>
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800"><Flame className="h-5 w-5 mb-2" />Infrared Sauna</div>
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800"><Activity className="h-5 w-5 mb-2" />NormaTec Compression</div>
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800"><Syringe className="h-5 w-5 mb-2" />Nutrient Injections</div>
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
                We started Summit Wellness to make performance and recovery simple—fast support when you need it, and personalized guidance when it matters. Too many active people were cycling through IVs, recovery tools, and wellness goals without a clear plan. We built a clinic that combines both: efficient sessions and long-term wellness direction.
              </p>
              <p className="text-sm mt-3">
                Clients choose us for three reasons – speed, standards, and results. Same-day mobile IVs and efficient in-studio sessions; licensed staff with MD oversight, and athlete-grade sanitation; protocols that are measured and adjusted, not guessed—based on your needs and goals.
              </p>
              <p className="text-sm mt-3">
                 Our team blends practical experience with clinical precision. Every service is designed and supervised by medical professionals to ensure safety, consistency, and care you can trust.
              </p>
              <p className="text-sm mt-3">
                Whether you’re training, traveling, or recharging, Summit Wellness helps you stay balanced, recovered, and ready for what’s next. It’s not just about feeling better today—it’s about building resilience for tomorrow.</p>
            </CardContent>
            <div className="relative aspect-[16/9]">
              <ImageWithFallback src={IMG.team2} fallbackLabel="Team" alt="Summit Wellness team" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
            </div>
          </Card>
        </div>
      </section>

      <section id="packages" className={`${section} py-12 md:py-16`}>
        <SectionHeader overline="Curated Bundles" title="Protocols & Packages" desc="Personalized wellness bundles designed to simplify your routine and help you feel your best." />
        <ProtocolCards />
        <div className="mt-8 text-center"><Button asChild><a href="#contact">See Membership Options</a></Button></div>
      </section>

      <ServiceBlock
        id="iv"
        title="IV Therapy"
        desc="Personalized IV hydration designed to support energy, hydration, and overall wellness—provided by licensed nurses, in-studio or mobile. "
        bullets={["Same-day mobile availability", "Group & Event options", "Customizable nutrient blends (e.g., B-complex, hydration support)"]}
        imageSrc={IMG.iv}
        imageAlt="IV therapy at Summit Wellness"
        videoSrc="/videos/iv.mp4"
        extra="IV therapy delivers fluids and nutrients to help your body stay balanced, hydrated, and performing at its best. It’s a simple, efficient way to support recovery, energy, and overall wellness beyond what typical hydration can offer. Our IV hydration sessions help restore balance, promote hydration, and support your active lifestyle. Each session is guided by our clinical team to complement your wellness goals and leave you feeling refreshed."
        primaryCta="Book an IV"
      />

      <ServiceBlock
        id="injections"
        title="Injections"
        desc="Personalized nutrient injections designed to complement your wellness goals and active lifestyle."
        bullets={["Clinician-guided care", "Quick, convenient sessions", "Stand-alone or IV add-on options"]}
        imageSrc={IMG.injections}
        imageAlt="Injection services"
        videoSrc="/videos/injections.mp4"
        extra={
          <>
            <p>Each formula is thoughtfully selected by our clinical team to support recovery, hydration, and vitality—no IV required. These treatments are designed to promote energy, recovery, and overall wellness, helping you feel your best fast.</p>
            <p className="mt-3">Our injection menu includes nutrient-focused blends like B12, Vitamin D, CoQ10, and Glutathione to help you feel refreshed, balanced, and energized. </p>
          </>
        }
        reverse
        primaryCta="Book Injections"
      />

      <ServiceBlock
        id="plunge"
        title="Cold Plunge"
        desc="Chilled immersion designed to refresh, reset, and invigorate both body and mind."
        bullets={["3–5 minute guided sessions", "Pair with sauna for a balanced wellness experience", "Unlimited access with membership"]}
        imageSrc={IMG.plunge}
        imageAlt="Cold plunge"
        videoSrc="/videos/plunge.mp4"
        extra="Cold immersion encourages a natural sense of alertness and rejuvenation, helping you feel restored and energized. These brief, guided sessions provide a refreshing reset that supports balance, focus, and overall vitality—leaving you clear-headed and ready to take on the day."
        primaryCta="Reserve Plunge"
      />

      <ServiceBlock
        id="sauna"
        title="Full-Spectrum Infrared Sauna"
        desc="Experience full-spectrum near, mid, and far infrared heat designed to promote deep relaxation and rejuvenation."
        bullets={["30–45 minute sessions", "Private suite", "Unlimited access for members"]}
        imageSrc={IMG.sauna}
        imageAlt="Infrared sauna"
        videoSrc="/videos/sauna.mp4"
        extra={
          <>
            <p>Infrared saunas use gentle light-based warmth that’s absorbed directly by your body—creating a soothing, restorative experience at a comfortable temperature. 
              The combination of infrared and red-light wavelengths encourages balance, calm, and overall vitality while supporting relaxation from the inside out. </p>
          </>
        }
        reverse
        primaryCta="Reserve Sauna"
      />

      <ServiceBlock
        id="hbot"
        title="Hyperbaric Oxygen Therapy"
        desc="Personalized hyperbaric sessions designed to support energy, focus, and overall wellness in a relaxing, private setting."
        bullets={["1.5 ATA oxygen environment", "5 & 10-pack options", "Private experience"]}
        imageSrc={IMG.hbot}
        imageAlt="Hyperbaric chamber"
        videoSrc="/videos/hyperbaric.mp4"
        extra={
          <>
            <p>Inside the hyperbaric chamber, you’ll relax in a pressurized environment at approximately 1.5 ATA, where you can breathe concentrated oxygen for a restorative wellness experience. These sessions are designed to promote balance, relaxation, and a sense of rejuvenation while supporting your active lifestyle and overall vitality.</p>
            <p className="mt-3">Each experience is guided by trained staff, offering a calm, restorative environment to help you feel refreshed and recharged.</p>
          </>
        }
        primaryCta="Book Hyperbaric Therapy"
      />

      <ServiceBlock
        id="compression"
        title="NormaTec Compression"
        desc="Air compression technology to flush soreness and support faster turnaround between sessions."
        bullets={["10–20 minute sessions", "Lower body & full-leg options", "Great add-on to IV Hydration or Sauna"]}
        imageSrc={IMG.compression}
        imageAlt="NormaTec compression"
        videoSrc="/videos/normatec.mp4"
        reverse
        extra={
          <>
            <p>NormaTec compression uses gentle, rhythmic air pressure to help you feel relaxed, restored, and re-energized. Each session provides a soothing, active recovery experience that promotes circulation, comfort, and balance for both athletes and busy professionals.</p>
           
          </>
        }
        primaryCta="Book Compression"
      />

      <section id="functional" className={`${section} py-12 md:py-16`}>
        <SectionHeader overline="Long-Term Health" title="Functional Medicine & Testing" desc="Comprehensive wellness evaluations designed to provide deeper insights into your health and performance." />
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
        <p className="text-center text-sm text-zinc-400 mt-6">* Mobile visits may include travel/after hours fees. Contact us for a precise quote.</p>
      </section>

      {testimonials.length > 0 && (
        <section id="reviews" className={`${section} py-12 md:py-16`}>
          <SectionHeader overline="Results" title="What Clients Say*"/>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((quote, idx) => (
              <Card key={idx} className="bg-zinc-900/60 border-zinc-800">
                <CardContent className="pt-6">
                  <p className="text-zinc-300 italic">“{quote}”</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-zinc-500">
            *Individual experiences vary. Services are not intended to diagnose, treat, or cure medical conditions.
          </p>
        </section>
      )}

      <section id="contact" className={`${section} py-12 md:py-20`}>
        <SectionHeader overline="Get In Touch" title="Questions, Teams, Events" desc="Tell us what you need—same-day options often available for mobile IV hydration and wellness sessions." />
        <ContactForm />
      </section>

      <footer className="border-t border-zinc-800">
        <div className={`${section} py-10 grid md:grid-cols-4 gap-8 text-sm`}>
          <div>
            <div className="flex items-center gap-2">
              <ImageWithFallback src={IMG.logo} fallbackLabel="Summit Wellness" alt="Summit Wellness" className="h-8 w-auto" />
              <SocialLinks />
            </div>
            <p className="text-zinc-400 mt-3">Performance & recovery medicine on the Gulf Coast.</p>
          </div>
          <div>
            <div className="text-zinc-300 font-medium mb-3">Services</div>
            <ul className="space-y-2 text-zinc-400">
              <li>IV Therapy (Mobile + In-Studio)</li>
              <li>Injections (Vitamin & Nutrient-Based)</li>
              <li>Infrared Sauna & Cold Plunge</li>
              <li>Hyperbaric Oxygen Sessions</li>
              <li>NormaTec Compression</li>
            </ul>
          </div>
          <div>
            <div className="text-zinc-300 font-medium mb-3">Programs</div>
            <ul className="space-y-2 text-zinc-400">
              <li>Memberships (Unlimited)</li>
              <li>Custom Wellness Packages</li>
              <li>Functional Wellness</li>
              <li>GI-MAP & Wellness Testing</li>
              <li>Peptide Consultations</li>
            </ul>
          </div>
          <div>
            <div className="text-zinc-300 font-medium mb-3">Contact</div>
            <ul className="space-y-2 text-zinc-400">
              <li>251-241-8260</li>
              <li>info@summitwellnessoba.com</li>
              <li>3099 Loop Rd. Unit 4, Orange Beach, AL 36561</li>
            </ul>
            <div className="mt-8 flex items-center justify-between text-zinc-500 text-sm">
              <p>© {new Date().getFullYear()} Summit Wellness. All rights reserved.</p>
            </div>
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
