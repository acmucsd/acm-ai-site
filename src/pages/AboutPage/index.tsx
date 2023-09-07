import React, { ReactNode } from 'react';
import { Size, useWindowSize } from './useWindowSize';
import './index.less';
import { useState } from 'react';
import { AiFillLinkedin, AiFillHome} from 'react-icons/ai';
import {BiLogoInstagram} from 'react-icons/bi';
import { HiOutlineBriefcase, HiOutlineMail } from 'react-icons/hi';
import { FaRegCalendar, FaBullhorn, FaFacebookSquare, FaLaptopCode, FaGithubSquare, FaTwitterSquare, FaLinkedin } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';
import DefaultLayout from '../../components/layouts/default';
import { Col, Row, Layout, Segmented, Dropdown, Button, Skeleton, Drawer, Tag, Divider } from 'antd';
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
const { Content, Footer } = Layout;


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
      { xs: 16, sm: 16, md: 24, lg: 24 },
      { xs: 16, sm: 16, md: 24, lg: 24 },
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
    <div className = "contactsBox">
    <h4>Contacts</h4>
    <Row className = "links">
      {socials.email && (
        <p>
          Email: <a href={`mailto:${socials.email}`}>{socials.email}</a>
        </p>
      )}

      {socials.website && <section><div><AiFillHome size = {25}/></div><a href = {socials.website}><p>Website</p></a></section>}
      {socials.twitter && <section><div><FaTwitterSquare size = {25}/></div><a href = {socials.twitter}><p>Twitter</p></a></section>}
      {socials.instagram && (
        <section><div><BiLogoInstagram size = {25}/></div><a href = {socials.instagram}><p>Instagram</p></a></section>
      )}
      {socials.facebook && (
        <section><div><FaFacebookSquare size = {25}/></div><a href = {socials.facebook}><p>Facebook</p></a></section>
      )}
      {socials.linkedin && (
        <section><div><FaLinkedin size = {25}/></div><a href = {socials.linkedin}><p>Linked In</p></a></section>
      )}
      </Row>
    </div>
  )

}


interface Props {
  card: Person,
  onSelectPerson: (person: Person) => void,
  showDrawer: () => void
}

const AboutCard = ({ card, onSelectPerson, showDrawer }: Props) => {

  return (

    <Col xs={24} sm={12} xl={12} xxl={12}>
      <Card
        className="Card"
        cover={!card.picture ? <Skeleton.Image className="image" active={false} /> : <img className="image" src={card.picture} alt="cover image" />}
      >
        <Row className="cardPreviewContent">
          <Col className="nameTitle">
            <h3>{card.name}</h3>
            <p>{card.role}</p>
          </Col>

          <Button
            className="viewButton"

            onClick={() => {
              onSelectPerson(card);
              showDrawer();
            }}
          >
            View
          </Button>

        </Row>

      </Card>
    </Col>
  )
}


const renderCards = (people: Person[], onSelectPerson: (person: Person) => void, showDrawer: () => void) => (
  <>
    {people.map((card) => (
      <AboutCard card={card} onSelectPerson={onSelectPerson} showDrawer={showDrawer} />

    ))}
  </>
);


const Section = ({
  people,
  team,
  statement,
  onSelectPerson,
  showDrawer
}: {
  people: Person[];
  team: string,
  statement: string;
  onSelectPerson: (person: Person) => void;
  showDrawer: () => void;
}) => (
  <div className="teamSection">

    <div className="banner">
      <div className="iconWrapper">
        {team == "directors" && <HiOutlineBriefcase size={35} color={"white"} />}
        {team == "operations" && <FaRegCalendar size={35} color={"white"} />}
        {team == "socials" && <BsPeopleFill size={35} color={"white"} />}
        {team == "marketing" && <FaBullhorn size={35} color={"white"} />}
        {team == "developers" && <FaLaptopCode size={35} color={"white"} />}
      </div>

      <h3 className="statement">{statement}</h3>
      <br />
      <CardsRow>{renderCards(people, onSelectPerson, showDrawer)}</CardsRow>
    </div>
  </div>
);

