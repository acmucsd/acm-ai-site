import React, { useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Col, Layout, Row, Tag } from 'antd';
import ProjectCard from '../../components/ProjectCard';
import {
  projects,
  Project
} from './projects'
const { Content, Footer } = Layout;

function ProjectsPage() {
  const { CheckableTag } = Tag;
  const[selectedTags, setSelectedTags] = useState<string[]>([]);
  // const tagsData : string[] = Array.from(new Set(projectData.map((entry) => entry.tags).flat())).sort()
  // const filterProject = (tag: string, checked: boolean) =>{
  //   setSelectedTags(checked ? [...selectedTags, tag]: selectedTags.filter(t => t !== tag))
  //   projectData.filter(project => project.tags.includes(tag))
  // }

  return (
    <DefaultLayout>
      <div className="ProjectsPage">
        <Content className="projectsHero">
          <h1 id="title">ACM AI Projects</h1>
          <h4>
            Interested in getting hands-on experience with AI? Join our quarterly ACM AI project teams.
          </h4>
        </Content>


        <Content className="projectsSection">
          <div className="projectsCards">
            <Row gutter={[24, 24]} justify="center">
              {
                projects.map((card : Project) => (
                  <ProjectCard project={card} key={card.name}/>
                ))
              }
              {/* {projectData.filter(project => selectedTags.length === 0 ? project : project.tags.some(v => selectedTags.includes(v))).map((project) => {
                  return (
                    <Col>
                      <ProjectCard project={project} />
                    </Col>
                  );
              })} */}
            </Row>
          </div>

          {/* <span style={{ marginRight: 8, fontSize: "2rem" }} >Categories:</span>
            {tagsData.map(tag => (
              <CheckableTag
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={checked => filterProject(tag, checked)}
              >
              <p>{tag}</p>
              </CheckableTag>
            ))} */}
        </Content>
      </div>
    </DefaultLayout>
  );
}

export default ProjectsPage;
