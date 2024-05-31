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
  {'role': 'President', 'name': 'Jackie Piepkorn', 'major': 'Computer Science', 'bio': 'Hi everyone, my name is Jackie and I am a Computer Science major interested in the intersection of AI and Software Engineering, especially related to Natural Language Processing. My favorite part about ACM AI is our goal of making AI education more accessible to students. Outside of coding, I enjoy live music and learning languages.', 'picture': 'https://i.imgur.com/wIlvoSY.png', 'socials': {'github': 'https://github.com/jackiepiepkorn', 'linkedin': 'https://linkedin.com/in/jackie-piepkorn', 'website': ''}},
  {'role': 'Director of Development', 'name': 'Samantha Prestrelski', 'major': 'Mathematics-Computer Science', 'bio': "Hello! I'm Sam, a Math-CS major interested in software engineering, machine learning, and computer vision. I'm currently doing research in Prof. Curt Schurgers and Ryan Kastner's lab. Outside of AI, I like to listen to podcasts and play Tetris.", 'picture': 'https://sprestrel.ski/assets/sprestrelski.jpg', 'socials': {'github': 'https://github.com/sprestrelski', 'linkedin': 'https://linkedin.com/in/samanthaprestrelski', 'website': 'https://sprestrel.ski'}},
  {'role': 'Director of Events', 'name': 'Kevin Chan', 'major': 'Computer Science', 'bio': "Hi!!! I'm Kevin, a CS major in Warren with a passion for innovative AI applications. I work on various research projects in Prof. Hao Su's lab and the Qualcomm Institute. In my free time, I enjoy table tennis, Tetris, movies, animes, and hanging out with friends. I�d love to get to know you, so feel free to reach out and chat!", 'picture': 'https://i.imgur.com/UghaWk8.jpg', 'socials': {'github': 'https://github.com/t-sekai', 'linkedin': 'https://www.linkedin.com/in/tsekaichan/', 'website': 'https://tsekai.com'}},
  {'role': 'Director of Marketing', 'name': 'Anchit Kumar', 'major': 'Computer Science', 'bio': "Hey, I'm Anchit and I'm a CS major in Sixth. I'm interested in AI's intersection with creativity and using AI to aid exploration, especially Computer Vision. Outside of CS, I enjoy playing the guitar, running, writing and travelling!", 'picture': 'https://i.imgur.com/yua26Fq.jpg', 'socials': {'github': 'https://github.com/Anchit-Kumar', 'linkedin': 'https://www.linkedin.com/in/anchitk/', 'website': ''}},
  {'role': 'Director of Marketing', 'name': 'Kyla Park', 'major': 'Data Science', 'bio': "Hi, I'm Kyla, a Data Science major in Marshall. I'm interested in Natural Language Processing and Deep Neural Network. Outside of school, I love fashion, art, and exploring new food places!", 'picture': 'https://i.imgur.com/Ubc0heo.png', 'socials': {'github': 'https://github.com/kyladawon', 'linkedin': 'https://www.linkedin.com/in/kyla-park-936219260/', 'website': ''}},
];

export const operations: Person[] = [
  {'role': 'Event Lead', 'name': 'Aniruddha Dasu', 'major': 'Mathematics-Computer Science', 'bio': "Hey, I'm Aniruddha, a second-year Math-CS major in Muir. I'm interested in AI and its utility in solving everyday problems. In my free time, I love playing basketball and the drums.", 'picture': 'https://i.imgur.com/wRf0asq.png', 'socials': {'github': 'https://github.com/anidasu', 'linkedin': 'https://www.linkedin.com/in/aniruddha-dasu-621822203/', 'website': ''}},
  {'role': 'Event Lead', 'name': 'Anya Chernova', 'major': 'Computer Science', 'bio': "Hi! I'm Anya, a CS major in Marshall. I am still exploring the areas of CS I am most interested in, but AI is definitely one of them. My hobbies are drawing, snowboarding and swimming. I'm also always excited to try out new things whenever I get a chance.", 'picture': 'https://i.imgur.com/eShnPXE.jpeg', 'socials': {'github': 'https://github.com/Ascher176', 'linkedin': 'https://www.linkedin.com/in/anya-chernova-b69a97260/', 'website': ''}},
  {'role': 'Event Lead', 'name': 'Rebecca Chen', 'major': 'Computer Science', 'bio': "Hi there, I'm Rebecca and I'm a Computer Science Major at Warren College. In my free time, you'd probably see me climbing X Rank in Splatoon 3 or working on autonomous race cars. Can't wait to see yall soon!", 'picture': 'https://i.imgur.com/YqHEpJx.png', 'socials': {'github': 'https://github.com/chenyenru', 'linkedin': 'www.linkedin.com/in/chenyenru/', 'website': ''}},
];

