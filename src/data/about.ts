/**
 * About page copy, verbatim from the live site (lyric.tech/about-us).
 * Images come from the Webflow CDN until `npm run fetch-assets` saves them
 * into src/assets/images/about (see `cdn` and the components' `assetOr`).
 */

const CDN = "https://cdn.prod.website-files.com/6a455ce597623f0a8ccc7577";
const CMS = "https://cdn.prod.website-files.com/6a455ce597623f0a8ccc7579";

export const aboutImages = {
  hero: { src: `${CDN}/6a609adbcf41f8691e3864ea_Link.avif`, width: 2160, height: 1440 },
  values: { src: `${CDN}/6a5cb68323b7b3e0368e8d38_Frame%203.avif`, width: 1172, height: 1152 },
  signature: { src: `${CDN}/6a5c919e97f2467acf56fdc4_title.svg`, width: 298, height: 29 },
};

/** The founder's letter. `strong` marks the sentence the live page sets in bold. */
export const letter: { text: string; strong?: string }[] = [
  {
    text: "I'll be honest. Most company \"About\" pages bore me. They're written to impress, and they all blur together by the second paragraph. Lyric isn't most companies, so let me tell you our story my way.",
  },
  {
    text: "When we started five years ago, the hardest hill was never the technology. It was getting people to think differently. We were never going to be a rinse and repeat of the vendors already out there. Lyric Studio was, and still is, a vision of a different way of deciding.",
  },
  {
    text: "Think of a supply chain as a machine for making decisions. Thousands a day. What to buy, where to make it, who gets served first when there isn't enough to go around. Most companies make those decisions on software built twenty years ago, set up once in a painful implementation, then bent out of shape by every reorg and strategy pivot since. Nobody planned it that way. It's just what happens.",
  },
  {
    text: "We built Lyric on a belief that felt almost too simple to say out loud. These are math problems. Data had become abundant, compute cheap, the algorithms far more powerful. Treat your supply chain as a math problem instead of a software purchase, and you pull ahead. Think Amazon. Think Walmart.",
  },
  {
    text: "The belief was right, and the proof keeps arriving.",
    strong:
      "Billion-dollar networks solved end to end. Nine-figure savings. Problems the biggest names circled for decades, solved in weeks. I'd rather you hear those from our customers directly, in their words instead of mine.",
  },
  {
    text: "2026 changes the slope. AI now lets us invent algorithms in weeks, not years, and lets a planner ask in plain English and get real optimization back. And honestly, it's happening faster than we dared to model.",
  },
  {
    text: "The old world forced a choice: rigid software built for the average company, or years building your own. But nothing says your decision-making has to freeze the day the software ships. Soon teams will expect it to be a living thing, reshaped in weeks, from their biggest network questions to tonight's decisions. That's what we're building toward, and why we show up every morning.",
  },
  {
    text: "People ask if the hard part is behind us. It isn't. Most supply chain decisions are still made on spreadsheets and gut, by people who earned their skepticism through failed implementations and a fresh wave of AI-washing. It's deserved. Earning trust is harder than inventing algorithms, and it's the real work ahead.",
  },
  {
    text: "Which brings me to what I'm proudest of. Our customers, who took a chance on a new approach when it was easier not to. And our Chorus, the people who show up to build it every day. You are the reason we get to dream this big.",
  },
  {
    text: "We call it the Decision Era, and we intend to lead it. If you found yourself nodding, come build it with us.",
  },
];

export const founder = { name: "Ganesh Ramakrishna", role: "Founder & CEO" };

