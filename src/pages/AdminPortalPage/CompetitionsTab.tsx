import { useCallback, useEffect, useState } from 'react';
import { Button, Flex, Input, InputNumber, Popconfirm, Select, Switch, message } from 'antd';
import { Remark } from 'react-remark';
import {
  getCompetitionDetails,
  updateCompetitionDescription,
  updateCompetitionSettings,
  renameCompetition,
  LeaderboardType,
} from '../../actions/competition';
import CreateCompetition from './CreateCompetition';
import { cleanGroups, leaderboardTypeOptions } from './competitionFields';

const { Option } = Select;
const { TextArea } = Input;

// ISO date -> datetime-local input value, in the admin's timezone
const toLocalInput = (iso?: string) => {
  if (!iso) return '';
  const date = new Date(iso);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

type CompetitionsTabProps = {
  competitions: string[];
  competitionsLoading: boolean;
  primaryAdmin: boolean;
  reloadCompetitions: () => void;
};

export default function CompetitionsTab({ competitions, competitionsLoading, primaryAdmin, reloadCompetitions }: CompetitionsTabProps) {
  const [selectedCompetition, setSelectedCompetition] = useState<string | undefined>(undefined);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [renameTo, setRenameTo] = useState('');
  const [competitionDescription, setCompetitionDescription] = useState<string>('');
  const [updatingDescription, setUpdatingDescription] = useState(false);
  const [submissionsEnabled, setSubmissionsEnabled] = useState<boolean>(false);
  const [showPrivateScores, setShowPrivateScores] = useState<boolean>(false);
  const [leaderboardEnabled, setLeaderboardEnabled] = useState<boolean>(false);
  const [inPortal, setInPortal] = useState<boolean>(false);
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>();
  const [submissionFileName, setSubmissionFileName] = useState<string>('');
  const [minTeamSize, setMinTeamSize] = useState<number | null>(null);
  const [maxTeamSize, setMaxTeamSize] = useState<number | null>(null);
  const [submissionCooldown, setSubmissionCooldown] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [teamGroups, setTeamGroups] = useState<string[]>([]);
  const [updatingSettings, setUpdatingSettings] = useState<boolean>(false);

  const loadCompetitionDescription = useCallback((competitionName: string) => {
    setDetailsLoading(true);
    getCompetitionDetails(competitionName)
      .then((data: any) => {
        setCompetitionDescription(data.description || '');
        setSubmissionsEnabled(data.submissionsEnabled === true);
        setShowPrivateScores(data.showPrivateScores === true);
        setLeaderboardEnabled(data.leaderboardEnabled === true);
        setInPortal(data.inPortal === true);
        setLeaderboardType(data.leaderboardType);
        setSubmissionFileName(data.submissionFileName ?? '');
        setMinTeamSize(typeof data.minTeamSize === 'number' ? data.minTeamSize : null);
        setMaxTeamSize(typeof data.maxTeamSize === 'number' ? data.maxTeamSize : null);
        setSubmissionCooldown(data.submissionCooldown ?? null);
        setStartDate(toLocalInput(data.startDate));
        setEndDate(toLocalInput(data.endDate));
        setTeamGroups(data.teamGroups ?? []);
      })
      .catch((error) => {
        message.error(`Failed to load details for ${competitionName}.`);
        console.error('Error loading competition details:', error);
        setCompetitionDescription('');
        setSubmissionsEnabled(false);
        setShowPrivateScores(false);
        setLeaderboardEnabled(false);
        setInPortal(false);
        setLeaderboardType(undefined);
        setSubmissionFileName('');
        setMinTeamSize(null);
        setMaxTeamSize(null);
        setSubmissionCooldown(null);
        setStartDate('');
        setEndDate('');
        setTeamGroups([]);
      })
      .finally(() => setDetailsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedCompetition) {
      loadCompetitionDescription(selectedCompetition);
    }
  }, [selectedCompetition, loadCompetitionDescription]);

  const handleRenameCompetition = () => {
    renameCompetition(selectedCompetition!, renameTo.trim())
      .then(({ competitionName }) => {
        message.success(`Renamed ${selectedCompetition} to ${competitionName}.`);
        setRenameTo('');
        setSelectedCompetition(competitionName);
        reloadCompetitions();
      })
      .catch((error) => message.error(error.response?.data?.error?.message ?? 'Failed to rename competition.'));
  };

  const handleUpdateDescription = () => {
    if (!selectedCompetition) {
      message.error('Please select a competition to update the description for.');
      return;
    }
    if (!competitionDescription) {
      message.error('Please enter a new description.');
      return;
    }

    setUpdatingDescription(true);
    updateCompetitionDescription(selectedCompetition, competitionDescription)
      .then(() => {
        message.success(`Description for ${selectedCompetition} updated successfully!`);
      })
      .catch((error) => {
        message.error(`Failed to update description for ${selectedCompetition}.`);
        console.error('Error updating description:', error);
      })
      .finally(() => {
        setUpdatingDescription(false);
      });
  };

  const handleUpdateSettings = () => {
    if (!selectedCompetition) {
      message.error('Please select a competition to update settings for.');
      return;
    }
    if (!leaderboardType) {
      message.error('Please select a leaderboard type.');
      return;
    }
    if (!submissionFileName.trim()) {
      message.error('Please enter a submission file name.');
      return;
    }
    if (
      typeof minTeamSize === 'number' &&
      typeof maxTeamSize === 'number' &&
      minTeamSize > maxTeamSize
    ) {
      message.error('Min team size cannot be greater than max team size.');
      return;
    }
    if (!startDate || !endDate) {
      message.error('Please enter a start and end date.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      message.error('Start date cannot be after end date.');
      return;
    }
    setUpdatingSettings(true);
    const payload = {
      submissionsEnabled,
      showPrivateScores,
      leaderboardEnabled,
      inPortal,
      leaderboardType,
      submissionFileName: submissionFileName.trim(),
      minTeamSize: typeof minTeamSize === 'number' ? minTeamSize : undefined,
      maxTeamSize: typeof maxTeamSize === 'number' ? maxTeamSize : undefined,
      submissionCooldown: submissionCooldown ?? undefined,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      teamGroups: teamGroups.length ? teamGroups : null,
    };

    updateCompetitionSettings(selectedCompetition, payload)
      .then(() => {
        message.success(`Settings for ${selectedCompetition} updated successfully!`);
      })
      .catch((error) => {
        message.error(`Failed to update settings for ${selectedCompetition}.`);
        console.error('Error updating competition settings:', error);
      })
      .finally(() => setUpdatingSettings(false));
  };

  return (
    <>
      <div className="competitionDescription"> {/* This is called competitionDescription, but it updates other properties as well.*/}
        <h2>Update Competition</h2>
        <p>Select a competition to update. Description should be formatted in Markdown.</p>

        <div className="competitionDescriptionSettings">
          <Select
            placeholder="Select Competition"
            className="competitionDropdown spaced"
            onChange={setSelectedCompetition}
            value={selectedCompetition}
            loading={competitionsLoading || detailsLoading}
          >
            {competitions.map((name) => (
              <Option key={name} value={name}>
                {name}
              </Option>
            ))}
          </Select>

          {selectedCompetition && primaryAdmin && (
            <Flex gap="small" className="spaced">
              <Input
                placeholder="New competition name"
                value={renameTo}
                onChange={(e) => setRenameTo(e.target.value)}
              />
              <Popconfirm
                title={`Rename ${selectedCompetition} to ${renameTo.trim()}?`}
                description="Links using the old name stop working. Make sure to manually update competitionsData.json if needed."
                onConfirm={handleRenameCompetition}
                disabled={!renameTo.trim()}
              >
                <Button disabled={!renameTo.trim()}>Rename</Button>
              </Popconfirm>
            </Flex>
          )}

          {selectedCompetition && (
            <>
              <div className="spaced">
                <div className='settings-col'>
                  <div>
                    <span>Submissions Enabled</span>
                    <Switch
                      checked={submissionsEnabled}
                      onChange={setSubmissionsEnabled}
                    />
                  </div>
                  <div>
                    <span>Show Private Scores</span>
                    <Switch
                      checked={showPrivateScores}
                      onChange={setShowPrivateScores}
                    />
                  </div>
                  <div>
                    <span>Leaderboard Enabled</span>
                    <Switch
                      checked={leaderboardEnabled}
                      onChange={setLeaderboardEnabled}
                    />
                  </div>
                  <div>
                    <span>Show in Portal</span>
                    <Switch
                      checked={inPortal}
                      onChange={setInPortal}
                    />
                  </div>
                  <div>
                    <span>Leaderboard Type</span>
                    <Select
                      placeholder="Select Leaderboard Type"
                      className="type-select"
                      value={leaderboardType}
                      onChange={setLeaderboardType}
                      options={leaderboardTypeOptions}
                    />
                  </div>
                  <div>
                    <span>Min Team Size</span>
                    <InputNumber
                      min={1}
                      value={minTeamSize}
                      onChange={setMinTeamSize}
                      placeholder="Min"
                    />
                  </div>
                  <div>
                    <span>Max Team Size</span>
                    <InputNumber
                      min={1}
                      value={maxTeamSize}
                      onChange={setMaxTeamSize}
                      placeholder="Max"
                    />
                  </div>
                  <div>
                    <span>Submission Cooldown in Seconds</span>
                    <InputNumber
                      min={0}
                      value={submissionCooldown}
                      onChange={setSubmissionCooldown}
                      placeholder="Cooldown"
                    />
                  </div>
                  <div>
                    <span>Start Date</span>
                    <input
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <span>End Date</span>
                    <input
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <span>Submission File Name</span>
                    <TextArea
                      rows={1}
                      placeholder="Enter submission file name"
                      value={submissionFileName}
                      onChange={(e) => setSubmissionFileName(e.target.value)}
                      className="narrow"
                    />
                  </div>
                  <div>
                    <span>Divisions (optional)</span>
                    <Select
                      mode="tags"
                      placeholder="Type a division, press Enter"
                      value={teamGroups}
                      onChange={(groups: string[]) => setTeamGroups(cleanGroups(groups))}
                      open={false}
                      className="divisions-select"
                    />
                  </div>
                </div>
                <Button
                  type="primary"
                  onClick={handleUpdateSettings}
                  disabled={!selectedCompetition || updatingSettings}
                  loading={updatingSettings}
                  className="action"
                >
                  Update Settings
                </Button>
              </div>

              <TextArea
                rows={4}
                placeholder="Enter new description"
                value={competitionDescription}
                onChange={(e) => setCompetitionDescription(e.target.value)}
                className="spaced"
              />
              {competitionDescription && (
                <div className="markdownPreview spaced">
                  <span className="previewLabel">Preview</span>
                  <Remark>{competitionDescription}</Remark>
                </div>
              )}
            </>
          )}
        </div>

        <Button
          type="primary"
          onClick={handleUpdateDescription}
          disabled={!selectedCompetition || updatingDescription}
          loading={updatingDescription}
          className="action"
        >
          Set New Description
        </Button>
      </div>

      <CreateCompetition onCreated={reloadCompetitions} />
    </>
  );
}
