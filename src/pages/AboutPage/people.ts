export interface Socials {
  readonly website?: string;
  readonly github?: string;
  readonly linkedin?: string;
}

export interface Person {
  readonly role: string;
  readonly name: string;
  readonly major: string;
  readonly bio: string;
  readonly picture?: string;
  readonly socials?: Socials;
}
export const directors: Person[] = [
  {
    role: 'President',
    name: 'Arth Shukla',
    major: 'Mathematics-Computer Science',
    bio: "Hey all, I'm Arth. I'm currently researching RL and Robotics in Prof. Hao Su's Group, and I'm generally interested in how AI can learn from diverse data, experiences, and representations. In my free time, I like playing TTRPGs like D&D and Cyberpunk Red.",
    picture:
      'https://arth.website/static/media/Me_Profile.5eff0ef62c5cce2f4269.jpg',
    socials: {
      github: 'https://github.com/arth-shukla',
      linkedin: 'https://www.linkedin.com/in/arth-shukla/',
      website: 'https://arth.website',
    },
  },
  {
    role: 'Director of Events',
    name: 'Jackie Piepkorn',
    major: 'Computer Science',
    bio: 'Hi everyone, my name is Jackie and I am a Computer Science major interested in the intersection of AI and Software Engineering, especially related to Natural Language Processing. My favorite part about ACM AI is our goal of making AI education more accessible to students. Outside of coding, I enjoy live music and learning langauges.',
    picture: 'https://i.imgur.com/wIlvoSY.png',
    socials: {
      github: 'https://github.com/jackiepiepkorn',
      linkedin: 'https://linkedin.com/in/jackie-piepkorn',
      website: '',
    },
  },
  {
    role: 'Co-Director of Marketing',
    name: 'Aaron Li',
    major: 'Computer Science',
    bio: 'Hello! I am Aaron, a second-year computer science major. I love meeting new people and playing badminton!',
    picture:
      'https://media.licdn.com/dms/image/D5603AQEpfjYgmxHxhg/profile-displayphoto-shrink_800_800/0/1684959634953?e=1700697600&v=beta&t=o8L3eId97yVmkZk1Vx-kONXx-scIxLMWx9YPkshC-zw',
    socials: {
      github: 'https://github.com/aarli421',
      linkedin: 'https://www.linkedin.com/in/aarli421/',
      website: '',
    },
  },
  {
    role: 'Co-Director of Marketing',
    name: 'Weiji Chen',
    major: 'Computer Science',
    bio: "Hello everyone - my name is Weiji. I have too many research interests - but if i had to pick my favorite, it'll like be computer vision/graphics for AR/XR, RL for AV/Robotics, and NLP in Generative AI (as you can see, clearly, I can't really choose a single one). I enjoy reading, writing, and visual storytelling so don't feel the need to only stick to AI topics. Always happy to either grab food or do something together. ",
    picture: 'https://i.imgur.com/Wr2PDuY.jpeg',
    socials: {
      github: 'https://github.com/wei-ji-chen',
      linkedin: 'https://www.linkedin.com/in/wei-ji-chen/',
      website: '',
    },
  },
  {
    role: 'Director of Development',
    name: 'Mohak Vaswani',
    major: 'Computer Science ',
    bio: 'Hey there! I am Mohak, a third-year computer science major in Warren college. I love cooking and meeting new people.',
    picture: 'https://i.imgur.com/LVrK1DY.jpg',
    socials: {
      github: 'https://github.com/Mohakvni',
      linkedin: 'https://www.linkedin.com/in/movaswani',
      website: 'https://mvaswani.com',
    },
  },
];

