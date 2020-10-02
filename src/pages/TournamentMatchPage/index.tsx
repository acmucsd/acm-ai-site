import React, { useEffect, useState, useContext } from 'react';
import './index.less';
import DefaultLayout from "../../components/layouts/default";
import Match from "../../components/Match";
import { getMatch } from '../../actions/tournament';
import TournamentContext from '../../contexts/tournament';
import { useParams } from 'react-router-dom';
import { Match as DMatch } from 'dimensions-ai';
import BackLink from '../../components/BackLink';
import { DIMENSION_ID } from '../../configs';
function TournamentMatchPage() {
  const { tournament } = useContext(TournamentContext);
  const [match, setMatch] = useState<DMatch>();
  const params: any = useParams();
  useEffect(() => {
    if (tournament.id) {
      getMatch(DIMENSION_ID, tournament.id, params.matchID).then((res) => {
        setMatch(res);
      });
    }
  }, [tournament, DIMENSION_ID, params.matchID]);
  return (
    <DefaultLayout>
      <div className='TournamentMatchPage'>
        <br />
        <BackLink to='../../' />
        { match && 
          <Match 
            match={match}
            dimensionID={DIMENSION_ID}
          />
        }
      </div>
    </DefaultLayout>
  );
}

export default TournamentMatchPage
