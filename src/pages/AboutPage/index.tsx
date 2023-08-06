import React, { ReactNode } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Col, Row } from 'antd';
import { Card } from '../../components/Card';
import {
  directors,
  operations,
  dev,
  external,
  Person,
  Socials,
  socials,
} from './people';
import { Collapse } from 'antd';

const ColoredLine = () => (
  <hr
    style={{
      color: 'gray',
      backgroundColor: 'gray',
      height: '10%',
    }}
  />
);

const CardsRow = ({ children }: { children?: ReactNode }) => (
  <Row
    gutter={[
      { xs: 8, sm: 16, md: 24, lg: 32 },
      { xs: 8, sm: 16, md: 24, lg: 32 },
    ]}
    justify="center"
  >
    {children}
  </Row>
);

const SocialLink = ({ title, href }: { title: string; href: string }) => (
  <p>
    {title}:{' '}
    <a href={href} target="_blank" rel="noopener noreferrer">
      {href}
    </a>
  </p>
);

const SocialSection = ({ socials }: { socials?: Socials }) => {
  if (!socials) return <></>;

  return (
    <>
      <ColoredLine />
      {socials.email && (
        <p>
          Email: <a href={`mailto:${socials.email}`}>{socials.email}</a>
        </p>
      )}
      {socials.github && <SocialLink title="GitHub" href={socials.github} />}
      {socials.twitter && <SocialLink title="Twitter" href={socials.twitter} />}
      {socials.website && <SocialLink title="Website" href={socials.website} />}
      {socials.instagram && (
        <SocialLink title="Instagram" href={socials.instagram} />
      )}
      {socials.facebook && (
        <SocialLink title="Facebook" href={socials.facebook} />
      )}
      {socials.linkedin && (
        <SocialLink title="LinkedIn" href={socials.linkedin} />
      )}
    </>
  );
};

const { Panel } = Collapse;

const AboutCard = ({ card }: { card: Person }) => (
  <Col xs={24} sm={12} xl={8} xxl={6}>
    <Card
      cover={!card.picture ? null : <img src={card.picture} alt="" />}
    >
      <Collapse className="small-content">
        <Panel header={`${card.role}: ${card.name}`} key={1}>
          {card.minor ? <p className="position">{`${card.year} ${card.major} major, ${card.minor}`}</p> :
          <p className="position">{`${card.year} ${card.major} major`}</p>
          }
          <ColoredLine />
          <p className="quote">{card.bio}</p>
          <SocialSection socials={card.socials} />
        </Panel>
      </Collapse>
      <div className="normal-content">
        <h3>{`${card.role}: ${card.name}`}</h3>
        <p className="position">{`${card.year} ${card.major} major`}</p>
        <ColoredLine />
        <p className="quote">{card.bio}</p>
        <SocialSection socials={card.socials} />
      </div>
    </Card>
  </Col>
);

const renderCards = (people: Person[]) => (
  <>
    {people.map((card) => (
      <AboutCard card={card} key={card.name} />
    ))}
  </>
);

const Section = ({
  statement,
  people,
}: {
  statement: string;
  people: Person[];
}) => (
  <div className="main-section">
    <h2 className="statement">{statement}</h2>
    <br />
    <CardsRow>{renderCards(people)}</CardsRow>
  </div>
);

const AboutPage = () => {
  return (
    <DefaultLayout>
      <div className="AboutPage">
        <div className="hero">
          <h1 id="title">Hello, we are ACM AI at UCSD</h1>
        </div>
        <div>
          <Section
            people={directors}
            statement="And these are the people running the show!"
          />
          <Section
            people={operations}
            statement="Our team of event leads who design and host all the events"
          />
          <Section
            people={dev}
            statement="Our team of developers working tirelessly to keep everything running smoothly"
          />
          <Section
            people={external}
            statement="Our wonderful marketing and sponsorship team"
          />
          <Section
            people={socials}
            statement="Our socials team that keeps the community fun, lively, and connected"
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AboutPage;
