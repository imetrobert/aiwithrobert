/**
 * i18n.js — All site translations
 * ─────────────────────────────────────────────────────────────────────────────
 * THIS IS YOUR EDITORIAL FILE.
 * To update text on the site,edit the strings below and push to GitHub.
 * English strings are under `en:`, French strings are under `fr:`.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const translations = {

  en: {
    /* ── Navigation ── */
    'nav-home':     'Home',
    'nav-services': 'Services',
    'nav-pricing':  'Pricing',
    'nav-faq':      'FAQ',
    'nav-about':    'About Robert',
    'nav-testimonials': 'Testimonials',
    'nav-contact':  'Contact',

    /* ── Hero ── */
    'hero-title':   'AI &amp; Technology Training for Seniors in Côte Saint-Luc',
    'hero-tagline': 'Patient, personalized AI tutoring and internet training for seniors in Côte Saint-Luc, Quebec.<br>Learn ChatGPT, online safety, and essential digital skills with confidence.',
    'hero-cta':     'Start Your Free Discovery Call',

    /* ── Stats ── */
    'stat-local':        'Local',
    'stat-local-label':  'Côte Saint-Luc',
    'stat-expert':       'Expert',
    'stat-expert-label': 'Years Experience',
    'stat-patient':      'Patient',
    'stat-patient-label':'One-on-One Teaching',
    'stat-free':         'Free',
    'stat-free-label':   'Discovery Call',

    /* ── Services section ── */
    'services-title':    'Services',
    'services-subtitle': 'Personalized AI tutoring and technology training for seniors in Côte Saint-Luc. No pressure, no jargon—just practical internet skills and AI training that help you stay connected and confident online.',

    'service1-title':  'One-on-One AI &amp; Internet Training',
    'service1-desc':   'Personalized AI tutoring for seniors in Côte Saint-Luc:',
    'service1-item1':  'Master ChatGPT &amp; AI writing tools',
    'service1-item2':  'Create AI-generated images',
    'service1-item3':  'Email safety &amp; scam protection',
    'service1-item4':  'Learn to use smartphones &amp; tablets',
    'service1-item5':  'Video calls with family',
    'service1-item6':  'Online banking safely',

    'service2-title':  'Senior Group AI Workshops in CSL',
    'service2-desc':   'AI workshops for seniors in Côte Saint-Luc:',
    'service2-item1':  'Small groups (2-4 people)',
    'service2-item2':  '90-minute technology sessions',
    'service2-item3':  'Share experiences together',
    'service2-item4':  'More affordable option',
    'service2-item5':  'Build new friendships',
    'service2-item6':  'Progress as a group',

    'service3-title':  'Flexible Learning Options',
    'service3-desc':   'AI tutoring and technology help that fits your schedule:',
    'service3-item1':  'In-home visits in Côte Saint-Luc',
    'service3-item2':  'Online sessions via video call',
    'service3-item3':  'Learn at your own pace',
    'service3-item4':  'No question too simple',
    'service3-item5':  'Real-world internet skills',
    'service3-item6':  'Follow-up support included',

    /* ── Pricing section ── */
    'pricing-title':    'Pricing',
    'pricing-subtitle': 'Affordable AI tutoring and technology training for seniors in Côte Saint-Luc. All prices in CAD. No hidden fees.',

    'pricing-single':         'Single Session',
    'pricing-single-details': 'per hour',
    'pricing-single-online':  'Online',
    'pricing-single-home':    'In-home',
    'pricing-single-note':    'Perfect for trying out lessons',

    'pricing-starter':         'Starter Package',
    'pricing-starter-details': '5 hours • Save $25',
    'pricing-starter-rate':    'Just $55/hour',
    'pricing-starter-note':    'Great for building confidence over multiple sessions',

    'pricing-complete':         'Complete Package',
    'pricing-complete-details': '10 hours • Save $100',
    'pricing-complete-rate':    'Only $50/hour',
    'pricing-complete-note':    'Comprehensive learning for mastering new skills',

    'pricing-group':         'Group Workshop',
    'pricing-group-details': 'per person',
    'pricing-group-duration':'90 minutes',
    'pricing-group-size':    '2-4 people (max 6)',
    'pricing-group-note':    'Learn together, save money',

    'badge-best':    'Best Value',
    'badge-popular': 'Most Popular',

    /* ── About section ── */
    'about-title':    'About Robert',
    'about-subtitle': 'Your local AI tutor and technology instructor serving seniors in Côte Saint-Luc, Quebec.',
    'about-heading':  'Meet Robert Simon',
    'about-p1': "I'm a dedicated AI tutor and technology instructor helping seniors in Côte Saint-Luc discover that technology and artificial intelligence aren't things to fear—they're tools for staying connected, independent, and engaged with the world around you.",
    'about-p2': "With over 25 years of experience in digital innovation and AI implementation at major organizations like Bell, I now focus on helping seniors in our community master technology at their own pace. I understand that learning new technology and AI tools like ChatGPT can feel overwhelming. That's exactly why I specialize in patient, step-by-step AI tutoring and technology training right here in Côte Saint-Luc.",
    'about-p3': "Whether you want to use ChatGPT to help write emails, learn to spot online scams, master video calling with family, or simply feel more confident using the internet and your smartphone, I'm here for you every step of the way.",
    'about-link':   '🌐 Learn More About My Work in AI &amp; Digital Innovation',
    'about-summary':'<strong>Quick facts about Robert Simon:</strong> Based in Côte Saint-Luc, QC. Over 25 years in technology and AI, including Bell Canada. AI tutor for seniors — teaches ChatGPT, internet safety, email security, smartphones, and video calling. In-home AI tutoring $65/hr, online sessions $60/hr. AI workshops also available. Free 30-minute discovery call. Phone: 514-250-8491. Email: info@aiwithrobert.com. Website: aiwithrobert.com.',

    'exp-teaching': 'Years of Teaching',
    'exp-passion':  'Passionate About Seniors',
    'exp-local':    'Local Resident',
    'exp-ai':       'AI Specialist',

    /* ── Testimonials section ── */
    'testimonials-title':    'What People Are Saying',
    'testimonials-subtitle': 'Real feedback from workshops and one-on-one sessions with seniors in Côte Saint-Luc.',

    'testimonial1-quote': `Mr. Simon delivered an engaging, informative, and highly practical introduction to artificial intelligence that resonated with our senior participants. He clearly explained the differences between AI tools and traditional search engines like Google, demonstrating how AI can be used effectively for everyday tasks while emphasizing privacy, safety, and thoughtful prompting.
                    <br><br>
                    What stood out most was Robert's ability to adapt the workshop to the experience level of the audience. Participants who were already somewhat comfortable with AI asked thoughtful, in-depth questions, and Robert responded with clear, patient, and detailed explanations. He skillfully guided discussions on topics such as AI neutrality, chatbots, and responsible use, keeping conversations informative and respectful.
                    <br><br>
                    The workshop was highly interactive, with participants experimenting with prompts and exploring creative and practical applications—from composing a poem in Yiddish to writing a personalized wedding message. The enthusiastic participation and numerous questions throughout the session reflected the workshop's success and the value it provided to our community.`,
    'testimonial1-name':    'Maria Ressina',
    'testimonial1-role':    'Programming and Community Engagement Coordinator',
    'testimonial1-org':     'Eleanor London Côte Saint-Luc Public Library',
    'testimonial1-context': 'Workshop: "Getting Started with AI: A Friendly Introduction for Seniors"',

    /* ── Contact section ── */
    'contact-title':     'Contact',
    'contact-subtitle':  'Get AI tutoring and technology help in Côte Saint-Luc today. Fill out the form below or email me directly for personalized senior training.',
    'contact-heading':   'AI Tutoring &amp; Technology Training in Côte Saint-Luc &amp; Surrounding Areas',
    'contact-call-note': 'Call anytime for questions or to schedule your free discovery call',

    /* ── Contact form ── */
    'form-name':               'Your Name',
    'form-email':              'Email Address',
    'form-phone':              'Phone Number',
    'form-interest':           "I'm Interested In",
    'form-referral':           'How Did You Hear About Me?',
    'form-optional':           'Optional',
    'form-referral-choose':    'Choose an option...',
    'form-referral-google':    'Google Search',
    'form-referral-ai':        'ChatGPT / AI Search',
    'form-referral-friend':    'Friend or Family',
    'form-referral-neighbour': 'Neighbour',
    'form-referral-csl':       'CSL Community Board / Bulletin',
    'form-referral-facebook':  'Facebook',
    'form-referral-linkedin':  'LinkedIn',
    'form-referral-place-of-worship': 'Synagogue / Church / Place of Worship',
    'form-referral-rec':       'CSL Recreation Centre',
    'form-referral-health':    "Doctor's Office / Pharmacy",
    'form-referral-other':     'Other',
    'form-goals':              'Your Goals (Optional)',
    'form-goals-placeholder':  "Tell me what you'd like to learn...",
    'form-submit':             'Send Message',
    'form-option-choose':      'Choose an option...',
    'form-option-online':      'One-on-One (Online)',
    'form-option-home':        'One-on-One (In-Home)',
    'form-option-group':       'Group Workshop',
    'form-option-call':        'Free Discovery Call',
    'form-option-undecided':   "Not sure - let's discuss!",

    'free-call-title': '🎁 Free 30-Minute Discovery Call',
    'free-call-text':  "Let's chat about your goals with no pressure or obligation",
    'success-title':   'Thank You!',
    'success-text':    "Your request has been received and will be actioned as soon as possible.<br>I'll get back to you within 24 hours.",

    /* ── FAQ section ── */
    'faq-title':    'Frequently Asked Questions',
    'faq-subtitle': 'Everything you need to know about AI tutoring and technology training with Robert in Côte Saint-Luc.',

    'faq-q-who':        'Who teaches AI tutoring and technology to seniors in Côte Saint-Luc?',
    'faq-a-who':        'Robert Simon of <strong>AI with Robert</strong> (aiwithrobert.com) is a dedicated AI tutor and technology instructor based in Côte Saint-Luc. Patient, personalized AI tutoring covering ChatGPT, internet safety, email security, and smartphones. Reach him at <strong>514-250-8491</strong> or <strong>info@aiwithrobert.com</strong>.',

    'faq-q-chatgpt':    'How can a senior learn to use ChatGPT in Côte Saint-Luc or Montreal?',
    'faq-a-chatgpt':    'Seniors in Côte Saint-Luc and the greater Montreal area can learn ChatGPT with Robert Simon through one-on-one AI tutoring sessions — in-home ($65/hr) or via video call ($60/hr). Step-by-step, no jargon, no prior tech experience required. Free 30-minute discovery call — call <strong>514-250-8491</strong>.',

    'faq-q-areas':      'What areas near Montreal does AI with Robert serve?',
    'faq-a-areas':      'AI with Robert primarily serves <strong>Côte Saint-Luc</strong>, as well as nearby neighborhoods including <strong>Hampstead, NDG (Notre-Dame-de-Grâce), Westmount</strong>, and other parts of the greater Montreal area. Online sessions available anywhere in Quebec.',

    'faq-q-cost':       'How much does senior AI tutoring cost in Côte Saint-Luc?',
    'faq-a-cost':       'Rates in CAD: <strong>Single online session $60/hr</strong>, <strong>Single in-home session $65/hr</strong>, <strong>Starter Package (5 hrs) $275</strong> ($55/hr), <strong>Complete Package (10 hrs) $500</strong> ($50/hr), <strong>Group Workshop (90 min) $35/person</strong>. Free 30-minute discovery call for all new students.',

    'faq-q-experience': 'Do I need any prior technology experience to start?',
    'faq-a-experience': "Not at all. Robert's lessons are designed for <strong>absolute beginners</strong>. Sessions start from the very basics of your device before moving into AI tools like ChatGPT. No question is too simple.",

    'faq-q-safe':       'Is it safe for seniors to use ChatGPT and AI tools?',
    'faq-a-safe':       "Yes — safety is Robert's top priority. Every lesson covers <strong>scam prevention, privacy settings, and how to use AI tools without sharing sensitive personal information</strong>.",

    'faq-q-home':       'Does Robert come to your home for AI tutoring?',
    'faq-a-home':       'Yes. Robert provides <strong>in-home AI tutoring and technology training visits</strong> throughout Côte Saint-Luc and surrounding Montreal neighborhoods at <strong>$65/hour</strong>. Online video call sessions also available at <strong>$60/hour</strong>.',

    'faq-q-group':      'Can seniors take AI workshops as a group in Côte Saint-Luc?',
    'faq-a-group':      'Yes. AI with Robert offers <strong>small group AI workshops</strong> for 2 to 6 seniors at <strong>$35 per person per 90-minute session</strong>. Groups can be formed with friends, neighbors, or family.',

    'faq-q-what':       'What exactly does Robert teach seniors about AI?',
    'faq-a-what':       'Robert teaches: <strong>how to use ChatGPT</strong> for emails and daily tasks; <strong>AI image creation</strong>; <strong>email scam detection and online safety</strong>; <strong>smartphone and tablet basics</strong>; <strong>video calling</strong> via Zoom or FaceTime; <strong>safe online banking</strong>; and general internet skills.',

    'faq-q-free':       'Is there a free trial or discovery call available?',
    'faq-a-free':       'Yes. Robert offers a <strong>free 30-minute discovery call</strong> to all new students — no pressure, no obligation. Call <strong>514-250-8491</strong> or fill in the contact form to get started.',

    /* ── Asides (GEO/entity content) ── */
    'entity-aside': '<strong>AI with Robert</strong> — AI tutoring &amp; technology training for seniors in Côte Saint-Luc, QC. Robert Simon teaches ChatGPT, internet safety, email security, smartphones &amp; video calling. In-home $65/hr · Online $60/hr · AI workshops $35/person · Free 30-min discovery call. 📞 <a href="tel:514-250-8491">514-250-8491</a> &nbsp;·&nbsp; <a href="mailto:info@aiwithrobert.com">info@aiwithrobert.com</a>',
    'geo-summary':  '<strong>AI with Robert</strong> is a technology training service based in <strong>Côte Saint-Luc, Quebec</strong>, founded by <strong>Robert Simon</strong> — a technology professional with over 25 years of experience in digital innovation and AI, including work at Bell Canada. Robert specializes in teaching <strong>seniors how to use AI tools like ChatGPT</strong>, stay safe online, manage email scams, use smartphones and tablets, and make video calls with family. He offers <strong>one-on-one AI tutoring</strong> (in-home visits throughout Côte Saint-Luc and surrounding Montreal neighborhoods, or online via video call) as well as <strong>small group AI workshops</strong> for 2–6 seniors. No prior technology experience is required. Sessions start at <strong>$60/hour online</strong> or <strong>$65/hour in-home</strong>. A <strong>free 30-minute discovery call</strong> is offered to all new students. To book, call <strong>514-250-8491</strong> or email <strong>info@aiwithrobert.com</strong>.',

    /* ── Footer ── */
    'footer-tagline':  'AI Tutoring &amp; Technology Training for Seniors in Côte Saint-Luc, Quebec',
    'footer-services': 'ChatGPT lessons • Internet safety • Online skills • Email security',
    'footer-rights':   'All rights reserved.',
    'footer-serving':  'Serving Côte Saint-Luc, Hampstead, NDG, Westmount &amp; Montreal Area',
  },

  // ─────────────────────────────────────────────────────────────────────────
  fr: {
    /* ── Navigation ── */
    'nav-home':     'Accueil',
    'nav-services': 'Services',
    'nav-pricing':  'Tarifs',
    'nav-faq':      'FAQ',
    'nav-about':    'À Propos',
    'nav-testimonials': 'Témoignages',
    'nav-contact':  'Contact',

    /* ── Hero ── */
    'hero-title':   'Accompagnement en IA et Technologie pour Aînés à Côte Saint-Luc',
    'hero-tagline': "Une approche patiente et personnalisée pour maîtriser l'IA et le monde numérique à Côte Saint-Luc, Québec.<br>Apprenez ChatGPT, la sécurité en ligne et les outils digitaux essentiels en toute confiance.",
    'hero-cta':     'Réservez votre appel découverte gratuit',

    /* ── Stats ── */
    'stat-local':        'Local',
    'stat-local-label':  'Côte Saint-Luc',
    'stat-expert':       'Expert',
    'stat-expert-label': "Années d'Expérience",
    'stat-patient':      'Patient',
    'stat-patient-label':'Cours Particuliers',
    'stat-free':         'Gratuit',
    'stat-free-label':   'Appel Découverte',

    /* ── Services section ── */
    'services-title':    'Nos Services',
    'services-subtitle': "Un accompagnement sur mesure pour les aînés de Côte Saint-Luc. Sans jargon, avec patience—des compétences pratiques pour rester connecté et autonome en ligne.",

    'service1-title':  'Cours Particuliers IA et Internet',
    'service1-desc':   'Tutoriel IA sur mesure à Côte Saint-Luc :',
    'service1-item1':  "Maîtriser ChatGPT et les outils d'écriture IA",
    'service1-item2':  'Créer des images par intelligence artificielle',
    'service1-item3':  'Sécurité des courriels et protection contre les fraudes',
    'service1-item4':  'Utilisation des smartphones et tablettes',
    'service1-item5':  'Appels vidéo avec vos proches',
    'service1-item6':  'Gestion sécurisée de vos comptes en ligne',

    'service2-title':  'Ateliers IA de Groupe à Côte Saint-Luc',
    'service2-desc':   'Ateliers IA pour aînés à Côte Saint-Luc :',
    'service2-item1':  'Petits groupes (2 à 4 personnes)',
    'service2-item2':  'Séances technologiques de 90 minutes',
    'service2-item3':  "Partage d'expériences conviviales",
    'service2-item4':  'Une option plus abordable',
    'service2-item5':  'Rencontrez vos voisins',
    'service2-item6':  'Progressez ensemble',

    'service3-title':  "Flexibilité de l'Apprentissage",
    'service3-desc':   "Tutoriel IA adapté à votre emploi du temps :",
    'service3-item1':  'Visites à domicile à Côte Saint-Luc',
    'service3-item2':  'Séances en ligne par appel vidéo',
    'service3-item3':  'Apprentissage à votre propre rythme',
    'service3-item4':  "Aucune question n'est trop simple",
    'service3-item5':  'Compétences concrètes pour le quotidien',
    'service3-item6':  'Suivi et soutien inclus',

    /* ── Pricing section ── */
    'pricing-title':    'Tarifs',
    'pricing-subtitle': 'Tutoriel IA et formation technologique abordables pour les aînés à Côte Saint-Luc. Prix en CAD. Aucun frais caché.',

    'pricing-single':         'Séance Individuelle',
    'pricing-single-details': 'par heure',
    'pricing-single-online':  'En ligne',
    'pricing-single-home':    'À domicile',
    'pricing-single-note':    "Idéal pour s'initier aux leçons",

    'pricing-starter':         'Forfait Débutant',
    'pricing-starter-details': '5 heures • Économisez 25$',
    'pricing-starter-rate':    'Seulement 55$/heure',
    'pricing-starter-note':    'Parfait pour bâtir votre confiance au fil des séances',

    'pricing-complete':         'Forfait Complet',
    'pricing-complete-details': '10 heures • Économisez 100$',
    'pricing-complete-rate':    'Seulement 50$/heure',
    'pricing-complete-note':    'Un apprentissage complet pour maîtriser de nouvelles compétences',

    'pricing-group':         'Atelier de Groupe',
    'pricing-group-details': 'par personne',
    'pricing-group-duration':'90 minutes',
    'pricing-group-size':    '2 à 4 personnes (max 6)',
    'pricing-group-note':    'Apprenez ensemble et économisez',

    'badge-best':    'Meilleure Offre',
    'badge-popular': 'Le Plus Demandé',

    /* ── About section ── */
    'about-title':    'À Propos de Robert',
    'about-subtitle': 'Votre tuteur IA local dévoué aux aînés de Côte Saint-Luc, Québec.',
    'about-heading':  'Faites la connaissance de Robert Simon',
    'about-p1': "Je suis un tuteur IA et instructeur passionné qui aide les aînés de Côte Saint-Luc à découvrir que la technologie et l'intelligence artificielle ne sont pas à craindre—ce sont des outils précieux pour rester connecté, indépendant et actif.",
    'about-p2': "Fort de plus de 25 ans d'expérience en innovation numérique et en IA au sein d'organisations comme Bell, je me consacre désormais à aider notre communauté à maîtriser ces outils à leur propre rythme.",
    'about-p3': "Que vous souhaitiez utiliser ChatGPT pour vos courriels, apprendre à éviter les arnaques en ligne ou simplement passer des appels vidéo avec vos petits-enfants, je suis à vos côtés.",
    'about-link':   "🌐 En savoir plus sur mon parcours en innovation numérique",
    'about-summary':'<strong>Faits rapides sur Robert Simon :</strong> Tuteur IA basé à Côte Saint-Luc, QC. Plus de 25 ans en technologie et IA, dont chez Bell Canada. Enseigne aux aînés ChatGPT, sécurité Internet, sécurité des courriels, smartphones et appels vidéo. Tutoriel IA à domicile 65$/h, séances en ligne 60$/h. Ateliers IA disponibles. Appel découverte gratuit. Tél : 514-250-8491. Courriel : info@aiwithrobert.com.',

    'exp-teaching': "Années d'Enseignement",
    'exp-passion':  'Dévoué à nos Aînés',
    'exp-local':    'Résident de la Communauté',
    'exp-ai':       'Spécialiste en IA',

    /* ── Testimonials section ── */
    'testimonials-title':    'Ce Que Disent Les Participants',
    'testimonials-subtitle': "Des témoignages réels d'ateliers et de séances individuelles avec des aînés de Côte Saint-Luc.",

    'testimonial1-quote': `M. Simon a offert une introduction à l'intelligence artificielle à la fois captivante, instructive et très pratique, qui a trouvé un écho auprès de nos participants aînés. Il a clairement expliqué les différences entre les outils d'IA et les moteurs de recherche traditionnels comme Google, montrant comment l'IA peut être utilisée efficacement au quotidien, tout en insistant sur la confidentialité, la sécurité et l'importance de bien formuler ses demandes.
                    <br><br>
                    Ce qui a le plus marqué, c'est la capacité de Robert à adapter l'atelier au niveau d'expérience de l'auditoire. Les participants déjà à l'aise avec l'IA ont posé des questions approfondies et réfléchies, et Robert y a répondu avec clarté, patience et précision. Il a habilement guidé les discussions sur des sujets comme la neutralité de l'IA, les clavardeurs (chatbots) et l'usage responsable, tout en gardant les échanges informatifs et respectueux.
                    <br><br>
                    L'atelier s'est révélé très interactif : les participants ont expérimenté avec des invites (prompts) et exploré des applications créatives et pratiques — de la composition d'un poème en yiddish à la rédaction d'un message de mariage personnalisé. La participation enthousiaste et les nombreuses questions tout au long de la séance témoignent du succès de l'atelier et de sa valeur pour notre communauté.`,
    'testimonial1-name':    'Maria Ressina',
    'testimonial1-role':    'Coordinatrice des programmes et de l\u2019engagement communautaire',
    'testimonial1-org':     'Bibliothèque publique Eleanor London Côte Saint-Luc',
    'testimonial1-context': 'Atelier : « S\u2019initier à l\u2019IA : une introduction conviviale pour les aînés »',

    /* ── Contact section ── */
    'contact-title':     'Contact',
    'contact-subtitle':  "Besoin d'un tutoriel IA ou d'aide technologique à Côte Saint-Luc ? Remplissez le formulaire ci-dessous ou envoyez-moi un courriel.",
    'contact-heading':   'Tutoriel IA &amp; Formation Technologique à Côte Saint-Luc et ses Environs',
    'contact-call-note': "Appelez-moi pour toute question ou pour fixer votre appel découverte gratuit",

    /* ── Contact form ── */
    'form-name':               'Votre Nom',
    'form-email':              'Adresse Courriel',
    'form-phone':              'Numéro de Téléphone',
    'form-interest':           "Je suis intéressé(e) par",
    'form-referral':           'Comment avez-vous entendu parler de moi ?',
    'form-optional':           'Optionnel',
    'form-referral-choose':    'Choisissez une option...',
    'form-referral-google':    'Recherche Google',
    'form-referral-ai':        'ChatGPT / Recherche IA',
    'form-referral-friend':    'Ami(e) ou famille',
    'form-referral-neighbour': 'Voisin(e)',
    'form-referral-csl':       'Babillard / Bulletin communautaire de CSL',
    'form-referral-facebook':  'Facebook',
    'form-referral-linkedin':  'LinkedIn',
    'form-referral-place-of-worship': 'Synagogue / Église / Lieu de culte',
    'form-referral-rec':       'Centre récréatif de CSL',
    'form-referral-health':    'Cabinet médical / Pharmacie',
    'form-referral-other':     'Autre',
    'form-goals':              'Vos objectifs (Optionnel)',
    'form-goals-placeholder':  "Dites-moi ce que vous aimeriez apprendre...",
    'form-submit':             'Envoyer le message',
    'form-option-choose':      'Choisissez une option...',
    'form-option-online':      'Cours Individuel (En ligne)',
    'form-option-home':        'Cours Individuel (À domicile)',
    'form-option-group':       'Atelier de Groupe',
    'form-option-call':        'Appel Découverte Gratuit',
    'form-option-undecided':   'Pas encore certain(e) - discutons-en !',

    'free-call-title': '🎁 Appel Découverte de 30 Minutes Offert',
    'free-call-text':  'Discutons de vos besoins, sans aucun engagement',
    'success-title':   'Merci !',
    'success-text':    "Votre demande a bien été reçue. Je vous recontacterai personnellement dans les 24 heures.",

    /* ── FAQ section ── */
    'faq-title':    'Questions Fréquentes',
    'faq-subtitle': "Tout ce qu'il faut savoir sur le tutoriel IA et la formation technologique avec Robert à Côte Saint-Luc.",

    'faq-q-who':        "Qui offre du tutoriel IA et de la formation technologique aux aînés à Côte Saint-Luc?",
    'faq-a-who':        "<strong>Robert Simon</strong> d'AI with Robert (aiwithrobert.com) est tuteur IA et instructeur technologique basé à Côte Saint-Luc. Leçons personnalisées et patientes couvrant ChatGPT, sécurité Internet, courriels et smartphones. Contactez-le au <strong>514-250-8491</strong> ou <strong>info@aiwithrobert.com</strong>.",

    'faq-q-chatgpt':    "Comment un aîné peut-il apprendre à utiliser ChatGPT à Côte Saint-Luc ou à Montréal?",
    'faq-a-chatgpt':    "Les aînés peuvent apprendre ChatGPT avec Robert Simon lors de séances de tutoriel IA individuelles — à domicile (65$/h) ou par appel vidéo (60$/h). Étape par étape, sans jargon. Aucune expérience requise. Appel découverte gratuit au <strong>514-250-8491</strong>.",

    'faq-q-areas':      'Quelles zones près de Montréal AI with Robert dessert-il?',
    'faq-a-areas':      "AI with Robert dessert principalement <strong>Côte Saint-Luc</strong>, ainsi que <strong>Hampstead, NDG (Notre-Dame-de-Grâce), Westmount</strong> et d'autres secteurs du grand Montréal. Séances en ligne disponibles partout au Québec.",

    'faq-q-cost':       'Combien coûte le tutoriel IA pour aînés à Côte Saint-Luc?',
    'faq-a-cost':       'Tarifs en dollars canadiens : <strong>Séance en ligne 60$/h</strong>, <strong>Séance à domicile 65$/h</strong>, <strong>Forfait Débutant (5h) 275$</strong> (55$/h), <strong>Forfait Complet (10h) 500$</strong> (50$/h), <strong>Atelier de groupe (90 min) 35$/personne</strong>. Appel découverte gratuit de 30 minutes.',

    'faq-q-experience': 'Faut-il avoir des connaissances préalables en technologie?',
    'faq-a-experience': "Absolument pas. Les leçons de Robert sont conçues pour les <strong>grands débutants</strong>. Les séances commencent là où vous vous sentez à l'aise. Aucune question n'est trop simple.",

    'faq-q-safe':       "Est-il sécuritaire pour les aînés d'utiliser ChatGPT et les outils IA?",
    'faq-a-safe':       "Oui — la sécurité est la priorité de Robert. Chaque leçon couvre la <strong>protection contre les arnaques, les paramètres de confidentialité, et comment utiliser les outils IA sans partager d'informations personnelles sensibles</strong>.",

    'faq-q-home':       'Robert se déplace-t-il à domicile pour le tutoriel IA?',
    'faq-a-home':       'Oui. Robert effectue des <strong>visites à domicile pour tutoriel IA et formation technologique</strong> partout à Côte Saint-Luc et dans les environs à <strong>65$/heure</strong>. Des séances en ligne par appel vidéo sont également disponibles à <strong>60$/heure</strong>.',

    'faq-q-group':      "Les aînés peuvent-ils participer à des ateliers IA en groupe à Côte Saint-Luc?",
    'faq-a-group':      "Oui. AI with Robert propose des <strong>ateliers IA de groupe</strong> pour 2 à 6 aînés à <strong>35$ par personne par séance de 90 minutes</strong>. Les groupes peuvent se former entre amis, voisins ou membres de la famille.",

    'faq-q-what':       "Qu'enseigne exactement Robert aux aînés sur l'IA?",
    'faq-a-what':       "Robert enseigne : <strong>comment utiliser ChatGPT</strong> pour les courriels et les tâches quotidiennes ; <strong>la création d'images IA</strong> ; <strong>la détection des arnaques et la sécurité en ligne</strong> ; <strong>les bases des smartphones et tablettes</strong> ; <strong>les appels vidéo</strong> via Zoom ou FaceTime ; <strong>les services bancaires en ligne sécurisés</strong>.",

    'faq-q-free':       'Y a-t-il un appel découverte gratuit disponible?',
    'faq-a-free':       "Oui. Robert offre un <strong>appel découverte gratuit de 30 minutes</strong> à tous les nouveaux élèves. Sans pression ni engagement. Appelez le <strong>514-250-8491</strong> ou remplissez le formulaire de contact.",

    /* ── Asides ── */
    'entity-aside': '<strong>AI with Robert</strong> — Tutoriel IA &amp; formation technologique pour aînés à Côte Saint-Luc, QC. Robert Simon enseigne ChatGPT, sécurité Internet, sécurité des courriels, smartphones &amp; appels vidéo. À domicile 65$/h · En ligne 60$/h · Ateliers IA 35$/pers. · Appel découverte gratuit 30 min. 📞 <a href="tel:514-250-8491">514-250-8491</a> &nbsp;·&nbsp; <a href="mailto:info@aiwithrobert.com">info@aiwithrobert.com</a>',
    'geo-summary':  "<strong>AI with Robert</strong> est un service de tutoriel IA et formation technologique basé à <strong>Côte Saint-Luc, Québec</strong>, fondé par <strong>Robert Simon</strong> — plus de 25 ans d'expérience en IA et innovation numérique, dont chez Bell Canada. Robert enseigne aux <strong>aînés comment utiliser ChatGPT</strong>, rester en sécurité en ligne, détecter les arnaques, utiliser les smartphones et faire des appels vidéo. Il offre des <strong>séances de tutoriel IA individuelles</strong> (à domicile ou en ligne) et des <strong>ateliers IA de groupe</strong> pour 2–6 aînés. Sessions à partir de <strong>60$/heure en ligne</strong> ou <strong>65$/heure à domicile</strong>. <strong>Appel découverte gratuit de 30 minutes</strong>. Appelez le <strong>514-250-8491</strong> ou écrivez à <strong>info@aiwithrobert.com</strong>.",

    /* ── Footer ── */
    'footer-tagline':  'Tutoriel IA &amp; Formation Technologique pour Aînés à Côte Saint-Luc, Québec',
    'footer-services': 'Cours ChatGPT • Sécurité Internet • Compétences Numériques • Sécurité Courriels',
    'footer-rights':   'Tous droits réservés.',
    'footer-serving':  'Desservant Côte Saint-Luc, Hampstead, NDG, Westmount &amp; la région de Montréal',
  }

}; // end translations
/**
 * language.js — Language detection and switching
 * Reads ?lang= from the URL, falls back to localStorage, defaults to 'en'.
 */

