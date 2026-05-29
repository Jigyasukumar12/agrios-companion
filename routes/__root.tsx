import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import appCss from "../styles.css?url";
import { I18nContext, type Lang } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "AgriOS AI — Smart Agriculture OS for Indian Farmers" },
      { name: "description", content: "AI-powered crop intelligence, fair marketplaces, government schemes, weather and expert advice — built for India's farmers." },
      { name: "author", content: "AgriOS AI" },
      { name: "theme-color", content: "#1f6f43" },
      { property: "og:title", content: "AgriOS AI — From Seed to Sale" },
      { property: "og:description", content: "AI-powered smart farming, marketplace and government schemes for Indian farmers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("agrios.lang")) as Lang | null;
    if (stored) setLangState(stored);
    const theme = (typeof window !== "undefined" && localStorage.getItem("agrios.theme")) || "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("agrios.lang", l);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang }}>
      <Outlet />
    </I18nContext.Provider>
  );
}
