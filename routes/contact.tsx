import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Support | AgriOS AI" },
      { name: "description", content: "Get help, partner with us, or talk to our enterprise team. AgriOS AI support is available in 10 Indian languages." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PublicLayout>
      <div className="bg-gradient-hero border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Badge variant="secondary" className="mb-3">Contact</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">We'd love to hear from you</h1>
          <p className="text-muted-foreground mt-2">Farmer support, partnerships, press — pick the channel that works for you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_360px] gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Send a message</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Your name</Label><Input className="mt-1.5" placeholder="Ramesh Kumar" /></div>
              <div><Label>Email or phone</Label><Input className="mt-1.5" placeholder="ramesh@example.com" /></div>
            </div>
            <div><Label>Subject</Label>
              <select className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option>Farmer support</option>
                <option>Buyer / FPO partnership</option>
                <option>Seller onboarding</option>
                <option>Press / media</option>
                <option>Careers</option>
              </select>
            </div>
            <div><Label>Message</Label><Textarea className="mt-1.5 min-h-[140px]" placeholder="Tell us how we can help…" /></div>
            <Button type="submit" className="bg-gradient-primary text-primary-foreground">
              <Send className="h-4 w-4 mr-2" />Send message
            </Button>
          </form>
        </Card>

        <div className="space-y-4">
          {[
            { icon: Phone, title: "Toll-free farmer helpline", body: "1800-180-AGRI (2474)", note: "6 AM – 10 PM · 10 languages" },
            { icon: MessageCircle, title: "WhatsApp support", body: "+91 98765 43210", note: "24/7 · auto-reply in 30s" },
            { icon: Mail, title: "Email", body: "support@agrios.ai", note: "Reply within 4 hours" },
            { icon: MapPin, title: "HQ", body: "Indiranagar, Bengaluru 560038", note: "Hubs in Pune, Delhi, Hyderabad" },
          ].map((c) => (
            <Card key={c.title} className="p-5">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{c.title}</div>
                  <div className="font-semibold">{c.body}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.note}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