export const dev: Person[] = [
  {'role': 'Competition Dev', 'name': 'Eban Covarrubias', 'major': 'Computer Engineering', 'bio': "Hello, I'm Eban, a third-year Computer Engineering major in Warren. I'm interested in Artificial Intelligence and using computer science to solve problems. I love the continuous learning aspect of cs and enjoy the process of delving into new topics.", 'picture': 'https://i.imgur.com/bnNLVE9.jpeg', 'socials': {'github': 'https://github.com/Eban-Covarrubias', 'linkedin': 'https://www.linkedin.com/in/eban-covarrubias/', 'website': ''}},
  {'role': 'Competition Dev', 'name': 'Samuel Lee', 'major': 'Data Science/Cognitive Science (ML)', 'bio': "Hi, I'm Samuel a second-year data science student with a double major in Cognitive Science (ML/NC). I am interested in the application of AI in real world and have worked on several projects. In my free time, I love to play video games such as League and TFT (also Valorant but I'm so bad at this).", 'picture': 'https://i.imgur.com/8uvv2Hs.jpeg', 'socials': {'github': 'https://github.com/samuellee77', 'linkedin': 'https://www.linkedin.com/in/hsin-yuan-lee-b22653258/', 'website': ''}},
  {'role': 'Competition Dev', 'name': 'Steven Shi', 'major': 'Computer Science', 'bio': "Hello hello, I'm Steven and I'm a CS major in ERC. I'm interested in computer systems, AI in game playing, and computing education. In my free time (and time spent procrastinating work), I enjoy practicing piano, doing dorm decor, playing Geoguessr, and drinking unhealthy amounts of tea.", 'picture': 'https://i.imgur.com/YqHEpJx.png', 'socials': {'github': 'https://github.com/2s2e', 'linkedin': 'https://www.linkedin.com/in/steven-shi-2s2e/', 'website': ''}},
  {'role': 'UI/UX Designer', 'name': 'Brian Pham', 'major': 'Cognitive Science (Design & Interaction)', 'bio': "Hello, I'm Brian and I'm a fourth-year Cognitive Science major (D&I) interested in typography and design solutions that make everyday routines easier. My interests include collecting smiskis and getting fruit teas with 75% sugar and light ice.", 'picture': 'https://i.imgur.com/pRsWvGY.jpeg', 'socials': {'github': 'https://github.com/brianphqm', 'linkedin': 'www.linkedin.com/in/brianpham03', 'website': 'https://brianpham.framer.website/ '}},
  {'role': 'Developer', 'name': 'Angela Tsai', 'major': 'Mathematics-Computer Science', 'bio': "Hello, I'm Angela and I'm a Math-CS student interested in learning more about AI. Outside of classes, I am a sporty person and enjoy running, archery, and fencing!", 'picture': 'https://i.imgur.com/N6gqiLO.jpeg', 'socials': {'github': 'https://github.com/angelatsai1214', 'linkedin': 'https://www.linkedin.com/in/angtsai/', 'website': ''}},
  {'role': 'Developer', 'name': 'Kyle Tran', 'major': 'Computer Science', 'bio': "Hi, I'm Kyle and I am a 5th year Computer Science major and a transfer student at Warren. I'm interested in backend development, computer vision, and machine learning. I currently do research for FishSense under the Engineers for Exploration program. Outside of work, I enjoy cooking, hiking, going to the gym, or doing any activity with friends.", 'picture': 'https://i.imgur.com/YqHEpJx.png', 'socials': {'github': 'https://github.com/Kylehtran', 'linkedin': 'https://www.linkedin.com/in/kylehktran/', 'website': ''}},
  {'role': 'Developer', 'name': 'Scott Semtner', 'major': 'Computer Science', 'bio': "Hi! I'm Scott, a second year Computer Science major in Muir. I'm interested in full-stack development, graphics, embedded systems, and am always excited to learn. I also like to waste my limited free time watching esports.", 'picture': 'https://i.imgur.com/YqHEpJx.png', 'socials': {'github': 'https://github.com/ssemtner', 'linkedin': 'https://www.linkedin.com/in/scott-semtner', 'website': ''}},
  {'role': 'Developer', 'name': 'Victor Hsiao', 'major': 'Mathematics-Computer Science', 'bio': "Hello! I'm Victor, and I'm a third year Math-CS student in Seventh. My main interests are in full stack development and design and I'm interested in diving into the intricacies of AI and ML. In my free time, I like to cook, skateboard, and listen to music!", 'picture': 'https://i.imgur.com/YqHEpJx.png', 'socials': {'github': 'https://github.com/comnk', 'linkedin': 'https://linkedin.com/in/hsiaovictor', 'website': ''}},
];

