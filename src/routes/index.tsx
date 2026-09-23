import { createFileRoute } from "@tanstack/react-router";
import heroSalgados from "@/assets/hero-salgados.jpg";
import coxinhaImg from "@/assets/coxinha.jpg";
import pastelImg from "@/assets/pastel.jpg";
import { ComboAI } from "@/components/ComboAI";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Salgados Dona Maria — Salgados Caseiros no Maranhão" },
      {
        name: "description",
        content:
          "Coxinhas de frango, carne e queijo e pastéis de carne e queijo feitos no dia e entregues quentinhos em caixas para festas e eventos no Maranhão. Encomende pelo WhatsApp.",
      },
      { property: "og:title", content: "Salgados Dona Maria — Salgados Caseiros no Maranhão" },
      {
        property: "og:description",
        content:
          "Salgados caseiros fritos na hora, em caixas prontas para encomendas, festas e eventos em todo o Maranhão.",
      },
    ],
  }),
  component: Index,
});

const menu = [
  {
    name: "Coxinha de Frango",
    desc: "Massa aerada, recheio desfiado no tempero da casa.",
    price: "R$ 1,00",
    img: coxinhaImg,
  },
  {
    name: "Coxinha de Carne",
    desc: "Carne moída temperada, massa macia e crocante por fora.",
    price: "R$ 1,00",
    img: coxinhaImg,
  },
  {
    name: "Coxinha de Queijo",
    desc: "Recheio de queijo derretido que puxa fio.",
    price: "R$ 1,00",
    img: coxinhaImg,
  },
  {
    name: "Pastel de Carne",
    desc: "Recheio de carne e cebola, massa fina e dourada.",
    price: "R$ 3,00",
    img: pastelImg,
  },
  {
    name: "Pastel de Queijo",
    desc: "Queijo cremoso na massa fininha, fritinho na hora.",
    price: "R$ 3,00",
    img: pastelImg,
  },
];

const steps = [
  {
    title: "Escolha mix e data",
    desc: "Combine seus salgados preferidos e a quantidade.",
  },
  {
    title: "Fritamos no dia",
    desc: "Tudo é preparado e frito na hora, sem congelado.",
  },
  {
    title: "Entrega quentinha",
    desc: "Caixa lacrada entregue na sua festa ou evento.",
  },
];

function Index() {
  return (
    <div
      className="min-h-screen w-full text-ink antialiased"
      style={{
        background:
          "radial-gradient(58% 55% at 12% 8%, #f6cdb0 0%, transparent 60%), radial-gradient(52% 50% at 92% 16%, #f3d98c 0%, transparent 58%), radial-gradient(72% 62% at 78% 92%, #efb06f 0%, transparent 62%), radial-gradient(58% 58% at 26% 86%, #f7e2c6 0%, transparent 60%), #fdf4e4",
      }}
    >
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-brand font-display text-lg font-semibold text-cream">
            M
          </span>
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold">Salgados Dona Maria</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/50">
              Salgados caseiros · Maranhão
            </p>
          </div>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex">
          <a href="#cardapio" className="transition-colors hover:text-brand">
            Cardápio
          </a>
          <a href="#encomendas" className="transition-colors hover:text-brand">
            Encomendas
          </a>
          <a href="#contato" className="transition-colors hover:text-brand">
            Contato
          </a>
        </nav>
        <a
          href="#encomendas"
          className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream sm:inline-block"
        >
          Peça agora
        </a>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="inline-block rounded-full border border-ink/10 bg-cream/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Frito na hora · caixa por caixa
          </span>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-tight">
            Salgados caseiros que chegam quentinhos na sua festa.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">
            Coxinhas de frango, carne e queijo e pastéis de carne e queijo feitos no dia, em caixas
            prontas para encomendas, festas e eventos em todo o Maranhão.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#cardapio"
              className="rounded-full bg-brand px-7 py-3.5 font-semibold text-cream shadow-lg shadow-brand/25 transition-colors hover:bg-brand/90"
            >
              Ver cardápio
            </a>
            <a
              href="#encomendas"
              className="rounded-full bg-ink px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-ink/90"
            >
              Fale no WhatsApp
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <p className="font-display text-3xl font-semibold">+500</p>
              <p className="text-xs uppercase tracking-widest text-ink/50">caixas/mês</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold">48h</p>
              <p className="text-xs uppercase tracking-widest text-ink/50">de antecedência</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold">4,9★</p>
              <p className="text-xs uppercase tracking-widest text-ink/50">avaliação</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-[1.75rem] bg-cream p-3 shadow-xl shadow-ink/5">
            <img
              src={heroSalgados}
              alt="Caixa de papel cheia de salgados dourados fritos na hora"
              width={886}
              height={1744}
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section id="cardapio" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              O cardápio
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
              Clássicos da casa
            </h2>
          </div>
          <a
            href="#encomendas"
            className="hidden text-sm font-semibold text-brand hover:underline sm:inline"
          >
            Cardápio completo →
          </a>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((item) => (
            <div key={item.name} className="rounded-2xl bg-cream p-3 shadow-lg shadow-ink/5">
              <img
                src={item.img}
                alt={item.name}
                width={1024}
                height={1024}
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
              <div className="p-3">
                <h3 className="font-display text-xl font-semibold">{item.name}</h3>
                <p className="mt-1 text-sm text-ink/60">{item.desc}</p>
                <p className="mt-3 font-semibold text-brand">{item.price} <span className="text-xs font-normal text-ink/50">/ unidade</span></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="encomendas" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-20">
        <div className="grid items-center gap-10 rounded-[2rem] bg-ink p-8 text-cream md:grid-cols-2 md:p-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Como pedir
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight">
              Caixas prontas para qualquer ocasião.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-cream/70">
              Escolha o tamanho da caixa, o mix de salgados e a data. A gente frita na hora e
              entrega quentinho no Maranhão.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["50 un.", "100 un.", "250 un.", "500+ un."].map((size) => (
                <span
                  key={size}
                  className="rounded-full border border-cream/15 bg-cream/10 px-4 py-2 text-sm"
                >
                  {size}
                </span>
              ))}
            </div>
            <a
              href="#contato"
              className="mt-8 inline-block rounded-full bg-brand px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-brand/90"
            >
              Montar minha caixa
            </a>
          </div>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex gap-4 rounded-2xl border border-cream/10 bg-cream/5 p-5"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold font-display font-semibold text-ink">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{step.title}</p>
                  <p className="text-sm text-cream/60">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ComboAI />

      <footer
        id="contato"
        className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-10 sm:flex sm:items-center sm:justify-between"
      >
        <p className="text-sm text-ink/60">© 2026 Salgados Dona Maria · Maranhão</p>
        <div className="mt-4 flex flex-col gap-1 text-sm text-ink/60 sm:mt-0 sm:flex-row sm:items-center sm:gap-6">
          <a
            href="https://wa.me/5598970150776"
            className="transition-colors hover:text-brand"
          >
            WhatsApp
          </a>
          <a href="#" className="transition-colors hover:text-brand">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}
