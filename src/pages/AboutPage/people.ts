import Arth from './pictures/Arth.jpg';
import Dennis from './pictures/Dennis.jpg';
import Grant from './pictures/Grant.jpg';
import Jackie from './pictures/Jackie.jpg';
import Jon from './pictures/Jon.jpg';
import Jonah from './pictures/Jonah.jpg';
import Joshua from './pictures/Joshua.jpg';
import Judy from './pictures/Judy.jpg';
import Karthik from './pictures/Karthik.jpg';
import AlanLi from './pictures/AlanLi.jpg';
import Stone from './pictures/Stone.jpg';
import WeijiChen from './pictures/WeijiChen.jpg';
import EdwardJin from './pictures/EdwardJin.jpg';
import Vincent from './pictures/Vincent.png';
import Stefanie from './pictures/StefanieDao.jpg';
import JennyLam from './pictures/JennyLam.png';
import GordonChiu from './pictures/GordonChiu.jpg';
import MilanGanai from './pictures/MilanGanai.png';
import FatimaDong from './pictures/FatimaDong.jpg';
import MohakVaswani from './pictures/MohakVaswani.jpg';
import NabhanSazzad from "./pictures/NabhanSazzad.jpg";
export interface Socials {
  readonly email?: string;
  readonly website?: string;
  readonly twitter?: string;
  readonly github?: string;
  readonly instagram?: string;
  readonly facebook?: string;
  readonly linkedin?: string;
}

export interface Person {
  readonly role: string;
  readonly name: string;
  readonly major: string;
  readonly minor?: string;
  readonly year: string;
  readonly bio: string;
  readonly picture?: string;
  readonly socials?: Socials;
}

export const directors: Person[] = [
  {
    role: 'President',
    name: 'Jonathan Zamora',
    major: 'Computer Science',
    minor: 'Math',
    year: 'Final year',
    bio:
      "Hi everyone! My name is Jon, and it's a pleasure to be ACM AI's President this year. I am currently a Robotics/AI researcher in Prof. Xiaolong Wang's Group, and I am broadly interested in robotics, reinforcement learning, computer vision, and machine learning. Aside from AI, I enjoy cooking, traveling, watching movies, and being with family. Here's my site: https://jonzamora.dev/",
    picture: Jon,
    socials: {
      website: "https://jonzamora.dev/",
      linkedin: "https://www.linkedin.com/in/jonzamora18/",
      github: "https://github.com/jonzamora"
    }
  },
  {
    role: 'Director of Operations',
    name: 'Arth Shukla',
    major: 'Math Computer Science',
    year: 'Second year',
    bio:
      "Hey all, I'm Arth. I'm a first-year Math-CS major interested in AI/ML, math, and web development. I'm also interested in global politics, and in my spare time I like playing D&D and watching anime.",
    picture: Arth,
    socials: {
      linkedin: "https://www.linkedin.com/in/arth-shukla/",
      github: "https://github.com/arth-shukla"
    }
  },
  {
    role: 'Director of Development',
    name: 'Stone Tao',
    major: 'Computer Science & Cognitive Science',
    minor: 'Math',
    year: 'Fourth year',
    bio:
      "Hi everyone, I'm Stone, and I'm super interested in AI, specifically reinforcement learning and AI competition design. Currently a research in Hao Su's Lab and co-founder of the non-profit Lux AI Challenge. In my spare time I spend time fencing as well.",
    picture: Stone,
    socials: {
      website: "https://www.stoneztao.com/",
      linkedin: "https://www.stoneztao.com/",
      github: "https://github.com/StoneT2000/"
    }
  },
  {
    role: 'Directory of DEI',
    name: 'Jackie Piepkorn',
    major: 'Computer Science',
    year: 'Second year',
    bio:
      "Hi everyone! My name is Jackie, and I am a computer science major interested in AI, particularly neural networks and natural language processing. My favorite part about ACM AI is our goal of making AI education more accessible to students. When I'm not coding, I enjoy live music, learning languages, hiking, and volleyball.",
    picture: Jackie,
  },
  {
    role: 'Co-Director of Marketing',
    name: 'Karthik Guruvayurappan',
    major: 'Data Science & General Bio',
    year: 'Fourth year',
    bio:
      "Hi! My name is Karthik and I'm from the Bay Area. I am interested in the intersection of genetics and machine learning, and hope to pursue a PhD in the future. For fun, I enjoy playing tennis, running, playing the guitar, watching sports, and hanging out with friends!",
    picture: Karthik,
    socials: {
      website: "https://karthikguru.com/",
      linkedin: "https://www.linkedin.com/in/karthik-guruvayurappan-172747163/",
      github: "https://github.com/somet3000"
    }
  },
  {
    role: 'Co-Director of Marketing',
    name: 'Jonah Song',
    major: 'Computer Engineering',
    year: 'Third year',
    bio:
      "Hey! I am Jonah! I'm a third year Computer Engineering major in Sixth College. My interests are in Robotics and similar fields that mesh hardware and software together :). I enjoy playing table tennis or video games in my free time, feel free to reach out if u wanna play (Im not very good tho :( )",
    picture: Jonah,
  },
  
];

