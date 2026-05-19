import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shield, Lock, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { setRole } from "@/lib/role";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Portal | AgriOS AI" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid place-items-center bg-background relative overflow-hidden dark">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
      <div className="relative w-full max-w-md p-6">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center shadow-glow"><Sprout className="h-5 w-5 text-primary-foreground" /></div>
          <div>
            <div className="font-bold">AgriOS AI</div>
            <div className="text-xs text-muted-foreground tracking-wider uppercase">Admin Portal</div>
          </div>
        </Link>
        <Card className="p-7 glass shadow-elevated">
          <Badge className="bg-destructive/10 text-destructive border-destructive/30 mb-2">
            <Shield className="h-3 w-3 mr-1" />Restricted access
          </Badge>
          <h1 className="text-2xl font-bold">Admin sign-in</h1>
          <p className="text-sm text-muted-foreground mt-1">For authorised AgriOS team members only.</p>
          <div className="mt-5 space-y-3">
            <div><Label>Admin email</Label><Input type="email" placeholder="admin@agrios.ai" className="mt-1.5" /></div>
            <div><Label>Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="password" className="pl-9" placeholder="••••••••" />
              </div>
            </div>
            <div><Label>2FA code</Label>
              <Input className="mt-1.5 tracking-widest text-center font-mono" placeholder="• • • • • •" maxLength={6} />
            </div>
            <Button
              className="w-full bg-gradient-primary text-primary-foreground"
              onClick={() => { setRole("admin", "Admin"); navigate({ to: "/admin/dashboard" }); }}
            >
              Sign in securely
            </Button>
          </div>
          <div className="mt-5 text-xs text-center text-muted-foreground">
            All admin actions are logged and audited.
          </div>
        </Card>
      </div>
    </div>
  );
}
