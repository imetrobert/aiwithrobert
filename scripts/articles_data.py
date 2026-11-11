# -*- coding: utf-8 -*-
"""Content for the seniors guides. Edit wording HERE, then run
`python3 scripts/build_articles.py`. Bodies are small HTML fragments.
Rules: calm and practical, no fear-based claims, no invented statistics,
clients, results or prices."""

GBP = "https://maps.app.goo.gl/jvr3enQQw4oqWzR59"

ARTICLES = [
 {
  "id": "safe",
  "en": dict(
    slug="is-ai-safe-for-seniors",
    title="Is AI Safe for Seniors? Honest Limits and Good Habits",
    desc="Is ChatGPT safe for seniors? A calm look at what AI can and can't do, what never to share, and five habits that keep you in control.",
    h1="Is AI safe for seniors?",
    intro="It can be, with good habits. No AI tool is risk-free, and none can promise to spot a scam for you. What helps most is knowing the limits and keeping a few simple routines.",
    body="""
<h2>What AI is good at</h2>
<p>Tools like ChatGPT can explain a topic in plain language, help you word an email, suggest questions to ask a doctor's office or a bank, or walk you through a setting on your phone. Think of it as a patient helper that is always available.</p>
<h2>Where it can let you down</h2>
<ul>
<li><strong>It can be wrong.</strong> An AI answer can sound confident and still contain mistakes, especially about recent events, prices, hours, laws or health.</li>
<li><strong>It does not know you.</strong> It cannot see your accounts and cannot tell whether a message you received is real.</li>
<li><strong>It is not a professional.</strong> For medical, legal or money decisions, use it to prepare your questions, then ask a qualified person.</li>
</ul>
<h2>What not to share</h2>
<p>Treat a chat like a conversation in a public place. Do not type passwords, banking details, card numbers, your social insurance number or other identity numbers. Check the app's privacy settings, including whether your chats can be used to improve the service.</p>
<h2>Five habits that keep you in control</h2>
<ol>
<li>Pause before you act on any message that asks for money, a code or a password, whoever it seems to come from.</li>
<li>Contact the company or person yourself, using a phone number or website you already trust, not the one in the message.</li>
<li>Check anything important in a second place before relying on it.</li>
<li>Keep your software up to date and use a different password for each account.</li>
<li>Ask someone you trust when something feels off. There is no such thing as a silly question.</li>
</ol>
<h2>Learning with someone beside you</h2>
<p>Many people feel more at ease trying these tools with a patient person next to them, on their own device, at their own pace. That is what AI with Robert for Seniors offers, at home or online, in English and French.</p>
""",
    cta="Want to try it with someone beside you? Book a free 30-minute discovery call.",
    related=["expect", "vs"],
    faq=[("Is ChatGPT safe for seniors to use?", "It can be, with good habits. No AI tool is risk-free, and none can guarantee it will spot a scam. Avoid sharing passwords, banking details or identity numbers, and check important answers in a second place."),
         ("What should seniors never tell an AI chatbot?", "Passwords, banking and card details, and identity numbers such as a social insurance number. Treat a chat like a conversation in a public place.")],
  ),
  "fr": dict(
    slug="lia-est-elle-securitaire-pour-les-aines",
    title="L’IA est-elle sécuritaire pour les aînés? Limites et bonnes habitudes",
    desc="ChatGPT est-il sécuritaire pour les aînés? Ses limites, ce qu’il ne faut jamais partager et cinq bonnes habitudes pour garder le contrôle.",
    h1="L’IA est-elle sécuritaire pour les aînés?",
    intro="Elle peut l’être, avec de bonnes habitudes. Aucun outil d’IA n’est sans risque, et aucun ne peut promettre de repérer une arnaque à votre place. Ce qui aide le plus, c’est de connaître ses limites et de garder quelques routines simples.",
    body="""
<h2>Ce que l’IA fait bien</h2>
<p>Des outils comme ChatGPT peuvent expliquer un sujet en langage simple, vous aider à rédiger un courriel, suggérer des questions à poser à une clinique ou à une banque, ou vous guider dans un réglage de votre téléphone. Voyez-le comme un assistant patient, toujours disponible.</p>
<h2>Là où elle peut vous décevoir</h2>
<ul>
<li><strong>Elle peut se tromper.</strong> Une réponse d’IA peut sembler sûre d’elle et contenir des erreurs, surtout au sujet d’événements récents, de prix, d’horaires, de lois ou de santé.</li>
<li><strong>Elle ne vous connaît pas.</strong> Elle ne voit pas vos comptes et ne peut pas dire si un message reçu est authentique.</li>
<li><strong>Elle n’est pas une professionnelle.</strong> Pour une décision médicale, juridique ou financière, servez-vous-en pour préparer vos questions, puis consultez une personne qualifiée.</li>
</ul>
<h2>Ce qu’il ne faut pas partager</h2>
<p>Considérez une conversation comme un échange dans un lieu public. Ne tapez ni mots de passe, ni renseignements bancaires, ni numéros de carte, ni numéro d’assurance sociale ou autre numéro d’identité. Vérifiez les paramètres de confidentialité de l’application, y compris si vos conversations peuvent servir à améliorer le service.</p>
<h2>Cinq habitudes pour garder le contrôle</h2>
<ol>
<li>Faites une pause avant d’agir sur un message qui réclame de l’argent, un code ou un mot de passe, peu importe l’expéditeur apparent.</li>
<li>Communiquez vous-même avec l’entreprise ou la personne, à un numéro ou sur un site que vous connaissez déjà, et non ceux du message.</li>
<li>Vérifiez toute information importante à une deuxième source avant de vous y fier.</li>
<li>Gardez vos logiciels à jour et utilisez un mot de passe différent pour chaque compte.</li>
<li>Demandez à une personne de confiance quand quelque chose vous semble étrange. Il n’y a pas de question bête.</li>
</ol>
<h2>Apprendre avec quelqu’un à vos côtés</h2>
<p>Beaucoup de gens se sentent plus à l’aise d’essayer ces outils avec une personne patiente à côté d’eux, sur leur propre appareil, à leur rythme. C’est ce qu’offre AI with Robert pour aînés, à domicile ou en ligne, en français et en anglais.</p>
""",
    cta="Envie d’essayer avec quelqu’un à vos côtés? Réservez un appel de découverte gratuit de 30 minutes.",
    related=["expect", "vs"],
    faq=[("ChatGPT est-il sécuritaire pour les aînés?", "Il peut l’être, avec de bonnes habitudes. Aucun outil d’IA n’est sans risque, et aucun ne peut garantir qu’il repérera une arnaque. Évitez de partager mots de passe, renseignements bancaires ou numéros d’identité, et vérifiez les réponses importantes à une deuxième source."),
         ("Que ne faut-il jamais dire à un robot conversationnel?", "Les mots de passe, les renseignements bancaires et de carte, et les numéros d’identité comme le numéro d’assurance sociale. Considérez une conversation comme un échange dans un lieu public.")],
  ),
 },
 {
  "id": "expect",
  "en": dict(
    slug="what-to-expect-private-ai-tutor",
    title="What to Expect From a Private AI Tutor for Seniors",
    desc="Thinking about a private AI tutor? Here is how a first session works: your goals, your own device, your pace, and no jargon.",
    h1="What to expect from a private AI tutor",
    intro="If you or a parent are curious about AI but unsure where to start, a private tutor can make the first steps feel easy. Here is what a typical start looks like.",
    body="""
<h2>It starts with a conversation</h2>
<p>Before touching a device, we talk about what you would like to do: write emails, understand what ChatGPT is, feel safer online, or video call family. Your goals decide what we cover.</p>
<h2>Your own device, your own pace</h2>
<p>Lessons are one-on-one and can take place at home or online. If you have a phone, tablet or computer, we use it, so what you learn works on the device you will actually use. There is no rush, and we repeat things as often as you like.</p>
<h2>Plain language, no jargon</h2>
<p>Technical words are explained when they come up, or avoided. Questions are always welcome, including the ones you think are basic.</p>
<h2>Practice on things that matter to you</h2>
<p>We practise with real examples: a message to a grandchild, a question about an appointment, a recipe, a trip. You leave a session having done something, not just having watched it.</p>
<h2>Honest about the limits</h2>
<p>You will hear plainly what AI can and cannot do, why answers should be double-checked, and which information never to share. No tool or tutor can guarantee protection from every scam; good habits are what help most.</p>
<h2>Small groups are available too</h2>
<p>Some people prefer to learn alongside a friend or neighbour. Small group sessions are typically two to four people, six at most.</p>
<h2>How to begin</h2>
<p>The first step is a free 30-minute discovery call. We talk about what you want to learn, how you prefer to learn, and whether a session at home or online suits you better. There is no obligation.</p>
""",
    cta="Ready to talk it through? Book a free 30-minute discovery call.",
    related=["safe", "vs"],
    faq=[("How does a first AI tutoring session work for a senior?", "It starts with a conversation about your goals. Lessons are one-on-one, on your own device and at your own pace, in plain language, practising on things that matter to you."),
         ("Can seniors learn AI in a small group?", "Yes. Small group sessions are typically two to four people, six at most.")],
  ),
  "fr": dict(
    slug="ce-quon-apprend-avec-un-tuteur-prive-en-ia",
    title="À quoi s’attendre avec un tuteur privé en IA pour aînés",
    desc="Un tuteur privé en IA vous intrigue? Voici comment se déroule une première séance : vos objectifs, votre appareil, votre rythme, sans jargon.",
    h1="À quoi s’attendre avec un tuteur privé en IA",
    intro="Si vous ou un parent êtes curieux de l’IA sans savoir par où commencer, un tuteur privé peut rendre les premiers pas faciles. Voici à quoi ressemble un début typique.",
    body="""
<h2>Tout commence par une conversation</h2>
<p>Avant de toucher à un appareil, nous parlons de ce que vous aimeriez faire : écrire des courriels, comprendre ce qu’est ChatGPT, vous sentir plus en sécurité en ligne ou faire des appels vidéo avec la famille. Vos objectifs décident du contenu.</p>
<h2>Votre appareil, votre rythme</h2>
<p>Les leçons sont individuelles et peuvent avoir lieu à domicile ou en ligne. Si vous avez un téléphone, une tablette ou un ordinateur, nous l’utilisons, afin que ce que vous apprenez fonctionne sur l’appareil dont vous vous servirez vraiment. Rien ne presse, et nous répétons autant de fois que vous le souhaitez.</p>
<h2>Un langage simple, sans jargon</h2>
<p>Les termes techniques sont expliqués au fur et à mesure, ou évités. Les questions sont toujours bienvenues, même celles qui vous semblent de base.</p>
<h2>De la pratique sur ce qui compte pour vous</h2>
<p>Nous pratiquons avec des exemples concrets : un message à un petit-enfant, une question sur un rendez-vous, une recette, un voyage. Vous repartez après avoir fait quelque chose, pas seulement après avoir regardé.</p>
<h2>Honnête sur les limites</h2>
<p>On vous explique simplement ce que l’IA peut et ne peut pas faire, pourquoi il faut vérifier les réponses et quelles informations ne jamais partager. Aucun outil ni tuteur ne peut garantir une protection contre toutes les arnaques; de bonnes habitudes sont ce qui aide le plus.</p>
<h2>Les petits groupes sont aussi possibles</h2>
<p>Certaines personnes préfèrent apprendre avec une amie ou un voisin. Les séances en petit groupe réunissent généralement de deux à quatre personnes, six au maximum.</p>
<h2>Comment commencer</h2>
<p>La première étape est un appel de découverte gratuit de 30 minutes. Nous parlons de ce que vous voulez apprendre, de votre façon d’apprendre et de ce qui vous convient le mieux, une séance à domicile ou en ligne. Aucun engagement.</p>
""",
    cta="Prêt à en discuter? Réservez un appel de découverte gratuit de 30 minutes.",
    related=["safe", "vs"],
    faq=[("Comment se déroule une première séance avec un tuteur en IA?", "Elle commence par une conversation sur vos objectifs. Les leçons sont individuelles, sur votre propre appareil et à votre rythme, en langage simple, avec de la pratique sur ce qui compte pour vous."),
         ("Peut-on apprendre l’IA en petit groupe?", "Oui. Les séances en petit groupe réunissent généralement de deux à quatre personnes, six au maximum.")],
  ),
 },
 {
  "id": "vs",
  "en": dict(
    slug="chatgpt-vs-google",
    title="ChatGPT vs Google: Which One Should You Use?",
    desc="ChatGPT or Google? A simple guide for seniors on how they differ, when each helps most, and why to double-check important answers.",
    h1="ChatGPT vs Google: how they differ",
    intro="Both help you find answers, but they work very differently. Knowing the difference tells you which one to reach for.",
    body="""
<h2>Google points you to sources</h2>
<p>A search engine like Google shows a list of websites that match your words. You open the pages and judge them yourself. It is a good choice for current facts such as opening hours, news, prices, addresses and official information, because you can see where the answer comes from.</p>
<h2>ChatGPT writes an answer for you</h2>
<p>ChatGPT is a conversation. You ask in everyday words and it writes a reply, and you can keep asking follow-up questions, such as "say that more simply" or "give me an example". It is a good choice for explaining a topic, drafting a message, or brainstorming ideas.</p>
<h2>Both can mislead, in different ways</h2>
<ul>
<li>With a search, some results are ads or low-quality pages. Look at who published the page.</li>
<li>With ChatGPT, an answer can sound sure and still be wrong, and it may not tell you where it came from.</li>
<li>Search engines now often show an AI-written summary at the top of results. Treat it the same way: useful, but worth checking.</li>
</ul>
<h2>A simple rule of thumb</h2>
<ul>
<li><strong>Need a fact that can change</strong> (hours, prices, news, rules)? Start with a search and open an official source.</li>
<li><strong>Need to understand or write something?</strong> Try ChatGPT, then check anything important.</li>
<li><strong>Anything about health, money or the law?</strong> Use either to prepare your questions, then ask a qualified person.</li>
</ul>
<h2>Try both side by side</h2>
<p>The easiest way to feel the difference is to ask the same question in both and compare. In a session we do that together, using questions from your own day.</p>
""",
    cta="Want to try both with a patient guide? Book a free 30-minute discovery call.",
    related=["safe", "expect"],
    faq=[("What is the difference between ChatGPT and Google?", "Google shows a list of websites so you can judge the sources yourself. ChatGPT writes a conversational answer and can explain, draft and brainstorm, but its answers can be wrong and should be checked."),
         ("Should seniors use ChatGPT or Google?", "For facts that change, such as hours, prices and news, start with a search and open an official source. For explaining or writing something, ChatGPT can help, but check anything important.")],
  ),
  "fr": dict(
    slug="chatgpt-ou-google",
    title="ChatGPT ou Google : lequel utiliser?",
    desc="ChatGPT ou Google? Un guide simple pour les aînés : leurs différences, quand chacun aide le plus et pourquoi vérifier les réponses importantes.",
    h1="ChatGPT ou Google : quelle différence?",
    intro="Les deux aident à trouver des réponses, mais ils fonctionnent très différemment. Connaître la différence vous indique lequel utiliser.",
    body="""
<h2>Google vous dirige vers des sources</h2>
<p>Un moteur de recherche comme Google affiche une liste de sites qui correspondent à vos mots. Vous ouvrez les pages et vous les jugez vous-même. C’est un bon choix pour des faits à jour comme les heures d’ouverture, les nouvelles, les prix, les adresses et l’information officielle, parce que vous voyez d’où vient la réponse.</p>
<h2>ChatGPT rédige une réponse pour vous</h2>
<p>ChatGPT est une conversation. Vous posez votre question en mots de tous les jours et il rédige une réponse; vous pouvez poursuivre avec d’autres questions, comme « dis-le plus simplement » ou « donne-moi un exemple ». C’est un bon choix pour expliquer un sujet, rédiger un message ou trouver des idées.</p>
<h2>Les deux peuvent induire en erreur, chacun à sa façon</h2>
<ul>
<li>Avec une recherche, certains résultats sont des publicités ou des pages de faible qualité. Regardez qui a publié la page.</li>
<li>Avec ChatGPT, une réponse peut sembler sûre et être fausse, et il n’indique pas toujours d’où elle vient.</li>
<li>Les moteurs de recherche affichent maintenant souvent un résumé rédigé par l’IA en haut des résultats. Traitez-le de la même façon : utile, mais à vérifier.</li>
</ul>
<h2>Une règle simple</h2>
<ul>
<li><strong>Besoin d’un fait qui peut changer</strong> (heures, prix, nouvelles, règles)? Commencez par une recherche et ouvrez une source officielle.</li>
<li><strong>Besoin de comprendre ou d’écrire quelque chose?</strong> Essayez ChatGPT, puis vérifiez ce qui est important.</li>
<li><strong>Un sujet de santé, d’argent ou de droit?</strong> Servez-vous de l’un ou l’autre pour préparer vos questions, puis consultez une personne qualifiée.</li>
</ul>
<h2>Essayez les deux côte à côte</h2>
<p>La façon la plus simple de sentir la différence est de poser la même question aux deux et de comparer. Pendant une séance, nous le faisons ensemble, avec des questions tirées de votre quotidien.</p>
""",
    cta="Envie d’essayer les deux avec un guide patient? Réservez un appel de découverte gratuit de 30 minutes.",
    related=["safe", "expect"],
    faq=[("Quelle est la différence entre ChatGPT et Google?", "Google affiche une liste de sites pour que vous jugiez vous-même les sources. ChatGPT rédige une réponse sous forme de conversation et peut expliquer, rédiger et proposer des idées, mais ses réponses peuvent être fausses et doivent être vérifiées."),
         ("Les aînés devraient-ils utiliser ChatGPT ou Google?", "Pour les faits qui changent, comme les heures, les prix et les nouvelles, commencez par une recherche et ouvrez une source officielle. Pour expliquer ou rédiger quelque chose, ChatGPT peut aider, mais vérifiez ce qui est important.")],
  ),
 },
 {
  "id": "groups",
  "en": dict(
    slug="ai-workshops-for-libraries-and-community-groups",
    title="AI Workshops for Libraries, Residences and Community Groups",
    desc="Friendly, hands-on AI workshops for seniors at libraries, residences and community groups in Côte Saint-Luc and Greater Montréal, in English or French.",
    h1="AI workshops for libraries, residences and community groups",
    intro="AI with Robert for Seniors offers friendly, hands-on introductions to AI for groups of older adults in Côte Saint-Luc and Greater Montréal.",
    body="""
<h2>What a workshop covers</h2>
<p>A workshop is built around curiosity rather than technical knowledge. Participants try an AI assistant themselves, with guidance, on tasks such as writing a message, asking a question or exploring an idea. We also cover the limits of AI, why answers should be double-checked, and simple habits for staying safe online.</p>
<h2>Who it suits</h2>
<ul>
<li>Public libraries and cultural centres</li>
<li>Seniors' residences and community associations</li>
<li>Clubs, associations and other community groups</li>
</ul>
<h2>A recent example</h2>
<p>Robert led the workshop "Getting Started with AI: A Friendly Introduction for Seniors" at the Eleanor London Côte Saint-Luc Public Library. The library's Programming and Community Engagement Coordinator, Maria Ressina, shared her feedback in a <a href="__GBP__" rel="noopener">public Google review</a>.</p>
<h2>Language and format</h2>
<p>Workshops can run in English, in French, or in both. Group size, length and the room setup are agreed in advance, so the session suits your space and your members.</p>
<h2>How to arrange one</h2>
<p>Get in touch for a short conversation about your group, the topics of interest and the best date. For individual or small-group lessons, see the main page.</p>
""",
    cta="Planning a program for your members? Call or write to discuss a workshop.",
    related=["safe", "expect"],
    faq=[("Do you offer AI workshops for seniors' groups in Montréal?", "Yes. AI with Robert for Seniors offers hands-on introductions to AI for libraries, residences and community groups in Côte Saint-Luc and Greater Montréal, in English, French or both."),
         ("What do participants do in a workshop?", "They try an AI assistant themselves, with guidance, and learn its limits, why to double-check answers and simple habits for staying safe online.")],
  ),
  "fr": dict(
    slug="ateliers-ia-bibliotheques-groupes-communautaires",
    title="Ateliers d’IA pour bibliothèques, résidences et groupes communautaires",
    desc="Ateliers d’IA pratiques pour aînés, offerts aux bibliothèques, résidences et groupes communautaires de Côte-Saint-Luc et Montréal, en français ou en anglais.",
    h1="Ateliers d’IA pour bibliothèques, résidences et groupes communautaires",
    intro="AI with Robert pour aînés propose des initiations conviviales et pratiques à l’IA pour des groupes de personnes aînées à Côte-Saint-Luc et dans le Grand Montréal.",
    body="""
<h2>Le contenu d’un atelier</h2>
<p>Un atelier repose sur la curiosité plutôt que sur des connaissances techniques. Les participants essaient eux-mêmes un assistant d’IA, avec accompagnement, pour des tâches comme rédiger un message, poser une question ou explorer une idée. Nous abordons aussi les limites de l’IA, pourquoi il faut vérifier les réponses et de simples habitudes pour rester en sécurité en ligne.</p>
<h2>À qui il s’adresse</h2>
<ul>
<li>Bibliothèques publiques et centres culturels</li>
<li>Résidences pour aînés et associations communautaires</li>
<li>Clubs, associations et autres groupes communautaires</li>
</ul>
<h2>Un exemple récent</h2>
<p>Robert a animé l’atelier « Getting Started with AI: A Friendly Introduction for Seniors » à la Bibliothèque publique Eleanor London de Côte Saint-Luc. La coordonnatrice de la programmation et de l’engagement communautaire, Maria Ressina, a partagé ses commentaires dans un <a href="__GBP__" rel="noopener">avis Google public</a>.</p>
<h2>Langue et format</h2>
<p>Les ateliers peuvent se donner en français, en anglais ou dans les deux langues. La taille du groupe, la durée et l’aménagement de la salle sont convenus à l’avance, afin que la séance convienne à votre lieu et à vos membres.</p>
<h2>Comment en organiser un</h2>
<p>Communiquez avec nous pour une courte conversation sur votre groupe, les sujets qui l’intéressent et la meilleure date. Pour des leçons individuelles ou en petit groupe, consultez la page principale.</p>
""",
    cta="Vous planifiez une programmation pour vos membres? Appelez ou écrivez pour discuter d’un atelier.",
    related=["safe", "expect"],
    faq=[("Offrez-vous des ateliers d’IA pour des groupes d’aînés à Montréal?", "Oui. AI with Robert pour aînés propose des initiations pratiques à l’IA pour des bibliothèques, résidences et groupes communautaires de Côte-Saint-Luc et du Grand Montréal, en français, en anglais ou dans les deux langues."),
         ("Que font les participants pendant un atelier?", "Ils essaient eux-mêmes un assistant d’IA, avec accompagnement, et apprennent ses limites, pourquoi vérifier les réponses et de simples habitudes pour rester en sécurité en ligne.")],
  ),
 },
]
