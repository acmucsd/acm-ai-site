import React, { ReactNode } from 'react';
import './index.less';
import { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { HiOutlineBriefcase } from 'react-icons/hi';
import {
  FaRegCalendar,
  FaBullhorn,
  FaLaptopCode,
  FaGithubSquare,
  FaLinkedin,
} from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';
import DefaultLayout from '../../components/layouts/default';
import MainFooter from '../../components/MainFooter/index';
import { Col, Row, Layout, Button, Skeleton, Drawer, Tag, Divider } from 'antd';
import { Card } from '../../components/Card';
import {
  directors,
  operations,
  dev,
  marketing,
  Person,
  Socials,
  socials,
} from './people';
import { Size, useWindowSize } from '../../components/Header/useWindowSize';
const { Content } = Layout;

const CardsRow = ({ children }: { children?: ReactNode }) => (
  <Row
    className="CardsRow"
    gutter={[
      { xs: 16, sm: 16, md: 24, lg: 24 },
      { xs: 16, sm: 16, md: 24, lg: 24 },
    ]}
    justify="center"
  >
    {children}
  </Row>
);

const SocialLink = ({ title, href }: { title: string; href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <p>{title}</p>
  </a>
);

const SocialSection = ({ socials }: { socials?: Socials }) => {
  if (!socials) return <></>;

  return (
    <div className="contactsBox">
      <h4>Contacts</h4>
      <Row className="links">
        {socials.github && (
          <section>
            <div>
              <FaGithubSquare size={28} />
            </div>
            <SocialLink title="GitHub" href={socials.github} />
          </section>
        )}
        {socials.website && (
          <section>
            <div>
              <AiFillHome size={28} />
            </div>
            <SocialLink title="Website" href={socials.website} />
          </section>
        )}
        {socials.linkedin && (
          <section>
            <div>
              <FaLinkedin size={28} />
            </div>
            <SocialLink title="LinkedIn" href={socials.linkedin} />
          </section>
        )}
      </Row>
    </div>
  );
};

interface Props {
  card: Person;
  onSelectPerson: (person: Person) => void;
  showDrawer: () => void;
}

const AboutCard = ({ card, onSelectPerson, showDrawer }: Props) => {
  return (
    <div
      className="AboutCardWrapper"
      onClick={() => {
        onSelectPerson(card);
        showDrawer();
      }}
    >
      <Card
        hoverable={true}
        className="AboutCard"
        cover={
          !card.picture ? (
            <Skeleton.Image className="aboutImage" active={false} />
          ) : (
            <img
              className="aboutImage"
              style={{ borderRadius: '20px 20px 0 0' }}
              src={card.picture}
              alt={`profile of ${card.name}`}
            />
          )
        }
      >
        <Row className="cardPreviewContent">
          <Col className="nameTitle">
            <h4>{card.name}</h4>
            <p>{card.role}</p>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

const renderCards = (
  people: Person[],
  onSelectPerson: (person: Person) => void,
  showDrawer: () => void
) => (
  <>
    {people.map((card) => (
      <Col xs={24} sm={12} xl={8} xxl={8}>
        <AboutCard
          card={card}
          onSelectPerson={onSelectPerson}
          showDrawer={showDrawer}
        />
      </Col>
    ))}
  </>
);

const Section = ({
  people,
  team,
  statement,
  onSelectPerson,
  showDrawer,
}: {
  people: Person[];
  team: string;
  statement: string;
  onSelectPerson: (person: Person) => void;
  showDrawer: () => void;
}) => (
  <Content>
    <div className="banner">
      <div className="iconWrapper">
        {team === 'directors' && (
          <HiOutlineBriefcase size={25} color={'#f5621e'} />
        )}
        {team === 'operations' && <FaRegCalendar size={25} color={'#f5621e'} />}
        {team === 'socials' && <BsPeopleFill size={25} color={'#f5621e'} />}
        {team === 'marketing' && <FaBullhorn size={25} color={'#f5621e'} />}
        {team === 'developers' && <FaLaptopCode size={25} color={'#f5621e'} />}
      </div>
      <h4 className="statement">{statement}</h4>
    </div>

    <br />
    <Content className="teamSection">
      <CardsRow>{renderCards(people, onSelectPerson, showDrawer)}</CardsRow>
    </Content>
  </Content>
);

function AboutPage() {
  const size: Size = useWindowSize();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person>();

  return (
    <DefaultLayout>
      <div className="About">
        <Content>
          <div className="aboutHeader">
            <h1 className="title2">Our Team</h1>
            <h4>
              Work isn’t always easy, so in order to make sure everything runs
              smoothly, we rely on a passionate group of individuals who bring
              their unique talents to the table. From content creators, social
              leads, to programmers and more, everyone is an integral part of
              our mission to make AI accessible and fun!
            </h4>
            <h4>Click on individual cards to learn more!</h4>
          </div>
        </Content>

        <Content className="gallery">
          <Section
            people={directors}
            team="directors"
            statement={'And these are the people running the show!'}
            onSelectPerson={(person: Person) => setSelectedPerson(person)}
            showDrawer={() => setIsDrawerVisible(true)}
          />

          <Section
            people={operations}
            team="operations"
            statement="Our team of event leads who design and host all the events"
            onSelectPerson={(person: Person) => setSelectedPerson(person)}
            showDrawer={() => setIsDrawerVisible(true)}
          />

          <Section
            people={socials}
            team="socials"
            statement="Our socials team that keeps the community fun, lively, and connected"
            onSelectPerson={(person: Person) => setSelectedPerson(person)}
            showDrawer={() => setIsDrawerVisible(true)}
          />

          <Section
            people={marketing}
            team="marketing"
            statement="Our wonderful marketing and sponsorship team"
            onSelectPerson={(person: Person) => setSelectedPerson(person)}
            showDrawer={() => setIsDrawerVisible(true)}
          />

          <Section
            people={dev}
            team="developers"
            statement="Our team of developers working tirelessly to keep everything running smoothly"
            onSelectPerson={(person: Person) => setSelectedPerson(person)}
            showDrawer={() => setIsDrawerVisible(true)}
          />
        </Content>

        <MainFooter />
      </div>

      {isDrawerVisible && (
        <Drawer
          drawerStyle={{ position: 'absolute', zIndex: '2000' }}
          width={'50%'}
          // 600 => same as @xs
          height={size.width!! < 960 ? '90%' : '100%'}
          placement={size.width!! < 960 ? 'bottom' : 'right'}
          closable={true}
          open={isDrawerVisible}
          extra={
            <Button
              size="large"
              className="drawerButton"
              onClick={() => setIsDrawerVisible(false)}
            >
              Close
            </Button>
          }
          onClose={() => setIsDrawerVisible(false)}
        >
          <div className="drawerContent">
            <Col>
              <Row className="drawerHeader">
                <img
                  style={{
                    marginRight: '1rem',
                    height: '100px',
                    width: '100px',
                    objectFit: 'cover',
                    borderRadius: '100%',
                  }}
                  className="image"
                  src={selectedPerson!!.picture}
                  alt={`profile of ${selectedPerson!!.name}`}
                />
                <Col className="titleBox">
                  <Tag bordered={false} color={'error'}>
                    {selectedPerson!!.role}
                  </Tag>
                  <h4>{selectedPerson!!.name}</h4>
                  <p>{`${selectedPerson!!.major} major`}</p>
                </Col>
              </Row>

              <Divider />

              <div className="bio">
                <p>{selectedPerson!!.bio}</p>
              </div>
              <SocialSection socials={selectedPerson!!.socials} />
            </Col>
          </div>
        </Drawer>
      )}
    </DefaultLayout>
  );
}

export default AboutPage;
