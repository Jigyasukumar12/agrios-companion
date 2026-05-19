import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, MapPin, ShieldCheck, Star, Filter, ShoppingCart, Leaf, Clock } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { products, type Product } from "@/mocks/data";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — Buy & Sell Crops, Seeds, Tools | AgriOS AI" },
      { name: "description", content: "India's farmer-first marketplace. Verified buyers and sellers for crops, seeds, fertilizers, tools and equipment rental." },
    ],
  }),
  component: MarketplacePage,
});

const categories = ["All", "Crops", "Seeds", "Fertilizers", "Tools", "Rental", "Auctions"] as const;

function MarketplacePage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [q, setQ] = useState("");
  const [organic, setOrganic] = useState(false);
  const [verified, setVerified] = useState(false);
  const [maxPrice, setMaxPrice] = useState([100000]);

  const filtered = useMemo(() => products.filter((p) =>
    (cat === "All" || p.category === cat) &&
    (!q || p.title.toLowerCase().includes(q.toLowerCase()) || p.location.toLowerCase().includes(q.toLowerCase())) &&
    (!organic || p.organic) &&
    (!verified || p.verified) &&
    p.price <= maxPrice[0]
  ), [cat, q, organic, verified, maxPrice]);

  return (
    <PublicLayout>
      <div className="bg-gradient-hero border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Badge variant="secondary" className="mb-3">Verified marketplace</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">India's fairest farm marketplace</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Buy directly from farmers and verified sellers. No middlemen, transparent prices, AI fair-price guidance on every listing.</p>
          <div className="mt-6 flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search wheat, drip kit, Ratnagiri…" className="pl-9 h-11 bg-card" />
            </div>
            <Button size="lg" className="bg-gradient-primary text-primary-foreground">Search</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                cat === c ? "bg-primary text-primary-foreground shadow-soft" : "bg-muted hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <aside className="space-y-5">
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4" />
                <h3 className="font-semibold">Filters</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase">Max price</label>
                  <div className="mt-2"><Slider value={maxPrice} onValueChange={setMaxPrice} max={100000} step={500} /></div>
                  <div className="text-xs text-muted-foreground mt-1">Up to ₹{maxPrice[0].toLocaleString()}</div>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={verified} onCheckedChange={(v) => setVerified(!!v)} />
                  Verified sellers only
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={organic} onCheckedChange={(v) => setOrganic(!!v)} />
                  Organic certified
                </label>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase">Location</label>
                  <select className="mt-2 w-full h-9 rounded-md bg-muted px-3 text-sm border-0">
                    <option>All India</option>
                    <option>Maharashtra</option>
                    <option>Punjab</option>
                    <option>Uttar Pradesh</option>
                    <option>Madhya Pradesh</option>
                    <option>Karnataka</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-gradient-primary text-primary-foreground">
              <div className="text-xs uppercase tracking-wider opacity-90">Bulk buying</div>
              <div className="text-lg font-bold mt-1">FPO &amp; institutional</div>
              <p className="text-xs opacity-90 mt-1">Need 1000+ qtl? Talk to our enterprise team for forward contracts.</p>
              <Button asChild variant="secondary" size="sm" className="mt-3"><Link to="/contact">Contact us</Link></Button>
            </Card>
          </aside>

          <div>
            <div className="flex items-center justify-between mb-4 text-sm">
              <div>{filtered.length} listings</div>
              <select className="h-9 rounded-md bg-muted px-3 text-sm border-0">
                <option>Best match</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
            {filtered.length === 0 && (
              <Card className="p-12 text-center text-muted-foreground">
                <Search className="h-10 w-10 mx-auto mb-3 opacity-40" />
                No listings match your filters.
              </Card>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <Card className="overflow-hidden hover:shadow-elevated transition-all hover:-translate-y-0.5">
      <div className="h-36 bg-gradient-to-br from-muted to-accent grid place-items-center text-6xl relative">
        {p.emoji}
        {p.organic && (
          <Badge className="absolute top-2 left-2 bg-success/90 text-success-foreground border-0">
            <Leaf className="h-3 w-3 mr-1" />Organic
          </Badge>
        )}
        {p.endsIn && (
          <Badge className="absolute top-2 right-2 bg-warning/90 text-warning-foreground border-0">
            <Clock className="h-3 w-3 mr-1" />{p.endsIn}
          </Badge>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">{p.title}</h3>
          {p.verified && <ShieldCheck className="h-4 w-4 text-success shrink-0" />}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5">
          <MapPin className="h-3 w-3" /> {p.location}
        </div>
        <div className="flex items-center gap-1 text-xs mt-1.5">
          <Star className="h-3 w-3 fill-warning text-warning" />
          <span className="font-medium">{p.rating}</span>
          <span className="text-muted-foreground">· {p.seller}</span>
        </div>
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-border">
          <div>
            <div className="text-xs text-muted-foreground">{p.endsIn ? "Current bid" : "Price"}</div>
            <div className="text-lg font-bold">₹{p.price.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/{p.unit}</span></div>
          </div>
          <Button size="sm" className="h-8 bg-gradient-primary text-primary-foreground">
            <ShoppingCart className="h-3.5 w-3.5 mr-1" /> {p.endsIn ? "Bid" : "Buy"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