export const timeline = [
  {
    year: "2013–20",
    title: "The first record",
    text: "Before Lyric, this founding team built Opex Analytics (later acquired by LLamasoft and then Coupa), a data science company solving tough supply chain problems for Fortune 500 organizations around the world. Think; same team. Bigger vision. Even more ambition to build what the industry actually needs.",
  },
  {
    year: "2021",
    title: "The hook",
    text: "The idea came to life, and one conviction sat under all of it. Enterprise supply chains deserve math they can trust applied specifically for their organization. Not yet another black box. But math-first, composable, and made for enterprise scale.",
  },
  {
    year: "2022",
    title: "The Chorus assembles",
    text: "The founding team came together and began to build. The first customers were logging into Lyric Studio before we even had business cards.",
  },
  {
    year: "2023",
    title: "Soundcheck",
    text: "Early adopters put real supply chains into production on Lyric Studio. Soon, some of the most demanding operations in the world were trusting it with the decisions their business runs on.",
  },
  {
    year: "2024",
    title: "Curtain up",
    text: "Out of stealth, and into the market. Lyric Studio made itself known in the market with the value it was creating for customers, becoming known as a vision for the next gen of supply chain decision-making.",
  },
  {
    year: "2025",
    title: "Labels sign on",
    text: "Backed by the best. A $55.5M Series B, more than $80M raised to date, and revenue up 500%. The investors who back category leaders put their weight behind Lyric.",
    investors: true,
  },
  {
    year: "2026",
    title: "Headlining arenas",
    text: "Today, 40+ Fortune 500 brands run their supply chains on Lyric Studio. A 300+ team of Chorus members keeps them running, from Palo Alto and Chicago to Amsterdam, Chennai, and Bangalore.",
  },
  {
    year: "Ahead",
    title: "Going platinum",
    text: "What comes next is algorithms and agents making enterprise decisions at the speed the world moves. We call it the Decision Era, and we intend to lead it.",
  },
];

/** Shown on the 2025 slide. Width and height are the SVGs' own. */
export const investors = [
  { name: "Insight Partners", file: "insight-partners", src: `${CMS}/6a5e214ebfbaff840493dbb4_Frame%202147244882.svg`, width: 49, height: 15 },
  { name: "Permanent Capital", file: "permanent-capital", src: `${CMS}/6a5e2150d73f5cda6c6ec9b9_Group%202147203944.svg`, width: 81, height: 18 },
  { name: "Primary", file: "primary", src: `${CMS}/6a5e2153bfbaff840493dda9_Frame%202147244879.svg`, width: 63, height: 18 },
  { name: "VMG", file: "vmg", src: `${CMS}/6a5e2156f4fa0106429ee22f_VMG.svg`, width: 40, height: 16 },
];

export const values = [
  {
    title: "Trusted problem solvers",
    text: "We go after the problems others hesitate to touch. Complex, high-stakes, no obvious answer. Lyric Studio is how we solve them, and we see it through until it works. We measure ourselves by nothing but the value we create for your business.",
  },
  {
    title: "Math, not magic",
    text: "The best decision wins on proven facts and evidence. The same inputs always produce the same provable answer. And you can always see through our math: a glass box, never a black box.",
  },
  {
    title: "Composable by design",
    text: "Change is built into how we work. Lyric Studio adapts to any supply chain, and we serve the market, and evolve with the same agility. Composability is not just our architecture. It is our mindset.",
  },
  {
    title: "Mach 10",
    text: "Speed is our muscle, and we train it. We ship, learn, and improve fast, with discipline: quick because we practice, precise because we prepare. We run right up to the limit, never past it. Momentum stays in our control, and speed never costs the quality we promise. That shows up as faster deployments, faster answers, and value you feel from week one.",
  },
  {
    title: "Compassionate candor",
    text: "We say what needs to be said, with the care people deserve. With each other, with our customers, and with the market. Helping customers grow and drive value paired with compassion is how we build teams worth trusting and relationships that last.",
  },
];

export type Leader = {
  name: string;
  role: string;
  /** File name in src/assets/images/about/team once fetched. */
  file: string;
  photo: string;
  /** The playful photo shown on hover. Newer leaders don't have one yet. */
  hover?: string;
};

