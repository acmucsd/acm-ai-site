import React, { useContext, useEffect } from "react";
import { message } from "antd";
import { Layout, Space, Button } from 'antd';
import UserContext from "../../../UserContext";
import { useHistory } from 'react-router-dom';
import './index.less';
import DefaultLayout from "../../../components/layouts/default";

const { Content } = Layout;


function CompetitionPortalPage ()  {
    const history = useHistory();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user.loggedIn) {
          message.info('You need to login to upload predictions and participate');
        //   history.replace(path.join(window.location.pathname, '../../../login'));
        }
      }, []);
    
    return (
        <DefaultLayout>

            <Content className="CompetitionPortalPage">
                <Content id = "portalHeader">
                <div >
                    <h1 className="title2">Hello, {user.username}</h1>
                    <h4>Welcome the the AI Portal</h4>
                </div>
                </Content>

            </Content>

        </DefaultLayout>
    );

}


export default CompetitionPortalPage;