export const operations: Person[] = [
  {
    role: 'Event Lead',
    name: 'Alan Li',
    major: 'Computer Science',
    minor: 'Math',
    year: 'Fourth year',
    bio:
      "I'm Alan, a 4th year CS major. My research experience lies in sequence forecasting and RL. In my free time I enjoy reading, watching movies, and photography. Feel free to reach out!",
    picture: AlanLi,
  },
  {
    role: 'Event Lead',
    name: 'Judy Liu',
    major: 'Computer Science',
    year: 'Fourth year',
    bio:
      "Hi! My name is Judy. I focus on iOS dev and computer vision research. Some of my hobbies include dancing and travelling.",
    picture: Judy,
    socials: {
      linkedin: "https://www.linkedin.com/in/judyliu14/",
      github: "https://github.com/judyliu14"
    }
  },
  {
    role: 'Event Lead',
    name: 'Stefanie Dao',
    major: 'Cognitive Science',
    year: 'Fourth year',
    bio:
      "Hi I'm Stefanie! I am a senior studying Cognitive Science with interest in Computer Vision, Graphic and Cloud Computation.",
    picture: Stefanie,
    socials: {
      linkedin: "https://www.linkedin.com/in/stefanie-dao/"
    }
  },
  {
    role: 'Event Lead',
    name: 'Milan Ganai',
    major: 'Computer Science',
    year: 'Third year',
    bio:
      "Hey y'all, I'm Milan, and I'm a third year CS major from the Bay. I'm interested in AI and Robotics. I enjoy cooking, traveling, trying new food, hiking, and listening to music.",
    picture: MilanGanai,
    socials: {
      linkedin: "https://www.linkedin.com/in/milanganai/"
    }
  },
  {
    role: 'Event Lead',
    name: 'Weiji Chen',
    major: 'Computer Science',
    minor: 'Math',
    year: 'Third year',
    bio:
      `Hello! My name is Weiji, a CS major, minoring in Math. I find every field in computer science to be deeply impactful in their own way so I have a broad spectrum of interests including computer vision/graphics, robotics, cryptography, human-computer interactions, networking, etc. Outside of school, I enjoy being involved in outreach events centered on CS education, learning new languages, and reading history. I'm always happy to chat with anyone; welcome to ACM!`,
    picture: WeijiChen,
    socials: {
      linkedin: "www.linkedin.com/in/wei-ji-chen",
      github: "https://github.com/Wei-Ji-Chen"
    }
  },
  {
    role: 'Event Lead',
    name: 'Vincent Tu',
    major: 'Computer Science',
    // minor: 'Math',
    year: 'Second year',
    bio:
      `Hi, I'm Vincent and I'm a first year (undeclared but intending to do CS) at 6th college at UCSD. I like AI (recently my focus has been on teaching computers how to see) so reach out to me on discord (alckasoc#5261; hopefully you have one) to talk about AI-related stuff 😎! ML models may underfit, deep neural networks may overfit, but you, you're a perfect fit.`,
    picture: Vincent,
    socials: {
      // linkedin: "www.linkedin.com/in/wei-ji-chen",
      // github: "https://github.com/Wei-Ji-Chen"
    }
  },
  {
    role: 'Event Lead',
    name: 'Jackie Piepkorn',
    major: 'Computer Science',
    year: 'Second year',
    bio:
      "Hi everyone! My name is Jackie, and I am a computer science major interested in AI, particularly neural networks and natural language processing. My favorite part about ACM AI is our goal of making AI education more accessible to students. When I'm not coding, I enjoy live music, learning languages, hiking, and volleyball.",
    picture: Jackie,
  },
];

