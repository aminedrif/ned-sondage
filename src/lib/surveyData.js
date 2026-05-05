// ─── Section A: Demographic Questions ────────────────────────────────────────

export const demographicQuestions = [
  {
    key: 'genre',
    label: { fr: 'Genre', en: 'Gender' },
    options: [
      { value: 'Homme', label: { fr: 'Homme', en: 'Male' } },
      { value: 'Femme', label: { fr: 'Femme', en: 'Female' } },
    ],
  },
  {
    key: 'age_group',
    label: { fr: "Tranche d'âge", en: 'Age Group' },
    options: [
      { value: '20-30', label: { fr: '20–30', en: '20–30' } },
      { value: '31-40', label: { fr: '31–40', en: '31–40' } },
      { value: '41-50', label: { fr: '41–50', en: '41–50' } },
      { value: '+50', label: { fr: '+50', en: 'Over 50' } },
    ],
  },
  {
    key: 'education',
    label: { fr: "Niveau d'études", en: 'Education Level' },
    options: [
      { value: 'Secondaire', label: { fr: 'Secondaire', en: 'Secondary' } },
      { value: 'Licence', label: { fr: 'Licence', en: "Bachelor's" } },
      { value: 'Master', label: { fr: 'Master', en: "Master's" } },
      { value: 'Doctorat', label: { fr: 'Doctorat', en: 'Doctorate' } },
    ],
  },
  {
    key: 'job_position',
    label: { fr: 'Poste occupé', en: 'Job Position' },
    options: [
      { value: 'Ventes', label: { fr: 'Ventes', en: 'Sales' } },
      { value: 'Marketing', label: { fr: 'Marketing', en: 'Marketing' } },
      { value: 'Service client', label: { fr: 'Service client', en: 'Customer Service' } },
      { value: 'IT-Données', label: { fr: 'IT-Données', en: 'IT-Data' } },
      { value: 'Autre', label: { fr: 'Autre', en: 'Other' } },
    ],
  },
  {
    key: 'exp_crm',
    label: { fr: 'Expérience avec le CRM', en: 'CRM Experience' },
    options: [
      { value: '<2 ans', label: { fr: '< 2 ans', en: '< 2 years' } },
      { value: '2-5 ans', label: { fr: '2–5 ans', en: '2–5 years' } },
      { value: '>5 ans', label: { fr: '> 5 ans', en: '> 5 years' } },
    ],
  },
  {
    key: 'exp_bi',
    label: { fr: 'Expérience avec les outils BI', en: 'BI Tools Experience' },
    options: [
      { value: '<2 ans', label: { fr: '< 2 ans', en: '< 2 years' } },
      { value: '2-5 ans', label: { fr: '2–5 ans', en: '2–5 years' } },
      { value: '>5 ans', label: { fr: '> 5 ans', en: '> 5 years' } },
    ],
  },
];

// ─── Likert Scale Labels ─────────────────────────────────────────────────────

export const likertLabels = {
  fr: ['Fortement en désaccord', 'En désaccord', 'Neutre', "D'accord", "Fortement d'accord"],
  en: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
};

// ─── Section B: Business Intelligence Tools (Independent Variable) ───────────

