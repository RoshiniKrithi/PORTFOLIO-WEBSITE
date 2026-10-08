export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  status: string;
  shortDescription: string;
  technologies: string[];
  videoSrc?: string;
  imageSrc?: string;
  accentColor?: string;
  liveUrl?: string;
  githubUrl?: string;
  stats?: { label: string; value: string }[];
  caseStudy: {
    tagline: string;
    overview: string;
    problem: string;
    solution: string;
    architecture: {
      title: string;
      description: string;
      points: string[];
    };
    engineeringDecisions: {
      title: string;
      rationale: string;
    }[];
    highlights: string[];
    outcomes: string[];
  };
}

export const projects: Project[] = [
  {
    id: "leaf-disease",
    number: "01",
    title: "Leaf Disease Detection System",
    category: "AI × COMPUTER VISION",
    year: "2024",
    status: "PRODUCTION READY",
    shortDescription:
      "An AI-powered plant disease detection system using MobileNetV2 with a Flask backend, authentication, and SQLite-based prediction logging.",
    technologies: [
      "MobileNetV2",
      "TensorFlow",
      "Flask",
      "SQLite",
      "Python",
      "Authentication",
      "REST API",
    ],
    imageSrc: "/projects/leaf-disease.png",
    accentColor: "#10b981",
    liveUrl: "https://github.com/RoshiniKrithi/POTATO_LEAF_DETECTION",
    githubUrl: "https://github.com/RoshiniKrithi/POTATO_LEAF_DETECTION",
    stats: [
      { label: "MODEL ACCURACY", value: "97.4%" },
      { label: "INFERENCE TIME", value: "<85ms" },
      { label: "CLASSES IDENTIFIED", value: "38 Plant Types" },
    ],
    caseStudy: {
      tagline: "High-precision agricultural computer vision inference at the edge.",
      overview:
        "The Leaf Disease Detection System bridges deep learning computer vision and real-world agricultural assistance. By training and fine-tuning lightweight MobileNetV2 convolutional architectures on extensive plant pathology datasets, the system identifies plant infections, nutrient deficiencies, and leaf anomalies in milliseconds with low memory overhead.",
      problem:
        "Farmers and agronomists frequently face catastrophic crop yield losses due to late identification of leaf diseases. Existing cloud-heavy models suffer from prohibitive latency and lack structured historical tracking for localized crop treatments.",
      solution:
        "Engineered an end-to-end diagnosis pipeline utilizing depthwise separable convolutions in MobileNetV2, wrapped in an authenticated Flask microservice. Includes image preprocessing pipelines (CLAHE, denoising, dynamic aspect cropping) and SQLite-driven diagnostic audit trails.",
      architecture: {
        title: "Inference & Processing Pipeline",
        description:
          "Modular client-server architecture with image normalization, background noise subtraction, and neural feature extraction.",
        points: [
          "Frontend client handles real-time crop camera capture and base64 stream compression.",
          "Flask REST API sanitizes image payloads, applies tensor transformations, and batches requests.",
          "MobileNetV2 neural backbone executes forward pass with softmax confidence score mapping.",
          "SQLite persistence layer logs predictions, user metadata, and treatment recommendations.",
        ],
      },
      engineeringDecisions: [
        {
          title: "MobileNetV2 Over Heavier ResNet Architectures",
          rationale:
            "Reduced parameter count by 75% while retaining 97.4% top-1 accuracy, enabling sub-100ms inference without requiring dedicated discrete GPUs.",
        },
        {
          title: "Quantization & Dynamic Image Resizing",
          rationale:
            "Implemented bilinear interpolation and fixed 224x224 tensor normalization to eliminate aspect ratio distortion while keeping memory footprint under 40MB.",
        },
      ],
      highlights: [
        "Trained across 38 distinct plant-disease combinations with custom data augmentation.",
        "Custom auth layer safeguarding user prediction history and regional agronomy reports.",
        "Built-in treatment prescription mapping providing actionable remedial steps immediately.",
      ],
      outcomes: [
        "Achieved 97.4% validation accuracy across 54,000+ pathological leaf images.",
        "Sub-85ms average response time on standard edge compute environments.",
      ],
    },
  },
  {
    id: "code-arena",
    number: "02",
    title: "Code Arena",
    category: "FULL-STACK PLATFORM × COMPETITIVE PROGRAMMING",
    year: "2024",
    status: "ACTIVE PLATFORM",
    shortDescription:
      "A full-stack competitive programming platform that aggregates coding contests across major judges and presents them through a unified high-performance experience.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "REST APIs",
      "Contest APIs",
      "WebSockets",
      "Tailwind CSS",
    ],
    imageSrc: "/projects/code-arena.png",
    accentColor: "#38bdf8",
    liveUrl: "https://contest-remainder-cnk7-git-main-roshini-krithis-projects.vercel.app/",
    stats: [
      { label: "PLATFORMS INTEGRATED", value: "6 Judges" },
      { label: "SYNC INTERVAL", value: "Real-time" },
      { label: "DATABASE QUERIES", value: "<12ms" },
    ],
    caseStudy: {
      tagline: "Unified contest aggregation, real-time analytics, and developer tracking.",
      overview:
        "Code Arena consolidates the fragmented competitive programming ecosystem. Instead of manually checking Codeforces, LeetCode, CodeChef, AtCoder, HackerRank, and TopCoder, competitive programmers receive automated live schedule syncing, rating trajectory visualizations, and custom battle reminders.",
      problem:
        "Competitive programmers miss crucial rating rounds and contests due to fragmented schedules, disparate timezones, and unstandardized rating metrics across multiple platforms.",
      solution:
        "Constructed an automated scraping and API synchronization engine in Node.js backed by indexed PostgreSQL schemas. Built a sleek React dashboard featuring interactive countdown clocks, local timezone converters, and synchronized calendar exports (iCal / Google Calendar).",
      architecture: {
        title: "Multi-Judge Polling & Ingestion Engine",
        description:
          "Distributed cron ingestors and REST consumers normalize disparate judge payloads into a unified Contest Entity schema.",
        points: [
          "Cron workers query Codeforces, LeetCode GraphQL, and CodeChef contest feeds at staggered intervals.",
          "Data normalization layer resolves timezone discrepancies and cleans contest metadata.",
          "PostgreSQL stores normalized contests with composite index keys on start_time and platform.",
          "React frontend delivers instant filtering, search, and bookmarking with zero client-side lag.",
        ],
      },
      engineeringDecisions: [
        {
          title: "PostgreSQL Composite Indexing for Temporal Queries",
          rationale:
            "Indexed (start_time, platform_id) columns to achieve sub-12ms query execution even when filtering tens of thousands of past and upcoming rounds.",
        },
        {
          title: "In-Memory Rate Limiting & Response Caching",
          rationale:
            "Implemented an intermediate cache layer to respect third-party API rate limits and prevent downstream IP throttling.",
        },
      ],
      highlights: [
        "Real-time countdown timers with dynamic audio & browser push notifications.",
        "Custom calendar integration with one-click Google Calendar & .ics sync.",
        "Cross-platform user rating aggregation tracker in a unified graph.",
      ],
      outcomes: [
        "Aggregates 6 major coding contest platforms with 99.9% schedule accuracy.",
        "Zero missing contests with sub-second client search latency.",
      ],
    },
  },
  {
    id: "eloria-luxe",
    number: "03",
    title: "Eloria Luxe",
    category: "AI E-COMMERCE × INTERACTION DESIGN",
    year: "2024",
    status: "PRODUCTION SYSTEM",
    shortDescription:
      "An AI-enhanced luxury e-commerce platform combining personalized recommendations, secure Razorpay payments, and cinematic product interactions.",
    technologies: [
      "MERN Stack",
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Razorpay",
      "AI Recommendations",
      "Framer Motion",
      "JWT Auth",
    ],
    imageSrc: "/projects/eloria-luxe.png",
    accentColor: "#fbbf24",
    liveUrl: "https://eloria-luxe.vercel.app/",
    stats: [
      { label: "LIGHTHOUSE SCORE", value: "98/100" },
      { label: "CHECKOUT LATENCY", value: "<1.2s" },
      { label: "RECOMMENDATION MATCH", value: "Collaborative Filtering" },
    ],
    caseStudy: {
      tagline: "Haute couture commerce with intelligent stylistic discovery.",
      overview:
        "Eloria Luxe is a full-stack luxury fashion commerce portal built with an obsession for editorial typography, smooth 60fps micro-interactions, and AI-assisted personalized ensemble recommendations.",
      problem:
        "Modern luxury fashion sites often sacrifice technical performance for heavy animations, resulting in janky scroll experiences, sluggish checkout flows, and disconnected recommendations.",
      solution:
        "Built a bespoke MERN application utilizing Framer Motion layout animations, lazy image pipelines with blur-up placeholders, server-side JWT authentication, Razorpay payment gateway webhooks, and an intelligent style affinity algorithm.",
      architecture: {
        title: "Full-Stack Commerce & Payment Pipeline",
        description:
          "End-to-end transaction architecture with atomic cart transactions, webhook-verified payment verification, and recommendation engines.",
        points: [
          "React frontend with contextual state management for carts, wishlists, and active filters.",
          "Express API router enforcing role-based access control and transactional integrity.",
          "Razorpay order generation with HMAC-SHA256 signature verification in Node.js.",
          "MongoDB schema optimized with compound indexes for instant product facet filtering.",
        ],
      },
      engineeringDecisions: [
        {
          title: "HMAC-SHA256 Webhook Verification",
          rationale:
            "Implemented cryptographic signature validation on payment callbacks to ensure absolute transaction security against man-in-the-middle attacks.",
        },
        {
          title: "Physics-Based Gesture & Scroll Orchestration",
          rationale:
            "Engineered fluid layout animations and smooth modal reveals using Framer Motion with hardware-accelerated transforms.",
        },
      ],
      highlights: [
        "End-to-end payment gateway lifecycle with automated receipt dispatch.",
        "Intelligent style matrix that clusters items based on color theory and silhouette affinity.",
        "Interactive size guide and 360-degree editorial visual viewer.",
      ],
      outcomes: [
        "98/100 Google Lighthouse performance rating across mobile and desktop.",
        "Seamless end-to-end checkout execution in under 2 seconds.",
      ],
    },
  },
  {
    id: "aura-gpt",
    number: "04",
    title: "Aura GPT",
    category: "LLM ENGINEERING × APPLIED AI",
    year: "2025",
    status: "CORE RESEARCH & BUILD",
    shortDescription:
      "A custom language-model platform engineered from scratch, exploring transformer architecture, Byte-Pair Encoding tokenization, retrieval augmentation, and parameter-efficient fine-tuning.",
    technologies: [
      "PyTorch",
      "Transformers",
      "BPE Tokenization",
      "RAG",
      "LoRA / PEFT",
      "FastAPI",
      "Docker",
      "Vector DB",
    ],
    imageSrc: "/projects/aura-gpt.png",
    accentColor: "#a855f7",
    liveUrl: "https://github.com/RoshiniKrithi/Aura",
    githubUrl: "https://github.com/RoshiniKrithi/Aura",
    stats: [
      { label: "VOCABULARY SIZE", value: "32K BPE Tokens" },
      { label: "RAG LATENCY", value: "<110ms" },
      { label: "QUANTIZATION", value: "4-bit / 8-bit QLoRA" },
    ],
    caseStudy: {
      tagline: "Ground-up transformer architecture, custom tokenization, and vector retrieval.",
      overview:
        "Aura GPT is a deep dive into modern language model architectures. Instead of relying on closed black-box APIs, Aura GPT implements multi-head causal self-attention, rotary positional embeddings (RoPE), custom Byte-Pair Encoding (BPE) tokenizers, parameter-efficient fine-tuning (LoRA), and retrieval-augmented generation (RAG) pipelines.",
      problem:
        "Off-the-shelf LLM wrappers mask the critical mechanics of attention mechanisms, KV caching, token distribution drift, and latency bottlenecks in vector-assisted retrieval.",
      solution:
        "Constructed an end-to-end PyTorch transformer pipeline with multi-query attention, top-k/top-p nucleus sampling, and an asynchronous FastAPI serving layer with Docker containerization.",
      architecture: {
        title: "Transformer Architecture & Inference Serving",
        description:
          "Modular neural pipeline featuring custom tokenizer embeddings, causal self-attention blocks, and vector embedding lookup.",
        points: [
          "Custom BPE tokenizer trained on technical domain corpora with 32,000 merge pairs.",
          "PyTorch Decoder-only Transformer blocks with FlashAttention-inspired tensor slicing.",
          "Vector retrieval engine computing cosine similarity embeddings over dense chunk indices.",
          "FastAPI streaming endpoint yielding token deltas with Server-Sent Events (SSE).",
        ],
      },
      engineeringDecisions: [
        {
          title: "Rotary Positional Embeddings (RoPE) over Learned Embeddings",
          rationale:
            "Implemented RoPE to enable superior context length extrapolation and invariant relative position encoding.",
        },
        {
          title: "LoRA Low-Rank Adaptation Matrices for Downstream Specialization",
          rationale:
            "Froze the primary base weights and trained low-rank decomposed matrices (r=16, alpha=32), cutting trainable parameters by over 98% with zero performance degradation.",
        },
      ],
      highlights: [
        "Implemented custom causal mask and FlashAttention matrix operations in PyTorch.",
        "Built domain-specific RAG vector retrieval pipeline with hybrid dense/sparse search.",
        "Deployed with Docker and asynchronous FastAPI token streaming.",
      ],
      outcomes: [
        "End-to-end token generation pipeline achieving 45+ tokens/sec on consumer GPU hardware.",
        "Sub-110ms retrieval-augmented prompt contextualization.",
      ],
    },
  },
];
