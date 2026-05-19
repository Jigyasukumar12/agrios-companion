import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Search, ShoppingBag, FileText, Truck, Gavel, Heart, Settings, Home, TrendingUp, Bell, Store, MapPin, ShieldCheck, Star } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products, orders, tickerPrices } from "@/mocks/data";

export const Route = createFileRoute("/buyer/dashboard")({
  head: () => ({ meta: [{ title: "Buyer Dashboard | AgriOS AI" }] }),
  component: BuyerDashboard,
});

const sidebar = [
  { to: "/buyer/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/marketplace", label: "Browse market", icon: Search },
  { to: "/buyer/dashboard", label: "Suppliers", icon: Store },
  { to: "/buyer/dashboard", label: "My orders", icon: ShoppingBag, badge: 4 },
  { to: "/buyer/dashboard", label: "Contracts", icon: FileText },
  { to: "/buyer/dashboard", label: "Delivery tracking", icon: Truck },
  { to: "/buyer/dashboard", label: "Auctions", icon: Gavel, badge: "live" },
  { to: "/buyer/dashboard", label: "Saved suppliers", icon: Heart },
  { to: "/buyer/dashboard", label: "Settings", icon: Settings },
];
const bottomNav = [
  { to: "/buyer/dashboard", label: "Home", icon: Home },
  { to: "/marketplace", label: "Browse", icon: Search },
  { to: "/buyer/dashboard", label: "Orders", icon: ShoppingBag },
  { to: "/buyer/dashboard", label: "Prices", icon: TrendingUp },
  { to: "/buyer/dashboard", label: "Alerts", icon: Bell },
];

function BuyerDashboard() {
  return (
    <DashboardLayout role="buyer" sidebar={sidebar} bottomNav={bottomNav}>
      <PageHeader title="Welcome, Priya 👋" subtitle="4 active orders · ₹8.4L spent this month" actions={<Button className="bg-gradient-primary text-primary-foreground">+ New bulk order</Button>} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={ShoppingBag} label="Active orders" value="4" hint="Across 3 states" tone="primary" />
        <StatCard icon={Truck} label="In transit" value="2" hint="ETA Apr 28–May 02" tone="info" />
        <StatCard icon={TrendingUp} label="Avg savings" value="14.8%" hint="vs APMC mandi" tone="success" trend={2.4} />
        <StatCard icon={Gavel} label="Live auctions" value="3" hint="Onion · Mango · Wheat" tone="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3"><h3 className="font-semibold">Recent orders</h3><Button variant="ghost" size="sm">View all</Button></div>
          <div className="space-y-2">
            {orders.map((o) => (
              <div key={o.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center"><ShoppingBag className="h-5 w-5" /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{o.item} <span className="text-xs text-muted-foreground">· {o.qty}</span></div>
                  <div className="text-xs text-muted-foreground">{o.id} · ETA {o.eta}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">₹{o.value.toLocaleString()}</div>
                  <Badge variant="outline" className="text-[10px]">{o.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold mb-3">Live mandi prices</h3>
          <div className="space-y-2">
            {tickerPrices.slice(0, 6).map((p) => (
              <div key={p.crop} className="flex items-center justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                <div>
                  <div className="font-medium">{p.crop}</div>
                  <div className="text-[10px] text-muted-foreground">{p.mandi}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{p.price}</div>
                  <div className={`text-[10px] ${p.change > 0 ? "text-success" : p.change < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                    {p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—"} {Math.abs(p.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-semibold mb-4">Verified suppliers near you</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.filter(p => p.category === "Crops").slice(0, 3).map((p) => (
            <Card key={p.id} className="p-4 border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{p.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{p.seller}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{p.location}</div>
                </div>
                <ShieldCheck className="h-4 w-4 text-success" />
              </div>
              <div className="mt-2 text-xs flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" />{p.rating} · ₹{p.price}/{p.unit}</div>
              <Button size="sm" className="w-full mt-3 bg-gradient-primary text-primary-foreground">Contact</Button>
            </Card>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
