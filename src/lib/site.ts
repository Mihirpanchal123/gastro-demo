/**
 * All demo content lives here. Every name, figure, price and piece of text is
 * invented for this design concept — swap in the real clinic's details later.
 */
import {
  Stethoscope,
  ScanLine,
  Syringe,
  Radar,
  Activity,
  Microscope,
  Gauge,
  Route,
  Droplets,
  type LucideIcon,
} from "lucide-react";

export const clinic = {
  name: "Lumen Digestive Care",
  short: "Lumen",
  phone: "+91 00000 00000",
  phoneHref: "tel:+910000000000",
  whatsapp: "#",
  email: "hello@example.com",
  hours: "Mon–Sat · 10:00 AM – 1:00 PM, 4:30 – 7:30 PM",
  emergency: "24×7 emergency line",
};

/* ------------------------------------------------------------------ */
/* Treatments                                                          */
/* ------------------------------------------------------------------ */

export type Treatment = {
  slug: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  summary: string;
  about: string[];
  indications: string[];
  process: { title: string; text: string }[];
  facts: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
};

export const treatments: Treatment[] = [
  {
    slug: "diagnostic-endoscopy",
    name: "Painless Endoscopy & Colonoscopy",
    icon: ScanLine,
    tagline: "A clear look inside — without the discomfort.",
    summary: "HD upper GI endoscopy and colonoscopy under gentle sedation, with same-day digital reports.",
    about: [
      "Endoscopy lets us look directly at the lining of your food pipe, stomach and the first part of the small intestine. Colonoscopy does the same for the large bowel. Together they are the most reliable way to find the cause of ongoing digestive symptoms.",
      "We use high-definition scopes with image enhancement, which helps detect tiny changes early. Most patients receive light sedation and remember very little of the procedure.",
    ],
    indications: [
      "Acidity or heartburn that keeps coming back",
      "Difficulty or pain while swallowing",
      "Blood in stool or black stools",
      "Change in bowel habit lasting more than a few weeks",
      "Routine colon cancer screening after 45",
    ],
    process: [
      { title: "Before", text: "A short fast (and bowel prep for colonoscopy). You'll get a step-by-step guide on WhatsApp." },
      { title: "During", text: "Light sedation, a thin flexible camera, 10–30 minutes. Biopsies or polyp removal if needed." },
      { title: "After", text: "Rest for about an hour, then go home. Report and images are shared the same day." },
    ],
    facts: [
      { label: "Duration", value: "10–30 min" },
      { label: "Sedation", value: "Light / conscious" },
      { label: "Hospital stay", value: "None" },
      { label: "Back to work", value: "Next day" },
    ],
    faqs: [
      { q: "Will I feel pain?", a: "Most patients feel no pain at all under sedation. Some feel mild bloating afterwards, which settles within a few hours." },
      { q: "Can I drive home?", a: "Please don't drive on the day of sedation. Bring someone along, or we can arrange a cab." },
    ],
  },
  {
    slug: "clinical-gastroenterology",
    name: "Clinical Gastroenterology",
    icon: Stethoscope,
    tagline: "It starts with a proper conversation.",
    summary: "Unhurried consultations for acidity, IBS, constipation, bloating and long-term gut conditions.",
    about: [
      "Many digestive problems never need a procedure. What they need is a careful history, the right tests in the right order, and a plan you understand.",
      "Our consultations cover everyday problems like acidity and IBS as well as chronic conditions such as inflammatory bowel disease, with follow-up you can do in person or by video.",
    ],
    indications: [
      "Ongoing acidity, gas or bloating",
      "Irritable bowel syndrome (IBS)",
      "Crohn's disease and ulcerative colitis",
      "Chronic constipation or diarrhoea",
      "Second opinions on existing reports",
    ],
    process: [
      { title: "History", text: "We listen first — symptoms, diet, medicines, family history and what matters to you." },
      { title: "Examination & tests", text: "Only the tests that will change your treatment. Many are done on the same visit." },
      { title: "Plan & follow-up", text: "A written plan in plain language, with video follow-ups to track progress." },
    ],
    facts: [
      { label: "Consult time", value: "20–30 min" },
      { label: "Video option", value: "Available" },
      { label: "Reports", value: "Digital" },
      { label: "Follow-up", value: "Included for 7 days" },
    ],
    faqs: [
      { q: "Should I bring old reports?", a: "Yes — previous reports, scans and current medicines help us avoid repeating tests." },
      { q: "Do you offer video consults?", a: "Yes, ideal for follow-ups, report reviews and second opinions." },
    ],
  },
  {
    slug: "ercp",
    name: "ERCP",
    icon: Syringe,
    tagline: "Treating bile duct blockages without surgery.",
    summary: "Endoscopic removal of bile duct stones and stenting for blockages — no cuts, faster recovery.",
    about: [
      "ERCP (endoscopic retrograde cholangiopancreatography) combines endoscopy with X-ray imaging to reach the bile and pancreatic ducts through the mouth.",
      "It is used to clear stones, relieve blockages and place stents — often avoiding open surgery altogether. It is performed under deep sedation in a dedicated procedure suite.",
    ],
    indications: [
      "Stones in the bile duct",
      "Jaundice due to a blockage",
      "Narrowing (stricture) of the bile duct",
      "Bile leaks after gallbladder surgery",
      "Selected pancreatic duct problems",
    ],
    process: [
      { title: "Assessment", text: "Blood tests and imaging to confirm ERCP is the right approach." },
      { title: "Procedure", text: "Under deep sedation, 30–60 minutes. Stones removed or a stent placed as needed." },
      { title: "Recovery", text: "Usually an overnight observation, then home with a clear aftercare plan." },
    ],
    facts: [
      { label: "Duration", value: "30–60 min" },
      { label: "Sedation", value: "Deep" },
      { label: "Hospital stay", value: "Usually 1 night" },
      { label: "Incisions", value: "None" },
    ],
    faqs: [
      { q: "Is ERCP safe?", a: "It is a well-established procedure. Like any intervention it carries some risks, which we explain in detail before you decide." },
      { q: "Will I need surgery later?", a: "Sometimes gallbladder removal is advised later to prevent new stones. We'll discuss this with you." },
    ],
  },
  {
    slug: "endoscopic-ultrasound",
    name: "Endoscopic Ultrasound (EUS)",
    icon: Radar,
    tagline: "Ultrasound from the inside, for the clearest picture.",
    summary: "High-resolution imaging of the pancreas, bile ducts and GI wall, with guided biopsies.",
    about: [
      "EUS places a tiny ultrasound probe at the tip of an endoscope, giving detailed images of organs next to the gut — especially the pancreas.",
      "It allows precise, needle-guided sampling of lumps and cysts, and can also be used to drain fluid collections without surgery.",
    ],
    indications: [
      "Pancreatic cysts or masses",
      "Unexplained bile duct dilatation",
      "Staging of GI tumours",
      "Lumps beneath the gut lining",
      "Draining pancreatic fluid collections",
    ],
    process: [
      { title: "Preparation", text: "Fasting for 6 hours. Blood thinners are reviewed in advance." },
      { title: "Procedure", text: "Under sedation, 20–45 minutes, with biopsy if needed." },
      { title: "Results", text: "Images the same day; biopsy results in a few working days." },
    ],
    facts: [
      { label: "Duration", value: "20–45 min" },
      { label: "Sedation", value: "Moderate" },
      { label: "Hospital stay", value: "Day care" },
      { label: "Biopsy", value: "If needed" },
    ],
    faqs: [
      { q: "How is EUS different from a CT scan?", a: "EUS gets much closer to the organ, so it can show small details a CT may miss — and take a sample at the same time." },
      { q: "Is it uncomfortable?", a: "It feels similar to a regular endoscopy under sedation." },
    ],
  },
  {
    slug: "motility-manometry",
    name: "GI Motility & Manometry",
    icon: Activity,
    tagline: "Measuring how well your gut moves.",
    summary: "Pressure studies for swallowing trouble, reflux and chronic constipation.",
    about: [
      "Some digestive problems are not about what the gut looks like, but how it moves. Manometry measures the muscle pressures in the food pipe or rectum.",
      "These tests help diagnose conditions like achalasia and guide treatment for reflux and stubborn constipation.",
    ],
    indications: [
      "Difficulty swallowing with a normal endoscopy",
      "Before anti-reflux procedures",
      "Chronic constipation not responding to treatment",
      "Faecal incontinence",
    ],
    process: [
      { title: "Preparation", text: "Light fasting; some medicines are paused for a few days." },
      { title: "Test", text: "A thin sensor tube measures pressures while you swallow or relax. No sedation needed." },
      { title: "Report", text: "A detailed motility report reviewed with you at follow-up." },
    ],
    facts: [
      { label: "Duration", value: "20–40 min" },
      { label: "Sedation", value: "Not needed" },
      { label: "Hospital stay", value: "None" },
      { label: "Report", value: "1–2 days" },
    ],
    faqs: [
      { q: "Does manometry hurt?", a: "It can feel slightly odd while the tube is placed, but it is not painful and you are awake throughout." },
    ],
  },
  {
    slug: "therapeutic-endoscopy",
    name: "Advanced Therapeutic Endoscopy",
    icon: Microscope,
    tagline: "Treatments that once needed surgery — now through a scope.",
    summary: "Removal of large polyps and early tumours, stenting, dilatation and bleeding control.",
    about: [
      "Modern endoscopic techniques allow us to remove large polyps and some early cancers, open narrowed segments, and stop bleeding — all without external cuts.",
      "Patients typically recover faster, with less pain and shorter (or no) hospital stays.",
    ],
    indications: [
      "Large or flat colon polyps",
      "Early-stage tumours confined to the lining",
      "Strictures of the food pipe or bowel",
      "Bleeding ulcers or varices",
      "Swallowed foreign bodies",
    ],
    process: [
      { title: "Planning", text: "Detailed imaging and a review meeting to choose the safest technique." },
      { title: "Procedure", text: "Performed under sedation or anaesthesia in a dedicated suite." },
      { title: "Follow-up", text: "Pathology review and a surveillance schedule tailored to you." },
    ],
    facts: [
      { label: "Duration", value: "30–120 min" },
      { label: "Anaesthesia", value: "Sedation / GA" },
      { label: "Hospital stay", value: "0–2 nights" },
      { label: "Incisions", value: "None" },
    ],
    faqs: [
      { q: "Can every polyp be removed endoscopically?", a: "Most can. For a few, surgery is still the better option — we'll explain why if that's the case." },
    ],
  },
  {
    slug: "endoscopic-weight-loss",
    name: "Endoscopic Weight-Loss",
    icon: Gauge,
    tagline: "A non-surgical path to sustained weight loss.",
    summary: "Endoscopic sleeve gastroplasty and intragastric balloon, paired with diet coaching.",
    about: [
      "For people who have struggled with diet and exercise alone, endoscopic options can reduce stomach capacity without surgery or scars.",
      "Every programme includes nutrition support and regular check-ins, because the procedure works best as part of a wider lifestyle plan.",
    ],
    indications: [
      "BMI above 30, or above 27 with related health problems",
      "Unsuccessful attempts with diet and exercise",
      "Preference to avoid bariatric surgery",
    ],
    process: [
      { title: "Evaluation", text: "Consultation, blood tests and a session with our dietitian." },
      { title: "Procedure", text: "Performed through the mouth under anaesthesia, 45–90 minutes." },
      { title: "Programme", text: "Structured diet progression and monthly follow-ups for a year." },
    ],
    facts: [
      { label: "Duration", value: "45–90 min" },
      { label: "Anaesthesia", value: "General" },
      { label: "Hospital stay", value: "Usually 1 night" },
      { label: "Scars", value: "None" },
    ],
    faqs: [
      { q: "How much weight can I expect to lose?", a: "Results vary with commitment to the programme. We'll set realistic, personalised goals during evaluation." },
    ],
  },
  {
    slug: "small-bowel-enteroscopy",
    name: "Small Bowel Enteroscopy",
    icon: Route,
    tagline: "Reaching the hardest part of the gut to see.",
    summary: "Balloon-assisted enteroscopy and capsule endoscopy for hidden bleeding and small bowel disease.",
    about: [
      "The small intestine is several metres long and difficult to reach with standard scopes. Capsule endoscopy — a swallowable camera — and balloon-assisted enteroscopy close that gap.",
      "They are especially useful for finding the source of unexplained bleeding or anaemia.",
    ],
    indications: [
      "Unexplained anaemia or hidden bleeding",
      "Suspected Crohn's disease of the small bowel",
      "Small bowel polyps or tumours",
      "Abnormal findings on scans",
    ],
    process: [
      { title: "Capsule first", text: "Often we start with a capsule you swallow; it records images as it passes." },
      { title: "Enteroscopy", text: "If treatment is needed, a balloon-assisted scope reaches the spot under sedation." },
      { title: "Treatment", text: "Bleeding points treated or samples taken during the same procedure." },
    ],
    facts: [
      { label: "Capsule", value: "8–12 hrs recording" },
      { label: "Enteroscopy", value: "45–90 min" },
      { label: "Hospital stay", value: "Day care" },
      { label: "Sedation", value: "For enteroscopy" },
    ],
    faqs: [
      { q: "What happens to the capsule?", a: "It passes naturally within a day or two. You don't need to retrieve it." },
    ],
  },
  {
    slug: "liver-clinic",
    name: "Liver & Hepatology Clinic",
    icon: Droplets,
    tagline: "Protecting the organ that rarely complains.",
    summary: "Fatty liver, hepatitis B & C, cirrhosis care and Fibroscan — all in one place.",
    about: [
      "Liver disease is often silent until it is advanced. Our liver clinic focuses on early detection and long-term management.",
      "On-site Fibroscan measures liver stiffness and fat in minutes, without needles, so we can track your progress at every visit.",
    ],
    indications: [
      "Fatty liver found on ultrasound",
      "Raised liver enzymes on blood tests",
      "Hepatitis B or C",
      "Cirrhosis and its complications",
      "Jaundice",
    ],
    process: [
      { title: "Assessment", text: "Blood tests, Fibroscan and a detailed lifestyle review." },
      { title: "Plan", text: "Medication where needed, plus diet and activity targets that are realistic." },
      { title: "Monitoring", text: "Regular Fibroscan and lab checks to measure improvement." },
    ],
    facts: [
      { label: "Fibroscan", value: "10 min, no needles" },
      { label: "Fasting", value: "3 hours" },
      { label: "Hospital stay", value: "None" },
      { label: "Results", value: "Same visit" },
    ],
    faqs: [
      { q: "Can fatty liver be reversed?", a: "In many people, yes — especially when caught early. Weight loss of even 7–10% can make a significant difference." },
    ],
  },
];

