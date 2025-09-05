import { createContext, useContext, useMemo, useState } from "react";
import type { LanguageCode } from "@shared/api";

const messages: Record<LanguageCode, Record<string, string>> = {
  en: {
    appTitle: "Crowdsourced Civic Issue Reporting and Resolution System",
    login: "Login",
    email: "Email",
    password: "Password",
    role: "Role",
    admin: "Admin",
    deptHead: "Department Head",
    staff: "Staff",
    dashboard: "Dashboard",
    map: "Map",
    issues: "Issues",
    departments: "Departments",
    analytics: "Analytics",
    logout: "Logout",
    language: "Language",
  },
  hi: {
    appTitle: "जन-सहभागिता नागरिक समस्या रिपोर्टिंग और समाधान प्रणाली",
    login: "लॉगिन",
    email: "ईमेल",
    password: "��ासवर्ड",
    role: "भूमिका",
    admin: "प्रशासक",
    deptHead: "विभाग प्रमुख",
    staff: "कर्मचारी",
    dashboard: "डैशबोर्ड",
    map: "मानचित्र",
    issues: "शिकायतें",
    departments: "विभाग",
    analytics: "विश्लेषण",
    logout: "लॉगआउट",
    language: "भाषा",
  },
};

interface I18nContextValue {
  lang: LanguageCode;
  t: (key: string) => string;
  setLang: (lang: LanguageCode) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LanguageCode>((localStorage.getItem("lang") as LanguageCode) || "en");
  const value = useMemo<I18nContextValue>(() => ({
    lang,
    setLang: (l) => { localStorage.setItem("lang", l); setLang(l); },
    t: (key) => messages[lang][key] || key,
  }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
