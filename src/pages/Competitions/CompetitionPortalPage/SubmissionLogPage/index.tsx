import React, { useEffect, useState } from "react";
import DefaultLayout from "../../../../components/layouts/default";
import { Content } from "antd/es/layout/layout";
import "./index.less";
import { generateTeamPicture } from "..";
import { useParams } from "react-router-dom";
import { Button, Input, List, Skeleton } from "antd";
import { PaginationAlign, PaginationPosition } from "antd/es/pagination/Pagination";
import { getSubmissionDetails, getTeamInfo } from "../../../../actions/teams/utils";
import SubmissionEntryCard from "../SubmissionEntryCard";

/**
 * Renders the list of competition submission details for the user's team.
 */
function SubmissionLogPage() {

    // extract competition & team details from the url parameter to fetch corresponding submission data
    const {competitionName, id} = useParams<{competitionName: string; id: string}>();
    const [position] = useState<PaginationPosition>('bottom');
    const [align] = useState<PaginationAlign>('center');

    const [submissions, setSubmissions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [teamInfo, setTeamInfo] = useState<any>({});

    // First grab the competition data and update team info
    useEffect(() => {
        getTeamInfo(competitionName, id).then((res) => {
            console.log(res.data);
            setTeamInfo(res.data);
            console.log("set team info");
        })   
        
    }, []);

    // Once we verify team, get recent submissions
    useEffect(() => {
        if(teamInfo !== null) {
            console.log(teamInfo)
            fetchRecents();
        }
    }, [teamInfo]);
    

    /**
     * Retrieves the submissions associated with the team.
     */
    const fetchRecents = () => {
        setIsLoading(true);

        // initialize the submissions
        setSubmissions([]);

        if (teamInfo && teamInfo.submitHistory) {
            console.log(teamInfo);

            {/* Currently slices data, but need to remove this line in the future */}
            teamInfo.submitHistory.slice(0, 3).map((id: any) => {
                getSubmissionDetails(competitionName, id).then((res) => {
                    let submission = res.data[0];
                    if (!submission) return;
                    let date = new Date(submission.submissionDate);

                    let submissionDetails = {
                        date: date,
                        status: submission.status,
                        dateString:
                        date.toLocaleDateString() + ' at ' + date.toLocaleTimeString(),
                        description: submission.description,
                        tags: submission.tags.join(', '),
                        score: submission.score,
                        key: id,
                    };

                    // Append the new submissions to the current state
                    setSubmissions((submissionData: any) => [
                        ...submissionData,
                        submissionDetails,
                    ]);

                    // Set a delayed loading status 
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500);

                });
            });
        }
        else {
            setTimeout(() => {
                setIsLoading(false);
              }, 500);
        }
    }

    return(
        <DefaultLayout>

            <Content id="SubmissionLogPage">

                <Content id="submissionLogHeader">
                    <span>
                        {generateTeamPicture(id)}
                        <h3>{id}</h3>
                    </span>
                    
                    <h1 className="title2">Submission Log</h1>
                    <p>View your previous submissions to gauge the performance of your bots!</p>

                    <span>
                        <Input type="search" size = "large" id = "submissionLogSearch" placeholder="search by uploader"></Input>
                        <Button id = "refreshButton" size = "large" onClick={() => fetchRecents()}><p>Refresh</p></Button>
                    </span>
                </Content>
                

                <Content id = "submissionLogColumn">
                    

                    {/* Render list of submission entry cards */}
                    {isLoading ? 
                        <Skeleton active />
                    :
                        <List
                            id = "submissionList"
                            split={false}
                            pagination={{ position, align, pageSize: 6 }}
                            dataSource={submissions}
                            renderItem={(data: any) => (
                                <List.Item >
                                    <SubmissionEntryCard entry = {data}  />
                                </List.Item>
                            )}
                        />
                     }                  
                    
                </Content>
            </Content> 
        </DefaultLayout>
    )
}


export default SubmissionLogPage;