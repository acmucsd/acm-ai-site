export interface Project {
  readonly quarter?: string;
  readonly name?: string;
  readonly cover?: string;
  readonly tags?: string[];
  readonly description?: string;
  readonly github?: string;
  readonly link?: string;
}

// https://docs.google.com/spreadsheets/d/12pMisDyeI-rG7h-AaGXw5wm0dfax9HMXfAgbR7nPt94/
export const projects: Project[] = [
  {
    quarter: 'SP21',
    name: 'Face to Cartoon',
    cover:
      'https://s.yimg.com/os/creatr-uploaded-images/2020-06/812a6680-b085-11ea-b7fd-7591620edf6b',
    tags: [
      'GAN',
      'Image Generation',
      'Image Processing',
      'Image',
      'Deep Learning',
    ],
    description:
      'We are using GAN architecture to take in human images and "cartoonify" them to create a simpsons version of them. To do this, we utilized Pytorch, TensorFlow, and other Python libraries.',
    github: 'https://github.com/acmucsd-projects/cartoonifier',
    link: '',
  },
  {
    quarter: 'SP21',
    name: 'Modeling Accents with Text-to-Speech',
    cover:
      'https://packardcommunications.com/wp-content/uploads/2019/02/iStock-496650660.jpg',
    tags: ['GAN', 'Deep Learning', 'Natural Language Processing'],
    description:
      'We are blending prosody information of different accented speakers, to generate a text-to-speech model for different accents. We use GANs to mix and generate prosodies, and use Tacotron to synthesize audios.',
    github: '',
    link: 'https://docs.google.com/presentation/d/1_54fH8I1md5-YRebtMJ2rf1dH8BMKgp0Bj0T_iI4tCI/edit?usp=sharing',
  },
  {
    quarter: 'SP21',
    name: 'Facial Emotion Recognition',
    cover:
      'https://www.psychologicalscience.org/redesign/wp-content/uploads/2018/04/PAFF_040918_emotionspectrum2-1024x622.jpg',
    tags: ['Image Processing', 'Image', 'Classification'],
    description:
      'We are working on a model that is able to recognize the emotion from one’s face image. To accomplish this, we use Tensorflow Keras to create this system.',
    github: 'https://github.com/acmucsd-projects/acmai-team3',
    link: '',
  },
  {
    quarter: 'FA21',
    name: 'Controlling the Latent Space Is All You Need',
    cover: 'https://i.imgur.com/DsuiMXu.png',
    tags: ['GAN', 'Deep Learning', 'Computer Vision', 'Image Generation'],
    description:
      "How do we turn humans into cats? Well, I'm glad you asked. We, for one, know this to be a pressing question and consequently, our project tackles exactly that. We leveraged Generative Adversarial Networks (a special type of model architecture) or more commonly known as GANs to morph human faces into cats (and also cats into human faces)!",
    github: 'https://github.com/acmucsd-projects/fa21-lion/tree/ML-setup/ML',
    link: 'https://docs.google.com/presentation/d/1Qw5V6y2J47DGxTdc2UxR9MkXCrHZLaB9hRlJaxFfoso/edit#slide=id.p',
  },
  {
    quarter: 'FA21',
    name: "Predicting Steph Curry's Shots in the NBA",
    cover:
      'https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2021-08/stephencurry-cropped_10flibuo4oylm1auxz5yobh7u0.jpg?itok=rd0nrd9I',
    tags: ['Boosted Trees', 'Basketball', 'Data Science', 'Machine Learning'],
    description:
      'This project uses data from https://www.kaggle.com/dansbecker/nba-shot-logs, which contains NBA shot logs from the 2014-15 season, in order to predict whether each shot Stephen Curry takes will go through the hoop based on his distance to the basket, how many shots he previously took that game, the current time on the shot clock, and how long he touched the ball. In order to accomplish this, we built the following models: logistic regression, random forest, boosted decision tree, deep neural network, multilayer perceptron, and lightGBM.',
    github: 'https://github.com/ycyao216/Curry_shot_prediction',
    link: 'https://docs.google.com/presentation/d/1DK8AyNNzo32qf_SuNC0m564sox_m1bZR/edit?usp=sharing&ouid=116504273965682689518&rtpof=true&sd=true',
  },
  {
    quarter: 'FA21',
    name: 'Supervised Learning: Hand-Gesture Recognition',
    cover: 'https://miro.medium.com/max/1400/1*kuqOPIyFNy9P-lLR3JiuMQ.png',
    tags: ['Image Processing', 'Image', 'Deep Learning', 'Computer Vision'],
    description:
      'Our team uses a convolutional neural network framework to create an image processing model that recognizes hand gestures as American Sign Language letters.',
    github: 'https://github.com/jekthewarrior/team-tums',
    link: 'https://docs.google.com/presentation/d/1_Mir5unNavcaNUQYDks0m8f6RzQI22vWBYnZY2qBoi0/edit?usp=sharing',
  },
  {
    quarter: 'FA21',
    name: 'Bird "Brain": A Neural NEST-work',
    cover:
      'https://abcbirds.org/wp-content/uploads/2021/07/Blue-Jay-on-redbud-tree-by-Tom-Reichner_news.png',
    tags: [
      'Image Processing',
      'Deep Learning',
      'Image Classification',
      'Computer Vision',
    ],
    description:
      'Our team has built a convolutional neural network that has trained on a dataset containing 325 different species of birds and can classify them into the correct species they are a part of.',
    github: 'https://github.com/yahmad3495/AI-Assisted-Bird-Classification',
    link: 'https://docs.google.com/presentation/d/1GuyMpzuYeYe4LzmRiWOWcPN_PLAKh3_VB3orFqn3pJ4/edit#slide=id.p',
  },
  {
    quarter: 'FA21',
    name: 'Cloud Image Segmentation',
    cover:
      'https://compote.slate.com/images/caba21b7-4b5b-41c0-8b8d-2aa4b16d4414.jpg',
    tags: [
      'Image Processing',
      'Deep Learning',
      'Image Classification',
      'Computer Vision',
    ],
    description:
      'Our team built a Cloud Video Segmentation model that assigns pixel-level labels to each pixel in a live video feed of clouds. The pixel-level labels include “cloud” and “sky”, and we also have an “undefined” class for handling edges of the image input.  We worked with image classification backbones to encode our input image and convolutional neural network segmentation models to decode our image into its segmented representation.',
    github: 'https://github.com/Sean1572/CloudSeg',
    link: 'https://docs.google.com/presentation/d/1wIQNBxuOFC9mY4biQ4CUo3cKqzcWiXMlkB_hw1EWNXw/edit?usp=sharing',
  },
  {
    quarter: 'WI22',
    name: 'KachowRL - Reinforcement Learning for Car Racing',
    cover:
      'https://camo.githubusercontent.com/b2d59376383f241e7695e8fcba13fb096db80d805d808da46c8255ea2c5da588/68747470733a2f2f6d2e6d656469612d616d617a6f6e2e636f6d2f696d616765732f492f3631583654546f4534664c2e5f41435f53583637395f2e6a7067',
    tags: ['Reinforcement Learning'],
    description:
      'This project was built with the aim of using various model-free reinforcement learning algorithms to train a car how to drive around a race track.',
    github: 'https://github.com/acmucsd-projects/KachowRL',
    link: '',
  },
  {
    quarter: 'WI22',
    name: 'RL Flappy Bird',
    cover: 'https://i.imgur.com/caq3tN0.png',
    tags: ['Reinforcement Learning'],
    description:
      'Create a custom OpenAI gym environment for flappy bird and train a stable-baselines3 PPO model to play',
    github: 'https://github.com/acmucsd-projects/wi22-cheeze',
    link: '',
  },
  {
    quarter: 'SP22',
    name: 'Image Segmentation',
    cover: 'https://i.imgur.com/UXcbQ1g.png',
    tags: [
      'Image Processing',
      'Deep Learning',
      'Image Segmentation',
      'Computer Vision',
    ],
    description:
      'Our team worked on learning CNNs, the ML pipeline, image preprocessing, and deep learning-based methods for image segmentation.',
    github: 'https://github.com/acmucsd-projects/sp22-team-1',
    link: 'https://docs.google.com/presentation/d/1ltp6bc2_eixqWSthCtzr168MWgLCCfnellDf6_xAOfU/edit',
  },
  {
    quarter: 'SP22',
    name: 'Stellar Summarizers',
    cover: 'https://i.imgur.com/GFI817j.png',
    tags: ['Image Processing', 'Deep Learning', 'Computer Vision'],
    description: 'Video summarization tool using LSTM and ResNeXt',
    github: 'https://github.com/acmucsd-projects/the-stellar-summarizers-sp22',
    link: '',
  },
  {
    quarter: 'FA22',
    name: 'Bert Political Sentiment Analysis',
    cover: 'https://i.imgur.com/6HTeA6P.png',
    tags: [
      'Natural Language Processing',
      'Sentiment Analysis',
      'Classification',
    ],
    description:
      'Our team worked on building an RNN for a NLP based project. The goal of this project was to take in a sentence and classify it as either politically liberal or conservative. The model was trained on Reddit datasets',
    github:
      'https://huggingface.co/spaces/joonkim/bert-political-sentiment-analysis/tree/main',
    link: 'https://docs.google.com/presentation/d/1s7W3E9Wv5RXAzmgQYjCN166xycIJuxyFnCbs_IpVBlw/edit?usp=sharing',
  },
  {
    quarter: 'FA22',
    name: 'Supreme Court Predictor',
    cover: 'https://i.imgur.com/0oOb2ns.png',
    tags: [
      'Natural Language Processing',
      'Sentiment Analysis',
      'Classification',
    ],
    description:
      'The legitimacy of the Supreme Court and uproar over Roe v. Wade towards the later half of 2022 has been debated heavily. Given the uses of AI, can we use machine learning to predict the outcomes of Supreme Court cases?',
    github: 'https://github.com/acmucsd-projects/fa22-ai-team-1',
    link: 'https://docs.google.com/presentation/d/1qANpLZvhv5F0lOkbUxtlJU5UF4KqsDzuy0Dy6E2BG-0/edit#slide=id.g1d8164625b3_0_41',
  },
  {
    quarter: 'FA22',
    name: 'Dive Into Credit Card Fraud',
    cover: 'https://i.imgur.com/lnsnCID.png',
    tags: [
      'Natural Language Processing',
      'Sentiment Analysis',
      'Classification',
    ],
    description:
      'Can we use machine learning to predict if a credit card transaction is fradulent? Our app is divided into two sections: the first with a form taking user inputs that predicts the likelihood of credit card fraud using our model, and the second section containing the results of our EDA analysis and the various graphs we made for it.',
    github: 'https://github.com/acmucsd-projects/fa22-ai-team-3',
    link: 'https://chuongnguyen26-fa22-ai-team-3-app-rt9hxr.streamlit.app/',
  },
  {
    quarter: 'WI23',
    name: 'Toxic Comment Classification',
    cover:
      'https://media.istockphoto.com/id/1278019531/vector/victim-of-cyber-bullying.jpg?s=612x612&w=0&k=20&c=DyMvMsOGJJ-Q54LFpGsiH86Yaabfu43LuvCv_vKVHj0=',
    tags: [
      'Natural Language Processing',
      'Sentiment Analysis',
      'Classification',
    ],
    description:
      'Online platforms offer us unprecedented opportunities to communicate and share knowledge. However, harmful comments can create a hostile environment that leads to cyberbullying and discrimination. To address this issue, our team developed a machine learning model that can classify harmful online comments and alert moderators to take action. By automating this process, we aim to create a safer and more inclusive online community for everyone.',
    github: 'https://github.com/acmucsd-projects/wi23-ai-team-1',
    link: 'https://www.kaggle.com/competitions/jigsaw-toxic-comment-classification-challenge',
  },
  {
    quarter: 'SP23',
    name: 'MBTI Classification from Tweets',
    cover:
      'https://raw.githubusercontent.com/acmucsd-projects/sp23-ai-team-1/main/src/img/MBTI_Predictor.png',
    tags: [
      'Natural Language Processing',
      'Sentiment Analysis',
      'Classification',
    ],
    description:
      'MBTI, or Myers-Briggs Type Indicator, is a way to classify different personality types based on four categories: introversion(I)/extraversion(E), sensing(S)/intuition(N), thinking(T)/feeling(F), and judging(J)/perceiving(P).  Due to the the long and tedious process that it takes to finish the test, we decided to create a model that can predict a person’s MBTI based on their tweets. This process takes just a fraction of the time as compared to the original MBTI test, allowing users to figure out their personality more efficiently.',
    github: 'https://github.com/acmucsd-projects/sp23-ai-team-1',
    link: '',
  },
];
