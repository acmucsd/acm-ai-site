import React from 'react';
import './index.less';
import { PastCompetition } from '../../actions/competition';
import { Row, Col, Button, Card } from 'antd';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

//import Card from "../Card";

// pastComp is a data type that holds basic info about an older competition
// index is the current index of the compeition in a list used for mapping its position to a color
export const PastCompCard = ({
  pastComp,
  index,
}: {
  pastComp: PastCompetition;
  index: number;
}) => {
  const headerColors = [
    '#F87357',
    '#F88648',
    '#D6BABA',
    '#FFA826',
    '#DF8A85',
    '#93B4DA',
  ];

  return (
    <Col xs={24} sm={12} xl={8} xxl={8}>
      <Card
        hoverable={true}
        title={
          <Col className="compHeader">
            <Row className="compRow">
              <div className="yearWrapper">
                <h4>{pastComp.year}</h4>
              </div>
              <Link to={pastComp.route}>
                <Button shape="circle" className="viewBtn">
                  <BsArrowRight size={20} />
                </Button>
              </Link>
            </Row>

            <h3>{pastComp.name}</h3>
          </Col>
        }
        className="CompCard"
        bordered={false}
        style={{ borderRadius: '20px', minHeight: '200px' }}
        headStyle={{
          background: headerColors[index % headerColors.length],
          borderRadius: '20px 20px 0 0',
        }}
      >
        <section className="compDescription">
          <p>{pastComp.description}</p>
        </section>
      </Card>
    </Col>
  );
};
