import React, { useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Col, Layout, Row, Tag } from 'antd';
import ProjectCard from '../../components/ProjectCard';
import { projects } from './projects'
const { Content } = Layout;

function ProjectsPage() {
  const { CheckableTag } = Tag;
  const[selectedTags, setSelectedTags] = useState<string[]>([]);
  const tagsData : string[] = Array.from(
    new Set(
      projects
      .map((entry) => entry.tags || [])
      .flat()
      .filter((tag) => typeof tag === 'string')
    )
  ).sort()

  const filterProject = (tag: string, checked: boolean) =>{
    setSelectedTags(checked ? [...selectedTags, tag]: selectedTags.filter(t => t !== tag))
    projects.filter(p => p.tags && p.tags.includes(tag))
  }

  return (
    <DefaultLayout>
      <div className="ProjectsPage">
        <Content className="projectsHero">
          <div className="headerContent">
            <h1>ACM AI Projects</h1>
            <h4>
              Interested in getting hands-on experience with AI? Join our quarterly ACM AI project teams.
            </h4>
          </div>
        </Content>


        <Content className="projectsSection">
          <h3>Categories:</h3>
            {tagsData.map(tag => (
              <CheckableTag
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={checked => {
                  filterProject(tag, checked)
              }}
              >
              <p>{tag}</p>
              </CheckableTag>
            ))}
          <div className="projectsCards">
            <Row gutter={[24, 24]} justify="center">
              {/* {
                projects.map((card : Project) => (
                  <Col>
                    <ProjectCard project={card} key={card.name}/>
                  </Col>
                ))
              } */}
              {projects.filter((card) => 
                selectedTags.length === 0 ? true : card.tags && card.tags.some(v => selectedTags.includes(v))).map((card) => {
                  return (
                    <Col>
                      <ProjectCard project={card} key={card.name} />
                    </Col>
                  );
              })}
            </Row>
          </div>

        </Content>
      </div>
    </DefaultLayout>
  );
}

export default ProjectsPage;
