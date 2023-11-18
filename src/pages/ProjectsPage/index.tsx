import React, { useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Row, Col, Layout, Select } from 'antd';
import ProjectCard from '../../components/ProjectCard';
import { projects } from './projects';
import MainFooter from '../../components/MainFooter';
const { Content } = Layout;
const { Option } = Select;

function ProjectsPage() {
  // filter projects by tag
  const color_tag: string[] = [
    'magenta',
    'cyan',
    'gold',
    'blue',
    'purple',
    'green',
  ];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const handleTagChange = (selectedTagValues: string[]) => {
    setSelectedTags(selectedTagValues);
  };

  const tagsData: string[] = Array.from(
    new Set(
      projects
        .map((entry) => entry.tags || [])
        .flat()
        .filter((tag) => typeof tag === 'string')
    )
  ).sort();

  // sort projects
  const [sortOption, setSortOption] = useState('Oldest');
  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const sortProjects = (option: string) => {
    let sortedProjects = [...projects];
    switch (option) {
      case 'az':
        sortedProjects.sort((a, b) => {
          if (a.name && b.name) return a.name.localeCompare(b.name);
          return 0;
        });
        break;
      case 'za':
        sortedProjects.sort((a, b) => {
          if (a.name && b.name) return b.name.localeCompare(a.name);
          return 0;
        });
        break;
      case 'oldest':
        break;
      case 'newest':
      default:
        sortedProjects.reverse();
        break;
    }
    return sortedProjects;
  };

  const sortedProjects = sortProjects(sortOption);

  // const items = [
  //   {
  //     key: "1",
  //     label:
  //       <Select
  //         className="selectTags"
  //         mode="multiple"
  //         placeholder="Search tags..."
  //         onChange={handleTagChange}
  //         value={selectedTags}
  //       >
  //         {tagsData.map((tag) => {
  //           return (
  //             <Tag key={tag} color={color_tag[ASCIISum(tag) % color_tag.length]}>{tag}</Tag>
  //           );
  //         })}
  //       </Select>
  //   },
  //   {
  //     key: "2",
  //     label:

  //       <Select
  //         defaultValue="newest"
  //         style={{ width: 150 }}
  //         onChange={handleSortChange}
  //       >
  //         <Option value="newest">Newest</Option>
  //         <Option value="oldest">Oldest</Option>
  //         <Option value="az">A-Z</Option>
  //         <Option value="za">Z-A</Option>
  //       </Select>
  //   }
  // ]

  return (
    <DefaultLayout>
      <Content className="ProjectsPage">
        <Content>
          <div className="projectsHeader">
            <h1 className="title2">ACM AI Projects</h1>
            <h4>
              Interested in getting hands-on experience with AI? Join our
              quarterly ACM AI project teams.
            </h4>

            <Select
              size="large"
              className="sortDropDown"
              style={{ width: '180px' }}
              defaultValue="newest"
              onChange={handleSortChange}
            >
              <Option className="sortOption" value="newest">
                Newest
              </Option>
              <Option className="sortOption" value="oldest">
                Oldest
              </Option>
              <Option className="sortOption" value="az">
                A-Z
              </Option>
              <Option className="sortOption" value="za">
                Z-A
              </Option>
            </Select>
          </div>
        </Content>

        <Content className="projectsSection">
          <div className="projectsFilters">
            {/* <Select
              className="selectTags"
              mode="multiple"
              placeholder="Search tags..."
              onChange={handleTagChange}
              value={selectedTags}
            >
              {tagsData.map((tag) => {
                return (
                  <Tag key={tag} color={color_tag[ASCIISum(tag) % color_tag.length]}>{tag}</Tag>
                );
              })}
            </Select> */}
          </div>

          <Content className="projectsCards">
            <Row
              gutter={[
                { xs: 16, sm: 16, md: 24, lg: 24 },
                { xs: 16, sm: 16, md: 24, lg: 24 },
              ]}
              justify="center"
            >
              {sortedProjects.length > 0 && sortedProjects.length === 1 ? (
                <ProjectCard
                  key={sortedProjects[0].name}
                  project={sortedProjects[0]}
                />
              ) : (
                sortedProjects
                  .filter((card) =>
                    selectedTags.length === 0
                      ? true
                      : card.tags &&
                        card.tags.some((v) => selectedTags.includes(v))
                  )
                  .map((card) => {
                    return (
                      <Col xs={24} sm={12} xl={12} xxl={12}>
                        <ProjectCard key={card.name} project={card} />
                      </Col>
                    );
                  })
              )}
            </Row>
          </Content>
        </Content>

        <MainFooter />
      </Content>
    </DefaultLayout>
  );
}

export default ProjectsPage;
