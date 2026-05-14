export default function InfoView() {
  return (
    <div className="max-w-3xl mx-auto space-y-16 sm:space-y-24 animate-fade-in pt-12 px-6">
      <section>
        <h2 className="text-xs font-bold tracking-widest uppercase text-text-muted mb-8">Who</h2>
        <div className="space-y-6 text-base sm:text-lg text-text-main leading-relaxed">
          <p>I'm Władysław — a full-stack engineer with a cybersecurity background and an unhealthy interest in how systems fail.</p>
          <p>I started writing code at 9. My first language was Java, not because anyone suggested it, but because it was the first thing I found in a library book. By 14, I'd taken on my first commercial project. Since then, the work hasn't really stopped — it's just gotten more interesting.</p>
          <p>I study at University Name, where I was exempted from all programming-related courses with full marks. I now give lectures in the science club there, mostly on topics I find genuinely worth explaining.</p>
          <p>Outside work: years of CTFs and HackTheBox, security consulting for startups, and the occasional workshop where I show students how software gets broken — and how to build it so it doesn't.</p>
        </div>
      </section>

      <hr className="border-border" />

      <section>
        <h2 className="text-xs font-bold tracking-widest uppercase text-text-muted mb-8">Approach</h2>
        <div className="space-y-6 text-base sm:text-lg text-text-main leading-relaxed">
          <p>I use a product-based approach. That means every technical decision I make is traceable back to an outcome — for the user, the business, or both.</p>
          <p>I've spent a lot of time studying productivity, not as a lifestyle concept but as an engineering problem. I track my own data, run experiments on my workflow, and treat personal performance the same way I treat system performance: iterate, measure, improve.</p>
          <p>I care about security at the architecture level — not as a checklist you run at the end, but as a constraint you design around from the start.</p>
        </div>
      </section>

      <hr className="border-border" />

      <section>
        <h2 className="text-xs font-bold tracking-widest uppercase text-text-muted mb-8">Experience</h2>
        <ul className="space-y-4 text-sm sm:text-base text-text-main">
          <li className="grid grid-cols-[70px_1fr] sm:grid-cols-[80px_1fr] gap-3 sm:gap-4"><span className="text-text-muted">'24–'25</span> <span>Freelance engineering — full-stack projects, security consulting, DevOps work</span></li>
          <li className="grid grid-cols-[70px_1fr] sm:grid-cols-[80px_1fr] gap-3 sm:gap-4"><span className="text-text-muted">'23–now</span> <span>CTF competitor & cybersecurity community co-owner</span></li>
          <li className="grid grid-cols-[70px_1fr] sm:grid-cols-[80px_1fr] gap-3 sm:gap-4"><span className="text-text-muted">'22–now</span> <span>Science club lecturer, University Name</span></li>
          <li className="grid grid-cols-[70px_1fr] sm:grid-cols-[80px_1fr] gap-3 sm:gap-4"><span className="text-muted">'22</span> <span>First DevOps engagement — CI/CD infrastructure for a production client</span></li>
          <li className="grid grid-cols-[70px_1fr] sm:grid-cols-[80px_1fr] gap-3 sm:gap-4"><span className="text-text-muted">'18</span> <span>First commercial project</span></li>
          <li className="grid grid-cols-[70px_1fr] sm:grid-cols-[80px_1fr] gap-3 sm:gap-4"><span className="text-text-muted">'09</span> <span>Started writing code</span></li>
        </ul>
      </section>
    </div>
  )
}