const items = [
  {
    label: 'Executives',
    key: '1',
  },
  {
    label: 'Event Leads',
    key: '2',
  },
  {
    label: 'Socials',
    key: '3',
  },
  {
    label: 'Marketing',
    key: '4',
  },
  {
    label: 'Developers',
    key: '5',
  },
];





function AboutPage() {
  const [selectedSection, setSelectedSection] = useState("Executives");
  const size: Size = useWindowSize();
  const [showSelectButton, setShowSelectButton] = useState(false)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person>();

  const onClick = ({ key }: { key: React.Key }) => {
    const selectedItem = items.find(item => item.key === key)
    if (selectedItem) {
      setSelectedSection(selectedItem.label)
    }
  }


  return (

    <DefaultLayout>
  
      {isDrawerVisible &&
        <Drawer
          width={"50%"}
          // 600 => same as @xs 
          height={size.width!! < 600 ? "90%" : "100%"}
          placement={size.width!! < 600 ? "bottom" : "right"}
          closable={true}
          open={isDrawerVisible}
          extra={<Button className="drawerButton" onClick={() => setIsDrawerVisible(false)}>Close</Button>}
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
                    borderRadius: "100%" 
                    }} 
                    className="image" 
                    src={selectedPerson!!.picture} 
                    alt="cover image" 
                />
                <Col className="titleBox">
                  <Tag bordered={false} color={"error"}>{selectedPerson!!.role}</Tag>
                  <h3>{selectedPerson!!.name}</h3>
                  <p>{`${selectedPerson!!.year} ${selectedPerson!!.major} major`}</p>
                </Col>
              </Row>

              <Divider/>

              <div className="bio"><p>{selectedPerson!!.bio}</p></div>
              <SocialSection socials={selectedPerson!!.socials} />

            </Col>
          </div>
        </Drawer>}

      <div className="AboutPage">

        <Content className="aboutContent">
          <h1 className="title2">Our Team</h1>

          {size.width!! < 600 ?

            (
              <Dropdown menu={{ items, onClick }}>
                <Button>Filter By Category</Button>
              </Dropdown>
            )
            :
            (
              <Segmented
                value={selectedSection}
                size="large"
                options={['Executives', 'Event Leads', 'Socials', 'Marketing', 'Developers']}
                onChange={(e) => setSelectedSection(e.toString())}
              />
            )

          }
        </Content>


        <Content className="gallery">
          {selectedSection == "Executives" &&
            <Section
              people={directors}
              team="directors"
              statement={"And these are the people running the show!"}
              onSelectPerson={(person: Person) => setSelectedPerson(person)}
              showDrawer={() => setIsDrawerVisible(true)}
            />
          }

          {selectedSection == "Event Leads" &&
            <Section
              people={operations}
              team="operations"
              statement="Our team of event leads who design and host all the events"
              onSelectPerson={(person: Person) => setSelectedPerson(person)}
              showDrawer={() => setIsDrawerVisible(true)}
            />
          }

          {selectedSection == "Socials" &&
            <Section
              people={socials}
              team="socials"
              statement="Our socials team that keeps the community fun, lively, and connected"
              onSelectPerson={(person: Person) => setSelectedPerson(person)}
              showDrawer={() => setIsDrawerVisible(true)}
            />
          }

          {selectedSection == "Marketing" &&
            <Section
              people={external}
              team="marketing"
              statement="Our wonderful marketing and sponsorship team"
              onSelectPerson={(person: Person) => setSelectedPerson(person)}
              showDrawer={() => setIsDrawerVisible(true)}
            />
          }

          {selectedSection == "Developers" &&
            <Section
              people={dev}
              team="developers"
              statement="Our team of developers working tirelessly to keep everything running smoothly"
              onSelectPerson={(person: Person) => setSelectedPerson(person)}
              showDrawer={() => setIsDrawerVisible(true)}
            />
          }
        </Content>

        <Footer className="aboutFooter">
          <h3>ACM AI at UCSD 2023</h3>
        </Footer>
      </div>



    </DefaultLayout>
  );
};

export default AboutPage;



/* old about card
const AboutCard = ({ card }: { card: Person }) => (
  <Col xs={12} sm={12} xl={12} xxl={12}>
    <Card 
      className = "Card"
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
*/