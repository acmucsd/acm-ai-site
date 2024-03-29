import React, { useEffect, useState, useContext } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { useParams, useHistory } from 'react-router-dom';
import {
  downloadBot,
  getPlayerMatches,
} from '../../actions/dimensions/tournament';
import { Match } from '../../types/dimensions';
import { getUser } from '../../actions/dimensions/dimensions';
// import { Database } from 'dimensions-ai/lib/es6/Plugin/Database';
import TournamentContext from '../../contexts/tournament';
import { Skeleton, Divider, Button, message } from 'antd';
import UserContext from '../../UserContext';
import MatchList from '../../components/Energium2020/MatchList';

function ProfilePage({ competitionKey }: { competitionKey: string }) {
  const params: any = useParams();
  const history = useHistory();
  const [dbuser, setUser] = useState<any>();
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState<any>({});
  const { tournament } = useContext(TournamentContext);
  const [matches, setMatches] = useState<Array<Match>>([]);
  const [ranksystem, setRankSystem] = useState<string>();
  useEffect(() => {
    if (tournament.id) {
      setRankSystem(tournament.configs.rankSystem as string);
      let tourneyKey = tournament.name.replace(/ /g, '_') + '_' + tournament.id;
      getUser(tournament.dimID, params.userID)
        .then((res) => {
          setUser(res);
          if (res.statistics) {
            let s = res.statistics![tourneyKey];
            if (s) {
              setStats(s);
            }
          }
        })
        .catch((err) => {
          if (!user.loggedIn) {
            message.error('You need to login first!');
          } else {
            message.error(err.message);
          }
          history.push('../');
        });
      getPlayerMatches(
        tournament.dimID,
        tournament.id,
        params.userID,
        0,
        20
      ).then((matches) => {
        matches = matches.map((m) => {
          // @ts-ignore
          m.matchStatus = 'finished';
          return m;
        });
        setMatches(matches);
      });
    }
  }, [tournament]);
  return (
    <DefaultLayout>
      <div className="ProfilePage">
        <h1>Profile page</h1>
        <h2>{dbuser?.username}</h2>
        <Divider></Divider>
        <div>
          <h3>Bot Status</h3>
          {stats &&
            stats.player &&
            (stats.player.disabled ? (
              <p className="danger">
                Disabled due to compile error, please reupload your bot after it
                compiles locally
              </p>
            ) : (
              <p>Running</p>
            ))}
        </div>
        <div className="statistics">
          <h3>Statistics for Tournament: {tournament.configs.name}</h3>
          <Skeleton loading={!stats && !stats.player}>
            <p>Matches Played with Current Bot: {stats.matchesPlayed}</p>
            {ranksystem === 'trueskill' && (
              <div>
                {stats.rankState && [
                  <p>
                    Score (Mu - 3 * Sigma):{' '}
                    {stats?.rankState.rating.mu -
                      3 * stats?.rankState.rating.sigma}
                  </p>,
                  <p>Mu (µ): {stats?.rankState.rating.mu}</p>,
                  <p>Sigma (σ): {stats?.rankState.rating.sigma}</p>,
                ]}
              </div>
            )}
            {ranksystem === 'elo' && (
              <div>
                {stats.rankState && <p>Score: {stats.rankState.score}</p>}
              </div>
            )}
            {ranksystem === 'wins' && (
              <div>
                <p>Wins: {stats.wins}</p>
                <p>Ties: {stats.ties}</p>
                <p>Losses: {stats.losses}</p>
              </div>
            )}
          </Skeleton>
        </div>
        {(dbuser?.playerID === user.id || user.admin) && (
          <div>
            <h3>User Actions</h3>
            <h4>Upload Bot</h4>
            <Button
              onClick={() => {
                history.push('../upload');
              }}
              disabled
            >
              Upload
            </Button>
            <h4>Download Bot</h4>
            <Button
              onClick={() => {
                downloadBot(tournament.dimID, tournament.id, params.userID)
                  .then((url) => {
                    window.open(url);
                  })
                  .catch((err) => {
                    console.error(err.message);
                    message.warning(
                      "couldn't download your bot, you might not have one uploaded yet"
                    );
                  });
              }}
            >
              Download
            </Button>
          </div>
        )}
        <br />
        <h3>Last 20 Matches</h3>
        <MatchList
          matches={matches}
          competitionKey={competitionKey}
          dimID={tournament.dimID}
          tournamentID={tournament.id}
        />
      </div>
    </DefaultLayout>
  );
}

export default ProfilePage;
