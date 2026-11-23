// toeflData.js
// TOEFL ITP Mock Test - Section 2: Structure & Written Expression (40 items | 25 minutes)

export const toeflSection2Data = {
  title: "TOEFL ITP - Section 2: Structure & Written Expression",
  durationMinutes: 25,
  totalItems: 40,
  scoreScale: "ETS Scale: 31 - 68 (Target 600+ overall requires ~60+ in Section 2)",
  questions: [
    // PART 1: Structure (1-15)
    {
      id: 1,
      type: "structure",
      text: "_______ of classical ballet in the United States began around 1830.",
      options: ["To teach", "Is teaching", "It was taught", "The teaching"],
      answer: 3,
      explanation: "A noun phrase subject is required before the prepositional phrase 'of classical ballet'. 'The teaching' functions as the gerund/noun subject."
    },
    {
      id: 2,
      type: "structure",
      text: "Mason bees are solitary bees, which means _______ in colonies like honeybees or bumblebees.",
      options: ["do not live", "when they do not live", "that they do not live", "that do not live"],
      answer: 2,
      explanation: "'Means' takes a noun clause object introduced by 'that' containing subject and verb: 'that they do not live'."
    },
    {
      id: 3,
      type: "structure",
      text: "Long before the advent of written literature, _______ their myths and stories in oral poems told by successive generations.",
      options: ["people recorded", "recording people", "people’s recordings", "people who recorded"],
      answer: 0,
      explanation: "The main clause requires a subject ('people') and finite verb ('recorded')."
    },
    {
      id: 4,
      type: "structure",
      text: "Comparative anatomy is _______ classification of both plants and animals.",
      options: ["the basis for", "for basics", "the basis that", "the basically"],
      answer: 0,
      explanation: "'The basis for' completes the predicate noun phrase followed by its required preposition."
    },
    {
      id: 5,
      type: "structure",
      text: "Although legend has it that the Pilgrims first set foot in America on Plymouth Rock in 1620, _______ documentary evidence confirming this.",
      options: ["no", "still is no", "there is no", "but no"],
      answer: 2,
      explanation: "Existential 'there is no' provides the dummy subject and verb required for the main clause following an 'Although' dependent clause."
    },
    {
      id: 6,
      type: "structure",
      text: "Despite its fishlike form, the whale is _______ and will drown if submerged too long.",
      options: ["an animal breathes air that", "an animal that breathes air", "an animal breathes air", "that an animal breathes air"],
      answer: 1,
      explanation: "Noun complement 'an animal' followed by a restrictive relative clause 'that breathes air'."
    },
    {
      id: 7,
      type: "structure",
      text: "Clouds _______ in warm air rises, cools, and condenses.",
      options: ["when form water vapor", "form when water vapor", "form vapor water when", "vapor form when water"],
      answer: 1,
      explanation: "Subject 'Clouds' + verb 'form' + adverbial clause connector 'when' + subject 'water vapor'."
    },
    {
      id: 8,
      type: "structure",
      text: "Portland, _______ , is located primarily on two hilly peninsulas overlooking Casco Bay and its many islands.",
      options: ["which Maine’s largest city", "Maine’s largest city where", "is Maine’s largest city", "Maine’s largest city"],
      answer: 3,
      explanation: "Appositive noun phrase: 'Maine’s largest city' renames the proper noun Portland without needing a redundant verb."
    },
    {
      id: 9,
      type: "structure",
      text: "Mars, the so-called red planet, is actually colored red by iron oxide and other impurities _______ the whole surface.",
      options: ["that cover", "in which are covered", "that they cover", "and covered"],
      answer: 0,
      explanation: "Relative clause 'that cover' modifying 'impurities'."
    },
    {
      id: 10,
      type: "structure",
      text: "The 1903 film The Great Train Robbery was the first significant film in which the classic western story’s formula of crime and retribution _______ .",
      options: ["was used", "to be used", "used", "had used"],
      answer: 0,
      explanation: "The passive verb 'was used' is required because the formula was utilized by filmmakers."
    },
    {
      id: 11,
      type: "structure",
      text: "When played in certain ways, the bassoon can produce comical sounds, _______ it is sometimes referred to as the clown of the orchestra.",
      options: ["or", "that", "so", "whether"],
      answer: 2,
      explanation: "'So' introduces a result clause connecting the funny sounds to its nickname."
    },
    {
      id: 12,
      type: "structure",
      text: "In modern societies, _______ authorized body such as a legislature or a court makes the law.",
      options: ["some", "some of", "some the", "for some"],
      answer: 0,
      explanation: "'Some' modifies the singular count noun 'authorized body' to mean 'a certain unspecified'."
    },
    {
      id: 13,
      type: "structure",
      text: "The sense of smell functions chemically, _______ the sense of taste, but it is 10,000 times more sensitive.",
      options: ["as does", "so have", "which as", "by which"],
      answer: 0,
      explanation: "'As does' shows parallel manner inversion: 'as does [subject]'."
    },
    {
      id: 14,
      type: "structure",
      text: "_______ primarily from plant oils, perfumes were used in ancient times as incense in religious rites, in medicines, and later for adornment.",
      options: ["Made them", "They made", "Made", "By making"],
      answer: 2,
      explanation: "Past participle phrase 'Made primarily from plant oils' modifying 'perfumes'."
    },
    {
      id: 15,
      type: "structure",
      text: "Boise became _______ of the state of Idaho in 1864.",
      options: ["as the capital", "the capital", "to be the capital", "the capital was"],
      answer: 1,
      explanation: "Linking verb 'became' directly takes the noun phrase complement 'the capital'."
    },

    // PART 2: Written Expression (16-40)
    {
      id: 16,
      type: "written_expression",
      text: "Soybeans contain [a](A) rich [concentrations](B) of phytoestrogens, estrogenlike molecules [derived](C) from [plants](D).",
      options: ["a", "concentrations", "derived", "plants"],
      answer: 0,
      correction: "Delete 'a' or change 'concentrations' to singular 'concentration'",
      explanation: "Indefinite article 'a' cannot modify the plural noun 'concentrations'."
    },
    {
      id: 17,
      type: "written_expression",
      text: "The original Welland Canal, [opened which](A) in 1829, [was neither](B) deep enough [nor wide](C) enough [for modern](D) ships.",
      options: ["opened which", "was neither", "nor wide", "for modern"],
      answer: 0,
      correction: "which opened",
      explanation: "Relative pronoun 'which' must precede the verb 'opened'."
    },
    {
      id: 18,
      type: "written_expression",
      text: "A lubricant minimizes the [introduction](A) of dirt, moisture, or other [foreign](B) materials [between](C) sliding surfaces, eliminates wear by keeping the surfaces apart, and [prevention](D) corrosion.",
      options: ["introduction", "foreign", "between", "prevention"],
      answer: 3,
      correction: "prevents",
      explanation: "Parallel structure: 'minimizes...', 'eliminates...', and 'prevents' (verb form required, not noun 'prevention')."
    },
    {
      id: 19,
      type: "written_expression",
      text: "There are [thousands](A) kinds of inks [used both](B) in the [printing](C) industry and in the manufacture of ballpoint and fountain pens for [writing](D).",
      options: ["thousands", "used both", "printing", "writing"],
      answer: 0,
      correction: "thousands of",
      explanation: "Plural numeral 'thousands' must be followed by 'of' before a plural noun."
    },
    {
      id: 20,
      type: "written_expression",
      text: "A gene is a [biological](A) unit of information [who](B) directs the activity of [a cell](C) or organism during [its](D) lifetime.",
      options: ["biological", "who", "a cell", "its"],
      answer: 1,
      correction: "which / that",
      explanation: "'Who' refers only to people. For a thing ('unit of information'), use 'which' or 'that'."
    },
    {
      id: 21,
      type: "written_expression",
      text: "[Like landscapes](A) in miniature, gardens are places to grow plants [for](B) pleasure and [to provide](C) beauty and [relaxed](D).",
      options: ["Like landscapes", "for", "to provide", "relaxed"],
      answer: 3,
      correction: "relaxation",
      explanation: "Parallelism with noun 'beauty': 'beauty and relaxation'."
    },
    {
      id: 22,
      type: "written_expression",
      text: "Hurricanes consist [at](A) high-velocity [winds](B) [blowing circularly](C) around a low-pressure center [known](D) as the eye of the storm.",
      options: ["at", "winds", "blowing circularly", "known"],
      answer: 0,
      correction: "of",
      explanation: "The verb 'consist' takes the preposition 'of', not 'at'."
    },
    {
      id: 23,
      type: "written_expression",
      text: "One of the most [significance](A) political movements [since](B) the Second World War ended has been the [breaking up](C) of former colonial empires into [independent nations](D).",
      options: ["significance", "since", "breaking up", "independent nations"],
      answer: 0,
      correction: "significant",
      explanation: "Adjective 'significant' is required to modify 'political movements'."
    },
    {
      id: 24,
      type: "written_expression",
      text: "Radar can [determine](A) the direction, distance, [height](B), and speed of objects that are [too much](C) [far away](D) for the human eye to see.",
      options: ["determine", "height", "too much", "far away"],
      answer: 2,
      correction: "too",
      explanation: "Before an adverb 'far away', use 'too', not 'too much'."
    },
    {
      id: 25,
      type: "written_expression",
      text: "[Establishing](A) outside Minneapolis, Minnesota, in 1976, the Minnesota Valley National Wildlife Refuge [contains](B) [more than](C) 9,000 acres of forests, prairies, marshes, and [lakes](D).",
      options: ["Establishing", "contains", "more than", "lakes"],
      answer: 0,
      correction: "Established",
      explanation: "Passive past participle 'Established' is needed because the refuge was established by someone."
    },
    {
      id: 26,
      type: "written_expression",
      text: "Most animals [have](A) salivary [glands](B) [what](C) resemble [those](D) in humans.",
      options: ["have", "glands", "what", "those"],
      answer: 2,
      correction: "that / which",
      explanation: "'What' cannot be used as a restrictive relative pronoun with an explicit antecedent ('glands'). Use 'that' or 'which'."
    },
    {
      id: 27,
      type: "written_expression",
      text: "Used [for making](A) pottery, clay has two [characteristics distinctive](B): it can be molded and it can be baked [to form](C) a brittle but [otherwise](D) durable material.",
      options: ["for making", "characteristics distinctive", "to form", "otherwise"],
      answer: 1,
      correction: "distinctive characteristics",
      explanation: "Adjectives in English precede the noun: 'distinctive characteristics'."
    },
    {
      id: 28,
      type: "written_expression",
      text: "The novels of Amy Tan [depict of](A) tension between mothers and daughters [as well as](B) conflicts [experienced by](C) many Chinese immigrants to the United [States](D).",
      options: ["depict of", "as well as", "experienced by", "States"],
      answer: 0,
      correction: "depict",
      explanation: "'Depict' is a transitive verb that takes a direct object without the preposition 'of'."
    },
    {
      id: 29,
      type: "written_expression",
      text: "The symptoms [of](A) pneumonia, a lung [infection](B), [include](C) high fever, chest pain, breathing [difficult](D), and coughing.",
      options: ["of", "infection", "include", "difficult"],
      answer: 3,
      correction: "difficulty",
      explanation: "Compound noun 'breathing difficulty' or gerund phrase is needed, not adjective 'difficult'."
    },
    {
      id: 30,
      type: "written_expression",
      text: "A basic premise of humanism is [that](A) people are rational beings who [possesses](B) the capacity [for](C) truth and [goodness](D).",
      options: ["that", "possesses", "for", "goodness"],
      answer: 1,
      correction: "possess",
      explanation: "Plural subject antecedent 'beings' requires plural verb 'possess', not singular 'possesses'."
    },
    {
      id: 31,
      type: "written_expression",
      text: "The [long](A) [of time](B) a battery maintains its useful life [while idle](C) [depends on](D) many factors: quality of construction, cell size, cell type, and storage temperature.",
      options: ["long", "of time", "while idle", "depends on"],
      answer: 0,
      correction: "length",
      explanation: "Noun 'length' is required following the definite article 'The', not adjective 'long'."
    },
    {
      id: 32,
      type: "written_expression",
      text: "Leather is dried under [natural](A) or controlled humidity [conditions](B), [prepared](C) it for [subsequent](D) softening and finishing operations.",
      options: ["natural", "conditions", "prepared", "subsequent"],
      answer: 2,
      correction: "preparing",
      explanation: "Present participle clause expressing consequence: 'preparing it for...'."
    },
    {
      id: 33,
      type: "written_expression",
      text: "Of all the organized, independent [city](A) in Texas, Laredo, [founded](B) in 1755, is the [oldest](C).",
      options: ["city", "founded", "oldest", "Texas"],
      answer: 0,
      correction: "cities",
      explanation: "'Of all the...' must be followed by a plural count noun 'cities'."
    },
    {
      id: 34,
      type: "written_expression",
      text: "[There](A) was in Kitty Hawk, North Carolina, on December 17, 1903, [that](B) the first controlled [flight](C) of a powered, heavier-than-air craft [took place](D).",
      options: ["There", "that", "flight", "took place"],
      answer: 0,
      correction: "It",
      explanation: "Cleft sentence structure emphasizing location/time requires dummy 'It was... that...', not 'There was'."
    },
    {
      id: 35,
      type: "written_expression",
      text: "The [favored](A) habitat of the junco, a small sparrow, is a [mixed](B) or coniferous forest, [despite](C) it is [often noted](D) in fields, thickets, and city parks.",
      options: ["favored", "mixed", "despite", "often noted"],
      answer: 2,
      correction: "although / though",
      explanation: "'Despite' is a preposition and cannot introduce a full clause with subject and verb ('it is'). Use 'although'."
    },
    {
      id: 36,
      type: "written_expression",
      text: "By [studying](A) modern coral reefs, geologists and biologists [hope to](B) understand [mechanism](C) of [formation](D), migration, and entrapment of petroleum in ancient reefs.",
      options: ["studying", "hope to", "mechanism", "formation"],
      answer: 2,
      correction: "the mechanism / mechanisms",
      explanation: "Singular countable noun 'mechanism' cannot stand alone without an article or plural inflection."
    },
    {
      id: 37,
      type: "written_expression",
      text: "Searching for [alternate](A) forms of energy does not [necessary](B) mean [the abandonment](C) of fossil fuels as an energy [source](D).",
      options: ["alternate", "necessary", "the abandonment", "source"],
      answer: 1,
      correction: "necessarily",
      explanation: "Adverb 'necessarily' is required to modify the verb 'mean'."
    },
    {
      id: 38,
      type: "written_expression",
      text: "United States civil rights [activist](A) Medgar Evers was a leader in the [struggle](B) to gain equal rights [to](C) African Americans in his [home state](D), Mississippi.",
      options: ["activist", "struggle", "to", "home state"],
      answer: 2,
      correction: "for",
      explanation: "'Equal rights for someone', not 'equal rights to someone'."
    },
    {
      id: 39,
      type: "written_expression",
      text: "The [element](A) potassium [makes up](B) [less](C) than one half [percentage](D) of the human body.",
      options: ["element", "makes up", "less", "percentage"],
      answer: 3,
      correction: "percent",
      explanation: "After a fraction or number ('one half'), use 'percent' (not 'percentage')."
    },
    {
      id: 40,
      type: "written_expression",
      text: "The canoe [designed](A) by North American Indians was very suitable for use on inland waters, [for](B) it was easily portable and had [amply](C) storage [space](D).",
      options: ["designed", "for", "amply", "space"],
      answer: 2,
      correction: "ample",
      explanation: "Adjective 'ample' is needed to modify the compound noun 'storage space'."
    }
  ]
};
