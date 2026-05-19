import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Package, Boxes, ShoppingCart, Megaphone, BarChart3, Users, Settings, Home, TrendingUp, Bell, Plus } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/mocks/data";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/seller/dashboard")({
  head: () => ({ meta: [{ title: "Seller Dashboard | AgriOS AI" }] }),
  component: SellerDashboard,
});

const sidebar = [
  { to: "/seller/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/seller/dashboard", label: "Products", icon: Package, badge: 24 },
  { to: "/seller/dashboard", label: "Inventory", icon: Boxes },
  { to: "/seller/dashboard", label: "Orders", icon: ShoppingCart, badge: 8 },
  { to: "/seller/dashboard", label: "Promotions", icon: Megaphone },
  { to: "/seller/dashboard", label: "Analytics", icon: BarChart3 },
  { to: "/seller/dashboard", label: "Audience", icon: Users },
  { to: "/seller/dashboard", label: "Settings", icon: Settings },
];
const bottomNav = [
  { to: "/seller/dashboard", label: "Home", icon: Home },
  { to: "/seller/dashboard", label: "Orders", icon: ShoppingCart },
  { to: "/seller/dashboard", label: "Sales", icon: TrendingUp },
  { to: "/seller/dashboard", label: "Inventory", icon: Boxes },
  { to: "/seller/dashboard", label: "Alerts", icon: Bell },
];

const salesData = [
  { d: "Mon", v: 24000 }, { d: "Tue", v: 31000 }, { d: "Wed", v: 28000 },
  { d: "Thu", v: 38000 }, { d: "Fri", v: 42000 }, { d: "Sat", v: 51000 }, { d: "Sun", v: 36000 },
];

function SellerDashboard() {
  return (
    <DashboardLayout role="seller" sidebar={sidebar} bottomNav={bottomNav}>
      <PageHeader title="Welcome back, Vijay 👋" subtitle="₹2.5L revenue this week" actions={<Button className="bg-gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Add product</Button>} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={ShoppingCart} label="Orders (week)" value="142" tone="primary" trend={18.2} />
        <StatCard icon={TrendingUp} label="Revenue" value="₹2.5L" tone="success" trend={12.4} />
        <StatCard icon={Package} label="Active products" value="24" tone="info" />
        <StatCard icon={Boxes} label="Low stock" value="3" hint="Reorder soon" tone="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Sales this week</h3><Badge className="bg-success/10 text-success border-success/20">+12.4%</Badge></div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Bar dataKey="v" fill="var(--color-primary)" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold mb-3">Inventory alerts</h3>
          <div className="space-y-2">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                <div className="text-2xl">{p.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.title}</div>
                  <div className="text-xs text-muted-foreground">Stock: {p.stock ?? "—"}</div>
                </div>
                <Badge variant={p.stock && p.stock < 50 ? "destructive" : "outline"} className="text-[10px]">
                  {p.stock && p.stock < 50 ? "Low" : "OK"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-semibold mb-4">Top products</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-xs text-muted-foreground uppercase border-b border-border">
              <th className="text-left py-2 font-medium">Product</th><th className="text-left py-2 font-medium">Category</th>
              <th className="text-right py-2 font-medium">Price</th><th className="text-right py-2 font-medium">Stock</th><th className="text-right py-2 font-medium">Rating</th>
            </tr></thead>
            <tbody>
              {products.slice(0, 6).map((p) => (
                <tr key={p.id} className="border-b border-border/50">
                  <td className="py-2.5 flex items-center gap-2"><span className="text-xl">{p.emoji}</span>{p.title}</td>
                  <td className="py-2.5"><Badge variant="outline" className="text-[10px]">{p.category}</Badge></td>
                  <td className="py-2.5 text-right font-medium">₹{p.price.toLocaleString()}</td>
                  <td className="py-2.5 text-right">{p.stock ?? "—"}</td>
                  <td className="py-2.5 text-right">⭐ {p.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