export const operations: Person[] = [
  {
    role: 'Event Lead',
    name: 'Kevin Chan',
    major: 'Computer Science',
    bio: "Hi, I'm Kevin, a second-year CS major in Warren interested in emerging and innovative technologies. Currently, I research RL/Robotics in Prof. Hao Su's Lab and work on AI/VR software at Qualcomm Institute. In my free time, I enjoy table tennis, Tetris, movies, animes, and hanging out with friends.",
    picture: 'https://i.imgur.com/UghaWk8.jpg',
    socials: {
      github: 'https://github.com/t-sekai',
      linkedin: 'https://www.linkedin.com/in/tsekaichan/',
      website: 'https://tsekai.com',
    },
  },
  {
    role: 'Event Lead',
    name: 'Xander Hinirchsen',
    major: 'Computer Science',
    bio: "I'm Xander, a 3rd-year CS major in Revelle and AI Researcher at USC, advised by Yue Wang. My research currently involves Machine Learning for Robotics, including Computer Vision and Deep Reinforcement Learning.",
    picture: 'https://i.imgur.com/pDqDrg7.jpeg',
    socials: {
      github: 'https://github.com/Xander-Hinrichsen',
      linkedin: '',
      website: 'https://xander-hinrichsen.github.io/',
    },
  },
  {
    role: 'Event Lead',
    name: 'Sonia Fereidooni',
    major: 'Computer Science',
    bio: "Hi, I'm Sonia! I'm a second-year CS Major in Seventh interested in Reinforcement Learning. I'm currently a participant in ERSP and am excited to apply AI to solve problems. In my spare time, I love jamming out to the Hamilton soundtrack, hangingout with friends, and going to the beach!",
    picture:
      'https://cdn.discordapp.com/attachments/288778978506833921/1112519482901004389/MG_0969.JPG',
    socials: {
      github: 'https://github.com/s-fereidooni',
      linkedin: 'https://www.linkedin.com/in/sonia-fereidooni/',
      website: '',
    },
  },
  {
    role: 'Event Lead',
    name: 'Samvrit Srinath',
    major: 'Computer Science',
    bio: "Hi, I'm Samvrit, a second-year CS Major in Warren interested in Computer Vision and Reinforcement Learning. I'm currently a participant in ERSP and do research under Prof. John Hwang in CRI doing NN Modeling for Aircraft Design. In my spare time, I love to spend time going to the beach, hangingout with friends, and cooking!",
    picture: 'https://i.imgur.com/HtxqJv9.jpeg',
    socials: {
      github: 'https://github.com/SamvritSrinath',
      linkedin: 'https://www.linkedin.com/in/samvrit-srinath/',
      website: '',
    },
  },
];

export const dev: Person[] = [
  {
    role: 'Developer',
    name: 'Jenny Lam',
    major: 'Mathematics-Computer Science',
    bio: "Hi, I'm Jenny, a 3rd year math CS major in Sixth. I'm interested in full-stack development, machine learning, and bioinformatics. In my free time, I like drawing, painting, and listening to K-pop.",
    picture: 'https://i.imgur.com/kNxXPlP.jpeg',
    socials: { github: '', linkedin: '', website: '' },
  },
  {
    role: 'Developer',
    name: 'Samantha Prestrelski',
    major: 'Mathematics-Computer Science',
    bio: "Hello! I'm Sam, a Math-CS major interested in software engineering, machine learning, and computer vision. I'm currently doing research in Curt Schuger and Ryan Kastner's lab, Engineers for Exploration. Outside of AI, I like to listen to podcasts and play Tetris.",
    picture: 'https://i.imgur.com/x4L9yt8.png',
    socials: {
      github: 'https://github.com/sprestrelski',
      linkedin: 'https://linkedin.com/in/samanthaprestrelski',
      website: '',
    },
  },
  {
    role: 'Developer',
    name: 'Kevin Shen',
    major: 'Computer Science',
    bio: "Hi everyone! I'm Kevin, a second-year computer science major in Marshall. I enjoy learning about new technologies and building cool applications. Feel free to reach out, I'm always down to grab boba and chat!",
    picture: 'https://i.imgur.com/t9sme5H.jpg',
    socials: {
      github: 'https://github.com/k3shen',
      linkedin: 'https://www.linkedin.com/in/kevinshen66',
      website: '',
    },
  },
  {
    role: 'Developer',
    name: 'William Kim',
    major: 'Cog Sci / ML',
    bio: "Hey, I'm William. I'm a fourth-year Cognitive Science major in ERC. I enjoy my time tackling different programming topics and improving on my frontend skills. Outside of school, I usually wind down by playing piano and ocassionally make digital art. ",
    picture: 'https://i.imgur.com/9Roje5s.jpeg',
    socials: {
      github: 'https://github.com/will-loves-coding82',
      linkedin: 'https://www.linkedin.com/in/william-kim-810684221/',
      website: '',
    },
  },
  {
    role: 'Competition Dev',
    name: 'Eban Covarrubias',
    major: 'Computer Engineering',
    bio: "Hello, I'm Eban, a third-year Computer Engineering major in Warren. I'm interested in Artificial Intelligence and using computer science to solve problems. I love the continuous learning aspect of cs and enjoy the process of delving into new topics.",
    picture: 'https://i.imgur.com/bnNLVE9.jpeg',
    socials: {
      github: 'https://github.com/Eban-Covarrubias',
      linkedin: 'https://www.linkedin.com/in/eban-covarrubias/',
      website: '',
    },
  },
  {
    role: 'Competition Dev',
    name: 'Aaron Liu',
    major: 'Computer Science',
    bio: "Hi, I'm Aaron, a third year CS major in ERC interested in software engineering and machine learning.",
    picture: 'https://i.imgur.com/MN8okzk.jpeg',
    socials: {
      github: 'https://github.com/doublealiu',
      linkedin: '',
      website: '',
    },
  },
  {
    role: 'Competition Dev',
    name: 'Amy Koh',
    major: 'Computer Engineering',
    bio: "Hi, I'm Amy! I'm a third-year CE major in Seventh college. I've done research in computer vision, and I'm currently working in Prof. Rosing and Niema's bioinformatics/computer architecture lab. In my free time I enjoy baking as well as exploring new hobbies and places!",
    picture: 'https://i.imgur.com/YqHEpJx.png',
    socials: {
      github: 'https://github.com/ahkoh29',
      linkedin: '',
      website: '',
    },
  },
];

