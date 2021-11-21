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

function ProjectsPage() {
  const { CheckableTag } = Tag;
  const tagsData = ['Experts Systems', 'Robotics', 'Machine Learning', 'Neural Network', 'Fuzzy Logic', 'Natural Language Processing'];
  const[selectedTags, setSelectedTags] = useState<string[]>([]);
  const projectData = 
    [
        {
            name: 'Project Name',
            cover: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale',
            tags: ['Robotics', 'Machine Learning', 'Fuzzy Logic'],
            description:'Our goals are to help build a community of AI enthusiasts at UCSD and connect that community to the broader AI network. We also strive to keep AI fun and accessible to all. We want to help you navigate your path around the complex world of AI through workshops, competitions, networking events and more!',
            github: 'https://github.com/yuz101/Task-List',
            link: 'https://acmucsd.com/',
        },
        {
          name: 'Project Name',
          cover: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale',
          tags: ['Neural Network', 'Machine Learning'],
          description:'Our goals are to help build a community of AI enthusiasts at UCSD and connect that community to the broader AI network. We also strive to keep AI fun and accessible to all. We want to help you navigate your path around the complex world of AI through workshops, competitions, networking events and more!',
          github: 'https://github.com/yuz101/Task-List',
          link: 'https://acmucsd.com/',
        },
        {
          name: 'Project Name',
          cover: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale',
          tags: ['Robotics','Natural Language Processing'],
          description:'Our goals are to help build a community of AI enthusiasts at UCSD and connect that community to the broader AI network. We also strive to keep AI fun and accessible to all. We want to help you navigate your path around the complex world of AI through workshops, competitions, networking events and more!',
          github: 'https://github.com/yuz101/Task-List',
          link: 'https://acmucsd.com/',
        },
        {
          name: 'Project Name',
          cover: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale',
          tags: [],
          description:'Our goals are to help build a community of AI enthusiasts at UCSD and connect that community to the broader AI network. We also strive to keep AI fun and accessible to all. We want to help you navigate your path around the complex world of AI through workshops, competitions, networking events and more!',
          github: 'https://github.com/yuz101/Task-List',
          link: 'https://acmucsd.com/',
        },
        {
          name: 'Project Name',
          cover: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale',
          tags: [],
          description:'Our goals are to help build a community of AI enthusiasts at UCSD and connect that community to the broader AI network. We also strive to keep AI fun and accessible to all. We want to help you navigate your path around the complex world of AI through workshops, competitions, networking events and more!',
          github: 'https://github.com/yuz101/Task-List',
          link: 'https://acmucsd.com/',
        },
        {
          name: 'Project Name',
          cover: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5efcc8f4cdc22100069576cc%2FArtificial-Intelligence-concept%2F960x0.jpg%3Ffit%3Dscale',
          tags: [],
          description:'Our goals are to help build a community of AI enthusiasts at UCSD and connect that community to the broader AI network. We also strive to keep AI fun and accessible to all. We want to help you navigate your path around the complex world of AI through workshops, competitions, networking events and more!',
          github: 'https://github.com/yuz101/Task-List',
          link: 'https://acmucsd.com/',
        },
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
        </div>
        <div className="main-section">
            <span style={{ marginRight: 8 }}>Categories:</span>
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
