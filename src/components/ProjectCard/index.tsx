import React, { useState } from 'react';
import { Project } from '../../pages/ProjectsPage/projects'
import { GithubOutlined, LinkOutlined} from '@ant-design/icons';
import { Card } from '../Card';
import { Tag, Modal} from 'antd';
import './index.less';

var ASCIISum = (str : string) => {
  let sum = 0;
  for (let i = 0; i < str.length; ++i) {
    sum += str.charCodeAt(i)
  }
  return sum
}

const ProjectCard = ({ project }: {project: Project}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const color_tag : string[] = ['magenta', 'cyan', 'gold', 'blue', 'purple', 'green']
  
  // Modal props
  const showModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (<>
    <div className="ProjectCard" onClick={showModal}>
      <Card
        hoverable={true}
        cover={
          <img
            src={project.cover} alt="Project cover" 
          />
        }
      >
        <h3 className="title">{project.name}</h3>
        <div className="tags">
          {project.tags!.sort().map((tag)  => {
            return (
              <Tag key={tag} color={color_tag[ASCIISum(tag) % color_tag.length]}>{tag}</Tag>
            );
          })}
        </div>        
      </Card>
    </div>
    
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        project.github ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer"><GithubOutlined style={{ fontSize: '30px', color: 'black' }}/></a>
        ) : null,
        project.link ? (
          <a href={project.link} target="_blank" rel="noopener noreferrer"><LinkOutlined style={{ fontSize: '30px', color: 'black' }}/></a>
        ): null,
      ]}
        
    >
      <h3 className="title">{project.name}</h3>
      <div className="tags">
        {project.tags!.sort().map((tag)  => {
          return (
            <Tag key={tag} color={color_tag[ASCIISum(tag) % color_tag.length]}>{tag}</Tag>
          );
        })}
      </div>
      <p className="description">{project.description}</p>                      
    </Modal>
  </>);
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