export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);

/* ------------------------------------------------------------------ */
/* Pricing (indicative, invented)                                      */
/* ------------------------------------------------------------------ */

export const pricing = [
  { name: "Specialist consultation", note: "In-clinic or video", price: "₹ 800" },
  { name: "Upper GI endoscopy", note: "With sedation", price: "from ₹ 3,500" },
  { name: "Colonoscopy", note: "With sedation", price: "from ₹ 6,500" },
  { name: "Fibroscan", note: "Liver stiffness & fat", price: "₹ 2,500" },
  { name: "Endoscopic ultrasound", note: "Diagnostic", price: "from ₹ 15,000" },
  { name: "ERCP", note: "Including stenting", price: "from ₹ 35,000" },
];

/* ------------------------------------------------------------------ */
/* Doctor & team                                                       */
/* ------------------------------------------------------------------ */

export const doctor = {
  name: "Dr. Aarav Mehta",
  initials: "AM",
  title: "Consultant Gastroenterologist & Hepatologist",
  degrees: "MBBS · MD (Medicine) · DM (Gastroenterology)",
  bio: [
    "Dr. Aarav Mehta is a gastroenterologist with a special interest in therapeutic endoscopy and liver disease. Over the past fifteen years he has performed more than 25,000 endoscopic procedures.",
    "He is known among patients for unhurried consultations and for explaining every finding in plain language. His philosophy is simple: understand the person first, then the problem.",
    "Outside the clinic, he runs community gut-health camps and speaks regularly at schools and workplaces about prevention.",
  ],
  education: [
    { year: "2006", title: "MBBS", place: "Government medical college (placeholder)" },
    { year: "2010", title: "MD, Internal Medicine", place: "University teaching hospital (placeholder)" },
    { year: "2013", title: "DM, Gastroenterology", place: "Tertiary care institute (placeholder)" },
    { year: "2014", title: "Fellowship, Advanced Endoscopy", place: "International endoscopy centre (placeholder)" },
  ],
  awards: [
    "Excellence in Endoscopy Award (sample)",
    "Best Clinical Paper — regional GI conference (sample)",
    "Community Health Champion (sample)",
  ],
  memberships: [
    "National society of gastroenterology (placeholder)",
    "Society of GI endoscopy (placeholder)",
    "Association for the study of the liver (placeholder)",
  ],
  stats: [
    { value: "15+", label: "Years in practice" },
    { value: "25k", label: "Procedures" },
    { value: "40+", label: "Publications" },
    { value: "3", label: "Languages" },
  ],
};

