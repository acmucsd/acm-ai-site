import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../../components/layouts/default';
import './index.less';
import { Link, useParams } from 'react-router-dom';
import { getSubmissionDetails } from '../../../../actions/teams/utils';
import { Button } from 'antd';
import BackLink from '../../../../components/BackLink';

const CompetitionSubmissionDetailsPage = () => {
  let { competitionName, submissionId, teamName } = useParams<{
    competitionName: string;
    teamName: string;
    submissionId: string;
  }>();

  const [submissionDetails, setSubmissionDetails] = useState<any>(null);

  useEffect(() => {
    getSubmissionDetails(competitionName, submissionId).then((res) => {
      setSubmissionDetails(res.data);
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="SubmissionDetailsPage">
        <br />
        <Link to={`../`}>
          <Button className="headerbtn">Back to Team</Button>
        </Link>
        <h2>Submission {submissionId}</h2>
        <div>{JSON.stringify(submissionDetails)}</div>
      </div>
    </DefaultLayout>
  );
};
export default CompetitionSubmissionDetailsPage;
