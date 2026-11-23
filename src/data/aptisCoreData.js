// aptisCoreData.js
// Complete 50 items: 25 Grammar MCQs (C1 level testing inversions, conditionals, cleft sentences, advanced prepositions) 
// + 25 Vocabulary items (synonym matching, definitions, collocations)

export const aptisGrammarQuestions = [
  {
    id: 1,
    category: "Grammar",
    topic: "Negative Inversion",
    question: "Rarely _______ such an exquisite display of oratorical prowess in a modern debate.",
    options: ["we have witnessed", "have we witnessed", "we witnessed", "had we witness"],
    answer: 1,
    explanation: "Negative inversion rule: When a restrictive or negative adverb (e.g. Rarely, Seldom, Scarcely) begins a sentence, subject-auxiliary inversion is mandatory ('have we witnessed'). Essential for CEFR C1 stylistic range."
  },
  {
    id: 2,
    category: "Grammar",
    topic: "Mixed Conditionals",
    question: "If he _______ his PhD thesis last year, he _______ lecturing at Oxford today.",
    options: [
      "had finished / wouldn't be",
      "finished / won't be",
      "would finish / hadn't been",
      "finishes / wouldn't have been"
    ],
    answer: 0,
    explanation: "Mixed conditional (Past condition -> Present result): 'If he had finished' (past perfect for unreal past) + 'he wouldn't be' (would + infinitive for present consequence)."
  },
  {
    id: 3,
    category: "Grammar",
    topic: "Cleft Sentences",
    question: "It was only when the audit was finalized _______ the discrepancies became apparent.",
    options: ["than", "that", "which", "then"],
    answer: 1,
    explanation: "It-cleft structure: 'It was [time/prepositional phrase] that...'. The connector 'that' introduces the relative clause emphasizing the specific moment."
  },
  {
    id: 4,
    category: "Grammar",
    topic: "Subjunctive Mood",
    question: "The regulatory committee recommended that the proposal _______ submitted without delay.",
    options: ["is", "be", "was", "should being"],
    answer: 1,
    explanation: "Mandative subjunctive: Verbs of demanding/recommending take the bare infinitive ('be') regardless of person or tense."
  },
  {
    id: 5,
    category: "Grammar",
    topic: "Inversion with 'Not only'",
    question: "Not only _______ the research methodology flawed, but the conclusions were also spurious.",
    options: ["was", "it was", "has been", "did"],
    answer: 0,
    explanation: "'Not only' at the beginning of a clause triggers inversion: 'Not only was the research methodology flawed...'."
  },
  {
    id: 6,
    category: "Grammar",
    topic: "Participle Clauses",
    question: "_______ all the relevant data, the team embarked on drafting the comprehensive whitepaper.",
    options: ["Having collated", "Collating", "Being collated", "On collate"],
    answer: 0,
    explanation: "Perfect participle clause ('Having collated') highlights that the data collation was completed before the team began drafting."
  },
  {
    id: 7,
    category: "Grammar",
    topic: "Advanced Dependent Prepositions",
    question: "The suspect's explanation was deemed incompatible _______ the forensic evidence gathered.",
    options: ["to", "with", "against", "from"],
    answer: 1,
    explanation: "Collocation/Preposition: 'incompatible with' is the exact C1 academic pairing."
  },
  {
    id: 8,
    category: "Grammar",
    topic: "Conditionals with Inversion",
    question: "_______ any queries arise regarding the protocol, please notify the laboratory director immediately.",
    options: ["Should", "Had", "Were", "Would"],
    answer: 0,
    explanation: "First conditional inversion replacing 'If any queries arise' -> 'Should any queries arise'."
  },
  {
    id: 9,
    category: "Grammar",
    topic: "Passive Reporting Structures",
    question: "The economic downturn is believed _______ triggered by reckless speculation in commodities.",
    options: ["to be", "to have been", "that it was", "having been"],
    answer: 1,
    explanation: "Personal passive construction referring to a past event: Subject + is believed + to have been + past participle."
  },
  {
    id: 10,
    category: "Grammar",
    topic: "Concession Clauses",
    question: "Tempting _______ the venture capitalist's offer appeared, the founders resolved to maintain autonomy.",
    options: ["as", "even", "although", "despite"],
    answer: 0,
    explanation: "Inverted concession structure: Adjective + 'as' / 'though' + subject + verb ('Tempting as the offer appeared')."
  },
  {
    id: 11,
    category: "Grammar",
    topic: "Past Modal Verbs",
    question: "You _______ sent the revised agreement by courier; an encrypted email would have sufficed.",
    options: ["needn't have", "mustn't have", "couldn't have", "hadn't to have"],
    answer: 0,
    explanation: "'Needn't have + past participle' expresses that an action was performed, but was in fact unnecessary."
  },
  {
    id: 12,
    category: "Grammar",
    topic: "Wh- Cleft Sentences",
    question: "What baffled the anthropologists most _______ the sudden abandonment of the coastal settlements.",
    options: ["being", "was", "were", "had"],
    answer: 1,
    explanation: "Wh-cleft sentence with singular concept: 'What baffled the anthropologists most was [the sudden abandonment]'."
  },
  {
    id: 13,
    category: "Grammar",
    topic: "Unreal Past with 'It's high time'",
    question: "It is high time the international community _______ decisive measures against habitat degradation.",
    options: ["takes", "took", "had taken", "has taken"],
    answer: 1,
    explanation: "After 'It is high time / about time + subject', standard English requires the subjunctive/unreal past tense ('took')."
  },
  {
    id: 14,
    category: "Grammar",
    topic: "Prepositional Inversion",
    question: "Under no circumstances _______ employees divulge confidential intellectual property.",
    options: ["may", "must they", "they must", "can they to"],
    answer: 0,
    explanation: "Under no circumstances + modal auxiliary + subject + verb: 'Under no circumstances may employees divulge...'"
  },
  {
    id: 15,
    category: "Grammar",
    topic: "Advanced Relative Clauses",
    question: "The consortium, _______ financial resources were virtually inexhaustible, easily outbid its rivals.",
    options: ["whose", "of which", "whom", "to which"],
    answer: 0,
    explanation: "Possessive relative pronoun referring to the consortium's financial resources: 'whose'."
  },
  {
    id: 16,
    category: "Grammar",
    topic: "Conditionals with 'Were to'",
    question: "Were the government _______ tariffs on semiconductors, inflation would inevitably surge.",
    options: ["reimposing", "to reimpose", "reimposed", "has reimposed"],
    answer: 1,
    explanation: "Second conditional inversion: 'Were [subject] to [infinitive]' expresses hypothetical future scenario."
  },
  {
    id: 17,
    category: "Grammar",
    topic: "Gerund vs Infinitive Nuance",
    question: "The CEO was accused of failing to foresee the crisis, but she vehemently denied _______ any advance warning.",
    options: ["to have", "having had", "to having", "have had"],
    answer: 1,
    explanation: "The verb 'deny' takes a gerund or perfect gerund ('having had') when reporting past actions."
  },
  {
    id: 18,
    category: "Grammar",
    topic: "Hardly / Scarcely + When",
    question: "Scarcely had the keynote speaker commenced her address _______ a technical glitch severed the transmission.",
    options: ["than", "when", "that", "while"],
    answer: 1,
    explanation: "'Scarcely had [subject] [past participle] when...' is paired with 'when' (unlike 'No sooner... than')."
  },
  {
    id: 19,
    category: "Grammar",
    topic: "Causal Connectors",
    question: "The merger collapsed owing to mutual distrust, _______ in part from past litigation.",
    options: ["stemming", "stemmed", "stems", "having stemmed to"],
    answer: 0,
    explanation: "Reduced relative participle clause: 'which stemmed in part' -> 'stemming in part from'."
  },
  {
    id: 20,
    category: "Grammar",
    topic: "Hypothetical Wish / Would Rather",
    question: "I would rather you _______ disclose the preliminary clinical trial figures until peer review is complete.",
    options: ["don't", "didn't", "haven't", "won't"],
    answer: 1,
    explanation: "'Would rather + subject + past tense' expresses preference for someone else's action in the present/future: 'didn't disclose'."
  },
  {
    id: 21,
    category: "Grammar",
    topic: "Noun Clause Subjunctive",
    question: "It is imperative that every delegate _______ present during the secret ballot.",
    options: ["is", "be", "must be", "are"],
    answer: 1,
    explanation: "Subjunctive with adjective of urgency ('imperative that someone be present')."
  },
  {
    id: 22,
    category: "Grammar",
    topic: "Prepositional Phrases",
    question: "The archaeological artifact was preserved _______ pristine condition due to the arid soil.",
    options: ["in", "at", "under", "with"],
    answer: 0,
    explanation: "Fixed C1 phrase: 'in pristine condition'."
  },
  {
    id: 23,
    category: "Grammar",
    topic: "Adverbial Placement",
    question: "So overwhelming _______ the public backlash that the ministry promptly retracted the policy.",
    options: ["was", "it was", "did be", "has been"],
    answer: 0,
    explanation: "Inversion with 'So + adjective': 'So overwhelming was the backlash that...'."
  },
  {
    id: 24,
    category: "Grammar",
    topic: "Double Comparatives",
    question: "The more stringent the safety protocols became, _______ the incidence of workplace casualties.",
    options: ["lower", "the lower", "the lowest", "more low"],
    answer: 1,
    explanation: "Parallel proportional comparative: 'The more... the lower...'."
  },
  {
    id: 25,
    category: "Grammar",
    topic: "Dative / Object Inversion",
    question: "Never before _______ such widespread consensus among climate scientists across the globe.",
    options: ["there was", "was there", "has there been", "is there been"],
    answer: 2,
    explanation: "Negative temporal inversion with present perfect: 'Never before has there been...'"
  }
];

