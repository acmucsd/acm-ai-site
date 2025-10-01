import React, { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Col, Row, Layout, Button, Skeleton, Drawer, Tag, Avatar, Divider } from 'antd';
import { Card } from '../../components/Card';
import MainFooter from '../../components/MainFooter/index';
import {
  fetchData,
  Person,
  Socials
} from './alumni';
import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai'


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
      >
        <Row className="cardPreviewContent">
          <Col className='picture'>
            <Avatar
              icon={
                !card.picture ? (
                  <Skeleton.Image className="aboutImage" active={false} />
                ) : (
                  <img
                    className="aboutImage"
                    src={card.picture}
                    alt={`profile of ${card.name}`}
                  />
                )
              }
            />
          </Col>
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
      <Col xs={24} sm={12} xl={8} xxl={8} key={card.name}>
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
  year,
  onSelectPerson,
  showDrawer,
}: {
  people: Person[];
  year: string;
  onSelectPerson: (person: Person) => void;
  showDrawer: () => void;
}) => (
  <Content>
    <div className='yearWrapper'>
      <h2 className='year'>{year}</h2>
    </div>
    <br />
    <Content className="teamSection">
      <CardsRow>{renderCards(people, onSelectPerson, showDrawer)}</CardsRow>
    </Content>
  </Content>
);

const AlumniPage = () => {
  const size: Size = useWindowSize();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person>();
  const [people, setPeople] = useState<Record<string, Person[]>>({
      YR_24_25: [],
      YR_23_24: [],
      YR_22_23: [],
      YR_21_22: [],
      YR_20_21: [],
    });

    useEffect(() => {
      const loadPeople = async () => {
        const fetchedPeople = await fetchData();
        setPeople(fetchedPeople);
      };
      loadPeople();
    }, []);

  return (
    <DefaultLayout>
      <Content className="Alumni">
        <Content className="alumniHeader">
          <h1 className="title2">Our Previous Teams</h1>
          <h4>
            The members whose shoulders we stand on. Click on individual cards 
            to learn more!
          </h4>
        </Content>

        <Content className="gallery">
         <Section
          year='2024-2025'
          people={people.YR_24_25}
          onSelectPerson={(person: Person) => setSelectedPerson(person)}
          showDrawer={() => setIsDrawerVisible(true)}
         />

         <Section
          year='2023-2024'
          people={people.YR_23_24}
          onSelectPerson={(person: Person) => setSelectedPerson(person)}
          showDrawer={() => setIsDrawerVisible(true)}
         />
         
         <Section
          year='2022-2023'
          people={people.YR_22_23}
          onSelectPerson={(person: Person) => setSelectedPerson(person)}
          showDrawer={() => setIsDrawerVisible(true)}
         />
         <Section
          year='2021-2022'
          people={people.YR_21_22}
          onSelectPerson={(person: Person) => setSelectedPerson(person)}
          showDrawer={() => setIsDrawerVisible(true)}
         />
         <Section
          year='2020-2021'
          people={people.YR_20_21}
          onSelectPerson={(person: Person) => setSelectedPerson(person)}
          showDrawer={() => setIsDrawerVisible(true)}
         />

        </Content>

        <MainFooter/>
      </Content>

      {isDrawerVisible && (
              <Drawer
                drawerStyle={{ position: 'absolute', zIndex: '2000' }}
                width={'50%'}
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
                          objectPosition: 'center top',
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
                      <SocialSection socials={selectedPerson!!.socials} />
                  </Col>
                </div>
              </Drawer>
            )}

    </DefaultLayout>
  )
}

export default AlumniPage;
