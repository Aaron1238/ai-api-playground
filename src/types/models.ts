export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens?: number;
  contextWindow?: string;
  parameters?: string;
  activeParameters?: string;
  features?: string[];
}

export const aiModels: AIModel[] = [
  {
    id: "qwen/qwen3-32b",
    name: "Qwen3 32B",
    provider: "Qwen",
    description: "Qwen3-32B is a dense 32.8B parameter causal language model from the Qwen3 series, optimized for both complex reasoning and efficient dialogue. It supports seamless switching between a 'thinking' mode for tasks like math, coding, and logical inference.",
    parameters: "32.8B",
    features: ["Thinking Mode", "Math", "Coding", "Logical Inference"]
  },
  {
    id: "moonshotai/kimi-k2-thinking",
    name: "Kimi K2 Thinking",
    provider: "MoonshotAI",
    description: "Kimi K2 Thinking is Moonshot AI's most advanced open reasoning model to date, extending the K2 series into agentic, long-horizon reasoning. Built on the trillion-parameter Mixture-of-Experts (MoE) architecture introduced in Kimi K2, it activates 32B parameters.",
    parameters: "1T (MoE)",
    activeParameters: "32B",
    features: ["Agentic Reasoning", "Long-horizon Reasoning", "MoE Architecture"]
  },
  {
    id: "openai/gpt-oss-120b",
    name: "GPT-OSS 120B",
    provider: "OpenAI",
    description: "gpt-oss-120b is an open-weight, 117B-parameter Mixture-of-Experts (MoE) language model from OpenAI designed for high-reasoning, agentic, and general-purpose production use cases. It activates 5.1B parameters per forward pass.",
    parameters: "117B (MoE)",
    activeParameters: "5.1B",
    features: ["Open-weight", "High-reasoning", "Agentic", "Production-ready"]
  },
  {
    id: "moonshotai/kimi-k2-0905",
    name: "Kimi K2 0905",
    provider: "MoonshotAI",
    description: "Kimi K2 0905 is the September update of Kimi K2 0711. It is a large-scale Mixture-of-Experts (MoE) language model developed by Moonshot AI, featuring 1 trillion total parameters with 32 billion active per forward pass. It supports long-context inference.",
    parameters: "1T (MoE)",
    activeParameters: "32B",
    contextWindow: "Long Context",
    features: ["MoE Architecture", "Long Context", "September Update"]
  },
  {
    id: "google/gemini-3-flash-preview",
    name: "Gemini 3 Flash Preview",
    provider: "Google",
    description: "Gemini 3 Flash Preview is a high speed, high value thinking model designed for agentic workflows, multi turn chat, and coding assistance. It delivers near Pro level reasoning and tool use performance with substantially lower latency than larger Gemini models.",
    features: ["High Speed", "Agentic Workflows", "Multi-turn Chat", "Coding Assistance"]
  },
  {
    id: "qwen/qwen3-next-80b-a3b-instruct",
    name: "Qwen3 Next 80B A3B Instruct",
    provider: "Qwen",
    description: "Qwen3-Next-80B-A3B-Instruct is an instruction-tuned chat model in the Qwen3-Next series optimized for fast, stable responses without 'thinking' traces. It targets complex tasks across reasoning, code generation, knowledge QA, and multilingual use.",
    parameters: "80B (MoE)",
    activeParameters: "3B",
    features: ["Instruction-tuned", "Fast Response", "No Thinking Traces", "Multilingual"]
  },
  {
    id: "qwen/qwen3-vl-235b-a22b-instruct",
    name: "Qwen3 VL 235B A22B Instruct",
    provider: "Qwen",
    description: "Qwen3-VL-235B-A22B Instruct is an open-weight multimodal model that unifies strong text generation with visual understanding across images and video. The Instruct model targets general vision-language use (VQA, document parsing, chart/table extraction).",
    parameters: "235B (MoE)",
    activeParameters: "22B",
    features: ["Multimodal", "Vision-Language", "Image Understanding", "Video Understanding"]
  },
  {
    id: "z-ai/glm-4.7",
    name: "GLM 4.7",
    provider: "Z.AI",
    description: "GLM-4.7 is Z.AI's latest flagship model, featuring upgrades in two key areas: enhanced programming capabilities and more stable multi-step reasoning/execution. It demonstrates significant improvements in executing complex agent tasks.",
    features: ["Enhanced Programming", "Multi-step Reasoning", "Agent Tasks"]
  },
  {
    id: "deepseek/deepseek-v3.2-speciale",
    name: "DeepSeek V3.2 Speciale",
    provider: "DeepSeek",
    description: "DeepSeek-V3.2-Speciale is a high-compute variant of DeepSeek-V3.2 optimized for maximum reasoning and agentic performance. It builds on DeepSeek Sparse Attention (DSA) for efficient long-context processing.",
    features: ["High-compute", "Maximum Reasoning", "DSA", "Long-context"]
  },
  {
    id: "deepseek/deepseek-v3.2",
    name: "DeepSeek V3.2",
    provider: "DeepSeek",
    description: "DeepSeek-V3.2 is a large language model designed to harmonize high computational efficiency with strong reasoning and agentic tool-use performance. It introduces DeepSeek Sparse Attention (DSA), a fine-grained sparse attention mechanism.",
    features: ["Computational Efficiency", "Strong Reasoning", "DSA", "Tool-use"]
  },
  {
    id: "x-ai/grok-4.1-fast",
    name: "Grok 4.1 Fast",
    provider: "xAI",
    description: "Grok 4.1 Fast is xAI's best agentic tool calling model that shines in real-world use cases like customer support and deep research. 2M context window. Reasoning can be enabled/disabled using the 'reasoning' 'enabled' parameter in the API.",
    contextWindow: "2M",
    features: ["Agentic Tool Calling", "Customer Support", "Deep Research", "Configurable Reasoning"]
  },
  {
    id: "nvidia/nemotron-nano-12b-v2-vl",
    name: "Nemotron Nano 12B 2 VL",
    provider: "NVIDIA",
    description: "NVIDIA Nemotron Nano 2 VL is a 12-billion-parameter open multimodal reasoning model designed for video understanding and document intelligence. It introduces a hybrid Transformer-Mamba architecture.",
    parameters: "12B",
    features: ["Multimodal", "Video Understanding", "Document Intelligence", "Transformer-Mamba"]
  },
  {
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google",
    description: "Gemini 2.5 Flash is Google's state-of-the-art workhorse model, specifically designed for advanced reasoning, coding, mathematics, and scientific tasks. It includes built-in 'thinking' capabilities.",
    features: ["Advanced Reasoning", "Coding", "Mathematics", "Scientific Tasks", "Thinking"]
  },
  {
    id: "openai/gpt-5.2",
    name: "GPT-5.2",
    provider: "OpenAI",
    description: "GPT-5.2 is the latest frontier-grade model in the GPT-5 series, offering stronger agentic and long context performance compared to GPT-5.1. It uses adaptive reasoning to allocate computation dynamically.",
    features: ["Frontier-grade", "Agentic", "Long Context", "Adaptive Reasoning"]
  },
  {
    id: "openai/gpt-5.1",
    name: "GPT-5.1",
    provider: "OpenAI",
    description: "GPT-5.1 is the latest frontier-grade model in the GPT-5 series, offering stronger general-purpose reasoning, improved instruction adherence, and a more natural conversational style compared to GPT-5.",
    features: ["Frontier-grade", "General-purpose Reasoning", "Instruction Adherence", "Natural Style"]
  },
  {
    id: "openai/gpt-5-mini",
    name: "GPT-5 Mini",
    provider: "OpenAI",
    description: "GPT-5 Mini is a compact version of GPT-5, designed to handle lighter-weight reasoning tasks. It provides the same instruction-following and safety-tuning benefits as GPT-5, but with reduced latency and cost.",
    features: ["Compact", "Lightweight Reasoning", "Low Latency", "Cost-efficient"]
  },
  {
    id: "deepseek/deepseek-v3.2-exp",
    name: "DeepSeek V3.2 Exp",
    provider: "DeepSeek",
    description: "DeepSeek-V3.2-Exp is an experimental large language model released by DeepSeek as an intermediate step between V3.1 and future architectures. It introduces DeepSeek Sparse Attention (DSA).",
    features: ["Experimental", "DSA", "Intermediate Release"]
  },
  {
    id: "deepseek/deepseek-r1-0528",
    name: "DeepSeek R1 0528",
    provider: "DeepSeek",
    description: "May 28th update to the original DeepSeek R1. Performance on par with OpenAI o1, but open-sourced and with fully open reasoning tokens. It's 671B parameters in size, with 37B active in an inference pass.",
    parameters: "671B (MoE)",
    activeParameters: "37B",
    features: ["Open-source", "Open Reasoning Tokens", "o1-level Performance"]
  },
  {
    id: "z-ai/glm-4.6",
    name: "GLM 4.6",
    provider: "Z.AI",
    description: "Compared with GLM-4.5, this generation brings several key improvements: Longer context window (expanded from 128K to 200K tokens), superior coding performance, enabling the model to handle more complex agentic tasks.",
    contextWindow: "200K",
    features: ["Extended Context", "Superior Coding", "Agentic Tasks"]
  },
  {
    id: "qwen/qwen3-235b-a22b",
    name: "Qwen3 235B A22B",
    provider: "Qwen",
    description: "Qwen3-235B-A22B is a 235B parameter mixture-of-experts (MoE) model developed by Qwen, activating 22B parameters per forward pass. It supports seamless switching between a 'thinking' mode for complex reasoning, math, and code tasks.",
    parameters: "235B (MoE)",
    activeParameters: "22B",
    features: ["MoE Architecture", "Thinking Mode", "Math", "Code"]
  },
  {
    id: "deepseek/deepseek-r1-distill-qwen-32b",
    name: "DeepSeek R1 Distill Qwen 32B",
    provider: "DeepSeek",
    description: "DeepSeek R1 Distill Qwen 32B is a distilled large language model based on Qwen 2.5 32B, using outputs from DeepSeek R1. It outperforms OpenAI's o1-mini across various benchmarks, achieving new state-of-the-art results for dense models.",
    parameters: "32B",
    features: ["Distilled", "o1-mini Level", "State-of-the-art Dense Model"]
  },
  {
    id: "google/gemini-3-pro-preview",
    name: "Gemini 3 Pro Preview",
    provider: "Google",
    description: "Gemini 3 Pro is Google's flagship frontier model for high-precision multimodal reasoning, combining strong performance across text, image, video, audio, and code with a 1M-token context window.",
    contextWindow: "1M",
    features: ["Flagship", "Multimodal", "High-precision", "1M Context"]
  },
  {
    id: "google/gemini-2.5-flash-lite-preview-09-2025",
    name: "Gemini 2.5 Flash Lite Preview",
    provider: "Google",
    description: "Gemini 2.5 Flash-Lite is a lightweight reasoning model in the Gemini 2.5 family, optimized for ultra-low latency and cost efficiency. It offers improved throughput, faster token generation.",
    features: ["Lightweight", "Ultra-low Latency", "Cost-efficient", "Fast Generation"]
  },
  {
    id: "bytedance-seed/seed-1.6-flash",
    name: "Seed 1.6 Flash",
    provider: "ByteDance Seed",
    description: "Seed 1.6 Flash is an ultra-fast multimodal deep thinking model by ByteDance Seed, supporting both text and visual understanding. It features a 256k context window and can generate outputs of up to 16k tokens.",
    contextWindow: "256K",
    maxTokens: 16000,
    features: ["Ultra-fast", "Multimodal", "Deep Thinking", "Text & Visual"]
  }
];

export const getProviderColor = (provider: string): string => {
  const colors: Record<string, string> = {
    "Qwen": "bg-blue-500",
    "MoonshotAI": "bg-purple-500",
    "OpenAI": "bg-emerald-500",
    "Google": "bg-red-500",
    "Z.AI": "bg-pink-500",
    "DeepSeek": "bg-orange-500",
    "xAI": "bg-indigo-500",
    "NVIDIA": "bg-green-500",
    "ByteDance Seed": "bg-teal-500"
  };
  return colors[provider] || "bg-gray-500";
};
