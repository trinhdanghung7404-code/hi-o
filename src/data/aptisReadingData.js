// aptisReadingData.js
// Dedicated Aptis Reading Module (35 mins | 4 Parts)

export const aptisReadingTask = {
  title: "Aptis ESOL Reading (Target C1 Level)",
  durationMinutes: 35,
  parts: [
    {
      partNumber: 1,
      name: "Part 1: Sentence Completion Dropdowns",
      description: "Choose one word from the dropdown list to complete each sentence in this workplace circular. Focus on grammatical precision and collocations.",
      textTitle: "Staff Circular: Transition to Flexible Hybrid Workspaces",
      sentences: [
        {
          id: "r_p1_s1",
          before: "Following extensive consultations with department heads, management has resolved to ",
          options: ["implement", "disclose", "withhold", "revoke"],
          after: " a revamped hot-desking policy starting next quarter.",
          answer: 0,
          explanation: "'implement a revamped policy' is the correct formal collocation."
        },
        {
          id: "r_p1_s2",
          before: "All staff members are required to reserve workstations via the cloud portal at least twenty-four hours in ",
          options: ["advance", "precedence", "arrears", "anticipation"],
          after: " to ensure optimal seat allocation.",
          answer: 0,
          explanation: "Fixed prepositional phrase: 'twenty-four hours in advance'."
        },
        {
          id: "r_p1_s3",
          before: "Workstations must be kept entirely free of confidential paperwork to maintain strict ",
          options: ["compliance", "collusion", "rebellion", "indifference"],
          after: " with international data protection protocols.",
          answer: 0,
          explanation: "'maintain strict compliance with' is the exact C1 institutional pairing."
        },
        {
          id: "r_p1_s4",
          before: "Lockers located on the concourse will be allocated on a designated basis to ",
          options: ["accommodate", "contain", "constrain", "withstand"],
          after: " personal belongings and specialized peripherals.",
          answer: 0,
          explanation: "'accommodate personal belongings' (to provide sufficient space or lodging for)."
        },
        {
          id: "r_p1_s5",
          before: "Should any technical difficulties occur during desk reservation, please contact IT Support without ",
          options: ["hesitation", "reluctance", "suspicion", "indecision"],
          after: " for prompt troubleshooting.",
          answer: 0,
          explanation: "'without hesitation' is the standard polite administrative idiom."
        }
      ]
    },
    {
      partNumber: 2,
      name: "Part 2: Sentence Cohesion & Logical Reordering",
      description: "The following six sentences form a cohesive narrative on the rediscovery of an ancient archaeological city. The first sentence is already placed in position 1. Re-order the remaining 5 sentences (2 through 6) to establish a seamless chronological and argumentative flow.",
      initialFixedSentence: "In the summer of 1928, aerial reconnaissance pilots over the arid Mesopotamian desert spotted faint geometric shadows beneath the shifting sand dunes.",
      sentencesToOrder: [
        {
          id: "s_b",
          text: "Intrigued by these spectral outlines, a collaborative expedition of British and French archaeologists was swiftly dispatched to conduct exploratory trenching.",
          correctPosition: 2
        },
        {
          id: "s_c",
          text: "Initial excavations yielded modest domestic ceramics, yet deeper strata revealed monumental basalt lintels inscribed with an undeciphered cuneiform dialect.",
          correctPosition: 3
        },
        {
          id: "s_d",
          text: "Deciphering these inscriptions proved arduous, requiring linguists three painstaking years to cross-reference them against royal Babylonian archives.",
          correctPosition: 4
        },
        {
          id: "s_e",
          text: "What emerged from this linguistic breakthrough was the astonishing revelation that the site represented the long-lost mercantile metropolis of Akkadia.",
          correctPosition: 5
        },
        {
          id: "s_f",
          text: "Today, ongoing laser scanning continues to unravel the sophisticated hydraulic aqueducts that once sustained this desert civilization against prolonged climatic aridification.",
          correctPosition: 6
        }
      ],
      explanation: "Logical cohesion chain: 1 (Aerial shadows spotted) -> 2 ('Intrigued by these spectral outlines...') -> 3 ('Initial excavations yielded... lintels inscribed with...') -> 4 ('Deciphering these inscriptions proved arduous...') -> 5 ('What emerged from this linguistic breakthrough...') -> 6 ('Today, ongoing laser scanning continues...')."
    },
    {
      partNumber: 3,
      name: "Part 3: 4-Person Perspective Matching",
      description: "Read the extracts where four urban architectural critics (A: Julian, B: Miriam, C: Tariq, D: Beatrice) discuss the ethics of skyscraper mega-towers. For each statement, choose the person whose view it matches.",
      people: [
        {
          id: "A",
          name: "Julian Vance (A)",
          title: "Senior Architectural Critic",
          bio: "Julian emphasizes the historical loss of human-scale street life and argues that vertical luxury enclaves exacerbate social stratification.",
          extract: "The contemporary obsession with supertall residential obelisks represents a narcissistic detour from authentic urbanism. When private elevators deposit oligarchs hundreds of meters above the streetscape, the fundamental civic contract of shared public serendipity dissolves. Ground-level streets are plunged into perennial shadows and buffeted by violent wind vortexes, while communal shopfronts are displaced by monolithic security barriers. We have traded vibrant human-scale communion for privatized status symbols in the stratosphere."
        },
        {
          id: "B",
          name: "Miriam Chen (B)",
          title: "Sustainable Urban Design Fellow",
          bio: "Miriam views extreme vertical density as the sole viable antidote to destructive suburban land sprawl and biodiversity loss.",
          extract: "Critiques that romanticize low-rise suburban living deliberately ignore planetary ecological reality. Horizontal urban sprawl consumes irreplaceable agricultural arable land, destroys vital wildlife migration corridors, and mandates unsustainable automobile dependency. Concentrating thousands of citizens within energy-efficient, transit-connected vertical clusters remains our most potent weapon against climate breakdown. High-density architecture preserves the surrounding countryside."
        },
        {
          id: "C",
          name: "Tariq Al-Mansoor (C)",
          title: "Structural Engineer & Innovator",
          bio: "Tariq focuses on how ultra-tall structures drive revolutionary breakthroughs in carbon-neutral engineering and computational materials.",
          extract: "Focusing solely on sociopolitical polemics blinds observers to the breathtaking technical renaissance occurring at high altitudes. Supertall towers function as living laboratories for materials science, from seismic tuned-mass dampers that harvest kinetic oscillation into clean energy, to carbon-sequestering composite polymers and automated vertical hydroponics. The engineering innovations pioneered in skyward prototypes inevitably trickle down to revolutionize standard residential construction."
        },
        {
          id: "D",
          name: "Beatrice Dubois (D)",
          title: "Civic Heritage Preservationist",
          bio: "Beatrice stresses the psychological impact on urban citizens and the visual disfigurement of centuries-old historic city skylines.",
          extract: "A skyline is not merely a collection of real estate investments; it constitutes a collective cultural memory etched across the horizon. When glass monoliths overpower historic spires, cathedrals, and historic civic monuments, a city forfeits its unique historical identity and succumbs to sterile global homogenization. Surveys repeatedly confirm that residents feel psychologically dwarfed and alienated by reflective glass behemoths devoid of vernacular warmth."
        }
      ],
      statements: [
        {
          id: "r_p3_q1",
          statement: "Extreme vertical architecture provides an indispensable defense against environmental destruction caused by horizontal suburban expansion.",
          person: "B",
          explanation: "Miriam Chen (B) states that vertical density prevents horizontal urban sprawl which consumes arable land and destroys wildlife corridors."
        },
        {
          id: "r_p3_q2",
          statement: "Supertall towers foster crucial technological innovations that ultimately benefit everyday residential building practices.",
          person: "C",
          explanation: "Tariq Al-Mansoor (C) explains that engineering innovations pioneered in skyward prototypes inevitably trickle down to standardize construction."
        },
        {
          id: "r_p3_q3",
          statement: "Ultra-tall luxury developments dismantle the shared civic bonds of street-level public life.",
          person: "A",
          explanation: "Julian Vance (A) argues that private elevators hundreds of meters up dissolve the fundamental civic contract of shared street serendipity."
        },
        {
          id: "r_p3_q4",
          statement: "Imposing modern glass towers visually erase local cultural heritage and instill feelings of alienation in inhabitants.",
          person: "D",
          explanation: "Beatrice Dubois (D) notes that glass monoliths overpower historic spires and make residents feel psychologically dwarfed and alienated."
        },
        {
          id: "r_p3_q5",
          statement: "Supertall towers act as real-world testing environments for emerging sustainable energy and materials science.",
          person: "C",
          explanation: "Tariq (C) highlights how they function as living laboratories harvesting kinetic energy and utilizing carbon-sequestering polymers."
        },
        {
          id: "r_p3_q6",
          statement: "Pedestrian experiences on ground level suffer from adverse microclimatic phenomena like artificial wind and loss of daylight.",
          person: "A",
          explanation: "Julian (A) points out that ground-level streets are plunged into perennial shadows and buffeted by violent wind vortexes."
        },
        {
          id: "r_p3_q7",
          statement: "Protecting open natural terrain and farmland requires human populations to embrace compact vertical living.",
          person: "B",
          explanation: "Miriam (B) argues that high-density vertical clusters preserve the surrounding countryside and prevent sprawl."
        }
      ]
    },
    {
      partNumber: 4,
      name: "Part 4: Long Passage & Heading Matching",
      description: "Read the analytical passage below regarding the evolution of linguistic epistemology. Match each paragraph (A to G) with the most appropriate heading from the list. There are more headings than paragraphs.",
      title: "The Epistemological Matrix: How Syntax and Cognition Shape Human Reality",
      headings: [
        { id: "h1", text: "i. The Linguistic Relativity Revival: Experimental Validation" },
        { id: "h2", text: "ii. Universal Grammar: Chomsky's Innate Blueprint" },
        { id: "h3", text: "iii. The Hegemony of English in Contemporary Scientific Discourse" },
        { id: "h4", text: "iv. Early Cartesian Assumptions: Language as Transparent Thought" },
        { id: "h5", text: "v. Algorithmic LLMs and the Dissolution of Embodied Semantics" },
        { id: "h6", text: "vi. Evolutionary Emergence: Vocal Anatomy and Social Bonding" },
        { id: "h7", text: "vii. Neuroplastic Rewiring: Bilingual Cognitive Advantages" },
        { id: "h8", text: "viii. Radical Linguistic Determinism: The Sapir-Whorf Hypothesis" },
        { id: "h9", text: "ix. Future Frontiers: Direct Neural Interfaces Beyond Language" }
      ],
      paragraphs: [
        {
          id: "para_A",
          letter: "Paragraph A",
          text: "For centuries throughout early modern Western philosophy, language was regarded as little more than a transparent vehicle for pre-existing conceptual thoughts. Thinkers from Descartes to the Port-Royal grammarians operated under the steadfast premise that logic was universal, abstract, and independent of the phonetic symbols employed to articulate it. In this Cartesian paradigm, whether a philosopher ruminated in Latin, French, or English was deemed inconsequential; syntax functioned merely as an acoustic mirror reflecting immaculate mental operations.",
          correctHeadingId: "h4",
          explanation: "Paragraph A explicitly discusses Cartesian philosophy viewing language as a transparent vehicle for universal logic."
        },
        {
          id: "para_B",
          letter: "Paragraph B",
          text: "This tranquil consensus was radically shattered in the mid-twentieth century by anthropological linguists Edward Sapir and Benjamin Lee Whorf. Their groundbreaking inquiries into indigenous languages, most notably the Hopi conception of non-linear temporality, birthed the hypothesis that linguistic structures do not merely express thoughts, but fundamentally determine cognitive reality. In its most uncompromising formulation, this determinism postulated that humans are prisoners of their mother tongue's grammatical scaffolding, unable to conceptualize phenomena for which their syntax lacks provision.",
          correctHeadingId: "h8",
          explanation: "Paragraph B details the Sapir-Whorf hypothesis and radical linguistic determinism."
        },
        {
          id: "para_C",
          letter: "Paragraph C",
          text: "In vigorous repudiation of such cultural relativism, Noam Chomsky initiated a cognitive revolution in the late 1950s. Chomsky asserted that beneath the superficial kaleidoscope of global idioms lies a hardwired 'Language Acquisition Device' and an innate Universal Grammar. According to Chomskyian nativism, a Martian scientist observing humanity would perceive all human dialects as regional variations of a single biological tongue, predetermined by innate genetic architecture rather than socio-cultural conditioning.",
          correctHeadingId: "h2",
          explanation: "Paragraph C describes Chomsky's Universal Grammar and innate biological blueprint."
        },
        {
          id: "para_D",
          letter: "Paragraph D",
          text: "Decades later, rigorous experimental psycholinguistics has resurrected a nuanced variant of linguistic relativity. Psychologists conducting empirical color-discrimination tests and spatial orientation drills demonstrated that language subtly primes perception without imprisoning it. For example, speakers of Australian aboriginal languages that employ absolute cardinal directions (North, South, East, West) rather than egocentric coordinates (left, right) exhibit an uncanny subconscious compass orientation unachievable by Indo-European speakers, demonstrating measurable cognitive shaping.",
          correctHeadingId: "h1",
          explanation: "Paragraph D examines the experimental, empirical validation reviving a nuanced linguistic relativity."
        },
        {
          id: "para_E",
          letter: "Paragraph E",
          text: "Simultaneously, neuroimaging telemetry has illuminated the profound neuroplastic adaptations forged by multilingualism. Polyglots repeatedly demonstrate enhanced executive function, heightened attentional inhibition, and an enriched cognitive reserve that measurably delays the clinical onset of neurodegenerative conditions such as Alzheimer's. The perpetual mental gymnastics of suppressing competing lexical candidates while navigating disparate grammatical matrices reorganizes cerebral connectivity in the prefrontal cortex.",
          correctHeadingId: "h7",
          explanation: "Paragraph E covers neuroplasticity, enhanced executive control, and delay of Alzheimer's in bilinguals."
        },
        {
          id: "para_F",
          letter: "Paragraph F",
          text: "At the current frontier of artificial intelligence, massive transformer neural networks demonstrate astonishing linguistic fluency, yet reignite fundamental philosophical dilemmas. Unlike human children whose acquisition of syntax is intrinsically grounded in somatic embodiment, sensorimotor exploration, and emotional intentionality, statistical language models manipulate syntax devoid of genuine semantic comprehension. This disembodied statistical mimicry challenges traditional definitions of understanding, forcing epistemologists to decouple grammatical mastery from conscious thought.",
          correctHeadingId: "h5",
          explanation: "Paragraph F analyzes LLMs, statistical language without embodiment, and the decoupling of syntax from conscious comprehension."
        },
        {
          id: "para_G",
          letter: "Paragraph G",
          text: "Looking toward the speculative horizon, researchers in neuromorphic bio-engineering envision brain-computer interfaces capable of transmitting thoughts directly via sub-cortical electrical oscillations. Should instantaneous conceptual telepathy become clinically viable, the cumbersome medium of sequential phonetic syntax—which has mediated human social cooperation for over one hundred millennia—may ultimately be superseded by synthetic, post-linguistic communion.",
          correctHeadingId: "h9",
          explanation: "Paragraph G speculates on direct neural interfaces, BCIs, and post-linguistic thought transmission."
        }
      ]
    }
  ]
};
