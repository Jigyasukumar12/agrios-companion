import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sprout, Phone, Lock, ChevronRight, Tractor, Store, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { setRole, type Role } from "@/lib/role";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in | AgriOS AI" }] }),
  component: LoginPage,
});

const roleOptions: { id: Role; icon: typeof Tractor; title: string; desc: string }[] = [
  { id: "farmer", icon: Tractor, title: "Farmer", desc: "Grow, scan, sell" },
  { id: "buyer", icon: Store, title: "Buyer", desc: "FPO, exporter, retailer" },
  { id: "seller", icon: Briefcase, title: "Seller", desc: "Seeds, tools, fertilizer" },
  { id: "expert", icon: GraduationCap, title: "Expert", desc: "Agronomist, scientist" },
];

function LoginPage() {
  const [selected, setSelected] = useState<Role>("farmer");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const navigate = useNavigate();

  const submit = () => {
    setRole(selected, selected === "farmer" ? "Ramesh" : selected === "buyer" ? "Priya" : selected === "seller" ? "Vijay" : "Dr. Anil");
    navigate({ to: `/${selected}/dashboard` as string });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-hero">
      <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary-foreground/10 blur-3xl" />
        <Link to="/" className="flex items-center gap-2 relative">
          <div className="h-10 w-10 rounded-xl bg-primary-foreground/20 grid place-items-center"><Sprout className="h-5 w-5" /></div>
          <span className="font-bold text-lg">AgriOS AI</span>
        </Link>
        <div className="relative">
          <h2 className="text-4xl font-bold leading-tight">Welcome back to your farm OS.</h2>
          <p className="opacity-90 mt-3 max-w-md">Crop intelligence, fair markets, schemes, and expert advice — all waiting for you.</p>
          <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
            {[
              { v: "12L+", l: "Farmers" }, { v: "₹1,842cr", l: "GMV" }, { v: "94%", l: "AI accuracy" },
            ].map((s) => (
              <div key={s.l} className="p-3 rounded-lg bg-primary-foreground/10 backdrop-blur">
                <div className="font-bold text-xl">{s.v}</div>
                <div className="text-xs opacity-80">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs opacity-70 relative">© AgriOS AI · Made with 🌱 in India</div>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-7 shadow-elevated">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center"><Sprout className="h-5 w-5 text-primary-foreground" /></div>
            <span className="font-bold">AgriOS AI</span>
          </div>
          <Badge variant="secondary" className="mb-2">Sign in</Badge>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Continue to your AgriOS console.</p>

          <div className="mt-5">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">I am a</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {roleOptions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r.id)}
                  className={`p-3 rounded-xl text-left transition-all border-2 ${
                    selected === r.id ? "border-primary bg-primary/5" : "border-transparent bg-muted hover:bg-accent"
                  }`}
                >
                  <r.icon className={`h-4 w-4 mb-1 ${selected === r.id ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="text-sm font-medium">{r.title}</div>
                  <div className="text-[10px] text-muted-foreground">{r.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <Tabs defaultValue="phone" className="mt-5">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="phone">Phone OTP</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>
            <TabsContent value="phone" className="space-y-3 mt-4">
              {!otpSent ? (
                <>
                  <div>
                    <Label>Mobile number</Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" className="pl-9" inputMode="numeric" />
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-primary text-primary-foreground" onClick={() => setOtpSent(true)}>
                    Send OTP <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </>
              ) : (
                <>
                  <Label>Enter 6-digit OTP sent to +91 {phone || "98765 43210"}</Label>
                  <div className="flex gap-2 justify-between mt-1.5">
                    {otp.map((d, i) => (
                      <Input
                        key={i}
                        value={d}
                        onChange={(e) => {
                          const v = e.target.value.slice(-1);
                          const next = [...otp]; next[i] = v; setOtp(next);
                        }}
                        className="w-11 h-12 text-center text-lg font-bold"
                        inputMode="numeric"
                        maxLength={1}
                      />
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-primary text-primary-foreground" onClick={submit}>
                    Verify &amp; sign in
                  </Button>
                  <button className="text-xs text-muted-foreground hover:text-foreground" onClick={() => setOtpSent(false)}>← Change number</button>
                </>
              )}
            </TabsContent>
            <TabsContent value="email" className="space-y-3 mt-4">
              <div><Label>Email</Label><Input type="email" placeholder="you@farm.in" className="mt-1.5" /></div>
              <div><Label>Password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="password" className="pl-9" placeholder="••••••••" />
                </div>
              </div>
              <div className="flex justify-between text-xs">
                <Link to="/" className="text-primary hover:underline">Forgot password?</Link>
              </div>
              <Button className="w-full bg-gradient-primary text-primary-foreground" onClick={submit}>Sign in</Button>
            </TabsContent>
          </Tabs>

          <div className="text-xs text-center text-muted-foreground mt-5">
            New here? <Link to="/signup" className="text-primary font-medium hover:underline">Create an account</Link>
          </div>
          <div className="text-[10px] text-center text-muted-foreground mt-2">
            Admin? <Link to="/admin/login" className="hover:underline">Use the admin portal</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
