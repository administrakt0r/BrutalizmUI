import "@/styling/globals.css"

import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"

import Navbar from "@/components/app/navbar"
import ScrollToTop from "@/components/app/scroll-to-top"
import { ThemeProvider } from "@/components/app/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

import { safeJsonLd } from "@/lib/security"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "BrutalizmUI - Start making neobrutalism layouts today",
    template: `%s - BrutalizmUI`,
  },
  description:
    "A collection of neobrutalism-styled components based on shadcn/ui.",
  keywords: [
    "neobrutalism",
    "BrutalizmUI",
    "neobrutalism tailwind",
    "react neobrutalism",
    "react tailwind components",
    "shadcn components",
    "shadcn neobrutalism",
  ],
  authors: [{ name: "Samuel Breznjak", url: "https://github.com/ekmas" }],
  openGraph: {
    type: "website",
    description:
      "A collection of neobrutalism-styled components based on shadcn/ui.",
    images: ["https://brutalizmui.pages.dev/preview.png"],
    url: "https://brutalizmui.pages.dev/",
    title: "BrutalizmUI",
  },
  metadataBase: new URL("https://brutalizmui.pages.dev/"),
  twitter: {
    card: "summary_large_image",
    title: "BrutalizmUI - Start making neobrutalism layouts",
    description:
      "A collection of neobrutalism-styled components based on shadcn/ui.",
    images: ["https://brutalizmui.pages.dev/preview.png"],
    creator: "@samuelbreznjak",
  },
}

const stylingScript = `(function() {
  try {
    var isValidColor = function(color) {
      if (!/^[-a-zA-Z0-9#(),.%\s+*\/]+$/.test(color)) return false;
      var regex = /([a-zA-Z-]+)\\s*\\(/g;
      var match;
      var allowed = ["rgb", "rgba", "hsl", "hsla", "oklch", "var", "color-mix", "light-dark", "calc", "min", "max", "clamp"];

      while ((match = regex.exec(color)) !== null) {
        if (allowed.indexOf(match[1].toLowerCase()) === -1) return false;
      }
      return true;
    };
    var isValidNumber = function(value) {
      return /^[0-9.]+$/.test(value);
    };

    var colorObj = JSON.parse(localStorage.getItem("color"));
    var borderRadius = localStorage.getItem("borderRadius");
    var boxShadow = localStorage.getItem("boxShadow");
    var fontWeight = localStorage.getItem("fontWeight");
    var r = document.documentElement;
    var theme = localStorage.getItem("theme");
    var isDark = theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (colorObj) {
      var valid = true;
      var fields = ["darkBg", "darkMain", "darkChart1", "darkChart2", "darkChart3", "darkChart4", "darkChart5", "bg", "main", "chart1", "chart2", "chart3", "chart4", "chart5"];
      for (var i = 0; i < fields.length; i++) {
        var key = fields[i];
        if (colorObj[key] && !isValidColor(colorObj[key])) {
            valid = false;
            break;
        }
      }

      if (valid) {
        var setProp = function(name, val) {
          if (val) r.style.setProperty(name, val);
        };

        if (isDark) {
          setProp("--background", colorObj.darkBg);
          setProp("--main", colorObj.darkMain);
          setProp("--chart-1", colorObj.darkChart1);
          setProp("--chart-2", colorObj.darkChart2);
          setProp("--chart-3", colorObj.darkChart3);
          setProp("--chart-4", colorObj.darkChart4);
          setProp("--chart-5", colorObj.darkChart5);
        } else {
          setProp("--background", colorObj.bg);
          setProp("--main", colorObj.main);
          setProp("--chart-1", colorObj.chart1);
          setProp("--chart-2", colorObj.chart2);
          setProp("--chart-3", colorObj.chart3);
          setProp("--chart-4", colorObj.chart4);
          setProp("--chart-5", colorObj.chart5);
        }
        setProp("--dark-background", colorObj.darkBg);
        setProp("--dark-main", colorObj.darkMain);
        setProp("--light-background", colorObj.bg);
        setProp("--light-main", colorObj.main);
      }
    }
    if (borderRadius && isValidNumber(borderRadius)) {
      r.style.setProperty("--border-radius", borderRadius + "px");
    }
    if (boxShadow) {
      var bs = boxShadow.split(",");
      if (bs.length === 2 && isValidNumber(bs[0]) && isValidNumber(bs[1])) {
        r.style.setProperty("--box-shadow-x", bs[0] + "px");
        r.style.setProperty("--box-shadow-y", bs[1] + "px");
      }
    }
    if (fontWeight) {
      var fw = fontWeight.split(",");
      if (fw.length === 2 && isValidNumber(fw[0]) && isValidNumber(fw[1])) {
        r.style.setProperty("--heading-font-weight", fw[0]);
        r.style.setProperty("--base-font-weight", fw[1]);
      }
    }
  } catch (e) {}
})()`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BrutalizmUI",
    description:
      "A collection of neobrutalism-styled components based on shadcn/ui.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: "Samuel Breznjak",
      url: "https://github.com/ekmas",
    },
    url: "https://brutalizmui.pages.dev/",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BrutalizmUI",
    url: "https://brutalizmui.pages.dev/",
    logo: "https://brutalizmui.pages.dev/favicon.ico",
    sameAs: [
      "https://github.com/administrakt0r/brutalizmUI",
      "https://x.com/samuelbreznjak",
    ],
  }

  return (
    <html className="scroll-smooth" suppressHydrationWarning lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: stylingScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(softwareAppJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationJsonLd) }}
        />
      </head>
      <body className={dmSans.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground focus:left-0 focus:top-0 focus:border-4 focus:border-border focus:shadow-shadow"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>
            <Navbar />
            {children}
            <ScrollToTop />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
