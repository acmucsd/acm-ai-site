import React, { useState } from "react";
import { Layout, Table, Button } from 'antd';
import type { ColumnsType } from "antd/es/table";
import { CompetitionData } from "../../../actions/competition";
import { genColor } from "../../../utils/colors";
import "./index.less";

interface LeaderBoardTabProps {
    rankData: any;
    lastRefresh: Date | null;
    updateRankingsCallback: () => void;
    isLoading: boolean;
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
    {rankData, lastRefresh, updateRankingsCallback, isLoading}:
    { rankData: any,
      lastRefresh: Date | null,
      updateRankingsCallback: () => void,
      isLoading: boolean
    }
) => {

    // Formats how the columns should be arranged and styled
    const columns: ColumnsType<CompetitionData> = [
        {
            title: 'Rank',
            dataIndex: 'rank',
            sorter: (a, b) => b.score - a.score,
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Team',
            dataIndex: 'team',
            sorter: (a, b) => a.team.length - b.team.length,
            render(value, record, index) {
                const color1 = genColor(record.team);
                const color2 = genColor(`${record.team}_additional_seed`);

                return (
                    <span>
                        <div
                            style={{
                                display: 'inline-block',
                                verticalAlign: 'middle',
                                borderRadius: '50%',
                                width: '2rem',
                                height: '2rem',
                                background: `linear-gradient(30deg, ${color1}, ${color2})`,
                                marginRight: '0.75rem',
                            }}
                        ></div>
                        {value.length > 28 ? (
                            <span>{value.substring(0, 28)}...</span>
                        ) : (
                            <span>{value.substring(0, 28)}</span>
                        )}
                    </span>
                );
            },
        },
        {
            title: 'Score',
            dataIndex: 'score',
            sorter: (a, b) => a.score - b.score,
        },
    ];


    return (
        <Content id="leaderBoardContainer">
            <section>

                <p id="lastRefreshedText">
                    Last refreshed{': '}
                    {lastRefresh ? lastRefresh.toLocaleString() : ''}
                </p>
                <Button
                    size="large"
                    className="refresh-btn"
                    onClick={() => {
                        updateRankingsCallback();
                    }}
                >
                    Refresh
                </Button>
            </section>
            <Table loading={isLoading} columns={columns} dataSource={rankData} />
        </Content>
    );
};

export default LeaderBoardTab;