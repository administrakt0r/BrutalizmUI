function Marquee({ items }: { items: string[] }) {
  return (
    <div className="group relative flex w-full overflow-x-hidden border-b-2 border-t-2 border-border bg-secondary-background text-foreground font-base">
      <div className="animate-marquee whitespace-nowrap py-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {items.map((item, i) => {
          return (
            <span key={`${item}-${i}`} className="mx-4 text-4xl">
              {item}
            </span>
          )
        })}
      </div>

      <div
        className="absolute top-0 animate-marquee2 whitespace-nowrap py-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        aria-hidden="true"
      >
        {items.map((item, i) => {
          return (
            <span key={`${item}-${i}`} className="mx-4 text-4xl">
              {item}
            </span>
          )
        })}
      </div>

      {/* must have both of these in order to work */}
    </div>
  )
}

Marquee.displayName = "Marquee"

export { Marquee }
