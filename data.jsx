
// Komin.digi — Full Portfolio Website + Admin CMS
// Stack: React + Tailwind (CDN) + Framer Motion
// All content editable via Admin Panel, stored in localStorage

import { useState, useEffect, useRef, useCallback } from "react";

// ─── DEFAULT CONTENT ────────────────────────────────────────────────────────
const DEFAULT_DATA = {
  branding: {
    name: "Komin.digi",
    tagline: "Social Media & AI Agency",
    logo: "",
    accentColor: "#00FFB2",
    secondaryColor: "#7B5EA7",
    darkBg: "#080B14",
    whatsapp: "https://wa.me/1234567890",
    instagram: "https://instagram.com/komin.digi",
    email: "hello@komin.digi",
    seo: {
      title: "Komin.digi — Social Media & AI Agency",
      description: "We grow creators, personal brands & local businesses with cutting-edge social media strategy and AI-powered content systems.",
      keywords: "social media agency, AI marketing, content strategy, personal brand, creator growth",
    },
  },
  hero: {
    headline: "We Don't Just Post Content.",
    headline2: "We Build Empires.",
    subheadline: "AI-powered social media strategy for creators, personal brands & businesses that are done playing small.",
    cta1: "Start Growing Now",
    cta2: "See Our Work",
    badge: "🚀 10x Growth. Real Results.",
  },
  about: {
    title: "We're Not Your Average Agency.",
    story: "Komin.digi was built for creators and brands who are tired of empty promises. We combine battle-tested social media strategy with cutting-edge AI tools to deliver growth that actually moves the needle — faster, smarter, and with a luxury-level touch.",
    usp1: "AI-Powered Systems",
    usp1desc: "Automated content pipelines that save 20+ hours/week",
    usp2: "Data-Driven Strategy",
    usp2desc: "Every decision backed by analytics, not guesswork",
    usp3: "Creator-First Mindset",
    usp3desc: "We speak your language — no corporate fluff",
    stats: [
      { value: "200+", label: "Clients Grown" },
      { value: "50M+", label: "Views Generated" },
      { value: "3.2x", label: "Avg. Revenue Lift" },
      { value: "48hr", label: "Avg. Response Time" },
    ],
  },
  services: [
    { id: 1, icon: "⚡", title: "Social Media Management", desc: "Full-service content strategy, creation & scheduling across all platforms. We handle everything so you can focus on creating.", tag: "Most Popular" },
    { id: 2, icon: "🤖", title: "AI Content Systems", desc: "Custom AI pipelines for automated captions, hooks, video scripts & repurposing. Scale without burning out.", tag: "New" },
    { id: 3, icon: "📈", title: "Growth Hacking", desc: "Viral strategy, hashtag research, collaboration outreach & algorithm optimization. Built for explosive growth.", tag: "" },
    { id: 4, icon: "🎯", title: "Personal Brand Building", desc: "Positioning, bio optimization, aesthetic design & authority-building content. Become the go-to in your niche.", tag: "Creators" },
    { id: 5, icon: "🏪", title: "Local Business Marketing", desc: "Google-ready profiles, local SEO, reels strategy & community building for brick-and-mortar businesses.", tag: "SMBs" },
    { id: 6, icon: "📊", title: "Analytics & Reporting", desc: "Monthly deep-dive reports with actionable insights, competitor analysis & growth roadmaps.", tag: "" },
  ],
  portfolio: [
    { id: 1, title: "Fashion Creator @0 to 180K", desc: "Instagram + TikTok growth in 90 days", url: "", type: "image", placeholder: "gradient1" },
    { id: 2, title: "Local Cafe — 300% Reach", desc: "Google Maps + Reels strategy", url: "", type: "image", placeholder: "gradient2" },
    { id: 3, title: "Fitness Coach Brand Launch", desc: "Personal brand from scratch to $10K/mo", url: "", type: "image", placeholder: "gradient3" },
    { id: 4, title: "Tech Startup Viral Campaign", desc: "2M+ views in 2 weeks organically", url: "", type: "image", placeholder: "gradient4" },
    { id: 5, title: "Restaurant Chain — Local SEO", desc: "40% walk-in increase in 60 days", url: "", type: "image", placeholder: "gradient5" },
    { id: 6, title: "Lifestyle Brand Instagram", desc: "10x engagement rate increase", url: "", type: "image", placeholder: "gradient6" },
  ],
  testimonials: [
    { id: 1, name: "Aria Chen", handle: "@arialifestyle", role: "Lifestyle Creator", text: "Komin.digi completely transformed my Instagram. In 3 months I went from 8K to 95K followers and landed my first brand deal worth $5K. These guys actually know their stuff.", stars: 5, avatar: "" },
    { id: 2, name: "Marcus Rivera", handle: "The Burger Joint", role: "Restaurant Owner", text: "I was skeptical about social media for my restaurant. Within 60 days, we had a line out the door every Friday because of their Reels strategy. Absolute game-changer.", stars: 5, avatar: "" },
    { id: 3, name: "Priya Mehta", handle: "@priyafitness", role: "Fitness Coach", text: "Their AI content system is insane. I now have 30 days of content ready in one afternoon. My engagement doubled and I barely spend time on social anymore.", stars: 5, avatar: "" },
    { id: 4, name: "Jordan Blake", handle: "@jordanblake_", role: "Personal Brand", text: "From unknown to verified in 6 months. Komin.digi's positioning strategy is next level. My DMs are now full of inbound opportunities every single week.", stars: 5, avatar: "" },
  ],
  caseStudies: [
    { id: 1, client: "Fashion Creator", before: "12K followers, 1.2% engagement", after: "184K followers, 8.7% engagement", time: "90 Days", revenue: "+$12,000/mo brand deals", tag: "Creator" },
    { id: 2, client: "Local Gym Chain", before: "80 monthly leads from social", after: "340 monthly leads, 3 new locations", time: "6 Months", revenue: "+$45,000/mo revenue", tag: "SMB" },
    { id: 3, client: "SaaS Startup", before: "0 social presence, 0 organic traffic", after: "2.4M views, 8,400 email subscribers", time: "4 Months", revenue: "$80K pre-launch revenue", tag: "Startup" },
  ],
  pricing: [
    { id: 1, name: "Starter", price: "$497", period: "/mo", desc: "Perfect for creators starting their growth journey", features: ["3 platforms managed", "12 posts/month", "Basic analytics report", "Caption + hashtag strategy", "1 monthly strategy call", "WhatsApp support"], popular: false, cta: "Get Started" },
    { id: 2, name: "Growth", price: "$997", period: "/mo", desc: "For serious creators & brands ready to scale", features: ["5 platforms managed", "30 posts/month", "AI content system setup", "Advanced analytics + competitor spy", "Weekly strategy calls", "Reel/TikTok scripting", "Priority WhatsApp support"], popular: true, cta: "Start Growing" },
    { id: 3, name: "Empire", price: "$1,997", period: "/mo", desc: "Full-service for established brands & businesses", features: ["Unlimited platforms", "Unlimited content", "Custom AI pipeline", "Influencer outreach", "Monthly brand photoshoot direction", "Ad management ($2K+ budget)", "Dedicated account manager", "24/7 priority support"], popular: false, cta: "Build Empire" },
  ],
  faqs: [
    { id: 1, q: "How fast will I see results?", a: "Most clients see measurable growth within the first 30 days. Significant milestones (10K+ followers, viral content) typically happen within 60-90 days depending on your niche and starting point." },
    { id: 2, q: "Do you work with any niche?", a: "We specialize in lifestyle, fitness, food, fashion, tech, and local businesses. If you're unsure, book a free discovery call and we'll tell you honestly if we can 10x your growth." },
    { id: 3, q: "What makes you different from other agencies?", a: "We combine human creativity with AI efficiency — meaning faster content, smarter strategy, and results that actually compound over time. Plus, we treat every client like our only client." },
    { id: 4, q: "Is there a contract?", a: "No lock-in contracts. We work month-to-month because we're confident in our results. Most clients stay 12+ months because they simply don't want to leave." },
    { id: 5, q: "Do I keep ownership of my accounts?", a: "Always. We never ask for ownership or admin access. You stay in full control — we just do all the heavy lifting." },
    { id: 6, q: "How do I get started?", a: "Click any 'Get Started' button or message us on WhatsApp. We'll schedule a free 30-min strategy call to map out your growth plan before you spend a cent." },
  ],
  contacts: [],
};

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────
const STORAGE_KEY = "komin_digi_data";
const AUTH_KEY = "komin_admin_auth";
const ADMIN_PASS = "komin2024admin";

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...DEFAULT_DATA, ...JSON.parse(saved) };
  } catch {}
  return DEFAULT_DATA;
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ─── GRADIENT PLACEHOLDERS ───────────────────────────────────────────────────
const GRADIENTS = {
  gradient1: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  gradient2: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  gradient3: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  gradient4: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  gradient5: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  gradient6: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
};

