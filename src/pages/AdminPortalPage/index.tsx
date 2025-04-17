import { useCallback, useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import {
  profileData,
  UserProfile,
} from '../../actions/users';
import { Layout, Button, Flex, message, Upload, Select } from 'antd';
import MainFooter from '../../components/MainFooter';
import { useHistory } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { uploadCompetitionResults, getCompetitions } from '../../actions/competition';
const { Content } = Layout;
const { Option } = Select;

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
  const history = useHistory();

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

  useEffect(() => {
    loadProfileData();
    loadCompetitionsData();
  }, [loadProfileData, loadCompetitionsData]);

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

          <div className="compResults">
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
        </Content>
        <MainFooter />
      </Content>
    </DefaultLayout>
  );
}