export const marketing: Person[] = [
  {'role': 'Content Writer', 'name': 'Andy Liu', 'major': 'Mathematics-Computer Science', 'bio': "Hi, I'm Andy, a third-year Math-CS  in Sixth. AI is a topic that has interested me for a while now, and is something I hope to explore more with ACM. In my free time, I like gyming, playing video games, and going for walks.", 'picture': 'https://i.imgur.com/YqHEpJx.png', 'socials': {'github': '', 'linkedin': 'https://www.linkedin.com/in/andy-liu-1091b31ab/', 'website': ''}},
  {'role': 'Digital Marketing', 'name': 'Phoebe Ng', 'major': 'Cognitive Science (Design & Interaction)', 'bio': "Hi, I'm Phoebe, a first year Cognitive Science major in Eighth. I'm interested in design and am hoping to learn more about AI in ACM! In my free time, I like to read and watch Korean dramas.", 'picture': 'https://i.imgur.com/YqHEpJx.png', 'socials': {'github': '', 'linkedin': 'www.linkedin.com/in/phoebe-ng-70641326a', 'website': ''}},
  {'role': 'Graphic Designer', 'name': 'Andrea Blanco', 'major': 'Cognitive Science (Design & Interaction)', 'bio': "Hi! I'm Andrea, a cognitive science (design) in seventh! I love learning about so many things, from AI to design :) I want to go into Game UX after graduating! I love to travel, read, study fashion design, explore, and play video games.", 'picture': 'https://i.imgur.com/C4VPhOc.jpeg', 'socials': {'github': '', 'linkedin': '', 'website': ''}},
  {'role': 'Graphic Designer', 'name': 'Jenny Lam', 'major': 'Mathematics-Computer Science', 'bio': "Hi, I'm Jenny, a math CS major in Sixth interested in AI and full-stack development. In my free time, I like to draw, boulder, and try new boba places.", 'picture': 'https://i.imgur.com/kNxXPlP.jpeg', 'socials': {'github': '', 'linkedin': '', 'website': ''}},
];

export const socials: Person[] = [
  {'role': 'Social Lead', 'name': 'Parinitha Anumula', 'major': 'Cognitive Science (ML)', 'bio': "Hello!! I'm Parinitha, a Cog Sci major in Seventh. I am interested in exploring diverse implementations of AI. In my free time, I enjoy reading webnovels, trying out new boardgames and drinking boba! I'm looking forward to meeting you all! If you have any questions, or just wanna chat, feel free to reach out!", 'picture': 'https://i.imgur.com/YqHEpJx.png', 'socials': {'github': '', 'linkedin': '', 'website': ''}},
];

