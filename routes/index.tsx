import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Camera, ShoppingBag, Cloud, Sparkles, Mic, ShieldCheck,
  Cpu, Leaf, MapPin, TrendingUp, Award, Sprout, Users, Bot,
  Droplets, Sun, BadgeIndianRupee, ChevronRight, Star,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { tickerPrices, weather, schemes, stories, sampleDisease } from "@/mocks/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriOS AI — From Seed to Sale | Smart Agri OS" },
      { name: "description", content: "AI-powered crop disease detection, fair marketplaces, government schemes, weather alerts and expert advice — built for India's 14 crore farmers." },
      { property: "og:title", content: "AgriOS AI — From Seed to Sale" },
      { property: "og:description", content: "Crop intelligence + marketplace + schemes + expert advice in one app for Indian farmers." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PublicLayout>
      <Hero />
      <PriceTicker />
      <FeatureGrid />
      <AIPreview />
      <WeatherAndSchemes />
      <Stories />
      <Stats />
      <FAQ />
      <CTA />
    </PublicLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-20 -right-40 h-96 w-96 rounded-full bg-info/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
            <Sparkles className="h-3 w-3 mr-1" /> India's first farmer-first AI agri OS
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            From <span className="text-primary">Seed</span> to <span className="text-soil">Sale</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-leaf to-info bg-clip-text text-transparent">
              AI-Powered Smart Farming
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl">
            AgriOS AI helps Indian farmers grow more, earn more, and worry less — with crop intelligence,
            fair markets, government schemes and expert advice, all in one app. Hindi, English &amp; 8 regional languages.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-glow h-12 text-base">
              <Link to="/signup">Get started free <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 text-base">
              <Link to="/marketplace"><ShoppingBag className="mr-2 h-4 w-4" />Explore marketplace</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="h-12 text-base">
              <Link to="/farmer/crop-scanner"><Camera className="mr-2 h-4 w-4" />Scan crop disease</Link>
            </Button>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-success" /> Verified mandis &amp; sellers</div>
            <div className="flex items-center gap-1.5"><Award className="h-4 w-4 text-warning" /> 12L+ farmers onboarded</div>
            <div className="flex items-center gap-1.5"><Mic className="h-4 w-4 text-info" /> Voice in हिंदी, मराठी, తెలుగు</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="relative grid grid-cols-2 gap-3">
            <Card className="p-4 shadow-elevated col-span-2 bg-card/95 backdrop-blur">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 grid place-items-center">
                    <Cpu className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">AI Crop Health · Field A-2</div>
                    <div className="font-semibold text-sm">Wheat — Tillering stage</div>
                  </div>
                </div>
                <Badge className="bg-success/10 text-success border-success/20">Healthy 86%</Badge>
              </div>
              <div className="h-24 rounded-lg bg-gradient-to-br from-primary/20 via-leaf/20 to-info/20 grid place-items-center text-5xl">🌾</div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[
                  { l: "Soil", v: "Good", icon: Leaf },
                  { l: "Water", v: "OK", icon: Droplets },
                  { l: "Sun", v: "8h", icon: Sun },
                ].map((m) => (
                  <div key={m.l} className="rounded-lg bg-muted py-2">
                    <m.icon className="h-3.5 w-3.5 mx-auto text-muted-foreground" />
                    <div className="text-[10px] text-muted-foreground mt-0.5">{m.l}</div>
                    <div className="text-xs font-semibold">{m.v}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 shadow-card bg-gradient-sky text-sky-foreground">
              <Cloud className="h-5 w-5 mb-2" />
              <div className="text-xs opacity-80">Karnal, HR · Today</div>
              <div className="text-3xl font-bold mt-1">31°</div>
              <div className="text-xs mt-0.5">Sunny · 0mm rain</div>
            </Card>

            <Card className="p-4 shadow-card">
              <BadgeIndianRupee className="h-5 w-5 mb-2 text-success" />
              <div className="text-xs text-muted-foreground">Wheat (Karnal mandi)</div>
              <div className="text-2xl font-bold mt-1">₹2,275<span className="text-xs text-muted-foreground">/qtl</span></div>
              <div className="text-xs text-success flex items-center gap-1 mt-0.5"><TrendingUp className="h-3 w-3" />+0.3% today</div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PriceTicker() {
  const items = [...tickerPrices, ...tickerPrices];
  return (
    <section className="border-y border-border bg-card/40 overflow-hidden">
      <div className="flex items-center">
        <div className="shrink-0 px-4 py-3 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
          Live Mandi
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex ticker whitespace-nowrap py-3">
            {items.map((p, i) => (
              <div key={i} className="flex items-center gap-2 px-6 text-sm">
                <span className="font-medium">{p.crop}</span>
                <span className="text-muted-foreground text-xs">@ {p.mandi}</span>
                <span className="font-bold">₹{p.price.toLocaleString()}</span>
                <span className={`text-xs ${p.change > 0 ? "text-success" : p.change < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                  {p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—"} {Math.abs(p.change)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  const features = [
    { icon: Camera, title: "AI Crop Disease Scan", desc: "Snap a leaf photo. Get diagnosis + treatment in 5 seconds.", tone: "primary" },
    { icon: TrendingUp, title: "Price Forecast", desc: "Sell or wait? AI predicts mandi prices 6 weeks ahead.", tone: "info" },
    { icon: Cloud, title: "Hyperlocal Weather", desc: "Block-level rain alerts, irrigation timing, frost warnings.", tone: "sky" },
    { icon: BadgeIndianRupee, title: "Govt Schemes", desc: "PM-KISAN, PMFBY, KCC — eligibility check + apply in-app.", tone: "warning" },
    { icon: ShoppingBag, title: "Fair Marketplace", desc: "Sell directly to verified buyers. Skip middlemen.", tone: "leaf" },
    { icon: Bot, title: "Voice AI Assistant", desc: "Ask in Hindi, Marathi, Tamil — get answers spoken back.", tone: "soil" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <Badge variant="secondary" className="mb-3">Everything a farmer needs</Badge>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">A complete operating system for your farm</h2>
        <p className="text-muted-foreground mt-3">From sowing decisions to selling your harvest — AgriOS handles every step with AI you can trust.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card className="p-6 h-full hover:shadow-elevated transition-all hover:-translate-y-0.5 group">
              <div className={`h-12 w-12 rounded-xl grid place-items-center mb-4 group-hover:scale-110 transition-transform ${
                f.tone === "primary" ? "bg-primary/10 text-primary" :
                f.tone === "info" ? "bg-info/10 text-info" :
                f.tone === "sky" ? "bg-sky/15 text-sky-foreground" :
                f.tone === "warning" ? "bg-warning/15 text-warning" :
                f.tone === "leaf" ? "bg-leaf/10 text-leaf" :
                "bg-soil/15 text-soil"
              }`}>
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5">{f.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AIPreview() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <Badge variant="secondary" className="mb-3"><Sparkles className="h-3 w-3 mr-1" /> Live AI demo</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Catch disease before it spreads</h2>
          <p className="text-muted-foreground mt-3 max-w-lg">
            Our crop vision AI is trained on 2.4M Indian field images across 47 crops and 180+ diseases.
            Upload a leaf photo and get a diagnosis — with treatment, organic alternatives and an expert escalation in one tap.
          </p>
          <ul className="mt-5 space-y-2.5">
            {[
              "Works offline — process on your phone",
              "180+ diseases · 47 crops · 12 languages",
              "Expert review available within 24 hours",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <div className="h-5 w-5 rounded-full bg-success/15 grid place-items-center"><span className="text-success text-xs">✓</span></div>
                {t}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-7 bg-gradient-primary text-primary-foreground">
            <Link to="/farmer/crop-scanner">Try the scanner <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <Card className="p-6 shadow-elevated">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center">
              <Camera className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Diagnosis result</div>
              <div className="font-semibold">{sampleDisease.name}</div>
            </div>
            <Badge className="ml-auto bg-warning/15 text-warning border-warning/30">{sampleDisease.severity}</Badge>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-leaf/20 to-warning/15 h-40 grid place-items-center text-7xl mb-4">🍅</div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Confidence</span>
            <span className="text-sm font-bold text-primary">{sampleDisease.confidence}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-primary" style={{ width: `${sampleDisease.confidence}%` }} />
          </div>

          <div className="mt-4 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Treatment plan</div>
            {sampleDisease.treatment.map((t, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="text-primary">{i + 1}.</span> {t}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function WeatherAndSchemes() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-sky text-sky-foreground shadow-card overflow-hidden relative">
          <div className="absolute -right-10 -top-10 text-9xl opacity-20">☀️</div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs opacity-80">Weather Intelligence</div>
                <div className="text-xl font-bold">Karnal, Haryana</div>
              </div>
              <Badge className="bg-card/30 text-sky-foreground border-card/40 backdrop-blur">Hyperlocal</Badge>
            </div>
            <div className="grid grid-cols-7 gap-2 mt-4">
              {weather.map((d) => (
                <div key={d.day} className="rounded-lg bg-card/20 backdrop-blur p-2 text-center">
                  <div className="text-[10px] opacity-80">{d.day}</div>
                  <div className="text-xl my-0.5">{d.emoji}</div>
                  <div className="text-xs font-bold">{d.temp}°</div>
                  <div className="text-[10px] opacity-70">{d.rain}mm</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-warning/20 backdrop-blur px-3 py-2 text-sm">
              <span className="text-lg">⚠️</span> Storm warning Thu 4 AM — cover seedlings, delay spraying.
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Government Schemes</div>
              <div className="text-xl font-bold">You may be eligible</div>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/schemes">View all <ChevronRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="space-y-3">
            {schemes.slice(0, 3).map((s) => (
              <div key={s.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                  <BadgeIndianRupee className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.benefit}</div>
                </div>
                <Badge variant="outline" className="text-[10px]">{s.tag}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <Badge variant="secondary" className="mb-3">Farmer stories</Badge>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Real farmers. Real impact.</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {stories.map((s, i) => (
          <motion.div key={s.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 h-full hover:shadow-elevated transition-shadow">
              <div className="text-5xl mb-3">{s.emoji}</div>
              <p className="text-sm leading-relaxed">"{s.quote}"</p>
              <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">{s.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{s.village}</div>
                </div>
                <Badge className="bg-success/10 text-success border-success/20">{s.metric}</Badge>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "12L+", l: "Farmers onboarded", icon: Users },
    { v: "₹1,842cr", l: "GMV processed", icon: BadgeIndianRupee },
    { v: "47", l: "Crops supported", icon: Sprout },
    { v: "28", l: "States covered", icon: MapPin },
  ];
  return (
    <section className="bg-gradient-to-br from-primary/95 to-leaf text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <s.icon className="h-6 w-6 mx-auto mb-2 opacity-80" />
            <div className="text-3xl lg:text-4xl font-bold">{s.v}</div>
            <div className="text-sm opacity-90 mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is AgriOS AI free for farmers?", a: "Yes. All farmer features — disease scan, weather, mandi prices, scheme assistant — are free forever. We earn a small commission on optional marketplace transactions." },
    { q: "Does it work without internet?", a: "Yes. Crop disease scanning, expense tracker, crop calendar and the offline knowledge base work without internet. Data syncs when you reconnect." },
    { q: "Which languages are supported?", a: "Hindi, English, Marathi, Tamil, Telugu, Kannada, Bengali, Punjabi, Gujarati, Odia. Voice assistant supports all 10." },
    { q: "How accurate is the disease scanner?", a: "94.2% top-1 accuracy across 180+ diseases on independent test data. Every diagnosis can be reviewed by a verified expert within 24 hours, free." },
    { q: "Can buyers and FPOs use this too?", a: "Yes. Separate buyer, seller, expert and admin consoles. Verified buyers get direct access to thousands of farmers across 28 states." },
  ];
  return (
    <section className="max-w-3xl mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-3">FAQ</Badge>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Frequently asked questions</h2>
      </div>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`f${i}`} className="border border-border rounded-xl px-4 bg-card">
            <AccordionTrigger className="text-left hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-20">
      <Card className="p-8 lg:p-12 bg-gradient-primary text-primary-foreground shadow-elevated relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary-foreground/10 blur-2xl" />
        <div className="relative grid lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to grow smarter?</h2>
            <p className="opacity-90 mt-2 text-lg">Join 12 lakh farmers already using AgriOS AI to make better decisions every day.</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
            <Button asChild size="lg" variant="secondary" className="h-12 text-base">
              <Link to="/signup">Sign up free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/marketplace">Browse marketplace</Link>
            </Button>
          </div>
        </div>
        <div className="relative mt-6 flex items-center gap-1 text-sm">
          {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
          <span className="ml-2 opacity-90">4.8/5 · 2.1L+ farmer reviews on Play Store</span>
        </div>
      </Card>
    </section>
  );
}
