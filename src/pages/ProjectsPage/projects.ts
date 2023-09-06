export interface Project {
    readonly quarter?: string;
    readonly name?: string;
    readonly cover?: string;
    readonly tags?: string[];
    readonly description?: string; 
    readonly github?: string;
    readonly link?: string;
}

export const projects: Project[] = [
    {
        quarter: 'FA21',
        name: 'Controlling the Latent Space Is All You Need',
        cover: 'https://i.imgur.com/DsuiMXu.png',
        tags: ['Morph', 'GAN', 'Deep Learning', 'Computer Vision', 'Image Generation', 'Image'],
        description:`How do we turn humans into cats? Well, I'm glad you asked. We, for one, know this to be a pressing question and consequently, our project tackles exactly that. We leveraged Generative Adversarial Networks (a special type of model architecture) or more commonly known as GANs to morph human faces into cats (and also cats into human faces)!`,
        github: 'https://github.com/acmucsd-projects/fa21-lion/tree/ML-setup/ML',
        link: 'https://docs.google.com/presentation/d/1Qw5V6y2J47DGxTdc2UxR9MkXCrHZLaB9hRlJaxFfoso/edit#slide=id.p',
    },
    {
        quarter: 'FA21',
        name: 'Predicting Steph Curry\'s Shots in the NBA',
        cover: 'https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2021-08/stephencurry-cropped_10flibuo4oylm1auxz5yobh7u0.jpg',
        tags: ['Boosted Trees', 'Machine Learning', 'Basketball', 'Data Science'],
        description:'This project uses data from https://www.kaggle.com/dansbecker/nba-shot-logs, which contains NBA shot logs from the 2014-15 season, in order to predict whether each shot Stephen Curry takes will go through the hoop based on his distance to the basket, how many shots he previously took that game, the current time on the shot clock, and how long he touched the ball. In order to accomplish this, we built the following models: logistic regression, random forest, boosted decision tree, deep neural network, multilayer perceptron, and lightGBM.',
        github: 'https://github.com/ycyao216/Curry_shot_prediction',
        link: 'https://docs.google.com/presentation/d/1DK8AyNNzo32qf_SuNC0m564sox_m1bZR/edit?usp=sharing&ouid=116504273965682689518&rtpof=true&sd=true',
    },
    {
        quarter: 'FA21',
        name: 'Cloud Image Segmentation',
        cover: 'https://compote.slate.com/images/caba21b7-4b5b-41c0-8b8d-2aa4b16d4414.jpg',
        tags: ['Image Processing', 'Image', 'Deep Learning', 'Image Classification', 'Computer Vision'],
        description:`Our team built a Cloud Video Segmentation model that assigns pixel-level labels to each pixel in a live video feed of clouds. The pixel-level labels include “cloud” and “sky”, and we also have an “undefined” class for handling edges of the image input.  We worked with image classification backbones to encode our input image and convolutional neural network segmentation models to decode our image into its segmented representation.`,
        github: 'https://github.com/Sean1572/CloudSeg',
        link: 'https://docs.google.com/presentation/d/1wIQNBxuOFC9mY4biQ4CUo3cKqzcWiXMlkB_hw1EWNXw/edit?usp=sharing',
    },
]