export const leaders: Leader[] = [
  { name: "Ganesh Ramakrishna", role: "Founder & CEO", file: "ganesh-ramakrishna", photo: `${CMS}/6a5dc730891ff56ef549caf6_Frame%202147244832.avif`, hover: `${CMS}/6a5dc768c48d3b5872f864ea_Frame%202147244832.avif` },
  { name: "Sara Hoormann", role: "Strategy & Marketing", file: "sara-hoormann", photo: `${CMS}/6a5dc727781dae66fe81693f_Frame%202147244833-2.avif`, hover: `${CMS}/6a5dc784220cd9bd5a1d3ee5_Frame%202147244833-3.avif` },
  { name: "Sarang Jagdale", role: "Decision Science", file: "sarang-jagdale", photo: `${CMS}/6a5dc6fb65f790f9c10fb9a3_Frame%202147244833-1.avif`, hover: `${CMS}/6a5dc7b086cf13ef3e8661bc_Frame%202147244833-2.avif` },
  { name: "Ronan O'Donovan", role: "Platform", file: "ronan-odonovan", photo: `${CMS}/6a5dc6f3cd56089dc7f00487_Frame%202147244833.avif`, hover: `${CMS}/6a5dc7c2a5db3796b3243641_Frame%202147244833-1.avif` },
  { name: "Vish Oza", role: "Prediction Science", file: "vish-oza", photo: `${CMS}/6a5dc6d33a372fa8a10ab014_Frame%202147244834.avif`, hover: `${CMS}/6a5dc7d4c149ca6738012855_Frame%202147244834.avif` },
  { name: "Karthik Muthukrishnan", role: "Engineering", file: "karthik-muthukrishnan", photo: `${CMS}/6a5dc6c87f9c26a5e0e084ed_Frame%202147244835.avif`, hover: `${CMS}/6a5dc7ee01420e36da3f76f5_Frame%202147244835.avif` },
  { name: "Deb Mohanty", role: "Planning & Agentic AI", file: "deb-mohanty", photo: `${CMS}/6a5dc6b1a5db3796b3238fe2_Frame%202147244836.avif`, hover: `${CMS}/6a5dc8194caadab063361f62_Frame%202147244836.avif` },
  { name: "Sean Zonneveld", role: "Sales & GTM", file: "sean-zonneveld", photo: `${CMS}/6a5dc6a9a7826c08d8eba137_Frame%202147244837.avif` },
  { name: "Zahir Balaporia", role: "Solution Design", file: "zahir-balaporia", photo: `${CMS}/6a5dc69f7f9c26a5e0e07871_Frame%202147244833-3.avif` },
  { name: "Laura Carpenter", role: "Customer Success", file: "laura-carpenter", photo: `${CMS}/6a5dc64ea5db3796b3236a34_Frame%202147244833.avif`, hover: `${CMS}/6a5dc8364296872d43b3594c_Frame%202147244833.avif` },
];