function getCurrentLanguage() {
  const p = new URLSearchParams(window.location.search);
  const l = p.get('lang');
  if (l === 'en' || l === 'fr') return l;
  return localStorage.getItem('language') || 'en';
}

function setLanguage(lang) {
  localStorage.setItem('language', lang);

  const url = new URL(window.location);
  url.searchParams.set('lang', lang);
  window.history.pushState({}, '', url);

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update textarea placeholder separately
  const ta = document.querySelector('[data-i18n-placeholder]');
  if (ta) {
    const k = ta.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][k]) {
      ta.placeholder = translations[lang][k];
    }
  }

  // Update select option text
  document.querySelectorAll('select option[data-i18n]').forEach(opt => {
    const k = opt.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][k]) {
      opt.textContent = translations[lang][k];
    }
  });

  // Sync the language selector dropdown
  document.getElementById('language-select').value = lang;

  // Update page-level meta
  if (lang === 'fr') {
    document.title = 'Tutoriel IA et Formation Technologique pour Aînés à Côte Saint-Luc | AI with Robert';
    document.querySelector('meta[name="description"]').setAttribute('content',
      'Robert Simon offre un tutoriel IA patient et personnalisé pour aînés à Côte Saint-Luc, Québec. Apprenez ChatGPT, la sécurité en ligne et les bases internet. Ateliers IA disponibles. Appel découverte gratuit. 514-250-8491.');
    document.documentElement.lang = 'fr';
  } else {
    document.title = 'AI Tutoring & Technology Training for Seniors — Côte Saint-Luc | AI with Robert';
    document.querySelector('meta[name="description"]').setAttribute('content',
      'Robert Simon offers patient, one-on-one AI tutoring and technology training for seniors in Côte Saint-Luc, QC. Learn ChatGPT, online safety and email security. AI workshops available. Free 30-min discovery call. 514-250-8491.');
    document.documentElement.lang = 'en';
  }

  checkFormValidity();
}

