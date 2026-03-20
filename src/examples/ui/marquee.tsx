import { Marquee } from "@/components/ui/marquee"

export default function MarqueeDemo() {
  return (
    <div className="space-y-8">
      {/* Simple items usage */}
      <Marquee items={["Neobrutalism", "Tailwind CSS", "React", "Next.js", "Shadcn/ui"]} />

      {/* Complex children usage */}
      <Marquee className="bg-main text-main-foreground border-main">
        <div className="flex items-center gap-8 px-4 py-2 text-2xl font-heading">
          <span>COMPONENTS</span>
          <span className="size-4 rounded-full bg-main-foreground" />
          <span>TEMPLATES</span>
          <span className="size-4 rounded-full bg-main-foreground" />
          <span>STARS</span>
          <span className="size-4 rounded-full bg-main-foreground" />
          <span>CHARTS</span>
          <span className="size-4 rounded-full bg-main-foreground" />
        </div>
      </Marquee>
    </div>
  )
}