export const aptisVocabularyQuestions = [
  {
    id: 26,
    category: "Vocabulary",
    topic: "Synonym Matching (C1)",
    question: "Select the word closest in meaning to 'UBIQUITOUS':",
    options: ["Ephemeral", "Omnipresent", "Obscure", "Ambiguous"],
    answer: 1,
    explanation: "'Ubiquitous' means present, appearing, or found everywhere. Synonym: 'Omnipresent'. (Opposite: ephemeral/obscure)."
  },
  {
    id: 27,
    category: "Vocabulary",
    topic: "Collocation Completion",
    question: "The whistle-blower's revelations _______ grave doubts upon the integrity of the electoral commission.",
    options: ["cast", "shed", "drew", "flung"],
    answer: 0,
    explanation: "Fixed high-level collocation: to 'cast doubts upon/on' something."
  },
  {
    id: 28,
    category: "Vocabulary",
    topic: "Academic Definitions",
    question: "A policy that causes unintentional harm while trying to remedy a problem is described as:",
    options: ["counterproductive", "efficacious", "parsimonious", "benevolent"],
    answer: 0,
    explanation: "'Counterproductive' means having the opposite of the desired effect."
  },
  {
    id: 29,
    category: "Vocabulary",
    topic: "Synonym Matching (C1)",
    question: "Select the word closest in meaning to 'EXACERBATE':",
    options: ["Alleviate", "Aggravate", "Assuage", "Mitigate"],
    answer: 1,
    explanation: "'Exacerbate' means make a problem, bad situation, or negative feeling worse. Synonym: 'Aggravate'."
  },
  {
    id: 30,
    category: "Vocabulary",
    topic: "Academic Collocations",
    question: "The defense attorney argued that the harsh penalty was wholly _______ with the minor nature of the infraction.",
    options: ["disproportionate", "incommensurate", "unaligned", "unbalanced"],
    answer: 1,
    explanation: "'Incommensurate with' is a precise C1 formal collocation meaning entirely out of proportion or not matching in degree."
  },
  {
    id: 31,
    category: "Vocabulary",
    topic: "Synonym Matching (C1)",
    question: "Select the word closest in meaning to 'METICULOUS':",
    options: ["Scrupulous", "Haphazard", "Superficial", "Perfunctory"],
    answer: 0,
    explanation: "'Meticulous' denotes showing great attention to detail. Synonym: 'Scrupulous'."
  },
  {
    id: 32,
    category: "Vocabulary",
    topic: "Idiomatic Verb Phrases",
    question: "The board decided to _______ the controversial restructuring initiative until consumer sentiment stabilized.",
    options: ["shelve", "stow", "crate", "bank"],
    answer: 0,
    explanation: "To 'shelve' an initiative or plan means to postpone or temporarily suspend it."
  },
  {
    id: 33,
    category: "Vocabulary",
    topic: "Word Definitions",
    question: "What term describes the quality of holding tenaciously to a purpose or belief despite adversity?",
    options: ["Tenacity", "Levity", "Frivolity", "Apathy"],
    answer: 0,
    explanation: "'Tenacity' is the quality of being determined, persistent, and unyielding."
  },
  {
    id: 34,
    category: "Vocabulary",
    topic: "Collocation Completion",
    question: "The pharmaceutical conglomerate struck a deal to _______ the proprietary patent rights.",
    options: ["acquire", "seize", "grab", "clutch"],
    answer: 0,
    explanation: "Corporate/academic standard register: to 'acquire patent rights'."
  },
  {
    id: 35,
    category: "Vocabulary",
    topic: "Synonym Matching (C1)",
    question: "Select the word closest in meaning to 'PRAGMATIC':",
    options: ["Dogmatic", "Utilitarian", "Visionary", "Capricious"],
    answer: 1,
    explanation: "'Pragmatic' implies dealing with matters sensibly and realistically based on practical considerations. Closest: 'Utilitarian'."
  },
  {
    id: 36,
    category: "Vocabulary",
    topic: "Collocation Completion",
    question: "The new eco-tax is intended to _______ an incentive for industries to adopt renewable technologies.",
    options: ["furnish", "provide", "grant", "render"],
    answer: 1,
    explanation: "Standard C1 collocation: 'provide an incentive' (or 'furnish with an incentive'). 'Provide' directly takes 'an incentive'."
  },
  {
    id: 37,
    category: "Vocabulary",
    topic: "Synonym Matching (C1)",
    question: "Select the word closest in meaning to 'EPHEMERAL':",
    options: ["Transitory", "Perpetual", "Enduring", "Incessant"],
    answer: 0,
    explanation: "'Ephemeral' means lasting for a very short time. Synonym: 'Transitory'."
  },
  {
    id: 38,
    category: "Vocabulary",
    topic: "Word Definitions",
    question: "The dispersion of people from their original homeland across different regions is termed:",
    options: ["Diaspora", "Enclave", "Exodus", "Emigration"],
    answer: 0,
    explanation: "'Diaspora' specifically refers to the dispersion or spread of any people from their original homeland."
  },
  {
    id: 39,
    category: "Vocabulary",
    topic: "Collocations with Adjectives",
    question: "The prime minister issued a _______ denial concerning rumors of an impending cabinet reshuffle.",
    options: ["vehement", "turbulent", "ferocious", "blatant"],
    answer: 0,
    explanation: "Fixed C1 collocation: a 'vehement denial' (showing forceful and impassioned rejection)."
  },
  {
    id: 40,
    category: "Vocabulary",
    topic: "Synonym Matching (C1)",
    question: "Select the word closest in meaning to 'LACONIC':",
    options: ["Verbose", "Terse", "Garrulous", "Loquacious"],
    answer: 1,
    explanation: "'Laconic' describes using very few words. Synonym: 'Terse'."
  },
  {
    id: 41,
    category: "Vocabulary",
    topic: "Collocation Completion",
    question: "The prolonged drought has wrought _______ havoc on the country's agricultural output.",
    options: ["widespread", "broad", "extended", "spacious"],
    answer: 0,
    explanation: "Classic C1 collocation: 'wrought widespread havoc' on something."
  },
  {
    id: 42,
    category: "Vocabulary",
    topic: "Academic Register",
    question: "The researcher found no _______ evidence to corroborate the hypothesis of quantum entanglement at room temperature.",
    options: ["tangible", "tactile", "palpable", "empirical"],
    answer: 3,
    explanation: "In academic scientific register, evidence derived from experiment/observation is termed 'empirical evidence'."
  },
  {
    id: 43,
    category: "Vocabulary",
    topic: "Synonym Matching (C1)",
    question: "Select the word closest in meaning to 'EQUIVOCAL':",
    options: ["Explicit", "Ambiguous", "Unequivocal", "Lucid"],
    answer: 1,
    explanation: "'Equivocal' means open to more than one interpretation; deliberately ambiguous."
  },
  {
    id: 44,
    category: "Vocabulary",
    topic: "Collocation Completion",
    question: "The city council made a concerted _______ to curb carbon emissions by subsidizing electric mass transit.",
    options: ["endeavor", "attempt", "effort", "pursuit"],
    answer: 2,
    explanation: "Standard institutional collocation: 'make a concerted effort'."
  },
  {
    id: 45,
    category: "Vocabulary",
    topic: "Word Definitions",
    question: "A subtle difference in or shade of meaning, expression, or sound is called a:",
    options: ["Nuance", "Paradox", "Platitude", "Hyperbole"],
    answer: 0,
    explanation: "'Nuance' is a subtle distinction or variation."
  },
  {
    id: 46,
    category: "Vocabulary",
    topic: "Synonym Matching (C1)",
    question: "Select the word closest in meaning to 'SUPERFLUOUS':",
    options: ["Redundant", "Indispensable", "Pivotal", "Integral"],
    answer: 0,
    explanation: "'Superfluous' means unnecessary, especially through being more than enough. Synonym: 'Redundant'."
  },
  {
    id: 47,
    category: "Vocabulary",
    topic: "Prepositional Collocations",
    question: "The young apprentice showed a natural aptitude _______ computational linguistics.",
    options: ["in", "for", "with", "at"],
    answer: 1,
    explanation: "Grammatical collocation: 'an aptitude for' a subject or skill."
  },
  {
    id: 48,
    category: "Vocabulary",
    topic: "Synonym Matching (C1)",
    question: "Select the word closest in meaning to 'SPURIOUS':",
    options: ["Authentic", "Bogus", "Legitimate", "Verifiable"],
    answer: 1,
    explanation: "'Spurious' means not being what it purports to be; false or fake. Synonym: 'Bogus'."
  },
  {
    id: 49,
    category: "Vocabulary",
    topic: "Collocation Completion",
    question: "The foreign minister's controversial remarks _______ an outcry across the diplomatic community.",
    options: ["provoked", "inflicted", "summoned", "ignited"],
    answer: 0,
    explanation: "Fixed high-register collocation: to 'provoke an outcry' (or 'spark an outcry')."
  },
  {
    id: 50,
    category: "Vocabulary",
    topic: "Academic Register",
    question: "A situation that presents two equally unwelcome possibilities is best termed a:",
    options: ["Dilemma", "Quandary", "Deadlock", "Stalemate"],
    answer: 0,
    explanation: "A 'dilemma' precisely denotes a choice between two equally undesirable alternatives."
  }
];

export const allAptisCoreQuestions = [
  ...aptisGrammarQuestions,
  ...aptisVocabularyQuestions
];
