import ScrollRevealBlock from './ScrollRevealBlock'


interface Props {
  text: string
  author: string
  variant?: 'default' | 'reddit'
}

export default function QuoteCard({ text, author }: Props) {
  return (
    <ScrollRevealBlock className="relative py-8 px-4 group max-w-2xl">
      {/* Editorial Quote Mark */}
      <div className="absolute -top-6 -left-4 text-[160px] font-serif text-white/[0.03] select-none group-hover:text-white/[0.06] transition-colors duration-1000 leading-none">
        “
      </div>
      
      <p className="text-base sm:text-lg leading-relaxed text-white/80 relative z-10 font-light italic">
        {text}
      </p>
      
      <div className="mt-8 flex items-center gap-4 relative z-10">
        <div className="h-px w-6 bg-white/10 group-hover:w-10 transition-all duration-700" />
        <p className="text-journal-metadata opacity-40 group-hover:opacity-60 transition-opacity">
          {author}
        </p>
      </div>
    </ScrollRevealBlock>
  )
}
