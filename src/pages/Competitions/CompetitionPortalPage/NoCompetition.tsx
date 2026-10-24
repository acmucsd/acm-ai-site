import { Button, Layout } from 'antd';
import { BiLogoDiscord, BiLogoInstagram, BiMailSend } from 'react-icons/bi';
import CompIcon from '../../../../public/compAlt.png';
import './index.less';

const { Content } = Layout;

/**
 * Portal fallback when no competition is in the portal.
 */
function NoCompetition() {
  return (
    <Content className="NoCompetition">
      <img src={CompIcon} alt="" className="graphic" />
      <h1 className="title2">
        We will be back <span className="colorful">soon</span>
      </h1>
      <p>Our team is busy working on the next competition! Keep in touch with us to hear about when it will happen.</p>
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

export default NoCompetition;
