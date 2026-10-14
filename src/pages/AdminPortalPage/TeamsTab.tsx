import { useEffect, useState } from 'react';
import { Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadCompetitionResults } from '../../actions/competition';
import TeamsAdmin from './TeamsAdmin';

const { Option } = Select;

// Prevent the default upload behavior
const dummyRequest = ({ onSuccess }: any) => {
  setTimeout(() => {
    onSuccess('ok');
  }, 0);
};

const beforeResultsUpload = (file: File) => {
  const isCSV = file.type === 'text/csv' || file.name.endsWith('.csv');
  if (!isCSV) {
    message.error('You can only upload CSV files for results!');
  }
  return isCSV;
};

type TeamsTabProps = {
  competitions: string[];
  competitionsLoading: boolean;
};

export default function TeamsTab({ competitions, competitionsLoading }: TeamsTabProps) {
  const [uploadingResults, setUploadingResults] = useState(false);
  const [resultsFile, setResultsFile] = useState<File | null>(null);
  const [resultsCompetition, setResultsCompetition] = useState<string>();

  // clear selection when its competition is renamed
  useEffect(() => {
    if (resultsCompetition && !competitions.includes(resultsCompetition)) setResultsCompetition(undefined);
  }, [competitions, resultsCompetition]);

  const handleResultsFileChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file selected successfully`);
      setResultsFile(info.file.originFileObj as File);
    } else if (info.file.status === 'removed') {
      setResultsFile(null);
    }
  };

  const handleUploadResults = () => {
    if (!resultsFile) {
      message.error('Please select a CSV file to upload for competition results.');
      return;
    }
    if (!resultsCompetition) {
      message.error('Please select a competition to upload results for.');
      return;
    }

    setUploadingResults(true);

    uploadCompetitionResults(resultsFile, resultsCompetition)
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

  return (
    <>
      <div className="teamsAdmin">
        <h2>Manage Teams</h2>
        <p>View a team's submissions, set its score, or disqualify it.</p>
        <TeamsAdmin competitions={competitions} />
      </div>

      <div className="competitionResults">
        <h2>Upload Competition Results</h2>
        <p>Select a CSV file containing competition results.</p>

        <Select
          placeholder="Select Competition"
          className="competitionDropdown field"
          onChange={setResultsCompetition}
          value={resultsCompetition}
          loading={competitionsLoading}
        >
          {competitions.map((name) => (
            <Option key={name} value={name}>
              {name}
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
          className="spaced-top"
        >
          Upload Results
        </Button>
      </div>
    </>
  );
}
