import React from "react";
import { Layout, Table, Button } from 'antd';
import { getLeaderboardColumns } from "./leaderboardColumns";
import "./index.less";

interface LeaderBoardTabProps {
    rankData: any;
    lastRefresh: Date | null;
    updateRankingsCallback: () => void;
    isLoading: boolean;
    teamGroups?: string[];
    leaderboardEnabled?: boolean;
    leaderboardType?: string;
    metaLoaded: boolean;
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
    {rankData, lastRefresh, updateRankingsCallback, isLoading, teamGroups, leaderboardEnabled, leaderboardType, metaLoaded}
) => {

    const columns = getLeaderboardColumns(leaderboardType, teamGroups);

    if (leaderboardEnabled === false) {
        return (
            <Content id="leaderBoardContainer">
                <section>
                    <p>Leaderboard is disabled.</p>
                </section>
            </Content>
        );
    }

    // wait for meta before calling type invalid
    if (metaLoaded && !columns) {
        return (
            <Content id="leaderBoardContainer">
                <section>
                    <p>This competition has no valid leaderboard type configured.</p>
                </section>
            </Content>
        );
    }

    return (
        <Content id="leaderBoardContainer">
            <section>

                <p id="lastRefreshedText">
                    Last refreshed{': '}
                    {lastRefresh ? lastRefresh.toLocaleString() : ''}
                </p>

                <div className="buttonContainer">
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
            <Table loading={isLoading || !metaLoaded} columns={columns ?? []} dataSource={rankData} />
        </Content>
    );
};

export default LeaderBoardTab;