window.setLanguage = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;
/**
 * form.js — Contact form validation and auto-formatting
 */

// Anchored regex: exactly XXX-XXX-XXXX, no extra digits
const PHONE_RE = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

const submitBtn = document.getElementById('submit-btn');
const formHint  = document.getElementById('form-hint');

const reqFields = {
  'name':         document.getElementById('name'),
  'email':        document.getElementById('email'),
  'phone':        document.getElementById('phone'),
  'session-type': document.getElementById('session-type'),
};

function checkFormValidity() {
  let ok = true;
  let missing = [];

  for (let f in reqFields) {
    const el = reqFields[f];
    if (!el.value || !el.value.trim()) {
      ok = false;
      missing.push(el.previousElementSibling.textContent.replace(' *', '').trim());
    } else if (el.type === 'tel' && !PHONE_RE.test(el.value)) {
      ok = false;
      missing.push('Valid Phone Number');
    } else if (el.type === 'email' && !el.validity.valid) {
      ok = false;
      missing.push('Valid Email');
    }
  }

  submitBtn.disabled = !ok;
  formHint.style.display = ok ? 'none' : 'block';

  if (!ok) {
    const lang = getCurrentLanguage();
    const prefix   = lang === 'fr' ? 'Champs manquants : ' : 'Still needed: ';
    const fallback = lang === 'fr'
      ? 'Veuillez remplir tous les champs obligatoires (*) ci-dessus'
      : 'Please fill in all required (*) fields above';
    formHint.textContent = missing.length ? prefix + missing.join(', ') : fallback;
  }

  return ok;
}

