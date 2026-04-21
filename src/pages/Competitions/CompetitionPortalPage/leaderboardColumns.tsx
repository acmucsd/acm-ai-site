import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { CompetitionData } from "../../../actions/competition";
import { genColor } from "../../../utils/colors";

const rankColumn: ColumnsType<CompetitionData>[number] = {
    title: 'Rank',
    dataIndex: 'rank',
    sorter: (a, b) => b.score - a.score,
    defaultSortOrder: 'ascend',
};

const teamColumn: ColumnsType<CompetitionData>[number] = {
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
};

const scoreColumn: ColumnsType<CompetitionData>[number] = {
    title: 'Score',
    dataIndex: 'score',
    sorter: (a, b) => a.score - b.score,
};

const publicScoreColumn: ColumnsType<CompetitionData>[number] = {
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
};

const privateScoreColumn: ColumnsType<CompetitionData>[number] = {
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
};

const createDivisionColumn = (filters: { text: string; value: string }[]): ColumnsType<CompetitionData>[number] => ({
    title: 'Division',
    dataIndex: 'teamGroup',
    filters,
    render: (group: string) => <Tag>{group}</Tag>,
    onFilter: (value, record) => record.teamGroup?.includes(value.toString()) ?? false,
});

const benchmarkScoreColumn: ColumnsType<CompetitionData>[number] = {
    title: 'Benchmark Score',
    dataIndex: 'benchmarkScore',
    render: (value: number | null) => value != null ? value : 'N/A',
    sorter: (a, b) => (a.benchmarkScore ?? 0) - (b.benchmarkScore ?? 0),
};

const winColumn: ColumnsType<CompetitionData>[number] = {
    title: 'W',
    dataIndex: 'winHistory',
    render: (winHistory: number[]) => winHistory?.[winHistory.length - 1] ?? 0,
    sorter: (a, b) => (a.winHistory?.[a.winHistory.length - 1] ?? 0) - (b.winHistory?.[b.winHistory.length - 1] ?? 0),
};

const lossColumn: ColumnsType<CompetitionData>[number] = {
    title: 'L',
    dataIndex: 'lossHistory',
    render: (lossHistory: number[]) => lossHistory?.[lossHistory.length - 1] ?? 0,
    sorter: (a, b) => (a.lossHistory?.[a.lossHistory.length - 1] ?? 0) - (b.lossHistory?.[b.lossHistory.length - 1] ?? 0),
};

const drawColumn: ColumnsType<CompetitionData>[number] = {
    title: 'D',
    dataIndex: 'drawHistory',
    render: (drawHistory: number[]) => drawHistory?.[drawHistory.length - 1] ?? 0,
    sorter: (a, b) => (a.drawHistory?.[a.drawHistory.length - 1] ?? 0) - (b.drawHistory?.[b.drawHistory.length - 1] ?? 0),
};

/**
 * Get columns configuration based on competition name and teamGroups
 * @param competitionName competition name
 * @param teamGroups array of division names or undefined
 */
export const getColumnsForCompetition = (competitionName?: string, teamGroups?: string[]): ColumnsType<CompetitionData> => {
    const baseColumns = [rankColumn, teamColumn];

    if (teamGroups && teamGroups.length > 0) { // Only add division column if divisions exist
        baseColumns.push(createDivisionColumn(
            teamGroups.map(g => ({ text: g, value: g }))
        ));
    }
    
    // Stellatro has score and benchmark score
    if (competitionName?.includes('Stellatro.')) {
        return [...baseColumns, scoreColumn, benchmarkScoreColumn];
    }

    // StarChess has win/loss/draw
    if (competitionName?.includes('StarChess.')) {
        return [...baseColumns, scoreColumn, winColumn, lossColumn, drawColumn];
    }
    
    // Defaults to public and private score (e.g. blockography uses this)
    return [...baseColumns, scoreColumn, publicScoreColumn, privateScoreColumn];
};

export {
    rankColumn,
    teamColumn,
    scoreColumn,
    publicScoreColumn,
    privateScoreColumn,
    benchmarkScoreColumn,
    createDivisionColumn,
    winColumn,
    lossColumn,
    drawColumn,
};
