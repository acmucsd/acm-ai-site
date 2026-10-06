import React, { useEffect, useState, useContext } from 'react';
import './index.less';
import DefaultLayout from '../../../components/layouts/default';
import { Button, Upload, message, Input } from 'antd';
import { useForm } from 'react-hook-form';
// import Card from '../../../components/Card';
import { useHistory, useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { uploadSubmission, getSubmissionFileName } from '../../../actions/competition';
import UserContext from '../../../UserContext';
import { minimatch } from 'minimatch';
import path from 'path';
import BackLink from '../../../components/BackLink';
// import CheckableTagList from '../../../components/CheckableTagList'

const { TextArea } = Input;
const MAX_UPLOAD_SIZE_BYTES = 80 * 1024 * 1024;

const CompetitionUploadPage = () => {
  // const tags = ['feather weight', 'middle weight', 'heavy weight']
  // const [tagsChecked, setTagsChecked] = useState<boolean[]>(Array(tags.length).fill(false))

  const [desc, setDesc] = useState<string>('');

  const { handleSubmit } = useForm();
  const [submissionFile, setFile] = useState<any>();
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { id } = useParams() as { id: string };
  const competitionID = id;

  const [submissionFilePattern, setSubmissionFilePattern] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  useEffect(() => {
    if (competitionID) {
      getSubmissionFileName(competitionID)
        .then((data: any) => {
          setSubmissionFilePattern(data.submissionFileName || '');
        })
        .catch((error) => {
          message.error(`Failed to load submission file name pattern for ${competitionID}.`);
          console.error('Error loading competition submission file name:', error);
          setSubmissionFilePattern('');
        });
    }
  }, [competitionID]);

  useEffect(() => {
    if (!user.loggedIn) {
      message.info('You need to login to upload submissions and participate');
      history.replace(path.join(window.location.pathname, '../../../login'));
    }
  }, []);

  const onSubmit = () => {
    setUploading(true);
    uploadSubmission(
      submissionFile,
      [],
      desc,
      competitionID,
      user.username as string
    )
      .then((res) => {
        message.success('Submission Uploaded Succesfully');
        localStorage.setItem("activeTab", JSON.stringify('3'));
        history.replace('/portal');
      })
      .catch((err) => {
        console.error(err);
        message.error(`${err}`);
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleFileChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file added successfully`);

      let file: any = info.file;
      setFile(file.originFileObj);
    }
  };

  const beforeUpload = (file: any) => {
    const isZipFile = file.name.toLowerCase().endsWith('.zip');
    if (!isZipFile) {
      message.error('You can only upload ZIP files!');
      return false;
    }

    const isWithinSizeLimit = file.size <= MAX_UPLOAD_SIZE_BYTES;
    if (!isWithinSizeLimit) {
      message.error(`File must be ${MAX_UPLOAD_SIZE_BYTES / (1024 * 1024)}MB or smaller.`);
      return false;
    }

    if (submissionFilePattern) {
      if (!minimatch(file.name, submissionFilePattern)) {
        message.error(`"${file.name}" does not match the required file name pattern: ${submissionFilePattern}`);
        return false;
      }
    }

    return true;
  };

  return (
    <DefaultLayout>
      <div className="CompetitionUploadPage">
        <br />
        <BackLink to="../" />
        <h2>Submission to {competitionID}</h2>
        <p>
          You must submit a .zip file{submissionFilePattern ? ` matching the pattern: ${submissionFilePattern}` : ''} that contains your submission.
        </p>
        <br />
        {/* <Form> */}
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <div className="upload-wrapper">
              {/* <TextArea
                className="desc"
                rows={2}
                value={desc}
                onChange={(evt) => setDesc(evt.target.value)}
              /> */}
              <Upload onChange={handleFileChange} 
                      customRequest={dummyRequest} 
                      beforeUpload={beforeUpload}
                      accept=".zip,application/zip,application/x-zip-compressed"
              >
                <Button className="upload-btn">
                  <UploadOutlined /> Click to add file
                </Button>
              </Upload>
            </div>
            <Button
              htmlType="submit"
              className="submit-button"
              onClick={handleSubmit(onSubmit)}
              disabled={uploading}
            >
              {uploading ? "Running benchmark" : "Submit"}
            </Button>
          {/* </form> */}
        {/* </Form> */}
      </div>
    </DefaultLayout>
  );
};

export default CompetitionUploadPage;
