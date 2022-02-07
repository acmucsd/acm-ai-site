interface cardText {
  readonly role: string;
  readonly name: string;
  readonly major: string;
  readonly year: string;
  readonly bio: string;
  readonly picture?: string;
}

export const directors: cardText[] = [
  {
    role: 'President',
    name: 'Stone Tao',
    major: 'Computer Science and Cognitive Science (ML)',
    year: 'Third year',
    bio: "I'm an International Student hailing from Chicago and Beijing. While not thinking about AI, I also love to play the violin, ukelele, and am an active fencer. In relation to AI, I currently perform research in AI x HCI as well as 3D computer vision, and also love competing in and making AI competitions. My Site: https://stoneztao.com/",
    picture: 'https://i.imgur.com/6dzQjMC.jpg'
  },
  {
    role: 'Director of Operations',
    name: 'Edward Yang',
    major: 'Computer Science',
    year: 'Third year',
    bio: "Hi y'all, I'm Edward! I'm a third year CS major from the Bay Area interested in AI/ML and web dev (I made this page). I am currently a researcher in SU lab and worked in other labs in the past. In my free time, I enjoy cooking, going to the gym, and playing video games with friends! My site: https://edwardyang.web.app/",

    picture: 'https://i.imgur.com/OzqYdev.jpg'
  },
  {
    role: 'Director of Marketing',
    name: 'Jonathan Zamora',
    major: 'Computer Science',
    year: 'Fourth year',
    bio: "Hi everyone! My name is Jon and it's a pleasure to be a part of ACM AI's board this year. I am currently a robotics researcher in the Wang Group, and I am broadly interested in robotics, computer vision, and machine learning. Aside from AI, I enjoy cooking, traveling, watching movies, and being with family. Here's my site: https://jonzamora.dev/",
    picture: 'https://i.imgur.com/IOFYNuM.jpg'
  },
];

export const operations: cardText[] = [
  {
    role: 'Event Lead',
    name: 'Christopher Cha',
    major: 'Computer Science',
    year: 'Third year',
    bio: 'My main research focus is in natural language processing and social computing. In my free time, I like to watch new things and cook. I have a cool cat that is not interested in AI.',
    picture: 'https://i.imgur.com/Os4Ff4f.jpg'
  },
  {
    role: 'Event Lead',
    name: 'Jason Vega',
    major: 'Computer Science',
    year: 'Fourth year',
    bio: "Hey y'all! I'm originally from the Bay Area (Pleasant Hill). I'm a CSE Honors student doing research on verifying and improving the robustness of explainability tools for neural networks, currently advised by HDSI Prof. Lily Weng. Feel free to chat w me about anything, but especially things related to adversarial attacks, neural network verification, and interpretability :^)!",
    picture: 'https://i.imgur.com/wlN6Hso.jpg'
  },
  {
    role: 'Event Lead',
    name: 'Judy Liu',
    major: 'Computer Science',
    year: 'Third year',
    bio: "I am a Sophomore CS major in Warren. I was a research intern at the Data Mining Lab. I like to play Go (board game), kpop dance, and AI. Still to this day fascinated by Alpha Go",
    picture: 'https://i.imgur.com/Z143Z4M.jpg'
  },
  {
    role: 'Event Lead',
    name: 'Satyam Gupta',
    major: 'Computer Science',
    year: 'Fourth year',
    bio: "I am a CS major who likes programming, AI, video games, and any show, movie, anime with a thriller tag on it. I want to try food from different cultures.",
    picture: 'https://i.imgur.com/m3KgxYe.jpg'
  },
  {
    role: 'Event Lead',
    name: 'Joseph Liu',
    major: 'Computer Science',
    year: 'Fourth year',
    bio: "Incoming roblox SWE",
    picture: 'https://i.imgur.com/ZNCicwe.jpg'
  },
  {
    role: 'Event Lead',
    name: 'Vincent Tu',
    major: 'Intended Computer Science',
    year: 'First year',
    bio: "Hi, I'm Vincent and I'm a first year (undeclared but intending to do CS) at 6th college at UCSD. I like AI (recently my focus has been on teaching computers how to see) so reach out to me on discord (alckasoc#5261; hopefully you have one) to talk about AI-related stuff 😎! ML models may underfit, deep neural networks may overfit, but you, you're a perfect fit.",
    picture: 'https://i.imgur.com/x4jUOOT.png'
  },
  {
    role: 'Event Lead',
    name: 'Arth Shukla',
    major: 'Math-Computer Science',
    year: 'First year',
    bio: "Hey all, I'm Arth. I'm a first-year Math-CS major interested in AI/ML, applied math, and web and automation development. I'm also interested in global politics, and in my spare time I like playing video games and watching anime.",
    picture: 'https://i.imgur.com/PN3rHGN.jpg'
  },
  {
    role: 'Event Lead',
    name: 'Jackie Piepkorn',
    major: 'Computer Science',
    year: 'First year',
    bio: "Hi everyone! My name is Jackie, and I am a computer science major interested in AI, particularly neural networks and natural language processing. My favorite part about ACM AI is our goal of making AI education more accessible to students. When I'm not coding, I enjoy live music, learning languages, hiking, and volleyball.",
    picture: 'https://i.imgur.com/yhV3wyh.jpg'
  },
];

