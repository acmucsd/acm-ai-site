import { useCallback, useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import {
  profileData,
  UserProfile,
} from '../../actions/users';
import { Layout, Button, Flex, message, Upload, Select, Input, Switch, InputNumber } from 'antd';
import MainFooter from '../../components/MainFooter';
import { useHistory } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { uploadCompetitionResults, getCompetitions, getCompetitionDetails, updateCompetitionDescription, updateCompetitionSettings } from '../../actions/competition';
import { getUsers as fetchUsers, promoteUserToAdmin, promoteUserToPrimaryAdmin } from '../../actions/users';
const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

export default function AdminPortalPage(props: any) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingResults, setUploadingResults] = useState(false);
  const [resultsFile, setResultsFile] = useState<File | null>(null);
  const [selectedCompetition, setSelectedCompetition] = useState<string | undefined>(undefined);
  const [competitions, setCompetitions] = useState<Array<{ competitionName: string }>>([]);
  const [competitionsLoading, setCompetitionsLoading] = useState(true);
  const [competitionDescription, setCompetitionDescription] = useState<string>('');
  const [updatingDescription, setUpdatingDescription] = useState(false);
  const [minTeamSize, setMinTeamSize] = useState<number | undefined>(undefined);
  const [maxTeamSize, setMaxTeamSize] = useState<number | undefined>(undefined);
  const [submissionsEnabled, setSubmissionsEnabled] = useState<boolean>(false);
  const [leaderboardEnabled, setLeaderboardEnabled] = useState<boolean>(false);
  const [updatingSettings, setUpdatingSettings] = useState<boolean>(false);
  const history = useHistory();

  // User Management State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [users, setUsers] = useState<Array<{ username: string }>>([]);
  const [filteredUsers, setFilteredUsers] = useState<Array<{ username: string }>>([]);
  const [selectedUserToPromote, setSelectedUserToPromote] = useState<string | undefined>(undefined);
  const [usersLoading, setUsersLoading] = useState(true);
  const [promotingUser, setPromotingUser] = useState(false);

  // admin check and load
  const checkAdminAccess = useCallback((profile: UserProfile | null) => {
    if (!profile?.admin) {
      message.error('You do not have access to this page.');
      history.push('/profile');
      return false;
    }
    return true;
  }, [history]);

  const loadProfileData = useCallback(() => {
    profileData()
      .then((res) => {
        setUser(res);
        setLoading(false);
        checkAdminAccess(res);
      })
      .catch(() => {
        history.push('/login');
      });
  }, [history, checkAdminAccess]);

  // for competition results upload
  const loadCompetitionsData = useCallback(() => {
    setCompetitionsLoading(true);
    getCompetitions()
      .then((data: { competitions: string[] }) => {
        setCompetitions(data.competitions.map(name => ({ competitionName: name })));
        setCompetitionsLoading(false);
      })
      .catch((error) => {
        message.error('Failed to load competitions.');
        console.error('Error loading competitions:', error);
        setCompetitionsLoading(false);
      });
  }, [getCompetitions]);

  // for competition description upload
  const loadCompetitionDescription = useCallback((competitionName: string) => {
    if (competitionName) {
      setCompetitionsLoading(true);
      getCompetitionDetails(competitionName)
        .then((data: any) => {
          setCompetitionDescription(data.description || '');
          // Try to map various possible backend field names
          const minSize =
            (typeof data.minTeamSize === 'number' && data.minTeamSize) ||
            (typeof data.teamSizeMin === 'number' && data.teamSizeMin) ||
            undefined;
          const maxSize =
            (typeof data.maxTeamSize === 'number' && data.maxTeamSize) ||
            (typeof data.teamSizeMax === 'number' && data.teamSizeMax) ||
            undefined;
          const subsEnabled =
            typeof data.submissionsEnabled === 'boolean'
              ? data.submissionsEnabled
              : false;
          const lbEnabled =
            typeof data.leaderboardEnabled === 'boolean'
              ? data.leaderboardEnabled
              : false;
          setMinTeamSize(minSize);
          setMaxTeamSize(maxSize);
          setSubmissionsEnabled(subsEnabled);
          setLeaderboardEnabled(lbEnabled);
          setCompetitionsLoading(false);
        })
        .catch((error) => {
          message.error(`Failed to load details for ${competitionName}.`);
          console.error('Error loading competition details:', error);
          setCompetitionsLoading(false);
          setCompetitionDescription('');
          setMinTeamSize(undefined);
          setMaxTeamSize(undefined);
          setSubmissionsEnabled(false);
          setLeaderboardEnabled(false);
        });
    } else {
      setCompetitionDescription('');
      setMinTeamSize(undefined);
      setMaxTeamSize(undefined);
      setSubmissionsEnabled(false);
      setLeaderboardEnabled(false);
    }
  }, [getCompetitionDetails]);

  // for admin promotion
  const loadUsersData = useCallback(() => {
    setUsersLoading(true);
    fetchUsers()
      .then((data: { users: string[] }) => {
        const userList = data.users.map(username => ({ username }));
        setUsers(userList);
        setFilteredUsers(userList);
        setUsersLoading(false);
      })
      .catch((error) => {
        message.error('Failed to load users.');
        console.error('Error loading users:', error);
        setUsersLoading(false);
      });
  }, [fetchUsers]);

  useEffect(() => {
    loadProfileData();
    loadCompetitionsData();
    loadUsersData();
  }, [loadProfileData, loadCompetitionsData, loadUsersData]);

  useEffect(() => {
    if (selectedCompetition) {
      loadCompetitionDescription(selectedCompetition);
    }
  }, [selectedCompetition, loadCompetitionDescription]);

  // file upload
  const handleResultsFileChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file selected successfully`);
      setResultsFile(info.file.originFileObj as File);
    } else if (info.file.status === 'removed') {
      setResultsFile(null);
    }
  };

  const beforeResultsUpload = (file: File) => {
    const isCSV = file.type === 'text/csv' || file.name.endsWith('.csv');
    if (!isCSV) {
      message.error('You can only upload CSV files for results!');
    }
    return isCSV;
  };

  // Prevent the default upload behavior
  const dummyRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleCompetitionSelect = (value: string) => {
    setSelectedCompetition(value);
  };

  const handleUploadResults = () => {
    if (!resultsFile) {
      message.error('Please select a CSV file to upload for competition results.');
      return;
    } 
    if (!selectedCompetition) {
      message.error('Please select a competition to upload results for.');
      return;
    }

    setUploadingResults(true);

    uploadCompetitionResults(resultsFile, selectedCompetition)
      .then(() => {
        message.success('Competition results uploaded successfully!');
        setResultsFile(null);
      })
      .catch((error) => {
        message.error('Failed to upload competition results.');
        console.error('Upload error:', error);
        throw error;
      })
      .finally(() => {
        setUploadingResults(false);
      });

  };

  // comp description change
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCompetitionDescription(e.target.value);
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
    if (
      typeof minTeamSize === 'number' &&
      typeof maxTeamSize === 'number' &&
      minTeamSize > maxTeamSize
    ) {
      message.error('Min team size cannot be greater than max team size.');
      return;
    }

    setUpdatingSettings(true);
    const payload: any = {};
    if (typeof minTeamSize === 'number') payload.minTeamSize = minTeamSize;
    if (typeof maxTeamSize === 'number') payload.maxTeamSize = maxTeamSize;
    payload.submissionsEnabled = submissionsEnabled;
    payload.leaderboardEnabled = leaderboardEnabled;

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

  // admin promotion
  const handleSearchUser = (value: string) => {
    setSearchTerm(value);
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleUserSelect = (value: string) => {
    setSelectedUserToPromote(value);
  };

  const handlePromoteToAdmin = () => {
    if (!selectedUserToPromote) {
      message.error('Please select a user to promote.');
      return;
    }
    setPromotingUser(true);
    promoteUserToAdmin(selectedUserToPromote)
      .then(() => {
        message.success(`${selectedUserToPromote} has been promoted to admin.`);
        setSelectedUserToPromote(undefined);
        loadUsersData(); 
      })
      .catch((error) => {
        message.error(`Failed to promote ${selectedUserToPromote} to admin.`);
        console.error('Error promoting user:', error);
      })
      .finally(() => {
        setPromotingUser(false);
      });
  };

  const handlePromoteToPrimaryAdmin = () => {
    if (!selectedUserToPromote) {
      message.error('Please select a user to promote to primary admin.');
      return;
    }
    setPromotingUser(true);
    promoteUserToPrimaryAdmin(selectedUserToPromote)
      .then(() => {
        message.success(`${selectedUserToPromote} has been promoted to primary admin.`);
        setSelectedUserToPromote(undefined);
        loadUsersData();
      })
      .catch((error) => {
        message.error(`Failed to promote ${selectedUserToPromote} to primary admin.`);
        console.error('Error promoting user:', error);
      })
      .finally(() => {
        setPromotingUser(false);
      });
  };

  if (loading) {
    return <DefaultLayout>Loading...</DefaultLayout>;
  }

  if (!user?.admin) {
    return null;
  }

  return (
    <DefaultLayout>
      <Content className="AdminPortalPage">
        <Content>
          <Flex
            className="profileHeader"
            justify="space-between"
            align="center"
          >
            <h1 className="title2">
              {!loading && user ? (
                <>
                  Welcome admin,{' '}
                  <span className="profileName">{user.username}.</span>
                </>
              ) : (
                <></>
              )}
            </h1>
          </Flex>
        </Content>
        <Content className="settings">
          <div className="competitionResults">
            <h2>Upload Competition Results</h2>
            <p>Select a CSV file containing competition results.</p>

            <Select
              placeholder="Select Competition"
              className="competitionDropdown"
              style={{ width: '80%', maxWidth: 300, margin: '10px 0px'}}
              onChange={handleCompetitionSelect}
              value={selectedCompetition}
              loading={competitionsLoading}
            >
              {competitions.map((comp) => (
                <Option key={comp.competitionName} value={comp.competitionName}>
                  {comp.competitionName}
                </Option>
              ))}
            </Select>

            <Upload
              className="competitionUpload"
              beforeUpload={beforeResultsUpload}
              onChange={handleResultsFileChange}
              maxCount={1}
              accept=".csv, text/csv"
              onRemove={() => setResultsFile(null)}
              customRequest={dummyRequest}
            >
              <Button icon={<UploadOutlined />}>Select CSV File</Button>
            </Upload>

            <Button
              type="primary"
              onClick={handleUploadResults}
              disabled={!resultsFile || uploadingResults}
              loading={uploadingResults}
              style={{ marginTop: '10px' }}
            >
              Upload Results
            </Button>
          </div>

          <div className="competitionDescription"> {/* This is called competitionDescription, but it updates other properties as well.*/}
            <h2>Update Competition</h2>
            <p>Select a competition to update. Description should be formatted in Markdown.</p>

              <div className="competitionDescriptionSettings">
                <Select
                  placeholder="Select Competition"
                  className="competitionDropdown"
                  style={{ margin: '10px 0px'}}
                  onChange={handleCompetitionSelect}
                  value={selectedCompetition}
                  loading={competitionsLoading}
                >
                  {competitions.map((comp) => (
                    <Option key={comp.competitionName} value={comp.competitionName}>
                      {comp.competitionName}
                    </Option>
                  ))}
                </Select>

                {selectedCompetition && (
                  <>
                    <div style={{ margin: '10px 0px' }}>
                      <div style={{ display: 'flex', gap: 12.5, alignItems: 'center', flexWrap: 'wrap' }}>
                        <div>
                          <span style={{ marginRight: 8 }}>Submissions Enabled</span>
                          <Switch
                            checked={submissionsEnabled}
                            onChange={setSubmissionsEnabled}
                          />
                        </div>
                        <div>
                          <span style={{ marginRight: 8 }}>Leaderboard Enabled</span>
                          <Switch
                            checked={leaderboardEnabled}
                            onChange={setLeaderboardEnabled}
                          />
                        </div>
                        <div>
                          <span style={{ marginRight: 8 }}>Min Team Size</span>
                          <InputNumber
                            min={1}
                            max={50}
                            value={minTeamSize}
                            onChange={(v) => setMinTeamSize(typeof v === 'number' ? v : undefined)}
                          />
                        </div>
                        <div>
                          <span style={{ marginRight: 8}}>Max Team Size</span>
                          <InputNumber
                            min={1}
                            max={50}
                            value={maxTeamSize}
                            onChange={(v) => setMaxTeamSize(typeof v === 'number' ? v : undefined)}
                          />
                        </div>
                      </div>
                      <Button
                        type="primary"
                        onClick={handleUpdateSettings}
                        disabled={!selectedCompetition || updatingSettings}
                        loading={updatingSettings}
                        style={{ marginTop: '10px', maxWidth: 300 }}
                      >
                        Update Settings
                      </Button>
                    </div>

                    <TextArea
                      rows={4}
                      placeholder="Enter new description"
                      value={competitionDescription}
                      onChange={handleDescriptionChange}
                      style={{  margin: '10px 0px'}}
                    />
                  </>
                )}
              </div>
            

            <Button
              type="primary"
              onClick={handleUpdateDescription}
              disabled={!selectedCompetition || updatingDescription}
              loading={updatingDescription}
              style={{ marginTop: '10px', maxWidth: 300}}
            >
              Set New Description
            </Button>
          </div>

          <div className="userManagement">
            <h2>Manage Users</h2>
            <p>Search for a user and promote them to admin or primary admin.</p>

            <Select
              showSearch
              placeholder="Search User"
              className="userSearchDropdown"
              style={{ width: '80%', maxWidth: 300, margin: '10px 0px' }}
              value={selectedUserToPromote}
              onChange={handleUserSelect}
              onSearch={handleSearchUser}
              loading={usersLoading}
              filterOption={(input, option) =>
                (option?.value as string)?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {filteredUsers.map((user) => (
                <Option key={user.username} value={user.username}>
                  {user.username}
                </Option>
              ))}
            </Select>

            {selectedUserToPromote && (
              <Flex gap="middle" style={{ marginTop: '10px' }}>
                <Button
                  type="primary"
                  onClick={handlePromoteToAdmin}
                  loading={promotingUser}
                >
                  Promote to Admin
                </Button>
                <Button
                  type="primary"
                  onClick={handlePromoteToPrimaryAdmin}
                  loading={promotingUser}
                >
                  Promote to Primary Admin
                </Button>
              </Flex>
            )}
          </div>
        </Content>
        <MainFooter />
      </Content>
    </DefaultLayout>
  );
}
