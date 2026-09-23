import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  evento: z.string().min(3).max(1000),
  pessoas: z.number().int().min(1).max(5000),
  preferencias: z.string().max(1000),
});

const ComboSchema = z.object({
  nome: z.string(),
  resumo: z.string(),
  itens: z.array(
    z.object({ salgado: z.string(), quantidade: z.number(), motivo: z.string() }),
  ),
  dica: z.string(),
});

const PRICES: Record<string, number> = {
  "Coxinha de Frango": 1,
  "Coxinha de Carne": 1,
  "Coxinha de Queijo": 1,
  "Pastel de Carne": 3,
  "Pastel de Queijo": 3,
};

export type Combo = z.infer<typeof ComboSchema> & { total: number; totalUnidades: number };

export const recommendCombo = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => Input.parse(i))
  .handler(async ({ data }): Promise<Combo> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Serviço de IA não configurado.");
    const { streamText, Output } = await import("ai");
    const { createOpenAI } = await import("@ai-sdk/openai");
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    const result = streamText({
      model: lovable.responses("openai/gpt-6-astra"),
      output: Output.object({ schema: ComboSchema }),
      system:
        "Você é a assistente da Salgados Dona Maria, no Maranhão. Recomende um combo de salgados em português do Brasil. " +
        "Use APENAS estes salgados (nome exato): Coxinha de Frango, Coxinha de Carne, Coxinha de Queijo, Pastel de Carne, Pastel de Queijo. " +
        "Calcule cerca de 6 a 10 salgados por pessoa conforme o tipo de evento (mais se for o prato principal). " +
        "Respeite preferências e restrições (ex.: vegetariano = só Coxinha de Queijo e Pastel de Queijo). Quantidades em múltiplos de 10. " +
        "Nome do combo criativo e curto; resumo e motivos com no máximo 1 frase cada.",
      prompt: `Evento: ${data.evento}\nPessoas: ${data.pessoas}\nPreferências: ${data.preferencias || "nenhuma"}`,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });
    let output: z.infer<typeof ComboSchema>;
    try {
      output = (await result.output) as z.infer<typeof ComboSchema>;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (/402|credit/i.test(msg)) throw new Error("Créditos de IA esgotados. Tente mais tarde.");
      if (/429/.test(msg)) throw new Error("Muitos pedidos agora. Tente em instantes.");
      throw new Error("Não foi possível gerar o combo. Tente novamente.");
    }
    const itens = output.itens.filter((i) => i.salgado in PRICES && i.quantidade > 0);
    const total = itens.reduce((s, i) => s + (PRICES[i.salgado] ?? 0) * i.quantidade, 0);
    const totalUnidades = itens.reduce((s, i) => s + i.quantidade, 0);
    return { ...output, itens, total, totalUnidades };
  });
