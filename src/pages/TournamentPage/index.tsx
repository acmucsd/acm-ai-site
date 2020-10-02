import React, { useEffect, useState, useContext } from 'react';
import './index.less';
import { useParams, Link, useHistory } from 'react-router-dom';
import DefaultLayout from "../../components/layouts/default";
import { getMatches } from '../../actions/tournament';
import TournamentActionButton from '../../components/TournamentActionButton';
import { Button } from 'antd';
import UserContext from '../../UserContext';
import TournamentContext from '../../contexts/tournament';
import BackLink from '../../components/BackLink';
import path from 'path';
import MatchList from '../../components/MatchList';
import { DIMENSION_ID, OPEN_TO_PUBLIC } from '../../configs';

function TournamentPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { tournament } = useContext(TournamentContext);
  const [matches, setMatches] = useState<Array<any>>([]);
  const params: any = useParams();
  // const [tournament, setTournament] = useState<Tournament>();
  //@ts-ignore
  const update = () => {
    // let rankSystem = tournament.configs.rankSystem;

    getMatches(DIMENSION_ID, params.tournamentID).then((res) => {
      let sorted = Object.values(res).sort((a, b) => {
        return (new Date(a.creationDate)).getTime() - (new Date(b.creationDate).getTime());
      })
      setMatches(sorted);
    }).finally(() => {
      setLoading(false);
    })
  }
  useEffect(() => {
    update();
  }, [tournament, DIMENSION_ID, params.tournamentID]);
  return (
    <DefaultLayout>
      <div className='TournamentPage'>
        <br />
        <BackLink to='../../'/>
        <h2>{tournament.name}</h2>
        <Link className='ranks-link' to={
          path.join(history.location.pathname, 'ranks')
        }>Current Ranks</Link>
        <Button onClick={() => {
          history.push(path.join(history.location.pathname, 'upload'));
        }} disabled>Upload Bot</Button>
        {
          tournament.id && user.admin &&
          <TournamentActionButton dimensionID={DIMENSION_ID} tournament={tournament} update={update}/>
        }
        {/* <h3>Ongoing Matches in Tournament</h3>
        {
          <MatchList
            matches={matches}
            loading={loading}
          />
        } */}
      </div>
    </DefaultLayout>
  );
}

export default TournamentPage
