import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sprout, Tractor, Store, Briefcase, GraduationCap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { setRole, type Role } from "@/lib/role";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account | AgriOS AI" }] }),
  component: SignupPage,
});

const roleOptions: { id: Role; icon: typeof Tractor; title: string; desc: string }[] = [
  { id: "farmer", icon: Tractor, title: "Farmer", desc: "I grow crops" },
  { id: "buyer", icon: Store, title: "Buyer", desc: "I buy from farmers" },
  { id: "seller", icon: Briefcase, title: "Seller", desc: "I sell inputs" },
  { id: "expert", icon: GraduationCap, title: "Expert", desc: "I advise farmers" },
];

function SignupPage() {
  const [step, setStep] = useState(0);
  const [role, setSel] = useState<Role>("farmer");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const finish = () => {
    setRole(role, name || "Demo User");
    navigate({ to: `/${role}/dashboard` as string });
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
          <Badge className="bg-primary-foreground/20 border-primary-foreground/20 mb-3">100% free for farmers</Badge>
          <h2 className="text-4xl font-bold leading-tight">Start your AI-powered farm in 2 minutes.</h2>
          <p className="opacity-90 mt-3 max-w-md">No credit card. No subscription. Just better decisions, fairer prices, and friends along the way.</p>
        </div>
        <div className="text-xs opacity-70 relative">© AgriOS AI</div>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-7 shadow-elevated">
          <div className="flex items-center justify-between mb-1">
            <Badge variant="secondary">Step {step + 1} of 3</Badge>
            <Link to="/login" className="text-xs text-muted-foreground hover:text-foreground">Have an account?</Link>
          </div>
          <div className="h-1 rounded-full bg-muted mt-3 overflow-hidden">
            <div className="h-full bg-gradient-primary transition-all" style={{ width: `${((step + 1) / 3) * 100}%` }} />
          </div>

          {step === 0 && (
            <div className="mt-6">
              <h1 className="text-2xl font-bold">I am a…</h1>
              <p className="text-sm text-muted-foreground mt-1">Pick your role to get the right tools.</p>
              <div className="grid grid-cols-2 gap-2 mt-5">
                {roleOptions.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSel(r.id)}
                    className={`p-4 rounded-xl text-left transition-all border-2 ${
                      role === r.id ? "border-primary bg-primary/5" : "border-transparent bg-muted hover:bg-accent"
                    }`}
                  >
                    <r.icon className={`h-5 w-5 mb-2 ${role === r.id ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="font-medium">{r.title}</div>
                    <div className="text-xs text-muted-foreground">{r.desc}</div>
                  </button>
                ))}
              </div>
              <Button className="w-full mt-6 bg-gradient-primary text-primary-foreground" onClick={() => setStep(1)}>
                Continue <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}

          {step === 1 && (
            <div className="mt-6 space-y-3">
              <h1 className="text-2xl font-bold">Tell us about yourself</h1>
              <div><Label>Full name</Label><Input className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ramesh Kumar" /></div>
              <div><Label>Mobile number</Label><Input className="mt-1.5" placeholder="98765 43210" inputMode="numeric" /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label>State</Label>
                  <select className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                    <option>Maharashtra</option><option>Punjab</option><option>UP</option><option>MP</option><option>Karnataka</option>
                  </select>
                </div>
                <div><Label>District</Label><Input className="mt-1.5" placeholder="Pune" /></div>
              </div>
              <div><Label>Preferred language</Label>
                <select className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option>हिन्दी</option><option>English</option><option>मराठी</option><option>தமிழ்</option><option>తెలుగు</option>
                </select>
              </div>
              <Button className="w-full bg-gradient-primary text-primary-foreground" onClick={() => setStep(2)}>
                Continue <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6 space-y-4 text-center">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-primary grid place-items-center shadow-glow">
                <Sprout className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">You're all set, {name || "friend"}!</h1>
              <p className="text-sm text-muted-foreground">Your {role} console is ready. Let's get growing.</p>
              <Button className="w-full bg-gradient-primary text-primary-foreground" onClick={finish}>
                Open my dashboard <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