export const dev: cardText[]=[
  {
    role:'Developer',
    name:'Joshua Hong',
    major:'Cognitive Science',
    year:'Third year',
    bio: "Hi! I’m Joshua and I’m a Cognitive Science major from the Bay Area. At ACM AI, I’m excited to make AI more understandable and accessible to students. In my free time, I enjoy cooking, watching TV shows, and playing games such as Hollow Knight and Celeste",
    picture: 'https://i.imgur.com/tBdPklj.png'
  },
  {
    role:'Developer',
    name:'William Duan',
    major:'Computer Science',
    year:'Third year',
    bio: "I need your biography",
    picture: 'https://i.imgur.com/0sfCxh7.jpg'
  },
  {
    role:'Developer',
    name:'Yuru',
    major:'Mathematics & Computer Science',
    year:'Third year',
    bio: "Hi! I’m Yuru and I’m currently a third year majoring in Mathematics & Computer Science.  I really enjoy watching movies, going to karaoke, and cooking during free time. And I love Boba!!!",
    picture: 'https://i.imgur.com/XiXVZT8.png'
  }
]

export const external: cardText[] =[
    {
    role: 'Sponsorship Coordinator',
    name: 'Karthik Guruvayurappan',
    major: 'Data Science',
    year: 'Third year',
    bio: "Hi! My name's Karthik, and I'm currently a third-year double majoring in Data Science and General Biology. I'm really interested in bioinformatics, and the applications of AI to biology. For fun, I enjoy running, playing tennis, playing the guitar, and hanging out with my dog.",
    picture: 'https://i.imgur.com/9CzcOd3.jpg'
  },
  {
    role: 'Marketing Coordinator',
    name: 'Dennis Luc',
    major: 'Computer Science',
    year: 'Third year',
    bio: 'Swimming, running, playing league, eating fast food, and writing code',
    picture: 'https://i.imgur.com/E0n5ndW.jpg'
  },
  {
    role: 'Marketing Coordinator',
    name: 'Kevin Nguyen',
    major: 'Public Health',
    year: 'Third year',
    bio: "What's up! My name is Kevin and I am a third year Public Health major with a minor in Mathematics from Orange County, California. Although I am not in a CS-related major, I am planning to pursue Biostatistics which requires some useful CS and AI/ML knowledge. heh. I am currently working in a research project analyzing the effectiveness of digital technology (exposure notifications) in preventing the spread of diseases such as COVID-19.",
    picture: 'https://i.imgur.com/nF65Jyd.jpg'
  },
  {
    role: 'Marketing Coordinator',
    name: 'Jonah Song',
    major: 'Computer Science',
    year: 'Second year',
    bio: 'Diamond League Player in all roles',
    picture: 'https://i.imgur.com/HMHVBkA.jpg'
  },

];