export const dev: Person[] = [
  {
    role: 'Developer',
    name: 'Joshua Hong',
    major: 'Mathematics-Computer Science & Cognitive Science',
    year: 'Fourth year',
    bio:
      `Hello everyone! I'm Joshua and I'm a Math-CS, Cog Sci double major from the Bay Area. I'm interested in AI, especially natural language processing and representation learning. In my free time, I enjoy cooking, reading, and playing video games!`,
    picture: Joshua,
    socials: {
      linkedin: "https://www.linkedin.com/in/joshua--hong/",
      github: "https://github.com/joshua-j-hong",
    }
  },
  {
    role: 'Developer',
    name: 'Edward jin',
    major: 'Computer Science',
    year: 'Second year',
    bio:
      `Hello! My name is Edward Jin and I am a 2nd year computer science student. I enjoy learning new tools/technologies and building applications. In my free time I usually play basketball or hang out with friends.`,
    picture: EdwardJin,
    socials: {
      linkedin: "https://www.linkedin.com/in/edwardcjin/",
      github: "https://github.com/EddieJ03"
    }
  },
  {
    role: 'Developer',
    name: 'Grant Cheng',
    major: 'Computer Science',
    minor: 'Japanese Studies',
    year: 'Second year',
    bio:
      "Hello! I'm Grant, a second year computer science major at Muir. Outside of coding and AI, I like a variety of things from rock climbing to video games to Japanese language and culture.",
    picture: Grant,
    socials: {
      github: 'https://github.com/CatFish47',
      linkedin: "https://www.linkedin.com/in/grant-cheng-52171b205/"
    },
  },
  {
    role: 'Developer',
    name: 'Jenny Lam',
    major: 'Mathematics-Computer Science',
    year: 'Second year',
    bio:
      "I'm Jenny, a 2nd year student interested in web development, AI, and bioinformatics. I'm currently doing research in the Moshiri lab at UCSD and the Stowers lab at Scripps Research. In my free time, I love making digital art!",
    picture: JennyLam,
    socials: {
      github: 'https://github.com/jenetic',
      linkedin: 'https://www.linkedin.com/in/jwny/',
      website: 'https://jenetic.github.io/',
    },
  },
  {
    role: 'Developer',
    name: 'Mohak Vaswani',
    major: 'Computer Science',
    year: 'Second year',
    bio:
      `Hi there, I am Mohak Vaswani. I am from Qatar, currently pursuing Computer Science. I am a sophomore who loves to code and play table tennis. I am a very social individual who loves to meet new people. `,
    picture: MohakVaswani,
    socials: {
      linkedin: "www.linkedin.com/in/movaswani",
      github: "https://github.com/mohakvni",
    }
  },
  {
    role: 'Developer',
    name: 'David Tran',
    major: 'Computer Science',
    year: 'Second year',
    bio:
      ``,
    socials: {
      // linkedin: "www.linkedin.com/in/movaswani",
      // github: "https://github.com/mohakvni",
    }
  }
];


export const external: Person[] = [
  {
    role: 'Marketing Coordinator',
    name: 'Dennis Luc',
    major: 'Computer Science',
    year: 'Fourth year',
    minor: 'Math & Business',
    bio:
      `Hi everyone! My name is Dennis and I'm a 4th-year at UCSD majoring in Computer Science and minoring in Mathematics and Business. In my free time, I like to go on hikes, get food with friends, and work out!`,
    picture: Dennis,
    socials: {
      linkedin: "https://www.linkedin.com/in/dennisluc/",
      github: "https://github.com/denniskluc"
    }
  },
  {
    role: 'Marketing Coordinator',
    name: 'Gordon Chiu',
    major: 'Cognitive Science',
    year: 'Second year transfer',
    bio:
      "Hello! My name is Gordon, and I'm a Cognitive Science Major Specializing in Machine Learning and Neural Computation. I enjoy playing pool and video games during my free time, and love to listen to EDM.",
    picture: GordonChiu,
    socials: {
      
    }
  },
];
export const socials: Person[] = [
  {
    role: 'Social Lead',
    name: 'Fatima Dong',
    major: 'Cognitive Science',
    year: 'Second year',
    bio: "I am from the Bay Area. My interests include exploring new music and writing! I look forward meeting everyone this year.",
    picture: NabhanSazzad,
  },
  {
    role: 'Social Lead',
    name: 'Nabhan Sazzad',
    major: 'Computer Science',
    minor: 'Buisness Economics',
    year: 'Third year',
    bio: "Hi! My name is Nabhan, I am a thid year in Warren studying Computer Science and am excited to be a part of ACM AI this year. Some fun things I like to do is watch a bunch of sports, go to the gym and play guitar. My favorite show on HBO is Silicon Valley.",
    picture: FatimaDong,
    socials: {
      website: "https://nabhan02.github.io/",
      linkedin: "https://www.linkedin.com/in/nabhansazzad/",
      github: "https://github.com/nabhan02"
    }
  },
  {
    role: 'Social Lead',
    name: 'Philip Chen',
    major: 'Electrical Computer Engineering',
    year: 'Second year',
    bio: "",
    socials: {
      linkedin: "www.linkedin.com/in/philip-chen-HI-CA"
    }
  }
]
