import { useCallback, useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import {
  profileData,
  UserProfile,
} from '../../actions/users';
import { Row, Col, Layout, Button, Flex, message, Upload, Space } from 'antd';
import MainFooter from '../../components/MainFooter';
import { useHistory } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
// import { uploadCompetitionResults } from '../../actions/competition';
const { Content } = Layout;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

export default function AdminPortalPage(props: any) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingResults, setUploadingResults] = useState(false);
  const [resultsFile, setResultsFile] = useState<File | null>(null);
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

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

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

  const handleUploadResults = () => {
    if (!resultsFile) {
      message.error('Please select a CSV file to upload for competition results.');
      return;
    }

    setUploadingResults(true);

    // uploadCompetitionResults(resultsFile)
    //   .then(() => {
    //     message.success('Competition results uploaded successfully!');
    //     setResultsFile(null);
    //   })
    //   .catch((error) => {
    //     message.error('Failed to upload competition results.');
    //     console.error('Upload error:', error);
    //   })
    //   .finally(() => {
    //     setUploadingResults(false);
    //   });

    // simulating
    setTimeout(() => {
      message.success('Simulated: Competition results uploaded successfully!');
      setResultsFile(null);
      setUploadingResults(false);
    }, 1000);
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

            <Upload
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