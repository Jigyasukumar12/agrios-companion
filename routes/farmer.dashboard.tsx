import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Camera, FlaskConical, CalendarRange, CloudSun, Droplets, Sprout,
  BadgeIndianRupee, ShieldCheck, ShoppingBag, Store, TrendingUp, MapPin, Wallet,
  PiggyBank, Leaf, Calendar, Users, MessageSquareWarning, Bell, Settings, Home,
  Sun, Cloud, AlertTriangle, ArrowUpRight, ChevronRight,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { crops, weather, mandis, notifications, yieldForecast, priceForecast, expenses } from "@/mocks/data";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from "recharts";

export const Route = createFileRoute("/farmer/dashboard")({
  head: () => ({ meta: [{ title: "Farmer Dashboard | AgriOS AI" }] }),
  component: FarmerDashboard,
});

const sidebar = [
  { to: "/farmer/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/farmer/crop-scanner", label: "AI Crop Scanner", icon: Camera, badge: "AI" },
  { to: "/farmer/soil", label: "Soil Health", icon: FlaskConical },
  { to: "/farmer/planner", label: "Crop Planner", icon: CalendarRange },
  { to: "/farmer/weather", label: "Weather", icon: CloudSun },
  { to: "/farmer/irrigation", label: "Irrigation", icon: Droplets },
  { to: "/farmer/fertilizer", label: "Fertilizer", icon: Sprout },
  { to: "/farmer/schemes", label: "Govt Schemes", icon: BadgeIndianRupee },
  { to: "/farmer/insurance", label: "Insurance", icon: ShieldCheck },
  { to: "/farmer/sell", label: "Sell Produce", icon: ShoppingBag },
  { to: "/farmer/marketplace", label: "Marketplace", icon: Store },
  { to: "/farmer/prices", label: "Price Forecast", icon: TrendingUp, badge: "↑" },
  { to: "/farmer/mandis", label: "Nearby Mandis", icon: MapPin },
  { to: "/farmer/expenses", label: "Expenses", icon: Wallet },
  { to: "/farmer/profit", label: "Profit", icon: PiggyBank },
  { to: "/farmer/sustainability", label: "Sustainability", icon: Leaf },
  { to: "/farmer/calendar", label: "Crop Calendar", icon: Calendar },
  { to: "/farmer/community", label: "Community", icon: Users },
  { to: "/farmer/ask-expert", label: "Ask Expert", icon: MessageSquareWarning },
  { to: "/farmer/notifications", label: "Notifications", icon: Bell, badge: 4 },
  { to: "/farmer/settings", label: "Settings", icon: Settings },
];

const bottomNav = [
  { to: "/farmer/dashboard", label: "Home", icon: Home },
  { to: "/farmer/crop-scanner", label: "Scan", icon: Camera },
  { to: "/farmer/marketplace", label: "Market", icon: Store },
  { to: "/farmer/prices", label: "Prices", icon: TrendingUp },
  { to: "/farmer/notifications", label: "Alerts", icon: Bell },
];

