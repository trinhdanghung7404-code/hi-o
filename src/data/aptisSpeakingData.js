// aptisSpeakingData.js
// Dedicated Aptis Speaking Module (12 mins | 4 Parts)

export const aptisSpeakingTask = {
  title: "Aptis ESOL Speaking (Target C1 Level)",
  durationMinutes: 12,
  examinerName: "Dr. Alistair Vance (Senior Examiner)",
  parts: [
    {
      partNumber: 1,
      name: "Part 1: Personal Profile & General Topics",
      description: "Answer 3 short personal questions. You have 30 seconds to respond to each question. Start speaking when the record indicator pulses.",
      prepTimeSeconds: 5,
      speakTimeSeconds: 30,
      questions: [
        {
          id: "spk_p1_q1",
          prompt: "Please tell me about your hometown and what makes it distinct from other cities in your country.",
          c1AudioScript: "Please tell me about your hometown and what makes it distinct from other cities in your country.",
          c1BandSample: "I hail from Bristol, a vibrant maritime city in the southwest of England. What truly distinguishes it is the striking juxtaposition between centuries-old nautical heritage and cutting-edge aerospace and creative technology sectors, coupled with an unmistakably independent civic spirit.",
          keyStructures: ["Cleft sentence ('What truly distinguishes it is...')", "Sophisticated vocabulary ('striking juxtaposition', 'nautical heritage')"]
        },
        {
          id: "spk_p1_q2",
          prompt: "What form of leisure or relaxation do you find most rejuvenating after an intellectually demanding week?",
          c1AudioScript: "What form of leisure or relaxation do you find most rejuvenating after an intellectually demanding week?",
          c1BandSample: "When recovering from intense intellectual exertion, I invariably turn to long-distance fell running. Engaging in rigorous physical endurance across rugged landscapes allows my subconscious mind to decompress and fosters mental resilience.",
          keyStructures: ["Participle clause ('Engaging in rigorous...')", "High-level register ('intellectual exertion', 'invariably')"]
        },
        {
          id: "spk_p1_q3",
          prompt: "How have digital communication technologies influenced the way you cultivate personal friendships?",
          c1AudioScript: "How have digital communication technologies influenced the way you cultivate personal friendships?",
          c1BandSample: "While instant messaging facilitates seamless global connectivity, it undeniably risks substituting superficial text exchanges for profound emotional intimacy. Consequently, I consciously prioritize face-to-face dialogues whenever feasible.",
          keyStructures: ["Concessive clause ('While instant messaging...')", "Advanced connectors ('Consequently', 'undeniably')"]
        }
      ]
    },
    {
      partNumber: 2,
      name: "Part 2: Picture Description & Thematic Expansion",
      description: "Describe the photograph shown below, then answer two thematic follow-up questions. You have 45 seconds for each segment.",
      prepTimeSeconds: 5,
      speakTimeSeconds: 45,
      imageTheme: "Collaborative Open-Plan Architecture & Remote Co-Working",
      imageSvgType: "modern_office",
      questions: [
        {
          id: "spk_p2_q1",
          type: "description",
          prompt: "Describe in detail what you can observe in this photograph.",
          c1AudioScript: "Describe in detail what you can observe in this photograph.",
          c1BandSample: "Depicted here is an expansive, sun-drenched co-working sanctuary characterized by minimalist biophilic architecture. In the foreground, two professionals are immersed in what appears to be an animated strategy session over interactive blueprints, while solitary individuals in the mezzanine background are absorbed in focused concentration. The abundance of natural flora creates an aura of tranquil productivity.",
          keyStructures: ["Participial opening ('Depicted here is...')", "Spatial orientation ('In the foreground', 'mezzanine background')", "Compound adjectives ('sun-drenched')"]
        },
        {
          id: "spk_p2_q2",
          type: "opinion1",
          prompt: "To what extent do open-plan collaborative work environments foster genuine innovation versus workplace distraction?",
          c1AudioScript: "To what extent do open-plan collaborative work environments foster genuine innovation versus workplace distraction?",
          c1BandSample: "Open-plan environments undeniably dismantle bureaucratic silos and stimulate serendipitous cross-disciplinary ideation. Nonetheless, empirical organizational studies consistently indicate that relentless auditory disruption hampers deep analytical synthesis, suggesting that hybrid zoning is vastly preferable.",
          keyStructures: ["Balanced discourse markers ('Nonetheless', 'empirical studies consistently indicate')", "Advanced terminology ('bureaucratic silos', 'serendipitous ideation')"]
        },
        {
          id: "spk_p2_q3",
          type: "opinion2",
          prompt: "How do you envisage the workplace evolving over the subsequent quarter-century?",
          c1AudioScript: "How do you envisage the workplace evolving over the subsequent quarter-century?",
          c1BandSample: "Over the coming twenty-five years, physical office spaces will inevitably transition from daily operational hubs into specialized decentralized retreats for strategic consensus. Augmented reality interfaces and autonomous collaboration platforms will render geographical co-location largely obsolete.",
          keyStructures: ["Future projections ('will inevitably transition from... into')", "Precise modals and lexical verbs ('render... obsolete')"]
        }
      ]
    },
    {
      partNumber: 3,
      name: "Part 3: Comparative Analysis & Contrast",
      description: "Compare and contrast the two contrasting situations depicted in the images, then respond to two evaluative questions. You have 45 seconds per question.",
      prepTimeSeconds: 5,
      speakTimeSeconds: 45,
      theme: "Urban High-Speed Commuting vs. Wilderness Solitary Exploration",
      imageSvgType: "metro_vs_wilderness",
      questions: [
        {
          id: "spk_p3_q1",
          type: "comparison",
          prompt: "Compare and contrast these two contrasting modes of human existence.",
          c1AudioScript: "Compare and contrast these two contrasting modes of human existence.",
          c1BandSample: "Both scenes capture quintessential human trajectories, yet they stand in diametric opposition regarding sensory input and pacing. The image on the left encapsulates the hurried, claustrophobic cadence of metropolitan commuting, where individuals are subsumed by urban infrastructure. Conversely, the right-hand image epitomizes solitary contemplation amidst untamed nature, affording psychological clarity.",
          keyStructures: ["Comparative nuance ('stand in diametric opposition', 'Conversely', 'yet they')"]
        },
        {
          id: "spk_p3_q2",
          type: "preference",
          prompt: "Which of these two environments is more conducive to long-term psychological wellbeing, and why?",
          c1AudioScript: "Which of these two environments is more conducive to long-term psychological wellbeing, and why?",
          c1BandSample: "Without question, immersion in pristine wilderness exerts a restorative neurological influence, counteracting sensory overload. That said, total prolonged isolation can breed alienation; hence, a dynamic balance incorporating cultural urban stimulation with periodic wilderness retreats is optimum.",
          keyStructures: ["Balanced rebuttal ('That said', 'hence', 'Without question')"]
        },
        {
          id: "spk_p3_q3",
          type: "societal",
          prompt: "Why are contemporary societies experiencing an unprecedented yearning to reconnect with undisturbed wilderness?",
          c1AudioScript: "Why are contemporary societies experiencing an unprecedented yearning to reconnect with undisturbed wilderness?",
          c1BandSample: "This collective resurgence stems fundamentally from profound digital fatigue and hyper-urbanization. When human beings are constantly subjected to algorithmic surveillance and artificial environments, seeking out untamed natural habitats serves as an existential counterweight.",
          keyStructures: ["Causal analysis ('stems fundamentally from')", "Abstract conceptual vocabulary ('algorithmic surveillance', 'existential counterweight')"]
        }
      ]
    },
    {
      partNumber: 4,
      name: "Part 4: Extended Abstract Topic (C1 Key Benchmark)",
      description: "You have 1 MINUTE to prepare notes on the three related questions, followed by a 2-MINUTE uninterrupted spoken monologue.",
      prepTimeSeconds: 60,
      speakTimeSeconds: 120,
      topic: "Ethical Implications of Artificial Intelligence in Higher Education & Intellectual Originality",
      prompts: [
        "1. Describe a recent instance where emerging artificial intelligence dramatically disrupted a conventional institution or discipline.",
        "2. What ethical perils arise when generative models are utilized to author scholarly research or creative art?",
        "3. How should educators reimagine pedagogy and academic integrity in an era where synthetic intelligence matches human capability?"
      ],
      c1AudioScript: "You now have one minute to prepare your response to the three questions displayed on screen. You will then speak for two continuous minutes.",
      c1BandSample: "The inexorable rise of generative language architectures has irrevocably transformed higher education, precipitating a paradigm shift reminiscent of the advent of the printing press. Recently, tertiary institutions have witnessed an unprecedented dilemma as automated systems effortlessly generate sophisticated dissertations in seconds. \n\nThis phenomenon engenders profound ethical and cognitive concerns. Crucially, when scholars delegate syntheses and critical evaluation to algorithmic black boxes, they risk atrophying their own capacity for rigorous dialectical reasoning. Furthermore, problems of intellectual attribution and synthetic hallucinations undermine the very bedrock of scientific empiricism. \n\nTo navigate this existential juncture, educational institutions must abandon futile punitive prohibitions and instead fundamentally overhaul assessment paradigms. Rather than grading static textual output, pedagogues must prioritize real-time Socratic oral disputations, ethical interrogation, and experiential problem-solving. Only through such curricular evolution can we cultivate discerning intellectual autonomy.",
      keyStructures: [
        "Advanced introductory metaphor ('precipitating a paradigm shift reminiscent of...')",
        "Passive and inversion variety ('Only through such curricular evolution can we...')",
        "Philosophical vocabulary ('atrophying', 'dialectical reasoning', 'existential juncture', 'synthetic hallucinations')"
      ]
    }
  ]
};