export const sectionBDimensions = [
  {
    title: { fr: 'Entrepôt de données', en: 'Data Warehouse' },
    items: [
      {
        key: 'b1',
        text: {
          en: 'The data warehouse combines customer data from all sales channels into one accessible source.',
          fr: "L'entrepôt de données regroupe les données clients de tous les canaux de vente en une seule source accessible.",
        },
      },
      {
        key: 'b2',
        text: {
          en: 'The warehouse data is complete and accurate enough for CRM analysis.',
          fr: "Les données de l'entrepôt sont suffisamment complètes et précises pour l'analyse CRM.",
        },
      },
      {
        key: 'b3',
        text: {
          en: 'I can easily retrieve historical customer purchase data from the warehouse.',
          fr: "Je peux facilement récupérer l'historique des achats clients depuis l'entrepôt.",
        },
      },
      {
        key: 'b4',
        text: {
          en: 'The warehouse is updated regularly enough to support timely CRM decisions.',
          fr: "L'entrepôt est mis à jour assez régulièrement pour soutenir les décisions CRM en temps voulu.",
        },
      },
      {
        key: 'b5',
        text: {
          en: 'Integrating data sources in the warehouse has improved the quality of customer information available to my team.',
          fr: "L'intégration des sources de données dans l'entrepôt a amélioré la qualité des informations clients disponibles pour mon équipe.",
        },
      },
    ],
  },
  {
    title: { fr: 'OLAP & Tableaux de bord', en: 'OLAP & Dashboards' },
    items: [
      {
        key: 'b6',
        text: {
          en: 'I use CRM dashboards regularly to monitor customer activity and sales performance.',
          fr: "J'utilise régulièrement les tableaux de bord CRM pour surveiller l'activité client et les performances commerciales.",
        },
      },
      {
        key: 'b7',
        text: {
          en: 'The dashboards provide real-time or near-real-time information about customer interactions.',
          fr: 'Les tableaux de bord fournissent des informations en temps réel ou quasi-réel sur les interactions clients.',
        },
      },
      {
        key: 'b8',
        text: {
          en: 'OLAP tools let me analyze customer data across multiple dimensions (time, product, region) at once.',
          fr: 'Les outils OLAP me permettent d\'analyser les données clients selon plusieurs dimensions (temps, produit, région) simultanément.',
        },
      },
      {
        key: 'b9',
        text: {
          en: 'Visual reports from BI tools help me quickly spot trends in customer behavior.',
          fr: 'Les rapports visuels des outils BI m\'aident à repérer rapidement les tendances du comportement client.',
        },
      },
      {
        key: 'b10',
        text: {
          en: 'Dashboard information has helped me make faster and better customer-related decisions.',
          fr: "Les informations des tableaux de bord m'ont aidé à prendre des décisions client plus rapides et plus éclairées.",
        },
      },
    ],
  },
  {
    title: { fr: 'Exploration de données', en: 'Data Mining' },
    items: [
      {
        key: 'b11',
        text: {
          en: 'The company uses data mining to identify and predict customer purchasing patterns.',
          fr: "L'entreprise utilise l'exploration de données pour identifier et prédire les comportements d'achat des clients.",
        },
      },
      {
        key: 'b12',
        text: {
          en: 'Data mining segmentation models are used to personalize marketing communications.',
          fr: 'Les modèles de segmentation issus du data mining sont utilisés pour personnaliser les communications marketing.',
        },
      },
      {
        key: 'b13',
        text: {
          en: 'Data mining predictive models help identify customers at risk of churning.',
          fr: 'Les modèles prédictifs du data mining aident à identifier les clients à risque de désabonnement.',
        },
      },
      {
        key: 'b14',
        text: {
          en: 'Data mining outputs are regularly used to design targeted promotional campaigns.',
          fr: 'Les résultats du data mining sont régulièrement utilisés pour concevoir des campagnes promotionnelles ciblées.',
        },
      },
      {
        key: 'b15',
        text: {
          en: "Data mining has improved the company's ability to identify high-value customer segments.",
          fr: "Le data mining a amélioré la capacité de l'entreprise à identifier les segments clients à forte valeur.",
        },
      },
    ],
  },
  {
    title: { fr: 'Intégration globale du BI', en: 'Overall BI Integration' },
    items: [
      {
        key: 'b16',
        text: {
          en: 'BI tools are embedded in the day-to-day workflows of CRM users.',
          fr: 'Les outils BI sont intégrés dans les flux de travail quotidiens des utilisateurs CRM.',
        },
      },
      {
        key: 'b17',
        text: {
          en: 'There is a clear process for turning BI analytics outputs into CRM actions.',
          fr: 'Il existe un processus clair pour transformer les résultats analytiques BI en actions CRM.',
        },
      },
      {
        key: 'b18',
        text: {
          en: 'CRM and BI systems are well integrated at the technical level, enabling seamless data exchange.',
          fr: 'Les systèmes CRM et BI sont bien intégrés au niveau technique, permettant un échange de données fluide.',
        },
      },
      {
        key: 'b19',
        text: {
          en: 'The company invests adequately in training employees to use BI tools for CRM purposes.',
          fr: "L'entreprise investit suffisamment dans la formation des employés à l'utilisation des outils BI pour le CRM.",
        },
      },
      {
        key: 'b20',
        text: {
          en: 'Overall, BI tools have significantly improved the effectiveness of our CRM system.',
          fr: "Dans l'ensemble, les outils BI ont considérablement amélioré l'efficacité de notre système CRM.",
        },
      },
    ],
  },
];