function FarmerDashboard() {
  return (
    <DashboardLayout role="farmer" sidebar={sidebar} bottomNav={bottomNav}>
      <PageHeader
        title="नमस्ते, Ramesh 👋"
        subtitle="Here's your farm at a glance — Wed, Apr 29"
        actions={
          <>
            <Button variant="outline" className="gap-2"><MapPin className="h-4 w-4" />Karnal, HR</Button>
            <Button asChild className="bg-gradient-primary text-primary-foreground"><Link to="/farmer/crop-scanner"><Camera className="h-4 w-4 mr-2" />Scan crop</Link></Button>
          </>
        }
      />

      {/* Top alert */}
      <Card className="p-4 mb-6 bg-warning/10 border-warning/30 flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
        <div className="flex-1 text-sm">
          <strong>Storm warning:</strong> Heavy rain expected Thu 4 AM. Cover seedlings, postpone fertilizer spraying.
        </div>
        <Button size="sm" variant="ghost">Got it</Button>
      </Card>

      {/* Stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Sprout} label="Crop health" value="86%" hint="Wheat · Field A-2" tone="success" trend={3.2} />
        <StatCard icon={CloudSun} label="Today's weather" value="31°C" hint="Sunny · 0mm rain" tone="info" />
        <StatCard icon={Wallet} label="Profit (Apr)" value="₹38,420" hint="vs ₹31,100 last month" tone="primary" trend={23.5} />
        <StatCard icon={Leaf} label="Sustainability" value="A−" hint="Top 18% in district" tone="success" trend={1.1} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Yield forecast */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Yield prediction · Wheat</h3>
              <p className="text-xs text-muted-foreground">Quintals harvested vs AI-predicted</p>
            </div>
            <Badge className="bg-success/10 text-success border-success/20">+12% vs season avg</Badge>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={yieldForecast}>
              <defs>
                <linearGradient id="yieldP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="predicted" stroke="var(--color-primary)" fill="url(#yieldP)" strokeWidth={2} />
              <Line type="monotone" dataKey="actual" stroke="var(--color-info)" strokeWidth={2} dot={{ r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Sell or wait */}
        <Card className="p-5 bg-gradient-primary text-primary-foreground">
          <div className="text-xs opacity-90 uppercase tracking-wide">AI recommendation</div>
          <div className="text-3xl font-bold mt-2">Wait 2 weeks</div>
          <div className="text-sm opacity-90 mt-1">Wheat price likely to rise <strong>+7.2%</strong> by mid-May.</div>
          <div className="mt-5 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="opacity-90">Today</span><span className="font-semibold">₹2,275/qtl</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-90">Forecast (May 13)</span><span className="font-semibold">₹2,440/qtl</span>
            </div>
            <div className="h-px bg-primary-foreground/20 my-2" />
            <div className="flex justify-between text-sm font-bold">
              <span>Extra profit</span><span>+₹19,800 / 120 qtl</span>
            </div>
          </div>
          <Button asChild variant="secondary" className="w-full mt-5">
            <Link to="/farmer/prices">See full forecast <ArrowUpRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Weather */}
        <Card className="p-5 bg-gradient-sky text-sky-foreground overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">7-day forecast</h3>
              <div className="text-xs opacity-80">Karnal, Haryana</div>
            </div>
            <Sun className="h-8 w-8 opacity-70" />
          </div>
          <div className="grid grid-cols-7 gap-1.5 mt-4">
            {weather.map((d) => (
              <div key={d.day} className="rounded-lg bg-card/20 backdrop-blur p-2 text-center">
                <div className="text-[10px] opacity-80">{d.day}</div>
                <div className="text-2xl my-0.5">{d.emoji}</div>
                <div className="text-xs font-bold">{d.temp}°</div>
                <div className="text-[10px] opacity-70">{d.rain}mm</div>
              </div>
            ))}
          </div>
        </Card>

        {/* My crops */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">My crops</h3>
            <Button asChild variant="ghost" size="sm"><Link to="/farmer/calendar">All <ChevronRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="space-y-3">
            {crops.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                <div className="text-3xl">{c.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{c.name}</span>
                    <span className="text-xs text-muted-foreground">{c.hindi}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{c.stage} · {c.area} · harvest {c.harvest}</div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full ${c.health > 80 ? "bg-success" : c.health > 65 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${c.health}%` }} />
                  </div>
                </div>
                <Badge variant="outline" className="shrink-0">{c.health}%</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Mandi prices */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Nearby mandi prices</h3>
            <Button asChild variant="ghost" size="sm"><Link to="/farmer/mandis">View map <ChevronRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground uppercase tracking-wide border-b border-border">
                  <th className="text-left py-2 font-medium">Mandi</th>
                  <th className="text-left py-2 font-medium">Distance</th>
                  <th className="text-left py-2 font-medium">Top crop</th>
                  <th className="text-right py-2 font-medium">Price</th>
                  <th className="text-right py-2 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {mandis.map((m) => (
                  <tr key={m.id} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="py-2.5 font-medium">{m.name}</td>
                    <td className="py-2.5 text-muted-foreground">{m.distance} km</td>
                    <td className="py-2.5">{m.topCrop}</td>
                    <td className="py-2.5 text-right font-semibold">₹{m.price.toLocaleString()}</td>
                    <td className={`py-2.5 text-right text-xs ${m.trend === "up" ? "text-success" : m.trend === "down" ? "text-destructive" : "text-muted-foreground"}`}>
                      {m.trend === "up" ? "▲" : m.trend === "down" ? "▼" : "—"} {Math.abs(m.changePct)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Expenses pie */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Expenses (Apr)</h3>
            <Badge variant="outline">₹17,960</Badge>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={[
                { name: "Seeds", value: 4200 },
                { name: "Fertilizer", value: 7960 },
                { name: "Labour", value: 2800 },
                { name: "Other", value: 3000 },
              ]} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3}>
                {["var(--color-chart-1)","var(--color-chart-2)","var(--color-chart-3)","var(--color-chart-4)"].map((c,i)=>
                  <Cell key={i} fill={c} />
                )}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5">
            {[
              { l: "Seeds", v: 4200, c: "var(--color-chart-1)" },
              { l: "Fertilizer", v: 7960, c: "var(--color-chart-2)" },
              { l: "Labour", v: 2800, c: "var(--color-chart-3)" },
              { l: "Other", v: 3000, c: "var(--color-chart-4)" },
            ].map((r) => (
              <div key={r.l} className="flex items-center gap-2 text-xs">
                <div className="h-2 w-2 rounded-full" style={{ background: r.c }} />
                <span className="flex-1">{r.l}</span>
                <span className="font-medium">₹{r.v.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Notifications + quick actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2"><Bell className="h-4 w-4" />Recent alerts</h3>
            <Badge variant="secondary">{notifications.length}</Badge>
          </div>
          <div className="space-y-2">
            {notifications.map((n) => (
              <div key={n.id} className="flex gap-3 p-2.5 rounded-lg hover:bg-muted">
                <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${
                  n.type === "warn" ? "bg-warning" : n.type === "success" ? "bg-success" : "bg-info"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.body}</div>
                </div>
                <div className="text-xs text-muted-foreground shrink-0">{n.time}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold mb-4">Quick actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { to: "/farmer/crop-scanner", icon: Camera, label: "Scan disease", tone: "primary" },
              { to: "/farmer/sell", icon: ShoppingBag, label: "Sell produce", tone: "success" },
              { to: "/farmer/schemes", icon: BadgeIndianRupee, label: "Apply scheme", tone: "warning" },
              { to: "/farmer/ask-expert", icon: MessageSquareWarning, label: "Ask expert", tone: "info" },
            ].map((a) => (
              <Link key={a.to} to={a.to} className="p-4 rounded-xl bg-muted hover:bg-accent transition-colors group">
                <a.icon className={`h-5 w-5 mb-2 ${
                  a.tone === "primary" ? "text-primary" : a.tone === "success" ? "text-success" : a.tone === "warning" ? "text-warning" : "text-info"
                }`} />
                <div className="text-sm font-medium">{a.label}</div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
