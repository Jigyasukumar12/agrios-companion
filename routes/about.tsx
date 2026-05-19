import { createFileRoute } from "@tanstack/react-router";
import { Sprout, Target, Eye, HeartHandshake, Users, TrendingUp, Globe2, Cpu } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AgriOS AI — Mission for Indian Farmers" },
      { name: "description", content: "Our mission is to put AI in every Indian farmer's hand. Learn about AgriOS AI's vision and impact." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PublicLayout>
      <section className="bg-gradient-hero border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 text-center">
          <Badge variant="secondary" className="mb-4"><Sprout className="h-3 w-3 mr-1" />Our story</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Built by farmers, for farmers</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            India feeds 1.4 billion people. Yet the people who grow our food often earn the least.
            AgriOS AI exists to change that — by giving every farmer the tools, knowledge and markets they deserve.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-5">
        {[
          { icon: Target, title: "Mission", body: "Put intelligent decision-making in the hands of every Indian farmer — in their language, on the device they already own." },
          { icon: Eye, title: "Vision", body: "A future where farming is profitable, sustainable and respected. Where data flows to farmers, not away from them." },
          { icon: HeartHandshake, title: "Values", body: "Farmer first. Always. Fair markets, transparent pricing, free advice, open access. No dark patterns." },
        ].map((c, i) => (
          <Card key={i} className="p-7 text-center">
            <div className="h-14 w-14 mx-auto rounded-xl bg-gradient-primary grid place-items-center mb-4 shadow-glow">
              <c.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="font-bold text-xl">{c.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{c.body}</p>
          </Card>
        ))}
      </section>

      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="secondary" className="mb-3">Impact</Badge>
            <h2 className="text-3xl font-bold">Real outcomes, measured every quarter</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Users, v: "12L+", l: "Farmers using AgriOS daily" },
              { icon: TrendingUp, v: "+22%", l: "Average income uplift" },
              { icon: Globe2, v: "28", l: "States across India" },
              { icon: Cpu, v: "94.2%", l: "Disease detection accuracy" },
            ].map((s) => (
              <Card key={s.l} className="p-6 text-center">
                <s.icon className="h-6 w-6 mx-auto text-primary mb-2" />
                <div className="text-3xl font-bold">{s.v}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6">How AI helps the smallholder</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>The average Indian farmer holds just 1.08 hectares. They face climate volatility, opaque mandi prices, fragmented input markets, and limited access to expert advice. Traditional advisory reaches less than 7% of them.</p>
          <p>AgriOS AI changes the unit economics. A leaf-photo diagnosis costs us a fraction of a rupee. A weather-aware irrigation reminder costs nothing. A scheme-eligibility check is instant. By moving advisory and market discovery from human-intensive to AI-augmented, we can serve every farmer — not just the well-connected.</p>
          <p>Our models are trained specifically on Indian conditions. Indian crops, Indian diseases, Indian soils, Indian price patterns. Not a transplanted Western tool. Built in Bengaluru, Pune and Delhi by agronomists, ML researchers and — crucially — farmers from Punjab, Vidarbha, coastal Andhra and Bundelkhand.</p>
        </div>
      </section>
    </PublicLayout>
  );
}
