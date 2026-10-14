import { useState } from 'react';
import { Button, Input, InputNumber, Select, Switch, message } from 'antd';
import { Remark } from 'react-remark';
import { uploadNewCompetition, LeaderboardType } from '../../actions/competition';
import { cleanGroups, leaderboardTypeOptions } from './competitionFields';

const { TextArea } = Input;

export default function CreateCompetition({ onCreated }: { onCreated: () => void }) {
  const [creatingCompetition, setCreatingCompetition] = useState(false);
  const [newCompetitionName, setNewCompetitionName] = useState<string>('');
  const [newCompetitionDescription, setNewCompetitionDescription] = useState<string>('');
  const [newStartDate, setNewStartDate] = useState<string>('');
  const [newEndDate, setNewEndDate] = useState<string>('');
  const [newSubmissionFileName, setNewSubmissionFileName] = useState<string>('');
  const [newLeaderboardEnabled, setNewLeaderboardEnabled] = useState<boolean>(false);
  const [newLeaderboardType, setNewLeaderboardType] = useState<LeaderboardType>();
  const [newMaxTeamSize, setNewMaxTeamSize] = useState<number | null>(null);
  const [newMinTeamSize, setNewMinTeamSize] = useState<number | null>(null);
  const [newShowPrivateScores, setNewShowPrivateScores]  = useState<boolean>(false);
  const [newSubmissionCooldown, setNewSubmissionCooldown] = useState<number | null>(null);
  const [newSubmissionsEnabled, setNewSubmissionsEnabled] = useState<boolean>(false);
  const [newTruthCSV, setNewtruthCSV] = useState<string>('');
  const [newTeamGroups, setNewTeamGroups] = useState<string[]>([]);

  const handleNewCompetition = () => {
    if (!newCompetitionName.trim()) {
      message.error('Enter a competition name.');
      return;
    }
    if (!newCompetitionDescription.trim()) {
      message.error('Enter a competition description.');
      return;
    }
    if (!newStartDate.trim()) {
      message.error('Enter a competition start date.');
      return;
    }
    if (!newEndDate.trim()) {
      message.error('Enter a competition end date.');
      return;
    }
    if (!newSubmissionFileName.trim()) {
      message.error('Enter a competition submission file name.');
      return;
    }
    if (!newLeaderboardType) {
      message.error('Select a leaderboard type.');
      return;
    }
    if (
      typeof newMinTeamSize === 'number' &&
      typeof newMaxTeamSize === 'number' &&
      newMinTeamSize > newMaxTeamSize
    ) {
      message.error('Min team size cannot be greater than max team size.');
      return;
    }
    const payload = {
      competitionName: newCompetitionName.trim(),
      description: newCompetitionDescription.trim(),
      startDate: new Date(newStartDate).toISOString(),
      endDate: new Date(newEndDate).toISOString(),
      submissionFileName: newSubmissionFileName.trim(),
      submissionCooldown: newSubmissionCooldown ?? undefined,
      submissionsEnabled: newSubmissionsEnabled,
      leaderboardEnabled: newLeaderboardEnabled,
      leaderboardType: newLeaderboardType,
      minTeamSize: newMinTeamSize ?? undefined,
      maxTeamSize: newMaxTeamSize ?? undefined,
      showPrivateScores: newShowPrivateScores,
      truthCSV: newTruthCSV.trim() !== '' ? newTruthCSV : undefined,
      teamGroups: newTeamGroups.length ? newTeamGroups : undefined,
    };

    if (creatingCompetition) {
      return;
    }

    setCreatingCompetition(true)
    uploadNewCompetition(payload)
      .then(() => {
        message.success(`New competition created successfully!`);
        onCreated();

        setNewCompetitionName('');
        setNewCompetitionDescription('');
        setNewStartDate('');
        setNewEndDate('');
        setNewSubmissionFileName('');
        setNewSubmissionCooldown(null);
        setNewSubmissionsEnabled(false);
        setNewLeaderboardEnabled(false);
        setNewLeaderboardType(undefined);
        setNewMinTeamSize(null);
        setNewMaxTeamSize(null);
        setNewShowPrivateScores(false);
        setNewtruthCSV('');
        setNewTeamGroups([]);
      })
      .catch((error) => {
        message.error(`Failed to create competition.`);
        console.error('Error creating new competition:', error);
      })
      .finally(() => setCreatingCompetition(false));

  };

  return (
    <div className="createCompetition">
      <h2>Create Competition</h2>
      <p>Enter a new name and create a competition model.</p>
      <TextArea
        rows={1}
        placeholder="Enter competition name"
        value={newCompetitionName}
        onChange={(e) => setNewCompetitionName(e.target.value)}
        className="spaced narrow"
      />
      <div className="spaced">
        <div className='settings-col'>
          <div>
            <span>Submissions Enabled</span>
            <Switch
              checked={newSubmissionsEnabled}
              onChange={setNewSubmissionsEnabled}
            />
          </div>
          <div>
            <span>Show Private Scores</span>
            <Switch
              checked={newShowPrivateScores}
              onChange={setNewShowPrivateScores}
            />
          </div>
          <div>
            <span>Leaderboard Enabled</span>
            <Switch
              checked={newLeaderboardEnabled}
              onChange={setNewLeaderboardEnabled}
            />
          </div>
          <div>
            <span>Leaderboard Type</span>
            <Select
              placeholder="Select Leaderboard Type"
              className="type-select"
              value={newLeaderboardType}
              onChange={setNewLeaderboardType}
              options={leaderboardTypeOptions}
            />
          </div>
          <div>
            <span>Min Team Size</span>
            <InputNumber
              min={1}
              value={newMinTeamSize}
              onChange={setNewMinTeamSize}
              placeholder="Min"
            />
          </div>
          <div>
            <span>Max Team Size</span>
            <InputNumber
              min={1}
              value={newMaxTeamSize}
              onChange={setNewMaxTeamSize}
              placeholder="Max"
            />
          </div>
          <div>
            <span>Submission Cooldown in Seconds (default: 60)</span>
            <InputNumber
              min={0}
              value={newSubmissionCooldown}
              onChange={setNewSubmissionCooldown}
              placeholder="Cooldown"
            />
          </div>
          <div>
            <span>Start Date</span>
            <input
              type="datetime-local"
              value={newStartDate}
              onChange={(e) => setNewStartDate(e.target.value)}
            />
          </div>
          <div>
            <span>End Date</span>
            <input
              type="datetime-local"
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
            />
          </div>
          <div>
            <span>Submission File Name</span>
            <TextArea
              rows={1}
              placeholder="Enter submission file name"
              value={newSubmissionFileName}
              onChange={(e) => setNewSubmissionFileName(e.target.value)}
              className="spaced narrow"
            />
          </div>
          <div>
            <span>Divisions (optional)</span>
            <Select
              mode="tags"
              placeholder="Type a division, press Enter"
              value={newTeamGroups}
              onChange={(groups: string[]) => setNewTeamGroups(cleanGroups(groups))}
              open={false}
              className="divisions-select"
            />
          </div>
          <div>
            <span>Truth CSV (not required, leave blank if not used)</span>
            <TextArea
              rows={1}
              placeholder="Enter Truth CSV"
              value={newTruthCSV}
              onChange={(e) => setNewtruthCSV(e.target.value)}
              className="spaced narrow"
            />
          </div>
        </div>
      </div>

      <label htmlFor='newCompDescription'>Enter a description: </label>
      <TextArea
        rows={4}
        id="newCompDescription"
        name="newCompDescription"
        placeholder="Competition description"
        value={newCompetitionDescription}
        onChange={(e) => setNewCompetitionDescription(e.target.value)}
        className="spaced"
      />
      {newCompetitionDescription && (
        <div className="markdownPreview spaced">
          <span className="previewLabel">Preview</span>
          <Remark>{newCompetitionDescription}</Remark>
        </div>
      )}
      <Button
        type="primary"
        onClick={handleNewCompetition}
        loading={creatingCompetition}
        className="action"
      >
        Create New Competition
      </Button>
    </div>
  );
}
