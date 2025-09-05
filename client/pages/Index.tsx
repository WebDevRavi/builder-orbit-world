import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";

const schema = z.object({ email: z.string().email(), password: z.string().min(6), role: z.enum(["ADMIN","DEPT_HEAD","STAFF"]) });

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useI18n();

  const onSubmit = () => {
    const parsed = schema.safeParse({ email, password, role });
    if (!parsed.success) {
      setError("Please enter a valid email, password (6+ chars), and role.");
      return;
    }
    login(email, password, parsed.data.role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1a2d] via-[#0b1f3a] to-[#0d2546] text-white relative overflow-hidden">
      <SmartCityBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">Government Tech</div>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold leading-tight">{t("appTitle")}</h1>
          <p className="mt-4 text-white/80 max-w-xl">Administrative portal for government staff to manage and resolve civic complaints submitted by citizens. Dashboard-driven, map-enabled, and analytics-ready.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BadgePill>Secure login</BadgePill>
            <BadgePill>Role-based access</BadgePill>
            <BadgePill>Interactive maps</BadgePill>
            <BadgePill>Analytics & reports</BadgePill>
          </div>
        </div>
        <Card className="backdrop-blur bg-white/95 shadow-xl">
          <CardHeader>
            <CardTitle>{t("login")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@jh.gov.in" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>{t("role")}</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="DEPT_HEAD">Department Head</SelectItem>
                  <SelectItem value="STAFF">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <Button onClick={onSubmit} className="w-full">{t("login")}</Button>
          </CardContent>
        </Card>
      </div>
      <div className="relative z-10 px-4">
        <div className="max-w-7xl mx-auto grid gap-4 sm:flex sm:items-center sm:justify-between text-sm text-white/80 border-t border-white/10 py-6">
          <div>
            Government of Jharkhand — Department of Higher & Technical Education
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function BadgePill({ children }: { children: React.ReactNode }) {
  return <div className="text-xs rounded-full border border-white/20 px-3 py-1 text-white/80">{children}</div>;
}

function SmartCityBackground() {
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1440" height="900" fill="url(#g1)" opacity="0.08"/>
      <g fill="none" stroke="#6ee7b7" strokeOpacity="0.2">
        <path d="M0 700 L80 640 L160 660 L240 590 L320 620 L400 540 L480 600 L560 520 L640 560 L720 500 L800 540 L880 480 L960 520 L1040 470 L1120 520 L1200 480 L1280 520 L1360 500 L1440 520" />
        <path d="M0 760 L80 700 L160 730 L240 660 L320 690 L400 610 L480 670 L560 590 L640 630 L720 570 L800 610 L880 550 L960 590 L1040 540 L1120 590 L1200 550 L1280 590 L1360 570 L1440 590" />
      </g>
      <g fill="#93c5fd" opacity="0.5">
        <rect x="120" y="620" width="40" height="180" />
        <rect x="170" y="580" width="50" height="220" />
        <rect x="230" y="600" width="30" height="200" />
        <rect x="320" y="560" width="35" height="240" />
        <rect x="380" y="590" width="40" height="210" />
        <rect x="760" y="560" width="50" height="240" />
        <rect x="820" y="600" width="35" height="200" />
        <rect x="880" y="580" width="45" height="220" />
      </g>
    </svg>
  );
}
