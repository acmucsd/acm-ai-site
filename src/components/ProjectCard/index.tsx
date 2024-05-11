import React, { useState } from 'react';
import { Project } from '../../pages/ProjectsPage/projects';
import { GithubOutlined, LinkOutlined } from '@ant-design/icons';
import { AiFillCalendar } from 'react-icons/ai';
import { Card } from '../Card';
import { Tag, Modal, Row, Col } from 'antd';
import './index.less';


/**
 * Finds ASCII sum of a tag which is later used to color encode the tag
 * @param {string} str represents a semantic tag or label for a project
 * @returns int 
 */
var ASCIISum = (str: string) => {
  let sum = 0;
  for (let i = 0; i < str.length; ++i) {
    sum += str.charCodeAt(i);
  }
  return sum;
};


/**
 * Modular component that displays ACM AI project information. This is used in the 
 * projects page.
 * 
 * @param {Project} project  
 */
const ProjectCard = ({ project }: { project: Project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const color_tag: string[] = ['red', 'blue', 'gold', 'purple', 'green'];

  const showModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        className="ProjectCard"
        hoverable={true}
        onClick={() => {
          showModal();
        }}
        type="inner"
        title={
          <div className="projectCardHeader">
            <AiFillCalendar size={20} />
            <p className="projectQuarter">{project.quarter}</p>
          </div>
        }
      >
        <Row className="projectCardInfo">
          <Col>
            <img
              src={project.cover}
              alt={project.name}
              style={{
                objectFit: 'cover',
                boxShadow: '0px 3px 5px 1px rgba(189, 189, 189, 0.5)',
                borderRadius: '16px',
                height: '60px',
                width: '60px',
              }}
            />
            <h4 className="title">{project.name}</h4>
            <div className="tags">
              {project.tags!.sort().map((tag) => {
                return (
                  <Tag
                    bordered={false}
                    key={tag}
                    color={color_tag[ASCIISum(tag) % color_tag.length]}
                    style={{ borderRadius: '10px' }}
                  >
                    {tag}
                  </Tag>
                );
              })}
            </div>
          </Col>
        </Row>

        <div className="descriptionBox">
          <p>{project.description}</p>
        </div>

        <div className="iconsBox"></div>
      </Card>

      {/* Modal to display full project description and links to project repo */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        title={<h3 className="title">{project.name}</h3>}
        footer={[
          project.github ? (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <GithubOutlined style={{ fontSize: '30px', color: 'black' }} />
            </a>
          ) : null,
          project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <LinkOutlined style={{ fontSize: '30px', color: 'black' }} />
            </a>
          ) : null,
        ]}
      >
        <div className="projectModalDescriptionBox">
          <p className="description">{project.description}</p>
        </div>
      </Modal>
    </>
  );
};

/**
 * Formats a date to be readable.
 * @param {string} time The time in unformatted form.
 * @return {string} The formatted time in a readable format
 */
export const formatDate = (time: string): string => {
  const parsedTime = Date.parse(time);
  const parsedDate = new Date(parsedTime);
  return parsedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
};
export const formatTime = (time: string | number | Date): string => {
  const parsedTime = new Date(time);
  return parsedTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const isURL = (str: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );

  return !!pattern.test(str);
};
export default ProjectCard;