// ─── Section C: CRM System Effectiveness (Dependent Variable) ────────────────

export const sectionCDimensions = [
  {
    title: { fr: 'Satisfaction client', en: 'Customer Satisfaction' },
    items: [
      {
        key: 'c1',
        text: {
          en: 'Personalized service has improved customer satisfaction.',
          fr: 'Le service personnalisé a amélioré la satisfaction des clients.',
        },
      },
      {
        key: 'c2',
        text: {
          en: 'Customers receive faster and more relevant responses to their inquiries.',
          fr: 'Les clients reçoivent des réponses plus rapides et plus pertinentes à leurs demandes.',
        },
      },
      {
        key: 'c3',
        text: {
          en: "The company's ability to anticipate customer needs has improved.",
          fr: "La capacité de l'entreprise à anticiper les besoins des clients s'est améliorée.",
        },
      },
      {
        key: 'c4',
        text: {
          en: 'Analyzing customer feedback has led to measurable improvements in service quality.',
          fr: "L'analyse des retours clients a conduit à des améliorations mesurables de la qualité de service.",
        },
      },
    ],
  },
  {
    title: { fr: 'Fidélisation client', en: 'Customer Retention' },
    items: [
      {
        key: 'c5',
        text: {
          en: 'The CRM system helps us identify at-risk customers and implement effective retention interventions.',
          fr: 'Le système CRM nous aide à identifier les clients à risque et à mettre en place des interventions de fidélisation efficaces.',
        },
      },
      {
        key: 'c6',
        text: {
          en: 'Customer churn rates have decreased since the company adopted data analytics for CRM purposes.',
          fr: "Le taux de désabonnement des clients a diminué depuis que l'entreprise a adopté l'analyse de données à des fins CRM.",
        },
      },
      {
        key: 'c7',
        text: {
          en: 'Loyalty analysis enables us to design targeted retention programs.',
          fr: "L'analyse de la fidélité nous permet de concevoir des programmes de rétention ciblés.",
        },
      },
      {
        key: 'c8',
        text: {
          en: "The CRM system's ability to maintain long-term customer relationships has improved.",
          fr: "La capacité du système CRM à maintenir des relations clients à long terme s'est améliorée.",
        },
      },
    ],
  },
  {
    title: { fr: 'Précision du ciblage', en: 'Targeting Accuracy' },
    items: [
      {
        key: 'c9',
        text: {
          en: 'CRM-generated customer segments are more precise and actionable than manually created ones.',
          fr: 'Les segments clients générés par le CRM sont plus précis et exploitables que ceux créés manuellement.',
        },
      },
      {
        key: 'c10',
        text: {
          en: 'Targeted marketing campaigns achieve higher response rates than general campaigns.',
          fr: 'Les campagnes marketing ciblées obtiennent des taux de réponse plus élevés que les campagnes générales.',
        },
      },
      {
        key: 'c11',
        text: {
          en: 'Predictive models accurately identify which customers are likely to respond to specific offers.',
          fr: 'Les modèles prédictifs identifient avec précision les clients susceptibles de répondre à des offres spécifiques.',
        },
      },
      {
        key: 'c12',
        text: {
          en: 'The CRM system has significantly improved our ability to target the right customers with the right messages.',
          fr: 'Le système CRM a considérablement amélioré notre capacité à cibler les bons clients avec les bons messages.',
        },
      },
    ],
  },
  {
    title: { fr: 'Efficacité opérationnelle', en: 'Operational Efficiency' },
    items: [
      {
        key: 'c13',
        text: {
          en: 'The CRM system has reduced the time required to prepare performance reports.',
          fr: 'Le système CRM a réduit le temps nécessaire à la préparation des rapports de performance.',
        },
      },
      {
        key: 'c14',
        text: {
          en: 'Automated data analysis has reduced manual effort in CRM processes.',
          fr: "L'analyse automatisée des données a réduit les efforts manuels dans les processus CRM.",
        },
      },
      {
        key: 'c15',
        text: {
          en: 'CRM workflows are more efficient due to real-time performance monitoring.',
          fr: 'Les flux de travail CRM sont plus efficaces grâce au suivi des performances en temps réel.',
        },
      },
      {
        key: 'c16',
        text: {
          en: 'The overall cost and effort of CRM management has decreased.',
          fr: 'Le coût et les efforts globaux liés à la gestion CRM ont diminué.',
        },
      },
    ],
  },
];

