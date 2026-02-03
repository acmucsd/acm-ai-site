import React from "react";
import { Layout, Table, Button } from 'antd';
import { getColumnsForCompetition } from "./leaderboardColumns";
import "./index.less";

interface LeaderBoardTabProps {
    rankData: any;
    lastRefresh: Date | null;
    updateRankingsCallback: () => void;
    isLoading: boolean;
    competitionName: string;
}
const { Content } = Layout;

/**
 * Renders the leaderboard of all teams based on their ranking
 * 
 * @param {any} rankData The ranking data of all teams
 * @param {Date} lastRefresh The last time when the leaderboard was refreshed
 * @param updateRankingsCallback Function that refetches the rankings for all teams
 * @param {boolean} isLoading Indicates if all the competitions teams info is being fetched
 * 
 */
const LeaderBoardTab: React.FC<LeaderBoardTabProps> = (
    {rankData, lastRefresh, updateRankingsCallback, isLoading, competitionName}:
    { rankData: any,
      lastRefresh: Date | null,
      updateRankingsCallback: () => void,
      isLoading: boolean,
      competitionName: string
    }
) => {

    // Get columns based on competition name
    const columns = getColumnsForCompetition(competitionName);

    return (
        <Content id="leaderBoardContainer">
            <section>

                <p id="lastRefreshedText">
                    Last refreshed{': '}
                    {lastRefresh ? lastRefresh.toLocaleString() : ''}
                </p>

                <div className="buttonContainer">
                    {/* <Link to={{ pathname: `competitions/${competitionName}/leaderboard` }} >
                        <Button size="large" className="full-lb-btn">Full Leaderboard</Button>
                    </Link> */}
                    <Button
                        size="large"
                        className="refresh-btn"
                        onClick={() => {
                            updateRankingsCallback();
                        }}
                    >
                        Refresh
                    </Button>
                </div>
            </section>
            <Table loading={isLoading} columns={columns} dataSource={rankData} />
        </Content>
    );
};

export default LeaderBoardTab;
