// aptisListeningData.js
// Dedicated Aptis Listening Module (~40 mins | 25 items)
// Features strict max 2 plays counter per audio, realistic SpeechSynthesis / Audio engine, and full transcripts

export const aptisListeningTask = {
  title: "Aptis ESOL Listening (Target C1 Level)",
  durationMinutes: 40,
  totalItems: 25,
  description: "Listen to the recordings and answer the questions. Each audio recording can only be played a MAXIMUM of 2 TIMES.",
  parts: [
    {
      partNumber: 1,
      name: "Part 1: Information Identification (Items 1-13)",
      description: "Listen to 13 short monologues or dialogues. Identify key facts such as times, locations, numbers, reasons, and directives.",
      items: [
        {
          id: 1,
          context: "Train Station Announcement",
          audioScript: "Attention passengers on Platform 4. The 08:45 cross-country express service to Manchester Piccadilly has been diverted due to signalling failure at Crewe. Passengers for Manchester should cross to Platform 9 and board the 09:12 stopping service instead.",
          question: "Where should passengers travelling to Manchester now board their train?",
          options: ["Platform 4", "Platform 7", "Platform 9", "Platform 12"],
          answer: 2,
          explanation: "The speaker explicitly directs: 'Passengers for Manchester should cross to Platform 9 and board the 09:12 stopping service'."
        },
        {
          id: 2,
          context: "Dental Surgery Voicemail",
          audioScript: "Thank you for telephoning St. Jude's Dental Care. Our surgery hours have temporarily altered. We are now open weekdays from 7:30 AM to 4:00 PM, except on Thursdays when emergency appointments run until 7:30 in the evening.",
          question: "On which evening can patients access emergency dental appointments?",
          options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
          answer: 2,
          explanation: "Emergency evening appointments run until 7:30 PM on Thursdays."
        },
        {
          id: 3,
          context: "Exhibition Curator Radio Brief",
          audioScript: "The retrospection of Modernist ceramics opens tomorrow at the Hayward Wing. While general admission to the permanent gallery remains complimentary, tickets for this specialized temporary pavilion are priced at 14 pounds for adults and 9 pounds fifty for concessions.",
          question: "How much is an adult ticket for the specialized ceramics pavilion?",
          options: ["Free of charge", "£9.50", "£14.00", "£23.50"],
          answer: 2,
          explanation: "Adult tickets for the specialized temporary pavilion are stated as £14.00."
        },
        {
          id: 4,
          context: "Airport Flight Disruption",
          audioScript: "This is a priority announcement for passengers booked on British Airways flight BA-448 to Geneva. Due to adverse meteorological conditions over the Alps, boarding will be delayed until 16:20. Complimentary meal vouchers can be collected from Customer Desk B.",
          question: "Why has flight BA-448 experienced a delay?",
          options: ["Mechanical fault", "Adverse weather over the Alps", "Air traffic controller strike", "Security re-screening"],
          answer: 1,
          explanation: "The delay is caused by 'adverse meteorological conditions over the Alps'."
        },
        {
          id: 5,
          context: "Office Conference Call Message",
          audioScript: "Hi Julian, it's Clara from Compliance. I've scrutinized the vendor audit. While the cybersecurity credentials look impeccable, their financial solvency documentation is six months out of date. We cannot ratify the contract until they deliver audited Q3 balance sheets.",
          question: "What is holding up the ratification of the vendor contract?",
          options: ["Cybersecurity flaws", "Missing audited balance sheets", "Legal disputes", "Price negotiations"],
          answer: 1,
          explanation: "The delay is because 'their financial solvency documentation is six months out of date' and audited Q3 balance sheets are missing."
        },
        {
          id: 6,
          context: "Library Archival Notice",
          audioScript: "Welcome to the Rare Manuscripts Room. Please note that fountain pens and ink are strictly prohibited. Researchers must utilize graphite pencils only, and digital scans must be requested through our senior archivist on Level 2.",
          question: "Which writing instrument are researchers permitted to use?",
          options: ["Fountain pens", "Graphite pencils", "Ballpoint pens", "Digital stylus only"],
          answer: 1,
          explanation: "Researchers 'must utilize graphite pencils only'."
        },
        {
          id: 7,
          context: "Public Transit Route Change",
          audioScript: "Commuters are advised that the Number 38 bus will bypass King's Cross Road throughout November due to water main replacement works. A shuttle service will operate between Angel Station and Russell Square every 15 minutes.",
          question: "How frequently does the temporary replacement shuttle run?",
          options: ["Every 10 minutes", "Every 15 minutes", "Every 20 minutes", "Every 30 minutes"],
          answer: 1,
          explanation: "The shuttle operates 'every 15 minutes'."
        },
        {
          id: 8,
          context: "Fitness Studio Orientation",
          audioScript: "Before utilizing the Olympic weightlifting mezzanine, all new members must undertake a mandatory 20-minute postural assessment with our certified biomechanics coach.",
          question: "What must new members do prior to using the lifting mezzanine?",
          options: ["Pay an extra registration fee", "Undergo a 20-minute postural assessment", "Watch a safety video online", "Sign a liability waiver at reception"],
          answer: 1,
          explanation: "Members must undertake a mandatory 20-minute postural assessment."
        },
        {
          id: 9,
          context: "Weather Forecast Summary",
          audioScript: "Met Office dispatch: A cold front descending from Scandinavia will bring unseasonable sleet and gale-force northerly winds to eastern coastal districts starting midnight. Inland areas can expect dense freezing fog by dawn.",
          question: "What weather hazard is predicted for inland areas by morning?",
          options: ["Dense freezing fog", "Gale-force winds", "Heavy coastal rain", "Hailstorms"],
          answer: 0,
          explanation: "Inland areas can expect 'dense freezing fog by dawn'."
        },
        {
          id: 10,
          context: "University Seminar Scheduling",
          audioScript: "Please note that Professor Langdale's colloquium on Post-Colonial Economics has been rescheduled. Instead of meeting in Lecture Theatre C at 2:00 PM, the seminar will convene in the Humanities Boardroom at 3:30 PM this Wednesday.",
          question: "At what time will the colloquium begin?",
          options: ["1:30 PM", "2:00 PM", "3:30 PM", "4:00 PM"],
          answer: 2,
          explanation: "The seminar is rescheduled to convene at 3:30 PM."
        },
        {
          id: 11,
          context: "Hotel Booking Enquiry",
          audioScript: "Good afternoon, Mr. Gallagher. We have successfully upgraded your reservation to the Executive Garden Suite. Please note that while breakfast is inclusive, access to the thermal spa facilities requires an auxiliary surcharge of 25 euros per session.",
          question: "What service requires an additional fee?",
          options: ["Breakfast buffet", "Executive suite upgrade", "Thermal spa facilities", "Late checkout"],
          answer: 2,
          explanation: "Thermal spa access requires an auxiliary surcharge of 25 euros."
        },
        {
          id: 12,
          context: "Culinary Institute Workshop",
          audioScript: "For tomorrow's sourdough masterclass, participants are requested to bring their own glass mixing bowl and proofing basket. Organic heirloom flour and mother starter culture will be supplied directly by the academy.",
          question: "Which item will the academy provide to workshop attendees?",
          options: ["Glass mixing bowls", "Proofing baskets", "Linen cloths", "Flour and starter culture"],
          answer: 3,
          explanation: "Flour and mother starter culture will be supplied directly by the academy."
        },
        {
          id: 13,
          context: "Bookstore Author Reading",
          audioScript: "Owing to unprecedented demand for tonight's book launch with Booker Prize nominee Sarah Tremayne, entry is strictly restricted to wristband holders. Remaining wristbands will be distributed on a first-come basis at the ground floor information counter starting at 5:00 PM.",
          question: "How can visitors gain access to tonight's book launch?",
          options: ["Purchasing a hardback copy", "Presenting a student ID", "Securing a wristband at 5:00 PM", "Pre-registering via email"],
          answer: 2,
          explanation: "Entry is strictly for wristband holders, distributed starting at 5:00 PM."
        }
      ]
    },
    {
      partNumber: 2,
      name: "Part 2: Multi-Speaker Perspective Matching (Items 14-17)",
      description: "Four people are discussing remote work and the four-day work week. Match each speaker (Speaker 1, 2, 3, or 4) to their primary argument.",
      theme: "The Future of Working Hours and Spatial Autonomy",
      speakers: [
        {
          speakerId: "Speaker 1 (David - Senior Partner)",
          audioScript: "From an executive standpoint, while flexible schedules sound appealing in theory, I have observed a tangible dilution in spontaneous mentorship. When junior associates aren't physically sitting beside veteran partners, the serendipitous learning curve is severely curtailed.",
          opinionSummary: "Expresses concern that remote work impairs informal mentorship of junior personnel."
        },
        {
          speakerId: "Speaker 2 (Chloe - Software Engineer)",
          audioScript: "Frankly, condensing forty hours of cognitive work into four intensive days completely eliminated my burnout. Uninterrupted deep work blocks during the week leave my weekends free for absolute detachment, which has noticeably elevated code quality.",
          opinionSummary: "Believes compressed schedules eliminate cognitive exhaustion and enhance output quality."
        },
        {
          speakerId: "Speaker 3 (Harun - Small Business Owner)",
          audioScript: "Our independent bakery operates on razor-thin margins. Mandating a four-day week without reducing wages would bankrupt us within a quarter. White-collar desk jobs can adapt, but for customer-facing service businesses, physical coverage is indispensable.",
          opinionSummary: "Argues that shorter weeks are economically unviable for frontline service industries."
        },
        {
          speakerId: "Speaker 4 (Valerie - Urban Sociologist)",
          audioScript: "The most profound impact is macroeconomic and ecological. With fewer commuters suffocating highway arteries on Fridays, we observe an immediate plummet in particulate air pollution and suburban economic decentralization.",
          opinionSummary: "Emphasizes the environmental and regional economic benefits of reduced commuting."
        }
      ],
      items: [
        {
          id: 14,
          question: "Which speaker argues that compressed hours significantly enhance mental wellbeing and prevent burnout?",
          options: ["Speaker 1 (David)", "Speaker 2 (Chloe)", "Speaker 3 (Harun)", "Speaker 4 (Valerie)"],
          answer: 1,
          speakerRef: "Speaker 2"
        },
        {
          id: 15,
          question: "Which speaker highlights the disproportionate financial threat to customer-facing operational businesses?",
          options: ["Speaker 1 (David)", "Speaker 2 (Chloe)", "Speaker 3 (Harun)", "Speaker 4 (Valerie)"],
          answer: 2,
          speakerRef: "Speaker 3"
        },
        {
          id: 16,
          question: "Which speaker points out the loss of serendipitous learning and junior staff mentorship?",
          options: ["Speaker 1 (David)", "Speaker 2 (Chloe)", "Speaker 3 (Harun)", "Speaker 4 (Valerie)"],
          answer: 0,
          speakerRef: "Speaker 1"
        },
        {
          id: 17,
          question: "Which speaker focuses on environmental dividends and reduced urban congestion?",
          options: ["Speaker 1 (David)", "Speaker 2 (Chloe)", "Speaker 3 (Harun)", "Speaker 4 (Valerie)"],
          answer: 3,
          speakerRef: "Speaker 4"
        }
      ]
    },
    {
      partNumber: 3,
      name: "Part 3: Conversational Stance Identification (Items 18-21)",
      description: "Listen to a dialogue between a Man (Simon) and a Woman (Fiona) evaluating the introduction of Artificial Intelligence grading in university entrance examinations. Identify who holds each stance: The Man, The Woman, or Both.",
      dialogueScript: "MAN: Fiona, did you review the senate's proposal to employ automated machine learning algorithms for scoring the undergraduate admissions essays?\n\nWOMAN: Yes, Simon. At first glance, standardizing the evaluation to eradicate subjective human prejudice sounds remarkably progressive.\n\nMAN: In principle, yes. We certainly agree that human evaluators suffer from unconscious fatigue and regional bias.\n\nWOMAN: Exactly, that consistency is indisputable. However, my apprehension lies in subtle linguistic nuance. Algorithms might penalize unorthodox, visionary prose that defies algorithmic syntactical patterns.\n\nMAN: I share that exact worry! If an applicant writes with provocative irony, a neural network might flag it as syntactical incoherence. But on the financial side, the university would save millions in operational grading stipends.\n\nWOMAN: Oh, I strongly dispute that saving money should ever supersede pedagogical integrity. Cost-cutting shouldn't jeopardize a student's academic future.\n\nMAN: Well, maybe not, but in terms of turnaround time, receiving scores in 48 hours instead of two months would alleviate monumental student anxiety.\n\nWOMAN: That may be true, but only if the assessment is genuinely equitable. In my view, a hybrid model where AI merely flags anomalies for human review is the only acceptable compromise.",
      items: [
        {
          id: 18,
          question: "Who acknowledges that human markers are prone to subjective bias and fatigue?",
          options: ["The Man", "The Woman", "Both"],
          answer: 2,
          explanation: "Both express agreement: The woman says 'eradicate subjective human prejudice' and the man replies 'We certainly agree that human evaluators suffer from unconscious fatigue and regional bias'."
        },
        {
          id: 19,
          question: "Who believes financial cost savings justify the transition to automated grading?",
          options: ["The Man", "The Woman", "Both"],
          answer: 0,
          explanation: "Only the Man highlights: 'on the financial side, the university would save millions'. The Woman strongly objects to cost-cutting superseding integrity."
        },
        {
          id: 20,
          question: "Who worries that algorithmic grading will unfairly penalize unconventional or ironic writing?",
          options: ["The Man", "The Woman", "Both"],
          answer: 2,
          explanation: "Both share this: The woman expresses worry that algorithms penalize unorthodox prose, and the man states 'I share that exact worry! If an applicant writes with provocative irony...'."
        },
        {
          id: 21,
          question: "Who firmly advocates for a hybrid model where AI only flags anomalies for human review?",
          options: ["The Man", "The Woman", "Both"],
          answer: 1,
          explanation: "The Woman explicitly concludes: 'In my view, a hybrid model where AI merely flags anomalies for human review is the only acceptable compromise'."
        }
      ]
    },
    {
      partNumber: 4,
      name: "Part 4: Extended Academic Monologues (Items 22-25)",
      description: "Listen to two longer academic presentations (Monologue 1 & Monologue 2). Answer 2 comprehension questions for each monologue.",
      monologues: [
        {
          monologueId: "Monologue 1",
          speaker: "Professor Helena Richter - Department of Cognitive Neuroscience",
          title: "The Neurobiology of Deep Reading in the Digital Era",
          audioScript: "Distinguished colleagues, today we examine the neurological metamorphosis triggered by the transition from codex print to screen-based hypertext. When reading sequential physical print, the human brain recruits deep-reading circuitry involving attentional vigilance, empathetic projection, and critical counter-argumentation. \n\nConversely, eye-tracking telemetry demonstrates that screen-based reading induces an aggressive F-shaped scanning paradigm. Readers instinctively graze headlines and hyperlinks, prioritizing rapid information harvesting over dialectical contemplation. Recent functional MRI studies indicate that this constant attentional bifurcation atrophies our capacity to comprehend complex subordinate syntax. To counterbalance this cognitive depletion, educational institutions must actively preserve sustained, offline immersion in prolonged literature.",
          questions: [
            {
              id: 22,
              question: "What neurological phenomenon is characteristic of reading physical print according to Prof. Richter?",
              options: [
                "F-shaped skimming and rapid visual hopping",
                "Deep-reading circuitry including critical counter-argumentation",
                "Sensory overload and decreased attention span",
                "Passive absorption of non-linear hyperlinks"
              ],
              answer: 1,
              explanation: "Physical print recruits 'deep-reading circuitry involving attentional vigilance, empathetic projection, and critical counter-argumentation'."
            },
            {
              id: 23,
              question: "What consequence does screen-based reading have on linguistic comprehension?",
              options: [
                "It expands working memory for abstract terminology",
                "It atrophies the cognitive capacity to comprehend complex subordinate syntax",
                "It improves lateral thinking and problem-solving agility",
                "It accelerates long-term lexical retention"
              ],
              answer: 1,
              explanation: "Functional MRI indicates that screen scanning 'atrophies our capacity to comprehend complex subordinate syntax'."
            }
          ]
        },
        {
          monologueId: "Monologue 2",
          speaker: "Dr. Alistair Ross - Institute of Sustainable Urban Planning",
          title: "The Biophilic Metropolis and Acoustic Ecology",
          audioScript: "Urban soundscapes have traditionally been treated as an inevitable nuisance—an acoustic byproduct of mechanization to be mitigated solely with double-glazing and concrete noise barriers. However, contemporary acoustic ecology posits a radical paradigm inversion: that intentional sonic design is as fundamental to public health as sanitation.\n\nWhen municipalities introduce biophilic acoustic elements—such as cascading kinetic water features and avian sanctuaries nestled within dense civic plazas—they achieve auditory masking. Crucially, masking does not eliminate decibels; rather, it reshapes psychoacoustic perception. Citizens immersed in curated natural soundscapes experience a statistically significant reduction in salivary cortisol and systemic arterial tension, despite ambient vehicular traffic remaining constant. Urban planning must therefore evolve from acoustic defense to affirmative acoustic enrichment.",
          questions: [
            {
              id: 24,
              question: "How does modern acoustic ecology differ from conventional urban noise management?",
              options: [
                "It relies exclusively on higher concrete soundproofing barriers",
                "It views intentional sonic design as an affirmative public health asset",
                "It aims to completely ban vehicular transport in metropolitan cores",
                "It considers sound insulation entirely unnecessary"
              ],
              answer: 1,
              explanation: "Acoustic ecology views intentional sonic design as fundamental to public health rather than merely mitigating nuisance."
            },
            {
              id: 25,
              question: "What physiological benefit occurs when natural soundscapes achieve 'auditory masking'?",
              options: [
                "Total eradication of ambient background decibels",
                "Significant reduction in salivary cortisol and arterial tension",
                "Permanent enhancement of auditory sensory thresholds",
                "Immediate elimination of nearby vehicular traffic"
              ],
              answer: 1,
              explanation: "Citizens experience 'a statistically significant reduction in salivary cortisol and systemic arterial tension'."
            }
          ]
        }
      ]
    }
  ]
};
