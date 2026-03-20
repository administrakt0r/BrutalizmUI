import { Marquee } from "@devnomic/marquee"
import { ArrowUpRight } from "lucide-react"

import * as React from "react"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"

import reviews from "@/data/reviews"

import {
  CustomizableIcon,
  OpenSourceIcon,
  ShadcnIcon,
  TailwindIcon,
} from "@/components/app/home-icons"
import ReviewCard from "@/components/app/review-card"
import Star8 from "@/components/stars/s8"
import Star9 from "@/components/stars/s9"
import Star11 from "@/components/stars/s11"
import Star14 from "@/components/stars/s14"
import Star16 from "@/components/stars/s16"
import Star20 from "@/components/stars/s20"
import Star22 from "@/components/stars/s22"
import Star26 from "@/components/stars/s26"
import Star29 from "@/components/stars/s29"
import Star32 from "@/components/stars/s32"
import Star37 from "@/components/stars/s37"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { safeJsonLd } from "@/lib/security"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

// ⚡ Bolt: Lazy load heavy interactive component with loading placeholder to minimize CLS
const StylingCustomizer = dynamic(
  () => import("@/components/app/styling-customizer"),
  {
    loading: () => (
      <div className="mx-auto mt-10 h-[500px] w-[1000px] max-w-full animate-pulse rounded-base border-2 border-border bg-secondary-background shadow-shadow" />
    ),
  },
)

// ⚡ Bolt: Memoize Marquee items to prevent re-renders during animation
const MarqueeStarRow = React.memo(() => (
  <div className="flex items-center md:gap-[50px] gap-[35px] xl:[&_span]:text-3xl md:[&_span]:text-2xl sm:[&_span]:text-xl [&_span]:text-base lg:[&_svg]:size-[50px] md:[&_svg]:size-10 [&_svg]:size-[30px]">
    <span>BrutalizmUI</span>
    <Star32 aria-hidden="true" className="text-foreground" />
    <span>BrutalizmUI</span>
    <Star22
      aria-hidden="true"
      stroke="black"
      strokeWidth={6}
      color="var(--main)"
    />
    <span>BrutalizmUI</span>
    <Star11 aria-hidden="true" className="text-foreground" />
    <span>BrutalizmUI</span>
    <Star26
      aria-hidden="true"
      color="var(--main)"
      stroke="black"
      strokeWidth={7}
    />
  </div>
))
MarqueeStarRow.displayName = "MarqueeStarRow"

const MarqueeStarRowReverse = React.memo(() => (
  <div className="flex items-center md:gap-[50px] gap-[35px] xl:[&_span]:text-3xl md:[&_span]:text-2xl sm:[&_span]:text-xl [&_span]:text-base lg:[&_svg]:size-[50px] md:[&_svg]:size-10 [&_svg]:size-[30px]">
    <span>BrutalizmUI</span>
    <Star29 aria-hidden="true" className="text-foreground" />
    <span>BrutalizmUI</span>
    <Star37
      aria-hidden="true"
      stroke="black"
      strokeWidth={6}
      color="var(--main)"
    />
    <span>BrutalizmUI</span>
    <Star16 aria-hidden="true" className="text-foreground" />
    <span>BrutalizmUI</span>
    <Star8
      aria-hidden="true"
      color="var(--main)"
      stroke="black"
      strokeWidth={7}
    />
  </div>
))
MarqueeStarRowReverse.displayName = "MarqueeStarRowReverse"

// ⚡ Bolt: Define static data outside the component to eliminate redundant work on every render.
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are these components accessible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most of the components are based on shadcn/ui, which means they are accessible because under the hood they use radix-ui which is fully accessible.",
      },
    },
    {
      "@type": "Question",
      name: "Why copy/paste and not packaged as a dependency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BrutalizmUI follows the shadcn/ui philosophy of giving you ownership and control over the code. This allows you to decide how components are built and styled, separating implementation from design without the coupling typical of npm packages.",
      },
    },
    {
      "@type": "Question",
      name: "How to contribute to BrutalizmUI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can contribute by visiting the project repository on GitHub and following the contributing.md guidelines. We welcome collaboration and adoption of the neobrutalism aesthetic.",
      },
    },
    {
      "@type": "Question",
      name: "Does BrutalizmUI support Tailwind CSS 4?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, BrutalizmUI is built with Tailwind CSS 4, utilizing its native CSS variables and @theme blocks for efficient and modern styling.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Copy-Paste Ownership model?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Copy-Paste Ownership model encourages developers to copy component source code directly into their projects. This ensures full control, zero dependency bloat, and the ability to customize components without being tied to a third-party library's release cycle.",
      },
    },
    {
      "@type": "Question",
      name: "How can AI agents search the component registry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI agents can programmatically discover all available neobrutalism components by fetching the registry index at https://brutalizmui.pages.dev/registry.json. This allows for automated identification and installation of specific primitives.",
      },
    },
  ],
}