// Live validation on all required fields
for (let f in reqFields) {
  reqFields[f].addEventListener('input', () => {
    checkFormValidity();
    reqFields[f].classList.remove('error');
    const em = document.getElementById(f + '-error');
    if (em) em.classList.remove('show');
  });
  reqFields[f].addEventListener('change', checkFormValidity);
}

// Auto-format phone as XXX-XXX-XXXX while typing
document.getElementById('phone').addEventListener('input', function (e) {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length <= 3)      e.target.value = v;
  else if (v.length <= 6) e.target.value = v.slice(0, 3) + '-' + v.slice(3);
  else                    e.target.value = v.slice(0, 3) + '-' + v.slice(3, 6) + '-' + v.slice(6, 10);
  checkFormValidity();
});

// Catch browser autofill (fires 'change' not 'input')
window.addEventListener('load', () => {
  Object.values(reqFields).forEach(el => {
    if (el.value && el.value.trim()) checkFormValidity();
  });
});

// Show success panel after formsubmit.co redirect
function checkFormSuccess() {
  if (new URLSearchParams(window.location.search).get('submitted') === 'true') {
    const form = document.querySelector('.contact-form');
    const msg  = document.getElementById('success-message');
    if (form && msg) {
      form.style.display = 'none';
      msg.style.display  = 'block';
      setTimeout(() => msg.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    }
  }
}

window.checkFormValidity = checkFormValidity;
window.checkFormSuccess  = checkFormSuccess;
/**
 * ui.js — FAQ accordion and navigation highlight on scroll
 */

/* ── FAQ accordion ── */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.getAttribute('aria-expanded') === 'true';

  // Close all
  document.querySelectorAll('.faq-question').forEach(b => {
    b.setAttribute('aria-expanded', 'false');
    b.nextElementSibling.classList.remove('open');
  });

  // Open clicked one if it was closed
  if (!isOpen) {
    btn.setAttribute('aria-expanded', 'true');
    answer.classList.add('open');
  }
}

