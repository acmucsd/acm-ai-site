import React, { useState } from 'react';
import { Project } from '../../pages/ProjectsPage/projects'
import { GithubOutlined, LinkOutlined} from '@ant-design/icons';
import { Card } from '../Card';
import { Tag, Modal, Divider} from 'antd';
import { AiOutlineInfoCircle, AiOutlineLink } from 'react-icons/ai';
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
  const color_tag : string[] =  ["red", "blue", "gold", "purple", "green"];
  //['magenta', 'cyan', 'gold', 'blue', 'purple', 'green'];
  //['#DCB9B9', '#8FA5BE', '#E1B053', '#6D6864', '#8E799F', '#889F79']
  
  // Modal props
  const showModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
  <>
      <Card
        className="ProjectCard" 
        hoverable = {false}
      >
        <div className="tags">
          {project.tags!.sort().map((tag)  => {
            return (
              <Tag bordered={false} key={tag} color={"#F6F6F6"} style={{color: "black", borderRadius:"10px"}}>{tag}</Tag>
            );
          })}
        </div>  
        <img
           src={project.cover} alt="Project cover" 
          style={{borderRadius:"100px", height:"50px", width: "50px", boxShadow:"0px 3px 5px 1px rgba(189, 189, 189, 0.5)"}}
        />
        <h4 className = "title">{project.name}</h4>
        <h5>{project.quarter}</h5>
        <Divider/>

        <div className = "descriptionBox">

          <div className = "iconsBox">

            <div className = "icon" id = "view" onClick = {showModal}>
              <AiOutlineInfoCircle size = {25} style = {{color:"white"}}/>
              <p>view</p>
            </div>

            <div className = "icon" id= "link">
              <a href ={project.github}>
              <AiOutlineLink size = {25} style = {{color:"rgb(84, 84, 84)"}} />
              <p>github</p>
                
              </a>
            
            </div>

          </div>

        </div>
      
      </Card>
    
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
            <Tag key={tag} bordered={false} color={color_tag[ASCIISum(tag) % color_tag.length]}>{tag}</Tag>
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
