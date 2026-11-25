import { ReactNode } from 'react';
import { Button, Layout } from 'antd';
import { BiLogoDiscord, BiLogoInstagram, BiMailSend } from 'react-icons/bi';
import CompIcon from '../../../public/compAlt.png';
import './index.less';

const { Content } = Layout;

/**
 * Full page notice with our social links, like "coming soon".
 */
export default function NoticePage({ title, text }: { title: ReactNode; text: string }) {
  return (
    <Content className="NoticePage">
      <img src={CompIcon} alt="" className="graphic" />
      <h1 className="title2">{title}</h1>
      <p>{text}</p>
      <div className="socialButtons">
        <Button
          href="https://acmurl.com/ai-discord"
          target="_blank"
          size="large"
          shape="round"
          className="colorful2"
          icon={<BiLogoDiscord />}
        >
          Discord
        </Button>
        <Button
          href="https://www.instagram.com/acm_ai_ucsd/"
          target="_blank"
          size="large"
          shape="round"
          className="colorful2"
          icon={<BiLogoInstagram />}
        >
          Instagram
        </Button>
        <Button
          href="https://acmurl.com/ai-newsletter"
          target="_blank"
          size="large"
          shape="round"
          className="colorful2"
          icon={<BiMailSend />}
        >
          Newsletter
        </Button>
      </div>
    </Content>
  );
}
