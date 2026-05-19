import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, BadgeIndianRupee, Calendar, Building2, MapPin } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { schemes } from "@/mocks/data";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Government Schemes for Farmers | AgriOS AI" },
      { name: "description", content: "PM-KISAN, PMFBY, KCC, drip irrigation subsidy and more. Check eligibility and apply directly from AgriOS AI." },
    ],
  }),
  component: SchemesPage,
});

function SchemesPage() {
  const [q, setQ] = useState("");
  const filtered = schemes.filter((s) =>
    !q || s.title.toLowerCase().includes(q.toLowerCase()) || s.benefit.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <PublicLayout>
      <div className="bg-gradient-hero border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Badge variant="secondary" className="mb-3"><BadgeIndianRupee className="h-3 w-3 mr-1" />Govt schemes</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">All farmer schemes in one place</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Subsidies, insurance, loans and training. AgriOS auto-checks your eligibility and helps you apply in minutes.</p>
          <div className="mt-6 relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search PM-KISAN, drip irrigation, KCC…" className="pl-9 h-11 bg-card" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((s) => (
            <Card key={s.id} className="p-6 hover:shadow-elevated transition-shadow">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
                  <BadgeIndianRupee className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg leading-tight">{s.title}</h3>
                    <Badge variant="outline" className="shrink-0">{s.tag}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{s.ministry}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{s.state}</span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-success">{s.benefit}</p>
                  <p className="text-xs text-muted-foreground mt-1">Eligibility: {s.eligibility}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs flex items-center gap-1"><Calendar className="h-3 w-3" />Deadline: <strong>{s.deadline}</strong></span>
                    <Button size="sm" className="bg-gradient-primary text-primary-foreground">Check eligibility</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