export const marketing: Person[] = [
  {
    role: 'Graphic Designer',
    name: 'William Kim',
    major: 'Cog Sci / ML',
    bio: "Hey, I'm William. I'm a fourth-year Cognitive Science major in ERC. I enjoy my time tackling different programming topics and improving on my frontend skills. Outside of school, I usually wind down by playing piano and ocassionally make digital art.",
    picture: 'https://i.imgur.com/9Roje5s.jpeg',
    socials: {
      github: 'https://github.com/will-loves-coding82',
      linkedin: 'https://www.linkedin.com/in/william-kim-810684221/',
      website: '',
    },
  },
  {
    role: 'Graphic Designer',
    name: 'Kyla Park',
    major: 'Data Science',
    bio: "Hi, I'm Kyla, a second-year Data Science major in Marshall. I'm interested in bioinformatics and computer vision/image processing. Outside of school, I love fashion, art, and exploring new places.",
    picture:
      'https://cdn.discordapp.com/attachments/288778978506833921/1112981977004515359/7ZXLCge_1.jpeg',
    socials: {
      github: 'https://github.com/kyladawon',
      linkedin: 'https://www.linkedin.com/in/kyla-park-936219260/',
      website: '',
    },
  },
  {
    role: 'Content Writer',
    name: 'Andy Liu',
    major: 'Mathematics-Computer Science',
    bio: "Hi, I'm Andy, a third-year Math-CS  in Sixth. AI is a topic that has interested me for a while now, and is something I hope to explore more with ACM. In my free time, I like gyming, playing video games, and going for walks.",
    picture: 'https://i.imgur.com/YqHEpJx.png',
    socials: {
      github: '',
      linkedin: 'https://www.linkedin.com/in/andy-liu-1091b31ab/',
      website: '',
    },
  },
  {
    role: 'Content Writer',
    name: 'Anchit Kumar',
    major: 'Computer Science',
    bio: "Hey, I'm Anchit and I'm a second-year CS major in Sixth. I'm interested in AI's intersection with creativity and using AI to aid exploration. Outside of CS, I enjoy playing the guitar, running, writing and travelling!",
    picture: 'https://i.imgur.com/yua26Fq.jpg',
    socials: {
      github: 'https://github.com/Anchit-Kumar',
      linkedin: 'https://www.linkedin.com/in/anchitk/',
      website: '',
    },
  },
];

export const socials: Person[] = [
  {
    role: 'Social Lead',
    name: 'Philip Chen',
    major: 'Electrical Computer Engineering',
    bio: "Hello I'm Philip. Currently in my 4th year as an Electrical Engineering major in Warren. I like AI because of it's infinite possibilities and because it's the forefront of the technological frontier. My hobbees are cooking, basketball, and wasting time. ",
    picture: 'https://i.imgur.com/Ja7LMNB.png',
    socials: {
      github: 'https://github.com/PPlip',
      linkedin: 'https://www.linkedin.com/in/philip-chen-hi-ca/',
      website: '',
    },
  },
  {
    role: 'Social Lead',
    name: 'Shreyas Pasumarthi',
    major: 'Mathematics-Computer Science',
    bio: "Hey everyone, I'm Shreyas, a third-year Math-CS major in Muir. I'm interested in how AI and entrepreneurship can solve problems in space exploration, environmental science, and urban planning. Outside of school, I enjoy hiking, snorkeling, and playing the Kalimba",
    picture: 'https://i.imgur.com/YqHEpJx.png',
    socials: {
      github: 'https://github.com/shreyaspasumarthi',
      linkedin: 'https://www.linkedin.com/in/shreyaspasumarthi/',
      website: '',
    },
  },
  {
    role: 'Social Lead',
    name: 'Aniruddha Dasu',
    major: 'Mathematics-Computer Science',
    bio: "Hey, I'm Aniruddha, a second-year Math-CS major in Muir. I'm interested in AI and its utility in solving everyday problems. In my free time, I love playing basketball and the drums.",
    picture: 'https://i.imgur.com/wRf0asq.png',
    socials: {
      github: 'https://github.com/anidasu',
      linkedin: 'https://www.linkedin.com/in/aniruddha-dasu-621822203/',
      website: '',
    },
  },
];
