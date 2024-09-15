import React from 'react';
import './index.less';
import DefaultLayout from '../components/layouts/default';

function NotFound() {
    return (
        <DefaultLayout>
            <div className = "Error Message">
                <h1>404 Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
            </div>
        </DefaultLayout>
        
    );

}
export default NotFound;