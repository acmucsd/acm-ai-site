import React, { useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Col, Row } from 'antd';
import ProjectCard from '../../components/ProjectCard';
import { Tag } from 'antd';

// image imports
import FA21LionHumanCat from './data/FA21/FA21_Lion_HumanCat.jpg'
import FA21BobaCurry from './data/FA21/FA21_Boba_Curry.jpg'
import FA21SoupDumplingClouds from './data/FA21/FA21_SoupDumpling_Clouds.jpg'


function ProjectsPage() {
  const { CheckableTag } = Tag;
  const[selectedTags, setSelectedTags] = useState<string[]>([]);
  const projectData = 
    [
    // SP22
    // FA21
      {
        name: 'Controlling the Latent Space Is All You Need',
        cover: FA21LionHumanCat,
        tags: ['Morph', 'GAN', 'Deep Learning', 'Computer Vision', 'Image Generation', 'Image'],
        description:`How do we turn humans into cats? Well, I'm glad you asked. We, for one, know this to be a pressing question and consequently, our project tackles exactly that. We leveraged Generative Adversarial Networks (a special type of model architecture) or more commonly known as GANs to morph human faces into cats (and also cats into human faces)!`,
        github: 'https://github.com/acmucsd-projects/fa21-lion/tree/ML-setup/ML',
        link: 'https://docs.google.com/presentation/d/1Qw5V6y2J47DGxTdc2UxR9MkXCrHZLaB9hRlJaxFfoso/edit#slide=id.p',
      },
      {
          name: 'Predicting Steph Curry\'s Shots in the NBA',
          cover: FA21BobaCurry,
          tags: ['Boosted Trees', 'Machine Learning', 'Basketball', 'Data Science'],
          description:'This project uses data from https://www.kaggle.com/dansbecker/nba-shot-logs, which contains NBA shot logs from the 2014-15 season, in order to predict whether each shot Stephen Curry takes will go through the hoop based on his distance to the basket, how many shots he previously took that game, the current time on the shot clock, and how long he touched the ball. In order to accomplish this, we built the following models: logistic regression, random forest, boosted decision tree, deep neural network, multilayer perceptron, and lightGBM.',
          github: 'https://github.com/ycyao216/Curry_shot_prediction',
          link: 'https://docs.google.com/presentation/d/1DK8AyNNzo32qf_SuNC0m564sox_m1bZR/edit?usp=sharing&ouid=116504273965682689518&rtpof=true&sd=true',
      },
      {
        name: 'Cloud Image Segmentation',
        cover: FA21SoupDumplingClouds,
        tags: ['Image Processing', 'Image', 'Deep Learning', 'Image Classification', 'Computer Vision'],
        description:`Our team built a Cloud Video Segmentation model that assigns pixel-level labels to each pixel in a live video feed of clouds. The pixel-level labels include “cloud” and “sky”, and we also have an “undefined” class for handling edges of the image input.  We worked with image classification backbones to encode our input image and convolutional neural network segmentation models to decode our image into its segmented representation.`,
        github: 'https://github.com/Sean1572/CloudSeg',
        link: 'https://docs.google.com/presentation/d/1wIQNBxuOFC9mY4biQ4CUo3cKqzcWiXMlkB_hw1EWNXw/edit?usp=sharing',
      },
    // Template + empty
      // {
      //   name: 'Project Name',
      //   cover: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale',
      //   tags: ['Neural Network', 'Machine Learning'],
      //   description:'Our goals are to help build a community of AI enthusiasts at UCSD and connect that community to the broader AI network. We also strive to keep AI fun and accessible to all. We want to help you navigate your path around the complex world of AI through workshops, competitions, networking events and more!',
      //   github: 'https://github.com/yuz101/Task-List',
      //   link: 'https://acmucsd.com/',
      // },
      // {
      //   name: '',
      //   cover: '',
      //   tags: [],
      //   description:'',
      //   github: '',
      //   link: '',
      // },
    ]
  const tagsData : string[] = Array.from(new Set(projectData.map((entry) => entry.tags).flat())).sort()
  const filterProject = (tag: string, checked: boolean) =>{
    setSelectedTags(checked ? [...selectedTags, tag]: selectedTags.filter(t => t !== tag))
    projectData.filter(project => project.tags.includes(tag))
  }
  return (
    <DefaultLayout>
      <div className="Main">
        <div className="hero">
          <h1 id="title">ACM AI Projects</h1>
          <p className="subtext">
            We aspire to inspire the next generation of AI advocates, engineers,
            and scientists.
          </p>
        </div>
        <div>
        <div className="main-section">
            <span style={{ marginRight: 8, fontSize: "2rem" }} >Categories:</span>
            {tagsData.map(tag => (
              <CheckableTag
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={checked => filterProject(tag, checked)}
              >
              <p>{tag}</p>
              </CheckableTag>
            ))}
            <h2 className="statement">Past Projects</h2>
            <div>
              <Row gutter={[24, 24]} justify="center">
                {projectData.filter(project => selectedTags.length == 0 ? project : project.tags.some(v => selectedTags.includes(v))).map((project) => {
                    return (
                      <Col>
                        <ProjectCard project={project} />
                      </Col>
                    );
                })}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default ProjectsPage;