// ─── ICONS ────────────────────────────────────────────────────────────────────
const WA = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" width="16" height="16">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(loadData);
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === "1");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const updateData = useCallback((updater) => {
    setData(prev => {
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      saveData(next);
      return next;
    });
  }, []);

  const ac = data.branding.accentColor;
  const sc = data.branding.secondaryColor;
  const bg = data.branding.darkBg;

  // Scroll observer
  useEffect(() => {
    const sections = ["home","about","services","portfolio","testimonials","results","pricing","faq","contact"];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.3 });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Work" },
    { id: "results", label: "Results" },
    { id: "pricing", label: "Pricing" },
    { id: "contact", label: "Contact" },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior: smooth; }
    body { font-family:'DM Sans',sans-serif; background:${bg}; color:#f0f0f0; overflow-x:hidden; }
    h1,h2,h3,h4 { font-family:'Syne',sans-serif; }
    ::-webkit-scrollbar { width:5px; }
    ::-webkit-scrollbar-track { background:${bg}; }
    ::-webkit-scrollbar-thumb { background:${ac}44; border-radius:99px; }
    .noise { position:fixed; inset:0; pointer-events:none; z-index:0; opacity:.025;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
    .glow { box-shadow: 0 0 40px ${ac}33; }
    .glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08); }
    .btn-primary { background:${ac}; color:#000; font-family:'Syne',sans-serif; font-weight:700; padding:14px 28px; border-radius:8px; border:none; cursor:pointer; transition:all 0.2s; font-size:15px; display:inline-flex; align-items:center; gap:8px; }
    .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 30px ${ac}55; }
    .btn-outline { background:transparent; color:${ac}; font-family:'Syne',sans-serif; font-weight:700; padding:14px 28px; border-radius:8px; border:2px solid ${ac}44; cursor:pointer; transition:all 0.2s; font-size:15px; display:inline-flex; align-items:center; gap:8px; }
    .btn-outline:hover { border-color:${ac}; background:${ac}11; transform:translateY(-2px); }
    .section-label { font-size:12px; font-weight:600; letter-spacing:3px; text-transform:uppercase; color:${ac}; margin-bottom:12px; }
    .section-title { font-size:clamp(28px,4vw,48px); font-weight:800; line-height:1.1; margin-bottom:16px; }
    .tag { display:inline-block; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; padding:4px 10px; border-radius:99px; background:${ac}22; color:${ac}; border:1px solid ${ac}33; }
    .fade-in { animation: fadeUp 0.6s ease forwards; opacity:0; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
    @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.5; } }
    @keyframes spin { to { transform:rotate(360deg); } }
    .float { animation: float 4s ease-in-out infinite; }
    input, textarea, select { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); color:#f0f0f0; padding:12px 16px; border-radius:8px; font-family:'DM Sans',sans-serif; font-size:14px; width:100%; outline:none; transition:border 0.2s; }
    input:focus, textarea:focus { border-color:${ac}88; }
    input::placeholder, textarea::placeholder { color:rgba(255,255,255,0.3); }
    label { font-size:13px; color:rgba(255,255,255,0.6); display:block; margin-bottom:6px; }
    @media(max-width:768px) { .hide-mobile { display:none!important; } }
    @media(min-width:769px) { .hide-desktop { display:none!important; } }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="noise" />

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"0 24px", height:64,
        background:"rgba(8,11,20,0.85)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.06)",
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={() => scrollTo("home")}>
          {data.branding.logo
            ? <img src={data.branding.logo} alt="logo" style={{ height:32, borderRadius:6 }} />
            : <div style={{ width:32, height:32, borderRadius:8, background:`linear-gradient(135deg, ${ac}, ${sc})`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:900, color:"#000",
                fontFamily:"Syne,sans-serif" }}>K</div>}
          <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:18, color:"#fff" }}>
            {data.branding.name}
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hide-mobile" style={{ display:"flex", gap:4 }}>
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
              background:"none", border:"none", color: activeSection===l.id ? ac : "rgba(255,255,255,0.6)",
              cursor:"pointer", padding:"8px 14px", borderRadius:6, fontFamily:"DM Sans,sans-serif",
              fontSize:14, transition:"color 0.2s", fontWeight: activeSection===l.id ? 600 : 400 }}>
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <a href={data.branding.whatsapp} target="_blank" rel="noreferrer" className="btn-primary"
            style={{ padding:"10px 18px", fontSize:14 }}>
            <WA /> Chat Now
          </a>
          <button onClick={() => setAdminOpen(true)} style={{ background:"none", border:"1px solid rgba(255,255,255,0.1)",
            color:"rgba(255,255,255,0.4)", padding:"8px 14px", borderRadius:6, cursor:"pointer", fontSize:13 }}>
            ⚙
          </button>
          <button className="hide-desktop" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background:"none", border:"none", color:"#fff", fontSize:22, cursor:"pointer" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:99, background:"rgba(8,11,20,0.97)",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:24 }}>
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
              background:"none", border:"none", color:"#fff", fontSize:24, fontFamily:"Syne,sans-serif",
              fontWeight:700, cursor:"pointer" }}>{l.label}</button>
          ))}
        </div>
      )}

      {/* SECTIONS */}
      <HeroSection data={data} ac={ac} sc={sc} scrollTo={scrollTo} />
      <AboutSection data={data} ac={ac} sc={sc} />
      <ServicesSection data={data} ac={ac} />
      <PortfolioSection data={data} ac={ac} />
      <TestimonialsSection data={data} ac={ac} />
      <CaseStudiesSection data={data} ac={ac} sc={sc} />
      <PricingSection data={data} ac={ac} sc={sc} />
      <FAQSection data={data} ac={ac} />
      <CTASection data={data} ac={ac} sc={sc} scrollTo={scrollTo} />
      <ContactSection data={data} ac={ac} updateData={updateData} />
      <Footer data={data} ac={ac} scrollTo={scrollTo} navLinks={navLinks} />

      {/* WhatsApp Float */}
      <a href={data.branding.whatsapp} target="_blank" rel="noreferrer"
        style={{ position:"fixed", bottom:28, right:28, zIndex:200, background:"#25D366",
          color:"#fff", width:56, height:56, borderRadius:"50%", display:"flex", alignItems:"center",
          justifyContent:"center", boxShadow:"0 4px 20px #25D36666", transition:"transform 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.transform="scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
        <WA />
      </a>

      {/* Admin Panel */}
      {adminOpen && (
        <AdminPanel data={data} updateData={updateData} onClose={() => setAdminOpen(false)}
          isAuthed={isAuthed} setIsAuthed={setIsAuthed} ac={ac} />
      )}
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection({ data, ac, sc, scrollTo }) {
  const { hero, branding } = data;
  return (
    <section id="home" style={{ minHeight:"100vh", display:"flex", alignItems:"center",
      position:"relative", overflow:"hidden", paddingTop:64 }}>
      {/* BG orbs */}
      <div style={{ position:"absolute", top:"10%", right:"5%", width:400, height:400, borderRadius:"50%",
        background:`radial-gradient(circle, ${ac}22 0%, transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"10%", left:"-5%", width:300, height:300, borderRadius:"50%",
        background:`radial-gradient(circle, ${sc}22 0%, transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,.02) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,.02) 60px)`, pointerEvents:"none" }} />

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"80px 24px", position:"relative", zIndex:1, width:"100%" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:`${ac}15`, border:`1px solid ${ac}33`,
          padding:"8px 16px", borderRadius:99, marginBottom:32, fontSize:14, color:ac, fontWeight:600 }}>
          <span style={{ width:8, height:8, background:ac, borderRadius:"50%", animation:"pulse 2s infinite" }} />
          {hero.badge}
        </div>

        <h1 style={{ fontSize:"clamp(40px,7vw,88px)", fontWeight:900, lineHeight:1.0, letterSpacing:"-2px",
          color:"#fff", marginBottom:8, fontFamily:"Syne,sans-serif" }}>
          {hero.headline}
        </h1>
        <h1 style={{ fontSize:"clamp(40px,7vw,88px)", fontWeight:900, lineHeight:1.0, letterSpacing:"-2px",
          marginBottom:28, fontFamily:"Syne,sans-serif",
          background:`linear-gradient(90deg, ${ac}, ${sc})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          {hero.headline2}
        </h1>

        <p style={{ fontSize:"clamp(16px,2vw,20px)", color:"rgba(255,255,255,0.6)", maxWidth:580, lineHeight:1.7, marginBottom:40 }}>
          {hero.subheadline}
        </p>

        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ fontSize:16, padding:"16px 32px" }}>
            {hero.cta1} →
          </button>
          <button className="btn-outline" onClick={() => scrollTo("portfolio")} style={{ fontSize:16, padding:"16px 32px" }}>
            {hero.cta2}
          </button>
        </div>

        <div style={{ marginTop:64, display:"flex", gap:40, flexWrap:"wrap" }}>
          {data.about.stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize:"clamp(24px,3vw,36px)", fontWeight:800, fontFamily:"Syne,sans-serif", color:ac }}>
                {s.value}
              </div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function AboutSection({ data, ac, sc }) {
  const { about } = data;
  const usps = [
    { icon:"⚡", title: about.usp1, desc: about.usp1desc },
    { icon:"📊", title: about.usp2, desc: about.usp2desc },
    { icon:"🎨", title: about.usp3, desc: about.usp3desc },
  ];
  return (
    <section id="about" style={{ padding:"100px 24px", maxWidth:1100, margin:"0 auto" }}>
      <div className="section-label">Our Story</div>
      <h2 className="section-title">{about.title}</h2>
      <p style={{ color:"rgba(255,255,255,0.6)", maxWidth:640, fontSize:17, lineHeight:1.8, marginBottom:56 }}>
        {about.story}
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
        {usps.map((u, i) => (
          <div key={i} className="glass" style={{ padding:28, borderRadius:16, transition:"transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform="translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform="none"}>
            <div style={{ fontSize:32, marginBottom:16 }}>{u.icon}</div>
            <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:18, marginBottom:8 }}>{u.title}</div>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:14, lineHeight:1.7 }}>{u.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function ServicesSection({ data, ac }) {
  return (
    <section id="services" style={{ padding:"100px 24px", background:"rgba(255,255,255,0.02)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="section-label">What We Do</div>
        <h2 className="section-title">Services Built to Scale</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20, marginTop:48 }}>
          {data.services.map(s => (
            <div key={s.id} className="glass" style={{ padding:32, borderRadius:16, position:"relative",
              transition:"all 0.25s", cursor:"default" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.borderColor=`${ac}44`; }}
              onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; }}>
              {s.tag && <span className="tag" style={{ position:"absolute", top:20, right:20 }}>{s.tag}</span>}
              <div style={{ fontSize:36, marginBottom:20 }}>{s.icon}</div>
              <h3 style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:20, marginBottom:10 }}>{s.title}</h3>
              <p style={{ color:"rgba(255,255,255,0.55)", fontSize:14, lineHeight:1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PORTFOLIO ────────────────────────────────────────────────────────────────
function PortfolioSection({ data, ac }) {
  return (
    <section id="portfolio" style={{ padding:"100px 24px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="section-label">Our Work</div>
        <h2 className="section-title">Results That Speak</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20, marginTop:48 }}>
          {data.portfolio.map(p => (
            <div key={p.id} style={{ borderRadius:16, overflow:"hidden", position:"relative",
              aspectRatio:"4/3", cursor:"pointer", transition:"transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform="scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform="none"}>
              {p.url
                ? p.type === "video"
                  ? <video src={p.url} style={{ width:"100%", height:"100%", objectFit:"cover" }} muted loop />
                  : <img src={p.url} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} loading="lazy" />
                : <div style={{ width:"100%", height:"100%", background: GRADIENTS[p.placeholder] || GRADIENTS.gradient1 }} />
              }
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:20 }}>
                <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:16 }}>{p.title}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", marginTop:4 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function TestimonialsSection({ data, ac }) {
  return (
    <section id="testimonials" style={{ padding:"100px 24px", background:"rgba(255,255,255,0.02)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="section-label">Social Proof</div>
        <h2 className="section-title">What Our Clients Say</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20, marginTop:48 }}>
          {data.testimonials.map(t => (
            <div key={t.id} className="glass" style={{ padding:28, borderRadius:16 }}>
              <div style={{ display:"flex", gap:3, color:ac, marginBottom:16 }}>
                {[...Array(5)].map((_,i) => <StarIcon key={i} filled={i < t.stars} />)}
              </div>
              <p style={{ color:"rgba(255,255,255,0.75)", fontSize:15, lineHeight:1.75, marginBottom:20, fontStyle:"italic" }}>
                "{t.text}"
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:`linear-gradient(135deg, ${ac}, #7B5EA7)`,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:"#000", flexShrink:0 }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:14 }}>{t.name}</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>{t.handle} · {t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDIES ─────────────────────────────────────────────────────────────
function CaseStudiesSection({ data, ac, sc }) {
  return (
    <section id="results" style={{ padding:"100px 24px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="section-label">Proven Results</div>
        <h2 className="section-title">Case Studies</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:24, marginTop:48 }}>
          {data.caseStudies.map(c => (
            <div key={c.id} className="glass" style={{ padding:32, borderRadius:16, position:"relative" }}>
              <span className="tag" style={{ marginBottom:20, display:"inline-block" }}>{c.tag}</span>
              <h3 style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:22, marginBottom:24 }}>{c.client}</h3>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
                <div style={{ background:"rgba(255,0,0,0.08)", border:"1px solid rgba(255,80,80,0.2)", padding:16, borderRadius:10 }}>
                  <div style={{ fontSize:11, color:"rgba(255,100,100,0.8)", textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Before</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)" }}>{c.before}</div>
                </div>
                <div style={{ background:`${ac}0D`, border:`1px solid ${ac}33`, padding:16, borderRadius:10 }}>
                  <div style={{ fontSize:11, color:ac, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>After</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)" }}>{c.after}</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:16 }}>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)" }}>⏱ {c.time}</div>
                <div style={{ fontSize:13, color:ac, fontWeight:600 }}>💰 {c.revenue}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────────
function PricingSection({ data, ac, sc }) {
  return (
    <section id="pricing" style={{ padding:"100px 24px", background:"rgba(255,255,255,0.02)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="section-label">Investment</div>
        <h2 className="section-title">Choose Your Growth Plan</h2>
        <p style={{ color:"rgba(255,255,255,0.5)", marginBottom:48, marginTop:8 }}>No contracts. Cancel anytime. Real results guaranteed.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
          {data.pricing.map(p => (
            <div key={p.id} className={p.popular ? "glow" : ""} style={{
              padding:32, borderRadius:16, position:"relative",
              background: p.popular ? `linear-gradient(145deg, ${ac}18, ${sc}18)` : "rgba(255,255,255,0.04)",
              border: p.popular ? `1px solid ${ac}44` : "1px solid rgba(255,255,255,0.08)",
              transform: p.popular ? "scale(1.03)" : "none" }}>
              {p.popular && (
                <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)",
                  background:`linear-gradient(90deg, ${ac}, ${sc})`, color:"#000", padding:"5px 18px",
                  borderRadius:99, fontSize:12, fontWeight:800, fontFamily:"Syne,sans-serif", whiteSpace:"nowrap" }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:22, marginBottom:4 }}>{p.name}</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:20 }}>{p.desc}</div>
              <div style={{ fontFamily:"Syne,sans-serif", fontWeight:900, fontSize:40, marginBottom:4, color:p.popular?ac:"#fff" }}>
                {p.price}<span style={{ fontSize:16, fontWeight:400, color:"rgba(255,255,255,0.4)" }}>{p.period}</span>
              </div>
              <div style={{ height:1, background:"rgba(255,255,255,0.08)", margin:"20px 0" }} />
              <ul style={{ listStyle:"none", marginBottom:28 }}>
                {p.features.map((f, i) => (
                  <li key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:10,
                    fontSize:14, color:"rgba(255,255,255,0.7)" }}>
                    <span style={{ color:ac, marginTop:1, flexShrink:0 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className={p.popular ? "btn-primary" : "btn-outline"} style={{ width:"100%", justifyContent:"center" }}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQSection({ data, ac }) {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding:"100px 24px" }}>
      <div style={{ maxWidth:720, margin:"0 auto" }}>
        <div className="section-label">FAQ</div>
        <h2 className="section-title">Got Questions?</h2>
        <div style={{ marginTop:48 }}>
          {data.faqs.map((f) => (
            <div key={f.id} style={{ borderBottom:"1px solid rgba(255,255,255,0.08)", padding:"20px 0" }}>
              <button onClick={() => setOpen(open===f.id ? null : f.id)} style={{
                width:"100%", background:"none", border:"none", color:"#fff", cursor:"pointer",
                display:"flex", justifyContent:"space-between", alignItems:"center", gap:16,
                fontFamily:"Syne,sans-serif", fontWeight:600, fontSize:16, textAlign:"left" }}>
                {f.q}
                <span style={{ color:ac, fontSize:22, transform: open===f.id ? "rotate(45deg)" : "none", transition:"transform 0.2s", flexShrink:0 }}>+</span>
              </button>
              {open === f.id && (
                <p style={{ color:"rgba(255,255,255,0.6)", fontSize:15, lineHeight:1.8, marginTop:12, paddingRight:32 }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ──────────────────────────────────────────────────────────────
function CTASection({ data, ac, sc, scrollTo }) {
  return (
    <section style={{ padding:"100px 24px", background:`linear-gradient(135deg, ${ac}0D, ${sc}0D)`, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
        width:600, height:600, borderRadius:"50%", background:`radial-gradient(circle, ${ac}15 0%, transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <div className="section-label" style={{ textAlign:"center" }}>Ready?</div>
        <h2 style={{ fontFamily:"Syne,sans-serif", fontWeight:900, fontSize:"clamp(32px,5vw,60px)", lineHeight:1.1, marginBottom:20 }}>
          Stop Scrolling. <br />
          <span style={{ background:`linear-gradient(90deg, ${ac}, ${sc})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Start Growing.
          </span>
        </h2>
        <p style={{ color:"rgba(255,255,255,0.6)", fontSize:17, lineHeight:1.8, marginBottom:40 }}>
          Book your free strategy call today. No commitment, just a clear roadmap to your next growth milestone.
        </p>
        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <a href={data.branding.whatsapp} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize:16, padding:"16px 32px" }}>
            <WA /> Message on WhatsApp
          </a>
          <button className="btn-outline" onClick={() => scrollTo("contact")} style={{ fontSize:16, padding:"16px 32px" }}>
            Send a Message
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function ContactSection({ data, ac, updateData }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", service:"", message:"" });
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!form.name || !form.email || !form.message) return alert("Please fill required fields.");
    const entry = { ...form, date: new Date().toISOString(), id: Date.now() };
    updateData(prev => ({ ...prev, contacts: [...(prev.contacts||[]), entry] }));
    setForm({ name:"", email:"", phone:"", service:"", message:"" });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" style={{ padding:"100px 24px", background:"rgba(255,255,255,0.02)" }}>
      <div style={{ maxWidth:640, margin:"0 auto" }}>
        <div className="section-label">Get In Touch</div>
        <h2 className="section-title">Let's Build Something Great</h2>
        <p style={{ color:"rgba(255,255,255,0.5)", marginBottom:40, marginTop:8 }}>
          Fill out the form and we'll get back to you within 24 hours. Or just WhatsApp us for a faster response.
        </p>
        {sent ? (
          <div style={{ background:`${ac}15`, border:`1px solid ${ac}33`, padding:24, borderRadius:12, textAlign:"center", color:ac, fontWeight:700, fontSize:16 }}>
            ✅ Message received! We'll be in touch soon.
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div><label>Name *</label><input value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Your name" /></div>
              <div><label>Email *</label><input value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="your@email.com" /></div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div><label>Phone</label><input value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} placeholder="+1 234 567 890" /></div>
              <div><label>Service Interested In</label>
                <select value={form.service} onChange={e => setForm({...form, service:e.target.value})}>
                  <option value="">Select service</option>
                  {data.services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                </select>
              </div>
            </div>
            <div><label>Message *</label><textarea value={form.message} onChange={e => setForm({...form, message:e.target.value})} rows={5} placeholder="Tell us about your goals..." /></div>
            <button className="btn-primary" onClick={submit} style={{ alignSelf:"flex-start", fontSize:16, padding:"16px 32px" }}>
              Send Message →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ data, ac, scrollTo, navLinks }) {
  const { branding } = data;
  return (
    <footer style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"48px 24px 24px", background:"rgba(0,0,0,0.3)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:40, marginBottom:48 }}>
          <div>
            <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:22, marginBottom:12 }}>
              {branding.name}
            </div>
            <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14, lineHeight:1.7 }}>
              Social Media & AI Agency.<br />We build brands that can't be ignored.
            </p>
          </div>
          <div>
            <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, marginBottom:16, fontSize:14 }}>Navigation</div>
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{ display:"block", background:"none", border:"none",
                color:"rgba(255,255,255,0.4)", cursor:"pointer", fontSize:14, marginBottom:8, textAlign:"left", padding:0 }}>
                {l.label}
              </button>
            ))}
          </div>
          <div>
            <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, marginBottom:16, fontSize:14 }}>Contact</div>
            <div style={{ color:"rgba(255,255,255,0.4)", fontSize:14, lineHeight:2 }}>
              <div>{branding.email}</div>
              <a href={branding.whatsapp} target="_blank" rel="noreferrer" style={{ color:ac, textDecoration:"none" }}>WhatsApp</a>
              <div style={{ marginTop:4 }}>
                <a href={branding.instagram} target="_blank" rel="noreferrer" style={{ color:"rgba(255,255,255,0.4)", textDecoration:"none" }}>Instagram</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:24, display:"flex",
          justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div style={{ color:"rgba(255,255,255,0.3)", fontSize:13 }}>© 2024 {branding.name}. All rights reserved.</div>
          <div style={{ color:"rgba(255,255,255,0.3)", fontSize:13 }}>Built with ❤️ for growth</div>
        </div>
      </div>
    </footer>
  );
}

// ─── ADMIN PANEL ─────────────────────────────────────────────────────────────
function AdminPanel({ data, updateData, onClose, isAuthed, setIsAuthed, ac }) {
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("branding");
  const [loginErr, setLoginErr] = useState(false);

  const login = () => {
    if (pass === ADMIN_PASS) {
      setIsAuthed(true);
      sessionStorage.setItem(AUTH_KEY, "1");
    } else {
      setLoginErr(true);
      setTimeout(() => setLoginErr(false), 2000);
    }
  };

  const logout = () => {
    setIsAuthed(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  const tabs = [
    { id:"branding", label:"🎨 Branding" },
    { id:"hero", label:"🏠 Hero" },
    { id:"about", label:"👤 About" },
    { id:"services", label:"⚡ Services" },
    { id:"portfolio", label:"🖼 Portfolio" },
    { id:"testimonials", label:"⭐ Testimonials" },
    { id:"pricing", label:"💰 Pricing" },
    { id:"faqs", label:"❓ FAQs" },
    { id:"contacts", label:"📥 Submissions" },
  ];

  const panelStyle = {
    position:"fixed", inset:0, zIndex:1000, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(8px)",
    display:"flex", alignItems:"center", justifyContent:"center", padding:16,
  };

  const innerStyle = {
    background:"#0e1120", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16,
    width:"100%", maxWidth:900, maxHeight:"90vh", display:"flex", flexDirection:"column", overflow:"hidden",
  };

  if (!isAuthed) {
    return (
      <div style={panelStyle}>
        <div style={{ ...innerStyle, maxWidth:400, padding:40 }}>
          <h2 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:24, marginBottom:8 }}>Admin Login</h2>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14, marginBottom:28 }}>Enter password to access CMS</p>
          <label>Password</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key==="Enter" && login()} placeholder="••••••••"
            style={{ marginBottom:8, borderColor: loginErr ? "#ff4444" : undefined }} />
          {loginErr && <div style={{ color:"#ff4444", fontSize:13, marginBottom:12 }}>Incorrect password</div>}
          <div style={{ display:"flex", gap:12, marginTop:16 }}>
            <button className="btn-primary" onClick={login} style={{ flex:1, justifyContent:"center" }}>Login</button>
            <button className="btn-outline" onClick={onClose} style={{ flex:1, justifyContent:"center" }}>Cancel</button>
          </div>
          <p style={{ marginTop:16, color:"rgba(255,255,255,0.2)", fontSize:11, textAlign:"center" }}>Demo password: komin2024admin</p>
        </div>
      </div>
    );
  }

  return (
    <div style={panelStyle}>
      <div style={innerStyle}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"16px 24px", borderBottom:"1px solid rgba(255,255,255,0.08)", flexShrink:0 }}>
          <h2 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:18 }}>⚙ Admin Panel — {data.branding.name}</h2>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={logout} style={{ background:"none", border:"1px solid rgba(255,255,255,0.1)",
              color:"rgba(255,255,255,0.5)", padding:"6px 14px", borderRadius:6, cursor:"pointer", fontSize:13 }}>Logout</button>
            <button onClick={onClose} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.5)",
              fontSize:22, cursor:"pointer", lineHeight:1 }}>✕</button>
          </div>
        </div>

        <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
          {/* Sidebar */}
          <div style={{ width:180, borderRight:"1px solid rgba(255,255,255,0.06)", padding:"12px 8px",
            overflowY:"auto", flexShrink:0, background:"rgba(0,0,0,0.2)" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                display:"block", width:"100%", textAlign:"left", background: tab===t.id ? `${ac}18` : "none",
                border: tab===t.id ? `1px solid ${ac}33` : "1px solid transparent",
                color: tab===t.id ? ac : "rgba(255,255,255,0.5)", padding:"10px 12px", borderRadius:8,
                cursor:"pointer", fontSize:13, marginBottom:4, fontWeight: tab===t.id ? 600 : 400 }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex:1, overflowY:"auto", padding:24 }}>
            <AdminTabContent tab={tab} data={data} updateData={updateData} ac={ac} />
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminTabContent({ tab, data, updateData, ac }) {
  const Field = ({ label, path, type="text", multiline=false }) => {
    const keys = path.split(".");
    let val = data;
    keys.forEach(k => { val = val?.[k]; });

    const set = (v) => {
      updateData(prev => {
        const next = JSON.parse(JSON.stringify(prev));
        let obj = next;
        keys.slice(0,-1).forEach(k => { obj = obj[k]; });
        obj[keys[keys.length-1]] = v;
        return next;
      });
    };

    return (
      <div style={{ marginBottom:16 }}>
        <label>{label}</label>
        {multiline
          ? <textarea value={val||""} onChange={e => set(e.target.value)} rows={3} />
          : type==="color"
            ? <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <input type="color" value={val||"#000"} onChange={e => set(e.target.value)}
                  style={{ width:48, height:40, padding:4, cursor:"pointer" }} />
                <input value={val||""} onChange={e => set(e.target.value)} style={{ flex:1 }} />
              </div>
            : <input type={type} value={val||""} onChange={e => set(e.target.value)} />
        }
      </div>
    );
  };

  if (tab === "branding") return (
    <div>
      <h3 style={{ fontFamily:"Syne,sans-serif", fontWeight:700, marginBottom:24 }}>Branding & Settings</h3>
      <Field label="Business Name" path="branding.name" />
      <Field label="Tagline" path="branding.tagline" />
      <Field label="WhatsApp Link" path="branding.whatsapp" />
      <Field label="Instagram URL" path="branding.instagram" />
      <Field label="Email" path="branding.email" />
      <Field label="Accent Color" path="branding.accentColor" type="color" />
      <Field label="Secondary Color" path="branding.secondaryColor" type="color" />
      <Field label="Background Color" path="branding.darkBg" type="color" />
      <h4 style={{ fontFamily:"Syne,sans-serif", marginTop:24, marginBottom:16 }}>SEO Settings</h4>
      <Field label="Page Title" path="branding.seo.title" />
      <Field label="Meta Description" path="branding.seo.description" multiline />
      <Field label="Keywords" path="branding.seo.keywords" />
    </div>
  );

  if (tab === "hero") return (
    <div>
      <h3 style={{ fontFamily:"Syne,sans-serif", fontWeight:700, marginBottom:24 }}>Hero Section</h3>
      <Field label="Badge Text" path="hero.badge" />
      <Field label="Headline Line 1" path="hero.headline" />
      <Field label="Headline Line 2 (gradient)" path="hero.headline2" />
      <Field label="Subheadline" path="hero.subheadline" multiline />
      <Field label="CTA Button 1" path="hero.cta1" />
      <Field label="CTA Button 2" path="hero.cta2" />
    </div>
  );

  if (tab === "about") return (
    <div>
      <h3 style={{ fontFamily:"Syne,sans-serif", fontWeight:700, marginBottom:24 }}>About Section</h3>
      <Field label="Title" path="about.title" />
      <Field label="Story" path="about.story" multiline />
      <Field label="USP 1 Title" path="about.usp1" />
      <Field label="USP 1 Description" path="about.usp1desc" multiline />
      <Field label="USP 2 Title" path="about.usp2" />
      <Field label="USP 2 Description" path="about.usp2desc" multiline />
      <Field label="USP 3 Title" path="about.usp3" />
      <Field label="USP 3 Description" path="about.usp3desc" multiline />
      <h4 style={{ fontFamily:"Syne,sans-serif", marginTop:24, marginBottom:16 }}>Stats</h4>
      {data.about.stats.map((s, i) => (
        <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
          <div><label>Value {i+1}</label>
            <input value={s.value} onChange={e => {
              updateData(prev => { const next = JSON.parse(JSON.stringify(prev)); next.about.stats[i].value = e.target.value; return next; });
            }} /></div>
          <div><label>Label {i+1}</label>
            <input value={s.label} onChange={e => {
              updateData(prev => { const next = JSON.parse(JSON.stringify(prev)); next.about.stats[i].label = e.target.value; return next; });
            }} /></div>
        </div>
      ))}
    </div>
  );

  if (tab === "services") return (
    <ListEditor
      title="Services"
      items={data.services}
      setItems={items => updateData(prev => ({ ...prev, services: items }))}
      defaultItem={{ id: Date.now(), icon:"🔧", title:"New Service", desc:"Description here.", tag:"" }}
      fields={[
        { key:"icon", label:"Icon/Emoji" },
        { key:"title", label:"Title" },
        { key:"desc", label:"Description", multiline:true },
        { key:"tag", label:"Tag (optional)" },
      ]}
    />
  );

  if (tab === "portfolio") return (
    <ListEditor
      title="Portfolio Items"
      items={data.portfolio}
      setItems={items => updateData(prev => ({ ...prev, portfolio: items }))}
      defaultItem={{ id: Date.now(), title:"New Project", desc:"Description", url:"", type:"image", placeholder:"gradient1" }}
      fields={[
        { key:"title", label:"Title" },
        { key:"desc", label:"Description" },
        { key:"url", label:"Image/Video URL" },
        { key:"type", label:"Type (image/video)" },
      ]}
    />
  );

  if (tab === "testimonials") return (
    <ListEditor
      title="Testimonials"
      items={data.testimonials}
      setItems={items => updateData(prev => ({ ...prev, testimonials: items }))}
      defaultItem={{ id: Date.now(), name:"Client Name", handle:"@handle", role:"Role", text:"Testimonial text.", stars:5, avatar:"" }}
      fields={[
        { key:"name", label:"Name" },
        { key:"handle", label:"Handle" },
        { key:"role", label:"Role" },
        { key:"text", label:"Testimonial", multiline:true },
        { key:"stars", label:"Stars (1-5)" },
      ]}
    />
  );

  if (tab === "pricing") return (
    <ListEditor
      title="Pricing Plans"
      items={data.pricing}
      setItems={items => updateData(prev => ({ ...prev, pricing: items }))}
      defaultItem={{ id: Date.now(), name:"Plan", price:"$499", period:"/mo", desc:"", features:["Feature 1"], popular:false, cta:"Get Started" }}
      fields={[
        { key:"name", label:"Plan Name" },
        { key:"price", label:"Price" },
        { key:"period", label:"Period (/mo, /yr)" },
        { key:"desc", label:"Description" },
        { key:"cta", label:"Button Text" },
      ]}
      renderExtra={(item, onChange) => (
        <div style={{ marginBottom:16 }}>
          <label>Features (one per line)</label>
          <textarea value={(item.features||[]).join("\n")} rows={5}
            onChange={e => onChange({ ...item, features: e.target.value.split("\n").filter(Boolean) })} />
          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:8 }}>
            <input type="checkbox" checked={!!item.popular} onChange={e => onChange({ ...item, popular: e.target.checked })}
              style={{ width:"auto" }} />
            <label style={{ margin:0 }}>Mark as Popular</label>
          </div>
        </div>
      )}
    />
  );

  if (tab === "faqs") return (
    <ListEditor
      title="FAQs"
      items={data.faqs}
      setItems={items => updateData(prev => ({ ...prev, faqs: items }))}
      defaultItem={{ id: Date.now(), q:"New question?", a:"Answer here." }}
      fields={[
        { key:"q", label:"Question" },
        { key:"a", label:"Answer", multiline:true },
      ]}
    />
  );

  if (tab === "contacts") return (
    <div>
      <h3 style={{ fontFamily:"Syne,sans-serif", fontWeight:700, marginBottom:24 }}>
        Contact Submissions ({data.contacts?.length || 0})
      </h3>
      {!data.contacts?.length
        ? <div style={{ color:"rgba(255,255,255,0.4)", fontSize:15 }}>No submissions yet.</div>
        : data.contacts.map(c => (
          <div key={c.id} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:10, padding:20, marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <div style={{ fontWeight:700 }}>{c.name} — <span style={{ color:ac, fontSize:14 }}>{c.email}</span></div>
              <div style={{ color:"rgba(255,255,255,0.3)", fontSize:12 }}>{new Date(c.date).toLocaleDateString()}</div>
            </div>
            {c.phone && <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)" }}>📞 {c.phone}</div>}
            {c.service && <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)" }}>📦 {c.service}</div>}
            <div style={{ marginTop:8, fontSize:14, color:"rgba(255,255,255,0.7)" }}>{c.message}</div>
            <button onClick={() => updateData(prev => ({ ...prev, contacts: prev.contacts.filter(x => x.id !== c.id) }))}
              style={{ marginTop:8, background:"rgba(255,50,50,0.1)", border:"1px solid rgba(255,50,50,0.2)",
                color:"#ff6666", padding:"4px 10px", borderRadius:6, cursor:"pointer", fontSize:12 }}>
              Delete
            </button>
          </div>
        ))
      }
    </div>
  );

  return null;
}

function ListEditor({ title, items, setItems, defaultItem, fields, renderExtra }) {
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(null);

  const startEdit = (item) => { setEditing(item.id); setDraft({ ...item }); };
  const save = () => { setItems(items.map(i => i.id === draft.id ? draft : i)); setEditing(null); setDraft(null); };
  const remove = (id) => setItems(items.filter(i => i.id !== id));
  const add = () => { const n = { ...defaultItem, id: Date.now() }; setItems([...items, n]); startEdit(n); };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <h3 style={{ fontFamily:"Syne,sans-serif", fontWeight:700 }}>{title}</h3>
        <button className="btn-primary" onClick={add} style={{ padding:"8px 18px", fontSize:13 }}>+ Add</button>
      </div>
      {items.map(item => (
        <div key={item.id} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:10, marginBottom:12, overflow:"hidden" }}>
          {editing === item.id && draft ? (
            <div style={{ padding:16 }}>
              {fields.map(f => (
                <div key={f.key} style={{ marginBottom:12 }}>
                  <label>{f.label}</label>
                  {f.multiline
                    ? <textarea value={draft[f.key]||""} onChange={e => setDraft({...draft, [f.key]:e.target.value})} rows={3} />
                    : <input value={draft[f.key]||""} onChange={e => setDraft({...draft, [f.key]:e.target.value})} />
                  }
                </div>
              ))}
              {renderExtra && renderExtra(draft, setDraft)}
              <div style={{ display:"flex", gap:8 }}>
                <button className="btn-primary" onClick={save} style={{ padding:"8px 16px", fontSize:13 }}>Save</button>
                <button className="btn-outline" onClick={() => setEditing(null)} style={{ padding:"8px 16px", fontSize:13 }}>Cancel</button>
              </div>
            </div>
          ) : (
            <div style={{ padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontSize:14, fontWeight:600 }}>
                {item.icon && <span style={{ marginRight:8 }}>{item.icon}</span>}
                {item.title || item.name || item.q || item.client || `Item ${item.id}`}
              </div>
              <div style={{ display:"flex", gap:6 }}>
                <button onClick={() => startEdit(item)} style={{ background:"rgba(255,255,255,0.08)", border:"none",
                  color:"#fff", padding:"5px 12px", borderRadius:6, cursor:"pointer", fontSize:12 }}>Edit</button>
                <button onClick={() => remove(item.id)} style={{ background:"rgba(255,50,50,0.1)", border:"none",
                  color:"#ff6666", padding:"5px 12px", borderRadius:6, cursor:"pointer", fontSize:12 }}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
