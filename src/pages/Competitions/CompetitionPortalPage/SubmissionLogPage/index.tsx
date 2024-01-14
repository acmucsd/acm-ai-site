import React, { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../../../components/layouts/default";
import { Content } from "antd/es/layout/layout";
import "./index.less";

function SubmissionLogPage() {
    return(
        <DefaultLayout>

            <Content id="SubmissionLogPage">

                <Content id="submissionLogHeader">
                    <h1 className="title2">Submission Log</h1>
                </Content>

            </Content>
            
        </DefaultLayout>

    )
}


export default SubmissionLogPage;