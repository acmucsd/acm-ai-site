import React from 'react';
import { PastProjects } from '../../actions/projects';
import { Card } from '../Card';
import { GithubOutlined, LinkOutlined} from '@ant-design/icons';
import { Tag, Divider } from 'antd';

import './index.less';

const ProjectCard = ({ project }: {project: PastProjects}) => {
  const color_tag : { [key: string]: string } = {"Machine Learning": 'magenta', "Deep Learning": 'cyan', "Boosted Trees": 'blue', "Natural Language Processing": 'purple'};
  return (
    <div className="ProjectCard">
      <Card
        cover={
          <img
            src={project.cover} alt="Project cover" 
          />
        }
        actions={[
          <a href={project.github}><GithubOutlined style={{ fontSize: '30px', color: 'black' }}/></a>,
          <a href={project.link}><LinkOutlined style={{ fontSize: '30px', color: 'black' }}/></a>,
        ]}
      >
        <div className="tags">
          {project.tags.map((tag)  => {
            return (
              <Tag color={color_tag[tag]}>{tag}</Tag>
            );
          })}
        </div>
        <h3 className="title">{project.name}</h3>
        <p className="description">{project.description}</p>
      </Card>
    </div>
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
