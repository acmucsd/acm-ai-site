import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Link } from 'react-router-dom';
import DiscordLink from '../../components/DiscordLink';
import { GithubOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd';
import ProjectCard from '../../components/ProjectCard';
import { PastProjects } from '../../actions/projects';
import { Tag} from 'antd';
import curry from './data/curry.jpg';
function ProjectsPage() {
  const { CheckableTag } = Tag;
  const tagsData = ['Machine Learning', 'Deep Learning', 'Boosted Trees', 'Natural Language Processing'];
  const[selectedTags, setSelectedTags] = useState<string[]>([]);
  const projectData = 
    [
        {
            name: 'Predicting Steph Curry\'s Shots in the NBA',
            cover: curry,
            tags: ['Boosted Trees', 'Machine Learning', 'Basketball', 'Deep Learning'],
            description:'This project uses data from https://www.kaggle.com/dansbecker/nba-shot-logs, which contains NBA shot logs from the 2014-15 season, in order to predict whether each shot Stephen Curry takes will go through the hoop based on his distance to the basket, how many shots he previously took that game, the current time on the shot clock, and how long he touched the ball. In order to accomplish this, we built the following models: logistic regression, random forest, boosted decision tree, deep neural network, multilayer perceptron, and lightGBM.',
            github: 'https://github.com/ycyao216/Curry_shot_prediction',
            link: 'https://docs.google.com/presentation/d/1DK8AyNNzo32qf_SuNC0m564sox_m1bZR/edit?usp=sharing&ouid=116504273965682689518&rtpof=true&sd=true',
        },
        // {
        //   name: 'Project Name',
        //   cover: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale',
        //   tags: ['Neural Network', 'Machine Learning'],
        //   description:'Our goals are to help build a community of AI enthusiasts at UCSD and connect that community to the broader AI network. We also strive to keep AI fun and accessible to all. We want to help you navigate your path around the complex world of AI through workshops, competitions, networking events and more!',
        //   github: 'https://github.com/yuz101/Task-List',
        //   link: 'https://acmucsd.com/',
        // },
        // {
        //   name: 'Project Name',
        //   cover: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale',
        //   tags: ['Robotics','Natural Language Processing'],
        //   description:'Our goals are to help build a community of AI enthusiasts at UCSD and connect that community to the broader AI network. We also strive to keep AI fun and accessible to all. We want to help you navigate your path around the complex world of AI through workshops, competitions, networking events and more!',
        //   github: 'https://github.com/yuz101/Task-List',
        //   link: 'https://acmucsd.com/',
        // },
        // {
        //   name: 'Project Name',
        //   cover: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale',
        //   tags: [],
        //   description:'Our goals are to help build a community of AI enthusiasts at UCSD and connect that community to the broader AI network. We also strive to keep AI fun and accessible to all. We want to help you navigate your path around the complex world of AI through workshops, competitions, networking events and more!',
        //   github: 'https://github.com/yuz101/Task-List',
        //   link: 'https://acmucsd.com/',
        // },
        // {
        //   name: 'Project Name',
        //   cover: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale',
        //   tags: [],
        //   description:'Our goals are to help build a community of AI enthusiasts at UCSD and connect that community to the broader AI network. We also strive to keep AI fun and accessible to all. We want to help you navigate your path around the complex world of AI through workshops, competitions, networking events and more!',
        //   github: 'https://github.com/yuz101/Task-List',
        //   link: 'https://acmucsd.com/',
        // },
        // {
        //   name: 'Project Name',
        //   cover: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale',
        //   tags: [],
        //   description:'Our goals are to help build a community of AI enthusiasts at UCSD and connect that community to the broader AI network. We also strive to keep AI fun and accessible to all. We want to help you navigate your path around the complex world of AI through workshops, competitions, networking events and more!',
        //   github: 'https://github.com/yuz101/Task-List',
        //   link: 'https://acmucsd.com/',
        // },
    ]
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
          {/* <div className="main-section">
            <h2 className="statement">Project Highlights</h2>
            <div className="project-section">
                <div>
                    <img className="project-image" src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale" width="300" height="300"></img>
                </div>
                <div className="project-info">
                      <h3 className="project-title">Project Name <GithubOutlined style={{ fontSize: '28px'}} /></h3>
                    <p>
                    Our goals are to help build a community of AI enthusiasts at UCSD
                    and connect that community to the broader AI network. We also
                    strive to keep AI fun and accessible to all. We want to help you
                    navigate your path around the complex world of AI through
                    workshops, competitions, networking events and more!
                    </p>
                  </div>
              </div>
          </div>
            <div className="main-section">
            <h2 className="statement">Project Highlights</h2>
            <div className="project-section">
                <div>
                    <img className="project-image" src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale" width="300" height="300"></img>
                </div>
                <div className="project-info">
                      <h3 className="project-title">Project Name <GithubOutlined style={{ fontSize: '28px'}} /></h3>
                    <p>
                    Our goals are to help build a community of AI enthusiasts at UCSD
                    and connect that community to the broader AI network. We also
                    strive to keep AI fun and accessible to all. We want to help you
                    navigate your path around the complex world of AI through
                    workshops, competitions, networking events and more!
                    </p>
                  </div>
              </div>
          </div>
        <div className="main-section">
            <div className="project-section">
                <div className="project-info">
                      <h3 className="project-title">Project Name <GithubOutlined style={{ fontSize: '28px'}} /></h3>
                    <p>
                    Our goals are to help build a community of AI enthusiasts at UCSD
                    and connect that community to the broader AI network. We also
                    strive to keep AI fun and accessible to all. We want to help you
                    navigate your path around the complex world of AI through
                    workshops, competitions, networking events and more!
                    </p>
                </div>
                <div>
                    <img className="project-image" src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale" width="300" height="300"></img>
                </div>
            </div>
        </div>
        <div className="main-section">
            <div className="project-section">
                <div>
                    <img className="project-image" src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale" width="300" height="300"></img>
                </div>
                <div className="project-info">
                      <h3 className="project-title">Project Name <GithubOutlined style={{ fontSize: '28px'}} /></h3>
                    <p>
                    Our goals are to help build a community of AI enthusiasts at UCSD
                    and connect that community to the broader AI network. We also
                    strive to keep AI fun and accessible to all. We want to help you
                    navigate your path around the complex world of AI through
                    workshops, competitions, networking events and more!
                    </p>
                </div>
            </div>
        </div> */}
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