window.toggleFaq = toggleFaq;

/* ── Nav active highlight on scroll ── */
const sections = document.querySelectorAll('section, .hero');
const navLinks  = document.querySelectorAll('nav a');

function highlightNav() {
  let cur = '';
  const sp = window.scrollY + 250;
  sections.forEach(s => {
    if (sp >= s.offsetTop && sp < s.offsetTop + s.clientHeight) {
      cur = s.getAttribute('id');
    }
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + cur) a.classList.add('active');
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });

/* ── Corrective anchor scroll ──
   Why this is needed: when a link like index.html?lang=fr#pricing loads,
   the browser jumps to #pricing BEFORE our JS runs. setLanguage() then
   swaps in French text, which is often longer than English and changes
   the height of every section above the target — so by the time layout
   settles, the browser's original jump is off. Clicking a nav link
   in-page never hits this because layout is already stable by then.
   Fix: after the language swap (and again after fonts/images finish
   loading, which can also shift heights), recompute the target's real
   position — accounting for the fixed nav's height — and re-scroll. */
function scrollToHashTarget() {
  const hash = window.location.hash;
  if (!hash || hash.length < 2) return;

  let target;
  try { target = document.querySelector(hash); } catch (e) { return; }
  if (!target) return;

  const nav = document.querySelector('nav');
  const offset = (nav ? nav.offsetHeight : 0) + 16;
  const y = target.getBoundingClientRect().top + window.pageYOffset - offset;

  // Force an instant jump (not the smooth-scroll from base.css) since
  // this is a silent correction, not a user-initiated navigation.
  const prevBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, Math.max(y, 0));
  document.documentElement.style.scrollBehavior = prevBehavior;
}