const WEB_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "BrutalizmUI - Neobrutalism UI Library",
  description:
    "An open-source library of neobrutalism-styled components based on shadcn/ui and Tailwind CSS.",
  url: "https://brutalizmui.pages.dev/",
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
}

const REVIEW_GROUPS = [
  [reviews[0], reviews[1]],
  [reviews[2], reviews[3], reviews[4]],
  [reviews[5], reviews[6]],
]

// ⚡ Bolt: Hoist static array to the module level to ensure a stable reference
// and eliminate redundant array allocations during React's render cycles.
const REVIEWS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Developer Testimonials",
  itemListElement: reviews.map((review, index) => ({
    "@type": "Review",
    position: index + 1,
    author: {
      "@type": "Person",
      name: review.fullName,
      jobTitle: review.jobTitle,
    },
    reviewBody: review.review,
    publisher: {
      "@type": "Organization",
      name: "BrutalizmUI",
    },
  })),
}

const MARQUEE_ITEMS = Array.from({ length: 7 })

export default function Home() {
  return (
    <div className="text-foreground font-base prose-headings:font-heading prose-h1:2xl:text-6xl prose-h1:xl:text-5xl prose-h1:md:text-5xl prose-h1:sm:text-[33px] prose-h1:text-2xl prose-h2:2xl:text-4xl prose-h2:lg:text-4xl prose-h2:md:text-3xl prose-h2:text-2xl prose-h3:2xl:text-4xl prose-h3:xl:text-3xl prose-h3:lg:text-3xl prose-h3:md:text-2xl prose-h3:sm:text-xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(WEB_PAGE_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(FAQ_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(REVIEWS_JSON_LD) }}
      />
      <main
        id="main-content"
        className="relative flex min-h-[100dvh] flex-col items-center justify-center bg-background px-5 md:py-[200px] py-[100px] bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]"
      >
        <div className="mx-auto w-container max-w-full">
          <div className="flex flex-col items-center text-center">
            <h1 className="leading-normal">
              Get started with creating <br />{" "}
              <span className="relative px-2 sm:mr-2 mr-0 md:[&_svg]:size-[45px] sm:[&_svg]:size-7 bg-main/50 rounded-base border-2 border-border/40 dark:border-border/70">
                neobrutalism
                <Star9
                  aria-hidden="true"
                  className="absolute sm:block hidden md:-bottom-4 md:-right-5 -bottom-2.5 -right-2.5"
                  color="var(--main)"
                  pathClassName="stroke-5 dark:stroke-3.5 stroke-black dark:stroke-black/70"
                />
                <Star9
                  aria-hidden="true"
                  className="absolute sm:block hidden md:-top-4 md:-left-5 -top-2.5 -left-2.5"
                  color="var(--main)"
                  pathClassName="stroke-5 dark:stroke-3.5 stroke-black dark:stroke-black/70"
                />
              </span>{" "}
              layouts.
            </h1>

            <p className="leading-snug w-full md:mt-[50px] md:mb-[60px] sm:mt-12 my-9 sm:mb-10 2xl:text-3xl xl:text-2xl lg:text-2xl xl:w-full lg:w-2/3 md:w-full md:text-2xl sm:text-xl text-xl">
              BrutalizmUI is a high-performance, open-source library of
              neobrutalism-styled components built with Next.js 16, Tailwind CSS
              4, and Radix UI. Optimized for speed and GEO, it offers a
              copy-paste ownership model for maximum developer control and zero
              dependency bloat.
            </p>

            <Link
              className="flex items-center gap-2.5 w-max text-main-foreground rounded-base border-2 border-border bg-main md:px-10 px-4 md:py-3 py-2 md:text-[22px] text-base shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
              href={"/docs"}
              aria-label="Read the documentation"
            >
              Read the docs
              <ArrowUpRight
                aria-hidden="true"
                className="md:size-[30px] size-5"
              />
            </Link>
          </div>
        </div>
      </main>
      <div>
        <Marquee
          className="border-t-4 border-border md:[&_.animate-marquee-left]:gap-[50px]! [&_.animate-marquee-left]:gap-[35px]! bg-secondary-background md:py-4 py-3"
          direction="left"
          aria-label="BrutalizmUI decorative banner"
        >
          {MARQUEE_ITEMS.map((_, id) => (
            <MarqueeStarRow key={id} />
          ))}
        </Marquee>
        <div className="grid grid-cols-1 md:grid-cols-2 border-b-4 border-t-4 border-border">
          <section className="border-b-4 md:border-r-4 border-border md:bg-background 2xl:p-14 2xl:py-16 xl:p-10 xl:py-10 lg:p-8 lg:py-10 p-5 py-7 border-r-0 bg-main md:text-foreground text-main-foreground">
            <div className="flex items-center sm:gap-6 gap-4 sm:mb-6 mb-4">
              <div className="xl:size-[70px] lg:size-[55px] sm:size-12 size-10 flex items-center justify-center">
                <TailwindIcon />
              </div>

              <h2 className="xl:text-3xl lg:text-2xl sm:text-xl text-lg font-heading">
                Built with Tailwind CSS 4
              </h2>
            </div>

            <p className="2xl:text-2xl xl:text-xl md:text-base sm:text-lg text-base">
              These components efficiently utilize Tailwind and its versatile
              utility classes, enabling swift and straightforward styling.
            </p>
          </section>
          <section className="border-b-4 border-border md:text-main-foreground md:dark:text-main-foreground md:bg-main text-main-foreground dark:text-foreground 2xl:p-14 2xl:py-16 xl:p-10 xl:py-10 lg:p-8 lg:py-10 p-5 py-7 bg-background">
            <div className="flex items-center sm:gap-6 gap-4 sm:mb-6 mb-4">
              <div className="xl:size-[70px] lg:size-[55px] sm:size-12 size-10 flex items-center justify-center">
                <OpenSourceIcon />
              </div>

              <h2 className="xl:text-3xl lg:text-2xl sm:text-xl text-lg font-heading">
                Open Source and Community-Driven
              </h2>
            </div>

            <p className="2xl:text-2xl xl:text-xl md:text-base sm:text-lg text-base">
              This project is open source with an MIT License, fostering
              collaboration and allowing widespread adoption and modification.
            </p>
          </section>
          <section className="md:border-r-4 md:border-b-0 border-border bg-main dark:text-main-foreground 2xl:p-14 2xl:py-16 xl:p-10 xl:py-10 lg:p-8 lg:py-10 p-5 py-7 border-b-4">
            <div className="flex items-center sm:gap-6 gap-4 sm:mb-6 mb-4">
              <div className="xl:size-[70px] lg:size-[55px] sm:size-12 size-10 flex items-center justify-center">
                <ShadcnIcon />
              </div>

              <h2 className="xl:text-3xl lg:text-2xl sm:text-xl text-lg font-heading">
                Architected with Shadcn/ui
              </h2>
            </div>

            <p className="2xl:text-2xl xl:text-xl md:text-base sm:text-lg text-base">
              Most of the components are based on shadcn/ui, meaning
              high-quality components with best practices.
            </p>
          </section>
          <section className="bg-background 2xl:p-14 2xl:py-16 xl:p-10 xl:py-10 lg:p-8 lg:py-10 p-5 py-7">
            <div className="flex items-center sm:gap-6 gap-4 sm:mb-6 mb-4">
              <div className="xl:size-[70px] lg:size-[55px] sm:size-12 size-10 flex items-center justify-center">
                <CustomizableIcon />
              </div>

              <h2 className="xl:text-3xl lg:text-2xl sm:text-xl text-lg font-heading">
                Extensively Customizable Primitives
              </h2>
            </div>

            <p className="2xl:text-2xl xl:text-xl md:text-base sm:text-lg text-base">
              You can easily customize these components to suit your needs.
            </p>
          </section>
        </div>
        <section className="border-b-4 border-b-border bg-background py-16 lg:py-[100px]">
          <h2 className="mb-5 px-5 text-center">
            Dynamic Customization for Neobrutalism Themes
          </h2>

          <p className="text-center px-5 xl:text-xl md:text-lg sm:text-base text-sm">
            You can customize the styling of the components to your liking.
            Visit{" "}
            <Link className="underline font-heading" href={"/styling"}>
              styling page
            </Link>{" "}
            to see the available options.
          </p>

          <StylingCustomizer />
        </section>
        <section className="inset-0 flex relative overflow-hidden w-full px-5 flex-col items-center justify-center bg-secondary-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] z-0">
          <Star20
            aria-hidden="true"
            color="var(--main)"
            stroke="black"
            strokeWidth={3}
            size={250}
            className="absolute top-[120px] lg:block hidden -left-[125px] -z-10"
          />
          <Star14
            aria-hidden="true"
            color="var(--main)"
            stroke="black"
            strokeWidth={3}
            size={250}
            className="absolute bottom-[120px] lg:block hidden -right-[125px] -z-10"
          />
          <div className="mx-auto w-container max-w-full py-16 lg:py-[100px]">
            <h2 className="sm:mb-20 mb-14 text-center">
              Developer Testimonials and Community Feedback
            </h2>
            <div className="grid-cols-1 grid lg:grid-cols-3 gap-0 lg:gap-8">
              {REVIEW_GROUPS.map((card, index) => (
                <div className="group flex flex-col justify-center" key={index}>
                  {card.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="border-t-4 z-0 border-t-border border-b-4 border-b-border bg-background py-16 lg:py-[100px]">
          <h2 className="sm:mb-20 mb-14 px-5 text-center">
            Technical FAQ and Common Inquiries
          </h2>

          <div className="mx-auto not-prose grid w-[700px] max-w-full px-5">
            <Accordion
              className="text-base sm:text-lg"
              type="single"
              collapsible
            >
              <AccordionItem className="mb-2" value="item-2">
                <AccordionTrigger className="text-left">
                  Are these components accessible?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base">
                  Most of the components are based on shadcn/ui, which means
                  they are accessible because under the hood they use radix-ui
                  which is fully accessible.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className="mb-2" value="item-3">
                <AccordionTrigger className="text-left">
                  Why copy/paste and not packaged as a dependency?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base">
                  I like shadcn&apos;s philosophy about component libraries,
                  I&apos;ll quote what he said about this:
                  <br />
                  <q className="mt-5 block">
                    The idea behind this is to give you ownership and control
                    over the code, allowing you to decide how the components are
                    built and styled. Start with some sensible defaults, then
                    customize the components to your needs. One of the drawback
                    of packaging the components in an npm package is that the
                    style is coupled with the implementation. The design of your
                    components should be separate from their implementation.
                  </q>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  How to contribute?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base">
                  Visit{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Read the contributing guidelines on GitHub"
                    className="underline font-heading"
                    href="https://github.com/ekmas/neobrutalism-components/blob/main/CONTRIBUTING.md"
                  >
                    contributing.md
                  </a>{" "}
                  to get started.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <Marquee
          className="border-b-4 border-border md:[&_.animate-marquee-left]:gap-[50px]! [&_.animate-marquee-left]:gap-[35px]! bg-secondary-background md:py-4 py-3"
          direction="left"
          reverse
          aria-label="BrutalizmUI decorative banner reverse"
        >
          {MARQUEE_ITEMS.map((_, id) => (
            <MarqueeStarRowReverse key={id} />
          ))}
        </Marquee>
        <section className="inset-0 w-full flex flex-col items-center justify-center bg-main  bg-[linear-gradient(to_right,#00000033_1px,transparent_1px),linear-gradient(to_bottom,#00000033_1px,transparent_1px)] bg-[size:70px_70px] px-5 lg:py-[200px] md:py-[150px] sm:py-[100px] py-[100px]">
          <h2 className="text-center font-heading not-prose 2xl:text-5xl xl:text-5xl md:text-4xl sm:text-3xl text-[22px] text-main-foreground mb-12">
            Begin Your BrutalizmUI Development Journey
          </h2>

          <Link
            className="flex items-center gap-2.5 w-max text-foreground rounded-base border-2 border-border bg-background dark:bg-secondary-background md:px-10 px-4 md:py-3 py-2 md:text-[22px] text-base shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
            href={"/docs"}
            aria-label="Read the documentation"
          >
            Read the docs
            <ArrowUpRight
              aria-hidden="true"
              className="md:size-[30px] size-5"
            />
          </Link>
        </section>
      </div>
      <footer className="z-30 border-t-4 border-border bg-secondary-background px-5 py-5 text-center sm:text-base text-sm">
        Released under MIT License. BrutalizmUI is a rebrand of{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit original Neobrutalism Components repository on GitHub"
          href="https://github.com/ekmas/neobrutalism-components"
          className="underline font-heading"
        >
          Neobrutalism Components
        </a>{" "}
        by Samuel Breznjak. Maintained by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit maintained by administrakt0r on GitHub"
          href="https://github.com/administrakt0r"
          className="underline font-heading"
        >
          administrakt0r
        </a>
        . Original source on{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View original source on GitHub"
          href="https://github.com/ekmas/neobrutalism-components"
          className="underline font-heading"
        >
          GitHub
        </a>
        , and this fork on{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View this fork on GitHub"
          href="https://github.com/administrakt0r/brutalizmUI/"
          className="underline font-heading"
        >
          GitHub
        </a>
        .
      </footer>
    </div>
  )
}
