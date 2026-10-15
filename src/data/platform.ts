/* Copy for the Platform page, verbatim from the live site (lyric.tech/platform). */

const MEDIA = "https://lyric-website-files.s3.us-east-1.amazonaws.com/web-media";

/** The pinned layers slider: four layers, then Agentic AI (the dark finale). */
export const layers = [
  {
    name: "Experience",
    image: "01-experience",
    lead: "The analytical answer made operational, with an experience agent at its core.",
    text: "Executive, planner, and operator each read the same Decision Product through an interface shaped to their role. The application is optional — the system of record stays the system of record.",
    features: [
      "Apps, APIs, and Excel where work happens",
      "Planners run scenarios without tickets",
      "What-and-why explanations on every decision",
      "Role-shaped interfaces, agentically composed",
    ],
  },
  {
    name: "Sequence",
    image: "02-sequence",
    lead: "The connective tissue, with a sequence agent at its core.",
    text: "Decisions stop being silos when they share a sequence — within a domain, across domains, and across time. Today's stock-transfer shapes a routing decision two months out.",
    features: [
      "Sequence agent composes flows and scenarios",
      "Visual canvas and code, side by side",
      "Auto Scenarios — hundreds of variants per run",
      "Logic decouples from integrations",
    ],
  },
  {
    name: "Algorithm",
    image: "03-algorithm",
    lead: "Algorithms packaged as Notes: atomic units of logic decoupled from applications.",
    text: "Atomic units of logic, decoupled from applications. Blue Notes ship pre-built; Green and Purple extend them. Supply chain foundational models return predictions in seconds.",
    features: [
      "30+ pre-built Blue Notes across 6 science domains",
      "One team per Note; every workflow inherits",
      "GPU-accelerated optimization, simulation, ML",
      "Foundational models, not retrofitted LLMs",
    ],
  },
  {
    name: "Data",
    image: "04-data",
    lead: "The decision foundation, with a data agent at its core.",
    text: "An extensible semantic architecture unifies every source — ERPs, lakes, warehouses, operational systems, external signals. Real-time and batch in one model. Data flows in, decisions flow back.",
    features: [
      "MCP opens the architecture to external agents",
      "Data agent for SQL-free queries",
      "Lineage, governance, versioning per entity",
      "Real-time and batch in one model",
    ],
  },
  {
    name: "Agentic AI",
    image: "agentic-poster",
    video: `${MEDIA}/processtimelinevideo60fps.mp4`,
    lead: "Every core aligns into one cylinder — the spine of the platform.",
    text: "Each layer's agent core stacks with the next. Together they form a single cylinder running through the architecture — agentic AI as an integral structure, not a shell on top. MCP and A2A connect it outward.",
    features: [
      "An agent core on every layer",
      "Elastic compute, sized to the decision",
      "MCP exposes Lyric IP; A2A for interop",
      "Agentic AI as structural spine",
    ],
  },
];

/** "Agents at every layer" tabs. */
export const agents = [
  {
    tab: "For Decisions",
    eyebrow: "For Decisions",
    title: "Decision Agents",
    text: "Pre-built decision agents that work alongside planners and analysts. They surface insights, explain the what-and-why, run scenarios, and recommend actions.",
    bullets: ["Insights & Alerts", "What & Why", "Scenario Planning", "Recommendations"],
    image: "01-decisions",
    video: `${MEDIA}/tabvideos-lyric-for-decisions.mp4`,
  },
  {
    tab: "For Creators",
    eyebrow: "For Creators",
    title: "Builder Agents",
    text: "Agents that compress application development. They help users build data pipelines, assemble algorithms, and construct experiences through conversational interfaces.",
    bullets: ["Data Pipelines", "Experiences", "Decision Algorithms", "Prediction Science"],
    image: "02-creators",
    video: `${MEDIA}/tabvideos-lyric-for-creators.mp4`,
  },
  {
    tab: "For Everyone",
    eyebrow: "For Innovators",
    title: "Build Your Own Agents",
    text: "Build your own agents without writing a single line of code. Use them to handle the decisions that don't fit neatly into existing categories.",
    bullets: [],
    image: "03-everyone",
    video: `${MEDIA}/tabvideos-lyric-for-innovators.mp4`,
  },
  {
    tab: "Core Intelligence",
    eyebrow: "Core Intelligence",
    title: "Supply Chain Foundational Models",
    text: "AI models trained on supply chain data, not retrofitted LLMs. The foundation needed to quickly reason about supply chain problems.",
    bullets: ["Predictions in seconds", "Domain native"],
    image: "04-core",
    video: `${MEDIA}/tabvideos-lyric-core-intelligence.mp4`,
  },
  {
    tab: "Open Platform",
    eyebrow: "Open Platform",
    title: "MCP & A2A",
    text: "Open by design. MCP connects Lyric Studio's data and capabilities to the outside world. A2A lets Lyric Studio's agents talk directly to the ones your enterprise already uses.",
    bullets: [],
    image: "05-open",
    video: `${MEDIA}/tabvideos-lyric-open-platform.mp4`,
  },
];

/** "Built for the reality of your role" cards. */
export const roles = [
  { title: "The Creator: The Supply Chain Engineer", icon: "creator" },
  { title: "The Consumer: The Planner", icon: "consumer" },
  { title: "Data Science, IT, and Data Engineering", icon: "data-science" },
];

const CDN = "https://cdn.prod.website-files.com/6a455ce597623f0a8ccc7577";

