import React, { ReactNode } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Col, Row } from 'antd';
import { Card } from '../../components/Card';
import { directors, operations, dev, external, Person} from './people';

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
)

const AboutCard = ({ card }: { card: Person }) => (
  <Col xs={12} md={8}>
    <Card cover={!card.picture ? null : (
      <img
        src={card.picture}
        alt={undefined}
      />
    )}
    >
      <h3>{`${card.role}: ${card.name}`}</h3>
      <p className="position">
        {`${card.year} ${card.major} major`}
      </p>
      <ColoredLine />
      <p className="quote">{card.bio}</p>
    </Card>
  </Col>
);

const renderCards = (people: Person[]) => (
  <>{people.map((card) => <AboutCard card={card} key={card.name} />)}</>
);

const Section = ({ statement, people }: { statement: string, people: Person[] }) => (
  <div className="main-section">
    <h2 className="statement">{statement}</h2>
    <br />
    <CardsRow>
      {renderCards(people)}
    </CardsRow>
  </div>
)

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