window.scrollToHashTarget = scrollToHashTarget;

/* ── Mobile/tablet nav scroll affordance ──
   The nav links can overflow horizontally on narrower screens (see
   nav.css / responsive.css). Since the scrollbar itself is hidden,
   people had no visual cue there was more to scroll to. This adds a
   fade on whichever edge has hidden content, plus a one-time gentle
   nudge on load so the scrollability is obvious without anyone
   having to discover it by accident. */
function initNavScrollHint() {
  const wrap = document.querySelector('.nav-scroll-wrap');
  const list = wrap ? wrap.querySelector('ul') : null;
  if (!wrap || !list) return;

  function updateFade() {
    const hasOverflow = list.scrollWidth > list.clientWidth + 2;
    wrap.classList.toggle('has-overflow', hasOverflow);
    wrap.classList.toggle('scrolled-start', list.scrollLeft <= 2);
    wrap.classList.toggle(
      'scrolled-end',
      list.scrollLeft + list.clientWidth >= list.scrollWidth - 2
    );
  }

  list.addEventListener('scroll', updateFade, { passive: true });
  window.addEventListener('resize', updateFade);
  updateFade();

  if (list.dataset.navHintShown) return;

  if (list.scrollWidth > list.clientWidth + 2) {
    list.dataset.navHintShown = 'true';
    setTimeout(() => {
      list.scrollTo({ left: 40, behavior: 'smooth' });
      setTimeout(() => {
        list.scrollTo({ left: 0, behavior: 'smooth' });
        updateFade();
      }, 500);
    }, 700);
  }
}

window.navScrollHint = initNavScrollHint;
/**
 * main.js — Initialisation
 * Runs after DOM is ready. Order matters: language must apply before
 * form validity is checked (checkFormValidity reads getCurrentLanguage).
 */

window.addEventListener('DOMContentLoaded', () => {
  setLanguage(getCurrentLanguage());
  checkFormValidity();
  highlightNav();
  checkFormSuccess();
  navScrollHint();

  // Double rAF: wait for the i18n text swap above to actually reflow
  // the layout before measuring where the anchor now sits.
  requestAnimationFrame(() => requestAnimationFrame(scrollToHashTarget));
});

// Images can still shift section heights after DOMContentLoaded fires.
window.addEventListener('load', () => {
  scrollToHashTarget();
  navScrollHint();
});

// Web fonts swapping in (FOUT) can also shift heights; correct once more.
if (window.document.fonts && document.fonts.ready) {
  document.fonts.ready.then(scrollToHashTarget);
}
