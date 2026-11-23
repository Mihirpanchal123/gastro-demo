import { Quote, Star } from "lucide-react";

const reviews = [
  {
    text: "I'd been living with acidity for years. One visit, one endoscopy, and finally a real answer. The whole process took less than a morning.",
    name: "Sample Patient",
    meta: "GERD treatment",
  },
  {
    text: "The doctor explained my liver report like a friend would. No jargon, no rushing. I left with a plan I actually understood.",
    name: "Sample Patient",
    meta: "Fatty liver care",
  },
  {
    text: "I was nervous about the colonoscopy. I remember nothing of it — just waking up to a calm nurse and a report on my phone.",
    name: "Sample Patient",
    meta: "Screening colonoscopy",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="reveal flex flex-col justify-between rounded-[2rem] bg-teal p-9 text-white">
          <div>
            <p className="text-sm font-medium tracking-widest text-mint uppercase">Patient stories</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">
              Trusted by thousands of <span className="font-serif font-normal italic">families.</span>
            </h2>
          </div>
          <div className="mt-12">
            <p className="text-7xl font-semibold tracking-tighter">4.9</p>
            <div className="mt-2 flex gap-1 text-mint">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className="mt-2 text-sm text-white/70">Average rating across 2,400+ reviews</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className={`reveal flex flex-col justify-between rounded-[2rem] border border-ink/8 bg-white p-8 ${
                i === 0 ? "sm:col-span-2" : ""
              }`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <Quote className="h-8 w-8 text-coral" />
              <blockquote className={`mt-5 leading-relaxed text-ink/80 ${i === 0 ? "font-serif text-2xl sm:text-3xl" : ""}`}>
                {r.text}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-mist text-sm font-semibold text-teal">
                  SP
                </span>
                <span>
                  <span className="block text-sm font-medium">{r.name}</span>
                  <span className="block text-xs text-ink/50">{r.meta}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