export const team = [
  { name: "Dr. Aarav Mehta", role: "Lead Gastroenterologist", initials: "AM", focus: "Therapeutic endoscopy · Liver" },
  { name: "Dr. Nisha Rao", role: "Consultant Hepatologist", initials: "NR", focus: "Fatty liver · Hepatitis" },
  { name: "Dr. Kabir Shah", role: "Anaesthesiologist", initials: "KS", focus: "Sedation · Patient comfort" },
  { name: "Priya Desai", role: "Endoscopy Nurse Lead", initials: "PD", focus: "Procedure care · Recovery" },
  { name: "Rohan Patel", role: "Clinical Dietitian", initials: "RP", focus: "Gut-friendly nutrition" },
  { name: "Meera Joshi", role: "Patient Coordinator", initials: "MJ", focus: "Appointments · Insurance" },
];

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  read: number;
  hue: string; // tailwind gradient classes for cover art
  body: { h?: string; p?: string[]; list?: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "acidity-signs-to-watch",
    title: "Acidity every day? 7 signs it's more than spicy food",
    excerpt: "Occasional heartburn is common. Daily heartburn isn't something to live with — here's when to get checked.",
    category: "Digestive health",
    date: "2026-11-02",
    read: 5,
    hue: "from-coral/80 to-teal-deep",
    body: [
      { p: ["Almost everyone gets heartburn after a heavy meal now and then. But when acidity becomes a daily routine — and antacids become a habit — your body may be telling you something more."] },
      { h: "When to pay attention", list: [
        "Heartburn more than twice a week",
        "Needing antacids almost every day",
        "Food or sour liquid coming back up, especially at night",
        "Pain or difficulty while swallowing",
        "A persistent cough or hoarse voice in the mornings",
        "Feeling full very quickly",
        "Unexplained weight loss",
      ] },
      { h: "Why it matters", p: ["Long-standing reflux can inflame and gradually change the lining of the food pipe. Most people never develop serious problems, but a simple endoscopy can rule them out and guide the right treatment."] },
      { h: "Small changes that help", p: ["Eat your last meal at least three hours before bed, raise the head end of your bed slightly, and notice your personal triggers — for many people it's late-night tea, fried food or large portions rather than spice alone."] },
    ],
  },
  {
    slug: "fatty-liver-reversible",
    title: "Fatty liver is reversible — here's what actually works",
    excerpt: "A fatty liver report is common and often frightening. The good news: it usually responds well to steady changes.",
    category: "Liver",
    date: "2026-10-18",
    read: 6,
    hue: "from-mint to-teal",
    body: [
      { p: ["\"Grade 1 fatty liver\" is one of the most common lines on an ultrasound report. It rarely causes symptoms, which is exactly why it's easy to ignore."] },
      { h: "What is fatty liver?", p: ["It means fat has built up inside liver cells. Over years, in some people, this can lead to inflammation and scarring. Catching it early gives you the best chance to turn it around."] },
      { h: "What actually helps", list: [
        "Gradual weight loss — even 7–10% of body weight makes a measurable difference",
        "150 minutes of brisk walking or similar activity per week",
        "Cutting sugary drinks, sweets and refined flour",
        "Avoiding alcohol completely while the liver recovers",
      ] },
      { h: "Tracking progress", p: ["A Fibroscan measures liver fat and stiffness in about ten minutes, without needles. Repeating it every few months shows whether your efforts are working — which is a great motivator."] },
    ],
  },
  {
    slug: "first-colonoscopy-guide",
    title: "Your first colonoscopy: a calm, step-by-step guide",
    excerpt: "Nervous about a colonoscopy? Knowing exactly what happens makes it much easier.",
    category: "Procedures",
    date: "2026-09-27",
    read: 7,
    hue: "from-teal to-ink",
    body: [
      { p: ["Most people worry far more about a colonoscopy beforehand than they do afterwards. Here's what the day really looks like."] },
      { h: "The day before", p: ["You'll switch to a light, low-fibre diet and then clear liquids. In the evening you'll start the bowel prep drink. This is the least pleasant part — but a clean bowel means a quicker, more accurate test."] },
      { h: "On the day", list: [
        "Arrive with a companion; you can't drive after sedation",
        "A short check of your health and medicines",
        "Light sedation — most people drift off and remember little",
        "The procedure itself takes 20–30 minutes",
      ] },
      { h: "Afterwards", p: ["You'll rest for about an hour. Mild bloating is normal and settles quickly. Your report and images are shared the same day, and any biopsy results follow within a few days."] },
    ],
  },
  {
    slug: "bloating-after-meals",
    title: "Bloating after meals: common causes and simple fixes",
    excerpt: "That tight, puffy feeling after eating has many causes — most of them manageable.",
    category: "Nutrition",
    date: "2026-09-08",
    read: 4,
    hue: "from-sand to-coral/70",
    body: [
      { p: ["Bloating is one of the most common reasons people visit a gastroenterologist. It's usually harmless, but it can be uncomfortable and frustrating."] },
      { h: "Common culprits", list: [
        "Eating quickly and swallowing air",
        "Carbonated drinks",
        "Certain beans, onions and wheat in sensitive people",
        "Lactose intolerance",
        "Constipation",
        "Irritable bowel syndrome",
      ] },
      { h: "Try this first", p: ["Eat slowly, keep a simple food-and-symptom diary for two weeks, and reduce fizzy drinks. Patterns often appear quickly."] },
      { h: "When to see a doctor", p: ["If bloating comes with weight loss, blood in stool, vomiting or pain that wakes you at night, book a consultation rather than waiting."] },
    ],
  },
  {
    slug: "colon-screening-at-45",
    title: "Why colon screening at 45 matters",
    excerpt: "Colon cancer is one of the most preventable cancers — if it's found early.",
    category: "Prevention",
    date: "2026-08-21",
    read: 5,
    hue: "from-ink-2 to-mint/80",
    body: [
      { p: ["Colon cancer usually starts as a small growth called a polyp. Polyps take years to become dangerous, and removing them during a colonoscopy prevents that from happening."] },
      { h: "Who should be screened", list: [
        "Everyone from age 45, even without symptoms",
        "Earlier if a close relative had colon cancer or polyps",
        "Anyone with inflammatory bowel disease",
      ] },
      { h: "Screening options", p: ["Colonoscopy is the most thorough option because it can find and remove polyps in the same sitting. Stool-based tests are an alternative for some people, followed by colonoscopy if positive."] },
    ],
  },
  {
    slug: "endoscopic-weight-loss-who",
    title: "Endoscopic weight loss: who is it for?",
    excerpt: "A look at non-surgical weight-loss options and who benefits most.",
    category: "Procedures",
    date: "2026-07-30",
    read: 6,
    hue: "from-coral/70 to-ink",
    body: [
      { p: ["Not everyone who struggles with weight wants — or needs — bariatric surgery. Endoscopic procedures offer a middle path."] },
      { h: "The options", list: [
        "Intragastric balloon — a temporary balloon placed in the stomach for 6–12 months",
        "Endoscopic sleeve gastroplasty — internal stitches that reduce stomach size, with no external cuts",
      ] },
      { h: "Who is a good candidate?", p: ["Generally adults with a BMI above 30 (or above 27 with conditions like diabetes or fatty liver) who are ready to commit to a structured diet and follow-up programme."] },
      { h: "The programme matters most", p: ["The procedure is a tool, not a cure. Long-term success comes from the nutrition coaching and regular check-ins that follow."] },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const blogCategories = Array.from(new Set(posts.map((p) => p.category)));

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/* ------------------------------------------------------------------ */
/* News, education, media                                              */
/* ------------------------------------------------------------------ */

export const news = [
  { date: "2026-11-15", type: "Event", title: "Free gut-health check-up camp", text: "A Sunday morning camp with free consultations, liver screening and diet advice for 200+ visitors." },
  { date: "2026-10-05", type: "Clinic update", title: "Saturday evening hours now available", text: "Following patient feedback, the clinic now stays open until 7:30 PM on Saturdays." },
  { date: "2026-08-12", type: "Talk", title: "Healthy eating session at a local school", text: "An interactive session for students and parents on fibre, hydration and building good gut habits." },
  { date: "2026-06-20", type: "Technology", title: "New Fibroscan unit commissioned", text: "Needle-free liver assessment is now available on the same day as your consultation." },
];

export const guides = [
  {
    title: "Preparing for colonoscopy",
    items: ["Low-fibre diet two days before", "Clear liquids only the day before", "Bowel prep drink as instructed", "Bring a companion — no driving after sedation"],
  },
  {
    title: "Preparing for endoscopy",
    items: ["Nothing to eat for 6 hours before", "Small sips of water up to 2 hours before", "Inform us about blood thinners", "Wear comfortable clothes"],
  },
  {
    title: "Living with acid reflux",
    items: ["Smaller, earlier dinners", "Raise the head end of the bed", "Limit late tea, coffee and fried food", "Walk for 10 minutes after meals"],
  },
  {
    title: "After ERCP or EUS",
    items: ["Rest for the remainder of the day", "Start with clear liquids, then soft food", "Watch for fever or severe pain", "Call the emergency line if concerned"],
  },
];

export const videos = [
  { kind: "Patient stories", title: "Back to normal after years of acidity", duration: "2:48", hue: "from-teal to-ink" },
  { kind: "Patient stories", title: "My colonoscopy experience", duration: "3:12", hue: "from-coral/70 to-ink" },
  { kind: "Patient stories", title: "Reversing fatty liver in a year", duration: "4:05", hue: "from-mint/80 to-teal-deep" },
  { kind: "Patient stories", title: "Gallstone treated without surgery", duration: "2:31", hue: "from-ink-2 to-teal" },
  { kind: "Awareness talks", title: "What your stool says about your health", duration: "6:20", hue: "from-teal-deep to-coral/60" },
  { kind: "Awareness talks", title: "Is daily acidity dangerous?", duration: "5:41", hue: "from-ink to-mint/70" },
  { kind: "Awareness talks", title: "Fatty liver explained in 5 minutes", duration: "5:02", hue: "from-teal to-sand" },
  { kind: "Awareness talks", title: "Colon cancer screening: a quick guide", duration: "4:18", hue: "from-coral/60 to-teal-deep" },
  { kind: "Awareness talks", title: "Gut-friendly eating for families", duration: "7:10", hue: "from-mint/70 to-ink" },
];

export const gallery = [
  { cat: "Clinic", label: "Reception & waiting lounge", tall: true },
  { cat: "Procedures", label: "Endoscopy suite" },
  { cat: "Clinic", label: "Consultation room" },
  { cat: "Events", label: "Gut-health camp" },
  { cat: "Team", label: "Our nursing team", tall: true },
  { cat: "Procedures", label: "Recovery area" },
  { cat: "Events", label: "School awareness talk" },
  { cat: "Clinic", label: "Fibroscan room" },
  { cat: "Team", label: "Morning huddle" },
  { cat: "Procedures", label: "Sterilisation unit", tall: true },
  { cat: "Events", label: "Annual medical conference" },
  { cat: "Team", label: "Patient coordinators" },
];

/* ------------------------------------------------------------------ */
/* Locations                                                           */
/* ------------------------------------------------------------------ */

export const locations = [
  {
    name: "Main Clinic",
    area: "West Ahmedabad",
    address: "Sample address line 1, West Ahmedabad, Gujarat 380000",
    hours: "Mon–Sat · 10 AM – 1 PM, 4:30 – 7:30 PM",
    services: ["Consultations", "Endoscopy suite", "ERCP & EUS", "Fibroscan"],
  },
  {
    name: "East Branch",
    area: "East Ahmedabad",
    address: "Sample address line 2, East Ahmedabad, Gujarat 380000",
    hours: "Mon–Sat · 5 PM – 8 PM",
    services: ["Consultations", "Video consults", "Follow-ups", "Blood tests"],
  },
];

export const areas = [
  { slug: "satellite", name: "Satellite", clinic: "Main Clinic", minutes: 8 },
  { slug: "bodakdev", name: "Bodakdev", clinic: "Main Clinic", minutes: 10 },
  { slug: "navrangpura", name: "Navrangpura", clinic: "Main Clinic", minutes: 15 },
  { slug: "maninagar", name: "Maninagar", clinic: "East Branch", minutes: 12 },
  { slug: "chandkheda", name: "Chandkheda", clinic: "Main Clinic", minutes: 22 },
  { slug: "vastral", name: "Vastral", clinic: "East Branch", minutes: 9 },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);

/* ------------------------------------------------------------------ */
/* General FAQs                                                        */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: "Is endoscopy painful?",
    a: "Not here. We offer light sedation for endoscopy and colonoscopy, so most patients feel relaxed and remember very little. You'll be ready to go home within an hour or two.",
  },
  {
    q: "Do I need a referral to book?",
    a: "No. You can book directly online, on WhatsApp or by phone. If you have previous reports, bring them along or upload them after booking.",
  },
  {
    q: "How should I prepare for a colonoscopy?",
    a: "You'll receive a simple, step-by-step prep guide on WhatsApp after booking, including diet changes and bowel prep timing. Our team is available to answer questions the day before.",
  },
  {
    q: "Is cashless insurance accepted?",
    a: "Yes, we work with most major insurers and TPAs for eligible procedures. Our front desk will help with pre-authorisation.",
  },
  {
    q: "Can I consult by video?",
    a: "Yes. Video consultations are ideal for follow-ups, report reviews and second opinions. Prescriptions are shared digitally.",
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavItem = { label: string; href: string; children?: { label: string; href: string; hint?: string }[] };

export const nav: NavItem[] = [
  {
    label: "Doctor",
    href: "/doctor",
    children: [
      { label: "Doctor profile", href: "/doctor", hint: "Experience, training & awards" },
      { label: "Our team", href: "/team", hint: "The people behind your care" },
    ],
  },
  {
    label: "Treatments",
    href: "/treatments",
    children: treatments.map((t) => ({ label: t.name, href: `/treatments/${t.slug}` })),
  },
  {
    label: "Media",
    href: "/videos",
    children: [
      { label: "Videos", href: "/videos", hint: "Patient stories & awareness talks" },
      { label: "Gallery", href: "/gallery", hint: "Inside the clinic" },
    ],
  },
  {
    label: "Patients",
    href: "/patient-education",
    children: [
      { label: "Patient education", href: "/patient-education", hint: "Prep guides & tips" },
      { label: "Brochure", href: "/brochure", hint: "Download our services guide" },
      { label: "News & events", href: "/news", hint: "Camps, talks & updates" },
      { label: "Locations", href: "/locations", hint: "Clinics & areas we serve" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
