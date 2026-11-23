// aptisWritingData.js
// Dedicated Aptis Writing Module (50 mins | 4 Parts)

export const aptisWritingTask = {
  title: "Aptis ESOL Writing (Target C1 Level)",
  durationMinutes: 50,
  context: "Global Environmental & Outdoor Society",
  parts: [
    {
      partNumber: 1,
      name: "Personal Information Form",
      description: "Fill in the form with brief responses (1 to 5 words per question). Keep your answers factual and succinct.",
      timeGuideline: "3 minutes",
      questions: [
        {
          id: "p1_q1",
          label: "1. Preferred weekend outdoor pursuit:",
          placeholder: "e.g., Mountain trekking and birdwatching",
          minWords: 1,
          maxWords: 5,
          modelC1: "Alpine trekking and ecological photography."
        },
        {
          id: "p1_q2",
          label: "2. Current residential municipality:",
          placeholder: "e.g., Central Bristol, United Kingdom",
          minWords: 1,
          maxWords: 5,
          modelC1: "Historic quarter of Edinburgh, Scotland."
        },
        {
          id: "p1_q3",
          label: "3. Languages spoken proficiently:",
          placeholder: "e.g., English and French",
          minWords: 1,
          maxWords: 5,
          modelC1: "English, German, and Mandarin."
        },
        {
          id: "p1_q4",
          label: "4. Professional occupation / academic focus:",
          placeholder: "e.g., Environmental data analyst",
          minWords: 1,
          maxWords: 5,
          modelC1: "Sustainability policy consultant and researcher."
        },
        {
          id: "p1_q5",
          label: "5. Source of discovery regarding our society:",
          placeholder: "e.g., Academic journal publication",
          minWords: 1,
          maxWords: 5,
          modelC1: "University alumni environmental symposium recommendation."
        }
      ]
    },
    {
      partNumber: 2,
      name: "Club Registration Response",
      description: "Write your response in 20-30 words. Complete sentences are required. Focus on concise, clear, and natural language.",
      timeGuideline: "7 minutes",
      minWords: 20,
      maxWords: 30,
      prompt: "Please explain why you resolved to join the Global Environmental & Outdoor Society and outline the specific conservation projects or expeditions you aspire to spearhead.",
      modelC1: "Having long championed biodiversity conservation, I joined to actively spearhead wetland restoration projects and lead rigorous botanical surveying expeditions across national national parks alongside dedicated fellow naturalists."
    },
    {
      partNumber: 3,
      name: "Social Group Chat Interactions",
      description: "You are in the society's members chatroom. Reply to all THREE fellow members. Write 30-40 words for EACH response. Demonstrate natural conversational flow, varied vocabulary, and well-structured points.",
      timeGuideline: "12 minutes",
      chats: [
        {
          id: "p3_chat1",
          member: "Elena Rostova",
          role: "Conservation Coordinator",
          avatarColor: "bg-emerald-500",
          message: "Welcome aboard! How long have you been passionate about environmental stewardship, and what do you consider our community's single most pressing ecological vulnerability today?",
          minWords: 30,
          maxWords: 40,
          modelC1: "I've been deeply engaged in ecology for over a decade. Without doubt, the rapid fragmentation of indigenous woodlands due to unbridled commercial development poses the gravest threat to our regional ecological equilibrium and native wildlife."
        },
        {
          id: "p3_chat2",
          member: "Marcus Thorne",
          role: "Expeditions Lead",
          avatarColor: "bg-indigo-500",
          message: "I am mapping out our rugged Highland ridge clean-up next weekend. Would you be keen to volunteer, and what essential logistical or safety precautions should we enforce?",
          minWords: 30,
          maxWords: 40,
          modelC1: "I would relish the opportunity to participate! We should strictly mandate all-weather thermal gear, calibrate satellite emergency beacons, and deploy a structured buddy system to effectively mitigate treacherous terrain hazards on the ridges."
        },
        {
          id: "p3_chat3",
          member: "Dr. Priya Nair",
          role: "Urban Ecology Researcher",
          avatarColor: "bg-amber-500",
          message: "Some members argue our funds should prioritize local urban canopy planting over ambitious international summits. How do you view this contentious debate?",
          minWords: 30,
          maxWords: 40,
          modelC1: "While grassroots urban reforestation delivers immediate, tangible air-quality dividends, global summits are indispensable for securing systemic legislative commitments. A balanced portfolio that allocates capital to both fronts represents the most pragmatic pathway forward."
        }
      ]
    },
    {
      partNumber: 4,
      name: "Formal vs. Informal Email Challenge (C1 Key Decider)",
      description: "You received an urgent notice from the society committee: 'Regrettably, our annual subsidized expedition to the Highland Biosphere Reserve is cancelled owing to an acute budget deficit. Furthermore, annual membership subscriptions will increase by 100% next month.' Write TWO emails.",
      timeGuideline: "28 minutes",
      subtasks: [
        {
          id: "p4_informal",
          type: "informal",
          title: "Part 4A: Informal Email to a Friend",
          recipient: "Your close friend and fellow society member, Sam",
          wordCountTarget: "Approx. 50 words (40 - 60 words)",
          minWords: 40,
          maxWords: 65,
          guidelines: [
            "Express genuine shock and dismay regarding the cancelled trip and fee hike.",
            "Inquire what Sam thinks and whether they intend to renew.",
            "Use natural, idiomatic, informal expressions without sounding crude."
          ],
          modelC1: "Hi Sam,\n\nDid you catch that infuriating memo? I'm absolutely gutted about the Highland trip being scrapped, let alone the audacious subscription hike! It feels completely unreasonable without prior consultation. Are you honestly planning to stick around, or should we lodge a joint protest with the committee? Let's catch up tonight.\n\nCheers,\nAlex"
        },
        {
          id: "p4_formal",
          type: "formal",
          title: "Part 4B: Formal Email to the Society President",
          recipient: "Dr. Arthur Pendelton, President of the Society Committee",
          wordCountTarget: "120 - 150 words",
          minWords: 120,
          maxWords: 165,
          guidelines: [
            "Adopt an authoritative, highly professional, diplomatic tone.",
            "Express profound concern regarding the unilateral cancellation and disproportionate fee increase.",
            "Articulate the detrimental repercussions for member retention and institutional trust.",
            "Propose constructive alternatives (e.g., corporate sponsorship, audit, staggered dues).",
            "Firmly request an Extraordinary General Meeting (EGM) to resolve the matter collaboratively."
          ],
          modelC1: "Dear Dr. Pendelton,\n\nI am writing to express my profound reservations regarding the committee's recent communiqué announcing the summary cancellation of our Highland expedition alongside the doubling of annual subscriptions.\n\nWhile I acknowledge the fiscal constraints currently confronting our society, implementing such unilateral measures without member consultation risks eroding hard-won institutional trust and precipitating widespread resignations. The sheer magnitude of the proposed fee increase appears wholly incommensurate with the reduced calendar of activities.\n\nRather than imposing an onerous financial burden upon members, I would urge the executive committee to explore viable alternatives, such as corporate environmental sponsorships or transparent budgetary reallocation. Furthermore, I formally request that an Extraordinary General Meeting (EGM) be convened at your earliest convenience to facilitate an open dialogue between the leadership and the general membership.\n\nI look forward to your constructive response.\n\nYours sincerely,\nAlexander Montgomery"
        }
      ]
    }
  ]
};
