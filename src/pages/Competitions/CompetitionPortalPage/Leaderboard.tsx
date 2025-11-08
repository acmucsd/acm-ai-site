import React, { useState } from "react";
import { Layout, Table, Button, Tag } from 'antd';
import type { ColumnsType } from "antd/es/table";
import { CompetitionData } from "../../../actions/competition";
import { genColor } from "../../../utils/colors";
import "./index.less";
import { Link } from "react-router-dom";

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
            title: 'Division',
            dataIndex: 'teamGroup',
            filters: [
              { text: 'Steve', value: 'Steve' },
              { text: 'Herobrine', value: 'Herobrine' },
            ],
            render: (group: string) => <Tag>{group}</Tag>,
            onFilter: (value, record) => record.teamGroup?.includes(value.toString()) ?? false,
        },
        {
            title: 'Score',
            dataIndex: 'score',
            sorter: (a, b) => a.score - b.score,
        },
        {
            title: 'Public Score',
            dataIndex: 'publicScoreHistory',
            render: (history: number[]) => history ? history[history.length - 1] : 0,
            sorter: (a, b) => {
                const aScore = Array.isArray(a.publicScoreHistory)
                    ? a.publicScoreHistory.at(-1) ?? 0
                    : 0;
                const bScore = Array.isArray(b.publicScoreHistory)
                    ? b.publicScoreHistory.at(-1) ?? 0
                    : 0;
                return aScore - bScore;
            },
        },
        {
            title: 'Private Score',
            dataIndex: 'privateScoreHistory',
            render: (history: number[]) => history ? history[history.length - 1] : 0,
            sorter: (a, b) => {
                const aScore = Array.isArray(a.privateScoreHistory)
                    ? a.privateScoreHistory.at(-1) ?? 0
                    : 0;
                const bScore = Array.isArray(b.privateScoreHistory)
                    ? b.privateScoreHistory.at(-1) ?? 0
                    : 0;
                return aScore - bScore;
            },
        },
        // {
        //     title: 'W',
        //     dataIndex: 'winHistory',
        //     render: (winHistory: number[]) => winHistory[winHistory.length - 1],
        //     sorter: (a, b) => (a.winHistory[a.winHistory.length - 1] || 0) - (b.winHistory[b.winHistory.length - 1] || 0),
        // },
        // {
        //     title: 'L',
        //     dataIndex: 'lossHistory',
        //     render: (lossHistory: number[]) => lossHistory[lossHistory.length - 1],
        //     sorter: (a, b) => (a.lossHistory[a.lossHistory.length - 1] || 0) - (b.lossHistory[b.lossHistory.length - 1] || 0),
        // },
        // {
        //     title: 'D',
        //     dataIndex: 'drawHistory',
        //     render: (drawHistory: number[]) => drawHistory[drawHistory.length - 1],
        //     sorter: (a, b) => (a.drawHistory[a.drawHistory.length - 1] || 0) - (b.drawHistory[b.drawHistory.length - 1] || 0),
        // },
    ];

    console.log("rankdata", rankData);

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
