import React from 'react';
import './index.less';
import { Content } from 'antd/es/layout/layout';
import DefaultLayout from '../../components/layouts/default';
import MainFooter from '../../components/MainFooter/index';

function NotFound() {
    return (
        <DefaultLayout>
            <Content className="errorHeader">
            <div className="errorHeaderContent">
                <h1 className="errorTitle">404 Not Found</h1>
                <h4>
                Sorry, the page you are looking for does not exist.
                </h4>
            </div>
            </Content>

            <Content>
                <div className="homeBottomBar"></div>
            </Content>
            <MainFooter />
        </DefaultLayout>
       
        
    );

}
export default NotFound;