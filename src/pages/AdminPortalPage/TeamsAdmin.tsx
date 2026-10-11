import { useCallback, useEffect, useState } from 'react';
import { Button, InputNumber, Popconfirm, Select, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  AdminTeam,
  TeamEntry,
  TeamScore,
  getAdminTeams,
  getCompetitionDetails,
  getTeamEntries,
  overrideTeamScore,
  setTeamDisqualified,
} from '../../actions/competition';

const latest = (history?: number[]) => history?.[history.length - 1] ?? '-';

const scoreLabels: Record<keyof TeamScore, string> = {
  score: 'Score',
  publicScore: 'Public score',
  privateScore: 'Private score',
};

const apiError = (error: any, fallback: string) => error.response?.data?.error?.message ?? fallback;

const entryColumns: ColumnsType<TeamEntry> = [
  {
    title: 'Submitted',
    dataIndex: 'submissionDate',
    render: (date: string) => new Date(date).toLocaleString(),
  },
  {
    title: 'Result',
    dataIndex: 'evaluationOk',
    render: (ok?: boolean) =>
      ok === undefined ? '-' : <Tag color={ok ? 'success' : 'error'}>{ok ? 'Success' : 'Failed'}</Tag>,
  },
  { title: 'Score', dataIndex: 'score' },
  {
    title: 'Message',
    render: (_, entry) => entry.message || entry.error || entry.description,
  },
];

type TeamDetailsProps = {
  competition: string;
  team: AdminTeam;
  isPublicPrivate: boolean;
  onChange: () => void;
};

function TeamDetails({ competition, team, isPublicPrivate, onChange }: TeamDetailsProps) {
  const [entries, setEntries] = useState<TeamEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState<TeamScore>({});

  useEffect(() => {
    getTeamEntries(competition, team.teamName)
      .then(setEntries)
      .catch((error) => message.error(apiError(error, 'Failed to load submissions.')))
      .finally(() => setLoading(false));
  }, [competition, team.teamName]);

  const scoreFields: (keyof TeamScore)[] = isPublicPrivate ? ['publicScore', 'privateScore'] : ['score'];
  const scoresFilled = scoreFields.every((field) => typeof scores[field] === 'number');

  const submitScore = () => {
    overrideTeamScore(competition, team.teamName, scores)
      .then(() => {
        message.success(`Score set for ${team.teamName}.`);
        setScores({});
        onChange();
      })
      .catch((error) => message.error(apiError(error, 'Failed to set score.')));
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space wrap>
        {scoreFields.map((field) => (
          <InputNumber
            key={field}
            placeholder={scoreLabels[field]}
            style={{ width: 140 }}
            value={scores[field]}
            onChange={(value) => setScores({ ...scores, [field]: value ?? undefined })}
          />
        ))}
        <Popconfirm
          title="Set score?"
          description="Adds a new score to the team's history. Leaderboard uses it right away."
          onConfirm={submitScore}
          disabled={!scoresFilled}
        >
          <Button disabled={!scoresFilled}>Set Score</Button>
        </Popconfirm>
      </Space>
      <Table
        rowKey="_id"
        size="small"
        loading={loading}
        columns={entryColumns}
        dataSource={entries}
        pagination={{ pageSize: 10 }}
      />
    </Space>
  );
}

export default function TeamsAdmin({ competitions }: { competitions: string[] }) {
  const [competition, setCompetition] = useState<string>();
  const [isPublicPrivate, setIsPublicPrivate] = useState(false);
  const [teams, setTeams] = useState<AdminTeam[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTeams = useCallback((name: string) => {
    setLoading(true);
    Promise.all([getAdminTeams(name), getCompetitionDetails(name)])
      .then(([teams, details]) => {
        setTeams(teams);
        setIsPublicPrivate(details.leaderboardType === 'public_private');
      })
      .catch((error) => message.error(apiError(error, 'Failed to load teams.')))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (competition) loadTeams(competition);
  }, [competition, loadTeams]);

  const toggleDisqualified = (team: AdminTeam) => {
    setTeamDisqualified(competition!, team.teamName, !team.disqualified)
      .then(() => {
        message.success(`${team.teamName} ${team.disqualified ? 'reinstated' : 'disqualified'}.`);
        loadTeams(competition!);
      })
      .catch((error) => message.error(apiError(error, 'Failed to update team.')));
  };

  const columns: ColumnsType<AdminTeam> = [
    { title: 'Team', dataIndex: 'teamName' },
    {
      title: 'Members',
      dataIndex: 'teamMembers',
      render: (members: string[]) => members.join(', '),
    },
    {
      title: isPublicPrivate ? 'Public / Private' : 'Score',
      render: (_, team) =>
        isPublicPrivate
          ? `${latest(team.publicScoreHistory)} / ${latest(team.privateScoreHistory)}`
          : latest(team.scoreHistory),
    },
    {
      title: 'Submissions',
      render: (_, team) => team.submitHistory.length,
    },
    {
      title: 'Status',
      render: (_, team) =>
        team.disqualified ? <Tag color="error">Disqualified</Tag> : <Tag color="success">Active</Tag>,
    },
    {
      render: (_, team) => (
        <Popconfirm
          title={team.disqualified ? 'Reinstate team?' : 'Disqualify team?'}
          description={team.disqualified ? 'Team returns to the leaderboard.' : 'Team is hidden from the leaderboard.'}
          onConfirm={() => toggleDisqualified(team)}
        >
          <Button danger={!team.disqualified}>{team.disqualified ? 'Reinstate' : 'Disqualify'}</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Select
        placeholder="Select Competition"
        style={{ width: '80%', maxWidth: 300, margin: '10px 0px' }}
        value={competition}
        onChange={setCompetition}
        options={competitions.map((name) => ({ label: name, value: name }))}
      />
      {competition && (
        <Table
          rowKey="teamName"
          loading={loading}
          columns={columns}
          dataSource={teams}
          expandable={{
            expandedRowRender: (team) => (
              <TeamDetails
                competition={competition}
                team={team}
                isPublicPrivate={isPublicPrivate}
                onChange={() => loadTeams(competition)}
              />
            ),
          }}
        />
      )}
    </>
  );
}
