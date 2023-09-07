import React from 'react';
import './index.less';
import { PastCompetition } from "../../actions/competition";
import {Row, Col, Button} from 'antd';
import {BsArrowRight} from 'react-icons/bs';
import Card from "../Card";

export const PastCompCard = ({ pastComp }: {pastComp: PastCompetition}) => {
    return (
       
        <Card className = "Card" bordered = {false} style = {{background: "#3A3A3A", borderRadius: "20px"}}>
            <Col className = "content" >
                <Row className = "header">
                    <div className = "yearWrapper"><h4>{pastComp.year}</h4></div>
                    <h4>{pastComp.name}</h4>
                </Row>
                <section className = "description">
                    {pastComp.description}
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