/** Everyone else at Lyric, in the live site's order. */
export const chorus =
  "Abhishek Singh|Aplonia Stelloo|Anshul Khandelwal|Darpan Garg|Mukesh Pandey|Sahil Jain|Aditya Khandelwal|Benjamin Unpingco|Nithya Natarajan|Rahul Vermani|Mayank Singla|Shruti Ghose|Prateek Bhiwapurkar|Brian Gwiazdowski|Dheeptha Rai|Sughra Ali Zaidi|Chaitanya Gadodia|Avi Oza|Abhishek Jain|Prashant Tripathi|Eric Staedt|Kimberly Kraushaar|Patrick Searles|Andrew Stephen Fox|Ashley Gonzales|Dhaval Siddhpuria|Ravi Goyal|Srihari S|Tyler Brooks|Richard Borger|Satyajit Chaudhuri|Aman Malviya|Pratik Sherke|Venkataraman Rajasekaran|Carl Wilson|Nicolas Pereira Ribeiro|Stijn-pieter Antonius Houten|Simran Sodhi|Arpit Thakur|Floris Alexander Bakker|Jonathan Reed Treihaft|Kirthiga Arumugam|Krish Bajaj|Parth Patel|Sylvain Jean Arreckx|Umer Hafeez Mir|Boopathiraja Krishnasamy|Kaushik Jayakumar|Kristian Roggensack|Kyle Cannington|Ojas Rahate|Shreya Singhee|Vikash Pathak|Richard Baliban|Satish Moorthy|Tripti Verma|Sean Zonneveld|Zahir Balaporia|Adityaraj Singh Chouhan|Manigandan M|Nikhil Bhat|Rahul Mantripragada|Abhinav Sparsh|Abhiram R|Aniket Madhukar Gudadhe|Chahat Setia|Naveen Meena|Prakhar Aditya|Shubham Gupta|Arrabole Tharun Reddy|Yadav Pushti Gaganbihari|Lekh Sisodiya|Pradnya Joshi|Vardaan Bansal|Andre Alho|Debashree Dibyadarshini|Raghul Kumar PS|Gerardus Cornelis Mol|Günther Thomas Martin|Yaroslav Samoylenko|Vatsal Dani|Ashman Laul|Hugo Philippe Louis Wallner|Juhaina Javed|Jacob Brodner|Suhas Gumma|Ronak Kogta|BharathiShankar Kannan|Jean-charles Cyr-louis Croix|Kendall Mimeault|Margaret Minister|Dzmitry Nebiadukhin|Ajay Naran|Nancy Hur|Srinivas K|Tadikonda Revan|Aryan Joshi|Nisha Nair|Konstantinos Vasileiadis|Daniel Guimarans Serrano|Sampriti Mahapatra|Sparsh Prajapati|Srishti Lakhotia|Kelsey Gallardo|Prabhat Mishra|Saumya Hemantkumar Bhatt|Sohil Khan|Surya Vamsi Vemparala|Erika Marais|Graham Umbanhowar|Ketaki Tushar Sahasrabudhe|Lucky Mathias Kispotta|Shivam Garg|Rohan Pooniwala|Madhur Khake|Rahul Garg|Vikrant Guleria|Dolina Mushahary|Mark Smits|Navya Raghuram|Christopher Morello|Pradeep Navnath Borade|Harpal Gill|Sonja Jones|Ganesh Prasad|Senthil Kalairaja|Nitin Navali|Dhawal Thakkar|Mark Harden|Piyush Soni|Priyang Mani Tripathi|Raj Basotia|Harsh Sharma|Kishore Adiraju|Neelam Garasia|Richard Meulen|Salman Khan|Elizabeth Weber|Karthik Sharma|Mustajab Ikram|Vijay Kumar Kelothu|Anshul Gupta|Sidharth P|Sivaraman R|Carlos Arturo Cantuarias Moreano|Harsh Sharma|Nandini Gaur|Tinu Rohith|Navin Muthuswamy|Rohit Agarwal|Akshaya Uthamaputhiran|Dhammapal Sahebrao Avhad|Michael Ebbing|Porkumaran Gopal|Vandan Rogheliya|Mayank Sharma|Sujitha Venkateshwaran|Ugo Rosolia|Abhineet Saxena|Aviral Singh|Divyansh Dubey|Jessica Esteban|Mayank Kukreti|Stephen Musciano|Naman Maheshwari|Amish Saxena|Aaditya Mahadevan|Kuldeep N J|Snigdha Goley|Ayonee Sengupta|Jatin Panjwani|Sushrut Mirzapure|Raj Sharma|Abhinav Sapra|Marco Benavides|Kenneth Hooton|Ashwin Garg|Himanshu Yadav|Susheel Kumar Reddy Nerallapally|Mackenzie Frasso|Anurag Agrawal|Aritra Majumder|Anjanay Saxena|Kartik Chaudhary|Manesh Narayan|Praveen T|Richard Estrella|Bharat Upadrasta|Ashita Boyina|Pulkit Khandelwal|Vigneshwar Thiyagarajan|Matthew Link|Saloni Agrawal|Faheem Faheem|George Kuruvilla|Sathiya Moorthy Dhiravida|Nithin Thomas|Krishna Praveen|Aman Verma|Arun Lila|Mayur Morey|Sohel Qureshi|Siddhant Tiwary|Laura Carpenter|Jyotiranjan Sahoo|Aakash Kaushik|Manoj Muthu|Shubham Rao|Suyash Bhanage|Preethi Mohan|Nelson Dias|Prerna Agarwal|Vedansh Wani|Kislay Kumar|Vidya Patil|Rahul Ramesh|Dinesh Natarajan|Brittany Elder|Ashika Mai KK|Brian Dye|Ruchita Surve|Saichand Mondem|Satish Gandham|Jaeyanth JKV|Srivatsan Kadambi Seshadri|Arnab Kumar Roy|Amit Kumar|Priyesh Kumar|Akhoury Shauryam|Aman Agarwal|Isha Chopra|Vijaybabu S|Sathishkumar L|Nandan Satapathy|Aditya Jaroli|Amit Singh|Ratnaji Vanga|Gayathri Sivaprakasam|Vineeth Kumar R V|Sachin Maheshwari|Yajur Phullera|Kanupriya Sharma|Adithya Bingi|Brooke Collins|Donipudi Satyasree Thilak|Gaurav Asati|Tushar Shekhar|James Allison|Milind Kanetkar|Alexander Meyer|Satish Saurav|Balram Rathore|Victoria Richmond|Erin Watson|Akash Pathak|Ashish Siyag|Pradhumna Rathore|Pradyot Mohanty|Syed Aslah|Saurav Sahay|Lokesh Singh Mahar|Mustafa Vora|Rounak Datta|Ankit Gupta|Vigneshwar Ravichandran|Deba Mohanty|Aditi Chattar|Alen Sebastian|Francis Corrigan|Vismay Luhadiya|Sundharesan M|Vignes U S|Nirmiti Jain|Pushkar Oke|Shravan Kaul|Jonathan Payne|Parameswaran N|Maria Luisa Janer Rubio|Abhishek Nahar|Meenarli Sharma|Austin Haygood|Rajdeep Chouduri|Mohammad Awez Khan|Pooja Mehta|Thilak Subramanium Ramanathan|John Venigalla|Saket Jajoo|Abdul Vahith Z|Pradeep Kumar V|Akhil Naravi|Sudendra Priyan|Akshat Jain|Jeevan Dasari Swaroop|Apoorv Garg|Gokul Chinnasamy|Pravin Kumar|Satheesh Prabhakaran Venkatasamy|Manas Galipalli|Lakshmi Ganapathy Murugesan|Sara Hoormann|Sharang Burde|Sivasai Thota|Samuel Hillis|Bhaarath Vijay Ramesh|SKI Senthilkumar Iyyappan|Ganesh Ramakrishna|Karthik Muthukrishnan|Ronan O'Donovan|Sarang Jagdale|Vishvesh Oza".split(
    "|",
  );

/**
 * Offices. `c` and `r` are the pin box's top-left cell on the 20-column
 * desktop grid (Figma 6951:3002, plus Pune from the live site); `m` is the
 * same on the 8-column phone grid, laid out like live's mobile map.
 */
export const cities = [
  { name: "Palo Alto", country: "United States", c: 4, r: 4, m: [4.75, 0.3] },
  { name: "Amsterdam", country: "Netherlands", c: 8.5, r: 4, m: [0.15, 4.4] },
  { name: "Bangalore", country: "India", c: 13, r: 4, m: [2.75, 2.35] },
  { name: "Chicago", country: "United States", c: 4.5, r: 6.5, m: [0.75, 0.3] },
  { name: "Pune", country: "India", c: 8.5, r: 7, m: [5.35, 4.4] },
  { name: "Chennai", country: "India", c: 12.5, r: 6.5, m: [2.75, 4.4] },
];

export const careersUrl = "https://jobs.ashbyhq.com/lyric";