// ─── UI Strings ──────────────────────────────────────────────────────────────

export const uiStrings = {
  surveyTitle: {
    fr: 'Enquête sur l\'impact du BI sur le CRM',
    en: 'Survey on the Impact of BI on CRM',
  },
  surveySubtitle: {
    fr: 'Tradifoot Algérie — Recherche académique',
    en: 'Tradifoot Algeria — Academic Research',
  },
  stepLabels: {
    fr: ['Informations démographiques', 'Outils Business Intelligence', 'Efficacité du système CRM'],
    en: ['Demographic Information', 'Business Intelligence Tools', 'CRM System Effectiveness'],
  },
  sectionBTitle: {
    fr: 'Section B : Outils Business Intelligence (Variable indépendante)',
    en: 'Section B: Business Intelligence Tools (Independent Variable)',
  },
  sectionCTitle: {
    fr: 'Section C : Efficacité du système CRM (Variable dépendante)',
    en: 'Section C: CRM System Effectiveness (Dependent Variable)',
  },
  sectionBInstructions: {
    fr: 'Indiquez votre niveau d\'accord avec chacune des affirmations suivantes concernant les outils BI utilisés dans votre entreprise.',
    en: 'Indicate your level of agreement with each of the following statements about BI tools used in your company.',
  },
  sectionCInstructions: {
    fr: 'Indiquez votre niveau d\'accord avec chacune des affirmations suivantes concernant l\'efficacité du système CRM.',
    en: 'Indicate your level of agreement with each of the following statements about CRM system effectiveness.',
  },
  next: { fr: 'Suivant', en: 'Next' },
  back: { fr: 'Précédent', en: 'Back' },
  submit: { fr: 'Soumettre', en: 'Submit' },
  submitting: { fr: 'Envoi en cours...', en: 'Submitting...' },
  required: { fr: 'Veuillez répondre à toutes les questions avant de continuer.', en: 'Please answer all questions before continuing.' },
  thankYouTitle: { fr: 'Merci !', en: 'Thank You!' },
  thankYouMessage: {
    fr: 'Votre réponse a été enregistrée avec succès. Merci pour votre participation à cette étude académique.',
    en: 'Your response has been recorded successfully. Thank you for participating in this academic study.',
  },
  newResponse: { fr: 'Nouvelle réponse', en: 'New Response' },
  step: { fr: 'Étape', en: 'Step' },
  of: { fr: 'sur', en: 'of' },
};

// ─── SPSS Encoding Maps ─────────────────────────────────────────────────────

export const spssEncodings = {
  genre: { 'Homme': 1, 'Femme': 2 },
  age_group: { '20-30': 1, '31-40': 2, '41-50': 3, '+50': 4 },
  education: { 'Secondaire': 1, 'Licence': 2, 'Master': 3, 'Doctorat': 4 },
  job_position: { 'Ventes': 1, 'Marketing': 2, 'Service client': 3, 'IT-Données': 4, 'Autre': 5 },
  exp_crm: { '<2 ans': 1, '2-5 ans': 2, '>5 ans': 3 },
  exp_bi: { '<2 ans': 1, '2-5 ans': 2, '>5 ans': 3 },
};
