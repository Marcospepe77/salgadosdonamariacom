import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { recommendCombo, type Combo } from "@/lib/combo.functions";

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function ComboAI() {
  const run = useServerFn(recommendCombo);
  const [evento, setEvento] = useState("");
  const [pessoas, setPessoas] = useState(30);
  const [preferencias, setPreferencias] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [combo, setCombo] = useState<Combo | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCombo(null);
    try {
      setCombo(await run({ data: { evento, pessoas, preferencias } }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo deu errado.");
    } finally {
      setLoading(false);
    }
  }

  const whatsText = combo
    ? `Olá! Quero encomendar o combo "${combo.nome}": ${combo.itens
        .map((i) => `${i.quantidade} ${i.salgado}`)
        .join(", ")} (total ${brl(combo.total)}).`
    : "";

  return (
    <section id="combo" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-20">
      <div className="grid gap-8 rounded-[2rem] bg-cream p-6 shadow-xl shadow-ink/5 md:grid-cols-2 md:p-12">
        <form onSubmit={submit} className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Combo personalizado
          </p>
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight">
            Conte sobre sua festa, a gente monta o combo.
          </h2>
          <label className="block">
            <span className="text-sm font-semibold">Qual é o evento?</span>
            <textarea
              required
              minLength={3}
              value={evento}
              onChange={(e) => setEvento(e.target.value)}
              placeholder="Ex.: aniversário infantil à tarde, com lanche depois do bolo"
              className="mt-1 w-full rounded-xl border border-ink/15 bg-parchment/40 p-3 text-sm outline-none focus:border-brand"
              rows={3}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Quantas pessoas?</span>
            <input
              type="number"
              min={1}
              max={5000}
              required
              value={pessoas}
              onChange={(e) => setPessoas(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-ink/15 bg-parchment/40 p-3 text-sm outline-none focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Preferências (opcional)</span>
            <input
              value={preferencias}
              onChange={(e) => setPreferencias(e.target.value)}
              placeholder="Ex.: muita coxinha, algumas pessoas vegetarianas"
              className="mt-1 w-full rounded-xl border border-ink/15 bg-parchment/40 p-3 text-sm outline-none focus:border-brand"
            />
          </label>
          <button
            disabled={loading}
            className="w-full rounded-full bg-brand px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-brand/90 disabled:opacity-60"
          >
            {loading ? "Montando seu combo..." : "Recomendar meu combo"}
          </button>
        </form>

        <div className="flex flex-col justify-center rounded-2xl bg-ink p-6 text-cream">
          {error && <p className="text-sm text-gold">{error}</p>}
          {!error && !combo && (
            <p className="text-cream/60">
              {loading
                ? "Dona Maria está pensando no melhor mix para você..."
                : "Sua recomendação aparece aqui."}
            </p>
          )}
          {combo && (
            <div>
              <h3 className="font-display text-2xl font-semibold text-gold">{combo.nome}</h3>
              <p className="mt-2 text-sm text-cream/70">{combo.resumo}</p>
              <ul className="mt-5 space-y-3">
                {combo.itens.map((i) => (
                  <li key={i.salgado} className="border-b border-cream/10 pb-3">
                    <p className="font-semibold">
                      {i.quantidade}× {i.salgado}
                    </p>
                    <p className="text-xs text-cream/60">{i.motivo}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-lg font-semibold">
                {combo.totalUnidades} salgados · {brl(combo.total)}
              </p>
              <p className="mt-2 text-xs text-cream/60">{combo.dica}</p>
              <a
                href={`https://wa.me/5598970150776?text=${encodeURIComponent(whatsText)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-cream"
              >
                Encomendar pelo WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
