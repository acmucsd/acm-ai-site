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

const SocialSection = ({ socials }: { socials?: Socials }) => {
  if (!socials) return <></>;

  return (
    <>
      <ColoredLine />
      {socials.email && <p>Email: {socials.email}</p>}
      {socials.github && <p>GitHub: {socials.github}</p>}
      {socials.twitter && <p>Twitter: {socials.twitter}</p>}
      {socials.website && <p>Website: {socials.website}</p>}
      {socials.instagram && <p>Instagram: {socials.instagram}</p>}
      {socials.facebook && <p>Facebook: {socials.facebook}</p>}
      {socials.linkedin && <p>LinkedIn: {socials.linkedin}</p>}
    </>
  );
};

const { Panel } = Collapse;

const AboutCard = ({ card }: { card: Person }) => (
  <Col xs={24} sm={12} xl={8} xxl={6}>
    <Card
      cover={!card.picture ? null : <img src={card.picture} alt={undefined} />}
    >
      <Collapse className="small-content">
        <Panel header={`${card.role}: ${card.name}`} key={1}>
          <p className="position">{`${card.year} ${card.major} major`}</p>
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
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AboutPage;
