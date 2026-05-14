export function FounderStory() {
  return (
    <section className="mt-12 grid items-center gap-8 lg:grid-cols-2">
      {/* Image */}
      <div className="relative">
        <div className="absolute -left-3 -top-3 h-full w-full rounded-xl bg-primary/20" />
        <div className="relative overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop"
            alt="Founder"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="mb-4 h-1 w-12 bg-primary" />
        <h2 className="font-serif text-2xl font-bold text-foreground">The Spark</h2>
        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            It started in a windowless community center in 2018. I met Elena, a mother of 
            three who had lived in our city for twelve years. She was the heart of her 
            neighborhood, yet because of her &quot;pending&quot; status, she had no channel to 
            report a dangerous intersection near her children&apos;s school.
          </p>
          <p>
            I realized then that &quot;legal limbo&quot; isn&apos;t just a bureaucratic state—it&apos;s a form 
            of silence. Voice For All was founded to provide that channel. We aren&apos;t just 
            an app; we are a megaphone for the marginalized.
          </p>
        </div>
        <p className="mt-6 font-medium text-foreground italic">
          — Sarah Al-Mansouri, Founder
        </p>
      </div>
    </section>
  )
}
