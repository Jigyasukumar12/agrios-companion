import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, Upload, Sparkles, FileImage, ArrowRight, AlertTriangle, MessageSquareWarning } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleDisease } from "@/mocks/data";
import { Home, Store, TrendingUp, Bell } from "lucide-react";

export const Route = createFileRoute("/farmer/crop-scanner")({
  head: () => ({ meta: [{ title: "AI Crop Scanner | AgriOS AI" }] }),
  component: CropScanner,
});

const sidebar = [
  { to: "/farmer/dashboard", label: "Overview", icon: Home },
  { to: "/farmer/crop-scanner", label: "AI Crop Scanner", icon: Camera, badge: "AI" },
  { to: "/farmer/marketplace", label: "Marketplace", icon: Store },
  { to: "/farmer/prices", label: "Price Forecast", icon: TrendingUp },
  { to: "/farmer/notifications", label: "Notifications", icon: Bell },
];
const bottomNav = [
  { to: "/farmer/dashboard", label: "Home", icon: Home },
  { to: "/farmer/crop-scanner", label: "Scan", icon: Camera },
  { to: "/farmer/marketplace", label: "Market", icon: Store },
  { to: "/farmer/prices", label: "Prices", icon: TrendingUp },
  { to: "/farmer/notifications", label: "Alerts", icon: Bell },
];

function CropScanner() {
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const handleScan = () => {
    setScanning(true);
    setTimeout(() => { setScanning(false); setScanned(true); }, 1600);
  };

  return (
    <DashboardLayout role="farmer" sidebar={sidebar} bottomNav={bottomNav}>
      <PageHeader
        title="AI Crop Disease Scanner"
        subtitle="Upload a leaf photo. Get diagnosis, treatment & expert escalation in seconds."
        actions={<Badge className="bg-primary/10 text-primary border-primary/20"><Sparkles className="h-3 w-3 mr-1" />v3.2 · 94.2% accuracy</Badge>}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-3">Upload leaf photo</h3>
          {!scanned && !scanning && (
            <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary transition-colors cursor-pointer" onClick={handleScan}>
              <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-primary grid place-items-center mb-4 shadow-glow">
                <Upload className="h-7 w-7 text-primary-foreground" />
              </div>
              <p className="font-medium">Drop a leaf photo or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">JPG / PNG · works offline · max 10 MB</p>
              <div className="flex gap-2 justify-center mt-5">
                <Button className="bg-gradient-primary text-primary-foreground"><Camera className="h-4 w-4 mr-2" />Take photo</Button>
                <Button variant="outline"><FileImage className="h-4 w-4 mr-2" />Choose file</Button>
              </div>
            </div>
          )}
          {scanning && (
            <div className="border-2 border-dashed border-primary rounded-xl p-10 text-center">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-primary grid place-items-center mb-4 shadow-glow pulse-glow">
                <Sparkles className="h-7 w-7 text-primary-foreground animate-pulse" />
              </div>
              <p className="font-medium">Analyzing leaf with AgriOS Vision…</p>
              <p className="text-xs text-muted-foreground mt-1">Checking 180+ diseases across 47 crops</p>
            </div>
          )}
          {scanned && (
            <div>
              <div className="rounded-xl bg-gradient-to-br from-leaf/20 to-warning/15 h-56 grid place-items-center text-8xl">🍅</div>
              <Button variant="outline" className="w-full mt-4" onClick={() => setScanned(false)}>Scan another</Button>
            </div>
          )}
          <div className="mt-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Try sample images</div>
            <div className="flex gap-2">
              {["🍅","🌾","🥔","🍇","🌶️"].map((e) => (
                <button key={e} onClick={handleScan} className="h-14 w-14 rounded-lg bg-muted hover:bg-accent grid place-items-center text-3xl transition-colors">{e}</button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Diagnosis</h3>
            {scanned && <Badge className="bg-warning/15 text-warning border-warning/30">{sampleDisease.severity}</Badge>}
          </div>
          {!scanned ? (
            <div className="text-center py-12 text-muted-foreground">
              <Camera className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Upload a photo to see diagnosis</p>
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold">{sampleDisease.name}</div>
              <div className="text-sm text-muted-foreground">on {sampleDisease.crop}</div>
              <div className="flex items-center justify-between mt-4 mb-1">
                <span className="text-sm font-medium">Confidence</span>
                <span className="text-sm font-bold text-primary">{sampleDisease.confidence}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-primary" style={{ width: `${sampleDisease.confidence}%` }} />
              </div>

              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Chemical treatment</div>
                {sampleDisease.treatment.map((t, i) => (
                  <div key={i} className="flex gap-2 text-sm py-1"><span className="text-primary font-bold">{i + 1}.</span> {t}</div>
                ))}
              </div>
              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Organic alternative</div>
                {sampleDisease.organic.map((t, i) => (
                  <div key={i} className="flex gap-2 text-sm py-1"><span className="text-success">🌱</span> {t}</div>
                ))}
              </div>

              <div className="mt-5 p-3 rounded-lg bg-warning/10 border border-warning/30 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <div className="text-xs">High humidity forecast Thu–Fri may worsen blight. Spray <strong>before</strong> the storm window.</div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button asChild variant="outline"><Link to="/farmer/dashboard"><MessageSquareWarning className="h-4 w-4 mr-2" />Ask expert</Link></Button>
                <Button asChild className="bg-gradient-primary text-primary-foreground"><Link to="/marketplace">Buy treatment <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
