import "@/styling/globals.css"

import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"

import Navbar from "@/components/app/navbar"
import { ScrollToTop } from "@/components/app/scroll-to-top"
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
    /**
     * Validates CSS color values to prevent XSS or invalid CSS injection.
     * Allows only safe characters and specific CSS color functions.
     */
    var isValidColor = function(color) {
      if (!color || color.length > 200) return false;
      if (!/^[-a-zA-Z0-9#(),.%\\s+*\\/]+$/.test(color)) return false;
      if (color.indexOf("/*") !== -1 || color.indexOf("*/") !== -1) return false;
      if (/url\\s*\\(/i.test(color) || /expression\\s*\\(/i.test(color) || /javascript:/i.test(color)) return false;
      var regex = /([a-zA-Z-]+)\\s*\\(/g;
      var match;
      var allowed = ["rgb", "rgba", "hsl", "hsla", "oklch", "var", "color-mix", "light-dark", "calc", "min", "max", "clamp"];

      while ((match = regex.exec(color)) !== null) {
        if (allowed.indexOf(match[1].toLowerCase()) === -1) return false;
      }
      return true;
    };

    /**
     * Validates numeric values for CSS properties like border-radius.
     * Supports negative numbers and decimals.
     * Also checks for reasonable ranges to prevent UI defacement.
     */
    var isValidNumber = function(value, min, max) {
      if (!value || value.length > 50) return false;
      if (!/^-?[0-9]+(\\.[0-9]+)?$/.test(value)) return false;
      var num = parseFloat(value);
      return (min === undefined || num >= min) && (max === undefined || num <= max);
    };

    /**
     * Blocks sensitive keys to prevent prototype pollution.
     */
    var isSafeKey = function(key) {
      var k = key.toLowerCase();
      return ["__proto__", "constructor", "prototype", "__definegetter__", "__definesetter__", "__lookupgetter__", "__lookupsetter__"].indexOf(k) === -1;
    };

    // Load styling preferences from localStorage
    var colorJson = localStorage.getItem("color");
    // Limit length to 1000 characters to prevent potential thread blocking with malformed data.
    var colorObj = (colorJson && colorJson.length < 1000) ? JSON.parse(colorJson) : null;
    var borderRadius = localStorage.getItem("borderRadius");
    // Limit length to 100 characters to prevent DoS from malformed data.
    var boxShadow = localStorage.getItem("boxShadow");
    if (boxShadow && boxShadow.length > 100) boxShadow = null;
    var fontWeight = localStorage.getItem("fontWeight");
    if (fontWeight && fontWeight.length > 100) fontWeight = null;
    var r = document.documentElement;
    var theme = localStorage.getItem("theme");
    var isDark = theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);

    // Apply colors if they exist and are valid.
    // Ensure colorObj is a plain object and not an array.
    if (colorObj && typeof colorObj === "object" && !Array.isArray(colorObj)) {
      var valid = true;
      var fields = ["darkBg", "darkMain", "darkChart1", "darkChart2", "darkChart3", "darkChart4", "darkChart5", "bg", "main", "chart1", "chart2", "chart3", "chart4", "chart5"];
      for (var i = 0; i < fields.length; i++) {
        var key = fields[i];
        if (colorObj[key] && (typeof colorObj[key] !== "string" || !isValidColor(colorObj[key]) || !isSafeKey(key))) {
            valid = false;
            break;
        }
      }

      if (valid) {
        var setProp = function(name, val) {
          if (val) r.style.setProperty(name, val);
        };

        // Apply dark or light theme colors
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

        // Always set these properties to enable smooth theme switching
        setProp("--dark-background", colorObj.darkBg);
        setProp("--dark-main", colorObj.darkMain);
        setProp("--light-background", colorObj.bg);
        setProp("--light-main", colorObj.main);
      }
    }

    // Apply border radius (max 50px)
    if (borderRadius && isValidNumber(borderRadius, 0, 50)) {
      r.style.setProperty("--border-radius", borderRadius + "px");
    }

    // Apply box shadow (-50px to 50px)
    if (boxShadow) {
      var bs = boxShadow.split(",");
      if (bs.length === 2 && isValidNumber(bs[0], -50, 50) && isValidNumber(bs[1], -50, 50)) {
        r.style.setProperty("--box-shadow-x", bs[0] + "px");
        r.style.setProperty("--box-shadow-y", bs[1] + "px");
      }
    }

    // Apply font weight (100 to 1000)
    if (fontWeight) {
      var fw = fontWeight.split(",");
      if (fw.length === 2 && isValidNumber(fw[0], 100, 1000) && isValidNumber(fw[1], 100, 1000)) {
        r.style.setProperty("--heading-font-weight", fw[0]);
        r.style.setProperty("--base-font-weight", fw[1]);
      }
    }
  } catch (e) {
    // Silent failure is intentional to prevent blocking critical page rendering
    // if localStorage is inaccessible or contains invalid/corrupted data.
  }
})()`

// ⚡ Bolt: Hoist static JSON-LD objects to the module level to ensure stable references
// and eliminate redundant object allocations during React's render cycles.
const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://brutalizmui.pages.dev/#software",
  name: "BrutalizmUI",
  softwareVersion: "1.0.0",
  description:
    "A collection of neobrutalism-styled components based on shadcn/ui.",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "UI Library",
  operatingSystem: "Web",
  screenshot: "https://brutalizmui.pages.dev/preview.png",
  author: {
    "@type": "Person",
    name: "Samuel Breznjak",
    url: "https://github.com/ekmas",
  },
  url: "https://brutalizmui.pages.dev/",
  isPartOf: {
    "@type": "CreativeWorkSeries",
    "@id": "https://brutalizmui.pages.dev/#design-system",
    name: "BrutalizmUI Design System",
    url: "https://brutalizmui.pages.dev/",
  },
  isAccessibleForFree: true,
  maintainer: {
    "@type": "Person",
    name: "administrakt0r",
    url: "https://github.com/administrakt0r",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  image: "https://brutalizmui.pages.dev/preview.png",
  publisher: {
    "@type": "Organization",
    name: "BrutalizmUI",
    logo: {
      "@type": "ImageObject",
      url: "https://brutalizmui.pages.dev/favicon.ico",
    },
  },
  dateModified: "2026-03-18T00:00:00Z",
  keywords: "neobrutalism, react components, tailwind css 4, shadcn ui, data visualization, accessible ui",
  featureList: [
    "Neobrutalism Aesthetic",
    "Tailwind CSS 4 Integration",
    "Accessible Radix UI Primitives",
    "Shadcn-compatible Registry",
    "Dark Mode Support",
    "Developer Ownership Philosophy",
    "Server Component Optimized",
    "CLI Integration",
    "WCAG 2.1 Compliant",
    "Zero Dependency Visual Layer",
  ],
  potentialAction: {
    "@type": "SearchAction",
    target: "https://brutalizmui.pages.dev/docs?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://brutalizmui.pages.dev/#org",
  name: "BrutalizmUI",
  url: "https://brutalizmui.pages.dev/",
  logo: "https://brutalizmui.pages.dev/favicon.ico",
  description:
    "An open-source library of neobrutalism-styled React components built with Tailwind CSS and Shadcn/ui.",
  foundingDate: "2024",
  founders: [
    {
      "@type": "Person",
      name: "Samuel Breznjak",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "technical support",
    email: "samuelbreznjak35@gmail.com",
    url: "https://x.com/samuelbreznjak",
  },
  sameAs: [
    "https://github.com/administrakt0r/brutalizmUI",
    "https://x.com/samuelbreznjak",
  ],
}

const softwareSourceCodeJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "@id": "https://brutalizmui.pages.dev/#sourcecode",
  name: "BrutalizmUI Source Code",
  description:
    "The source code for BrutalizmUI, a neobrutalism-styled component library.",
  codeRepository: "https://github.com/administrakt0r/brutalizmUI",
  programmingLanguage: {
    "@type": "ComputerLanguage",
    name: "TypeScript",
  },
  runtimePlatform: "Node.js",
  license: "https://opensource.org/licenses/MIT",
  author: {
    "@type": "Person",
    name: "Samuel Breznjak",
  },
  targetProduct: { "@id": "https://brutalizmui.pages.dev/#software" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(softwareSourceCodeJsonLd),
          }}
        />
      </head>
      <body className={dmSans.className}>
        <a
          href="#main-content"
          aria-label="Skip to main content"
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