/** Integration logos, in the live site's order (two columns, top to bottom). */
export const integrations = [
  { name: "AWS", src: `${CDN}/6a54ed36c5f869f1bf723833_aws.svg` },
  { name: "SQL Server", src: `${CDN}/6a54f2a6ac0bbc841907e89a_sql-server.svg` },
  { name: "Google", src: `${CDN}/6a54f2b715904f715bad3c7f_google.svg` },
  { name: "Databricks", src: `${CDN}/6a54f2c915904f715bad510c_databricks.svg` },
  { name: "Azure", src: `${CDN}/6a54f2d64ed8cf0cf4725565_atlansian.svg` },
  { name: "PostgreSQL", src: `${CDN}/6a54f2e2fe9280445c06ac49_postgresql.svg` },
  { name: "Snowflake", src: `${CDN}/6a54f2efb6ce97149f631e14_snowflake.svg` },
  { name: "Oracle", src: `${CDN}/6a54f2fd82893847fb545848_oracle.svg` },
  { name: "Google BigQuery", src: `${CDN}/6a54f2b0e945a505ae4189ac_google-bigquery.svg` },
  { name: "SAP", src: `${CDN}/6a54f30ebcdb50dbab620f99_sap.svg` },
];

export const integrationTags = [
  "System of Record",
  "Data Platforms",
  "AI Platforms",
  "System of Differentiation",
  "Custom-built Apps",
];

/** FAQ. Answers are HTML (one has a list). */
export const faq = [
  {
    q: "How long does a typical Lyric Studio deployment take?",
    a: "<p>Lyric Studio deployments have gone live in as little as 12 weeks from conception. Actual timelines depend on scope, data complexity, integration footprint, and the specificity of the decisions being modeled. Customers go live with one decision, expand to the next, and keep building.</p>",
  },
  {
    q: "Can I bring my own algorithms into Lyric Studio, or do I get everything out of the box?",
    a: "<p>Both through Lyric's Notes architecture. Blue Notes are Lyric-built and Lyric-maintained content (Science Notes, Logic Notes, Utility Notes) that ship as part of the standard catalog in every Lyric Studio instance. Green Notes are customer-built and customer-maintained content, developed in the Note Console and available in the customer's own section of the Note Catalog.</p>",
  },
  {
    q: "Can Lyric Studio work alongside our existing ERP and planning systems?",
    a: "<p>Yes. Lyric Studio is the intelligence system that operates alongside the systems of differentiation and records that customers already have. Existing ERPs, planning systems, data warehouses, and operational systems can stay in place. Lyric Studio fills the gaps around them and handles the decisions those systems were not designed to make.</p>",
  },
  {
    q: "Is Lyric Studio built for planners, modelers, or supply chain leaders?",
    a: "<p>All three. Modelers and data scientists (Creators) work in code, configure data models, write optimization logic, and version their work. Planners and operators (Consumers) run scenarios, weigh tradeoffs, and commit decisions in the applications Creators have built. Supply chain leaders use the platform to model, decide, and execute on the questions the business is actually asking.</p>",
  },
  {
    q: "What kinds of supply chain decisions does Lyric Studio support?",
    a: "<p>Lyric Studio supports decisions across network, production, fulfillment, inventory, and risk, spanning strategic, tactical, and operational horizons. Specific decision areas include network design, transportation optimization, inventory strategy, and policy simulation. The list keeps growing because the platform is composable. Customers make decisions specific to their business.</p>",
  },
  {
    q: "What is Decision Intelligence for the supply chain?",
    a: "<p>Decision intelligence is the category of platforms built around supply chain decision-making rather than the modeling or planning cycle. It combines math-based optimization, real-time data, and human judgment, so the work of choosing happens in the platform instead of in spreadsheets. Modeling and Planning systems output numbers. Decision intelligence outputs decisions.</p>",
  },
  {
    q: "What is Lyric Studio?",
    a: "<p>Lyric Studio is the AI-native platform built to empower the Decision Mesh. It combines a semantic data layer, an expansive catalog of algorithms, modern elastic compute, and a self-service, composable interface. Customers compose decision logic, sequence decisions, and transform data through code or no-code without rebuilding pipelines.</p>",
  },
  {
    q: "How is Lyric Studio different from a supply chain planning system or APS?",
    a: "<p>APS is built for the planning cycle. Lyric Studio is built for decision-making, including the scenarios, ad hoc questions, and connections that fall outside the cycle. The two solve different problems and run together in most customer deployments.</p>",
  },
  {
    q: "How is Lyric Studio different from a generic AI agent or copilot?",
    a: "<p>Generic AI agents and copilots are language models behind a chat interface that generate answers from text patterns. Lyric Studio is math-first: decisions come from optimization, simulation, and constraint solvers. Decision Agents inside the platform orchestrate that math, run scenarios, and surface tradeoffs the user can act on.</p>",
  },
  {
    q: "What is a Decision Mesh?",
    a: "<p>The Decision Mesh is the view of every decision a supply chain runs on, across network, production, fulfillment, inventory, and risk, spanning strategic, tactical, and operational horizons. It is bidirectional and composable: decisions feed forward, backward, and across silos, and can be added, swapped, or reconfigured as the business changes. Every supply chain organization already has a Decision Mesh. The question is how visible and connected it is.</p>",
  },
  {
    q: "What algorithms and models does Lyric Studio use?",
    a: "<p>Lyric Studio is math-first and covers the techniques real supply chain decisions require:</p><ol><li>Network optimization using linear programs (LPs) and mixed-integer programs (MIPs), with Gurobi as the solver for NP-hard network design problems</li><li>Transportation optimization, including GPU-accelerated routing on Nvidia cuOpt</li><li>Inventory strategy optimization for safety stock, replenishment, and service level policies</li><li>Policy simulation for testing sourcing, routing, and inventory changes before implementation</li><li>Predictive models trained on billions of rows of data for inputs like production run rates and warehouse processing rates</li></ol><p>The platform's sequence layer sits between models and applications, letting modelers daisy-chain models in no-code and run them on the right compute resources.</p>",
  },
];
