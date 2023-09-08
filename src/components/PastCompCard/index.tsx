import React from 'react';
import './index.less';
import { PastCompetition } from "../../actions/competition";
import {Row, Col, Button, Card} from 'antd';
import {BsArrowRight} from 'react-icons/bs';
//import Card from "../Card";

export const PastCompCard = ({ pastComp }: {pastComp: PastCompetition}) => {
    return (
        <Card className = "CompCard" bordered = {false} style = {{background: "#3A3A3A", borderRadius: "20px", minHeight: "200px"}}>
            <Col className = "compContent">
                <Row className = "compHeader">
                    <div className = "yearWrapper"><h3>{pastComp.year}</h3></div>
                    <h3>{pastComp.name}</h3>
                </Row>
                <section className = "compDescription">
                    <p>{pastComp.description}</p>
                </section>

                <section className = "buttonRow">
                    <Button shape="circle" className = "viewBtn">
                        <BsArrowRight size = {20}/>
                    </Button>
                </section>
                
            </Col>

        </Card>

    )
}