import React, { useEffect, useState } from 'react';
import './index.less';
import { Table} from 'antd';

import DefaultLayout from '../../components/layouts/default';
import { useParams, Link } from 'react-router-dom';

import { getDimension, getMatchesFromDimension, getTournamentsFromDimension } from '../../actions/dimensions';

// NOTE!! Can import outside src as long as we dont use instanceof dimension or actually use it, we can just it for typings
import { DimensionType, Match, Tournament } from 'dimensions-ai';
import DimensionCard from '../../components/DimensionCard';
import { join } from 'path';
import BackLink from '../../components/BackLink';
import MatchList from '../../components/MatchList';
import { DIMENSION_ID } from '../../configs';

function DimensionsPage() {
  const params: any = useParams();
  const [dimension, setDimension] = useState<DimensionType>();
  const [matches, setMatches] = useState<{[x in string]: Match}>({});
  const [tourneyData, setTourneyData] = useState<Array<any>>([]);

  const tourneyColumns = [
    {
      title: 'Tournament Name',
      dataIndex: 'tourneyname',
      render: (tournament: Tournament) => <Link to={`${join(window.location.pathname,`/tournaments/${tournament.id}`)}`}>{tournament.name}</Link>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ]
  
  const update = () => {
    getDimension(DIMENSION_ID).then((res) => {
      if (!(res instanceof Array))  {
        setDimension(res);
        getMatchesFromDimension(res.id).then((res) => {
          setMatches(res);
        });
        getTournamentsFromDimension(res.id).then((res) => {
          let newData = Object.values(res).map((tournament: Tournament, index) => {
            return {
              key: index,
              tourneyname: tournament,
              status: tournament.status,
            }
          });
          setTourneyData(newData);
        });
      }
      else {
        console.error("something wrong happened");
      }
    });
  }
  useEffect(() => {
    if (DIMENSION_ID) {
      update();
    }
  }, [DIMENSION_ID]);
  return (
    <DefaultLayout>
      <div className='DimensionPage'>
        {dimension &&
          <div>
            <h2>{dimension.name}</h2>
            <h4 className='meta-data-title'>Dimension Metadata</h4>
            <p className='meta-data'>
              id: {dimension.id} <br />
              Used Design: { dimension.design.name } <br />
              Logging Level: {dimension.configs.loggingLevel}
            </p>
            <h4>Ongoing Tournaments</h4>
            <Table className='tournamentTable'
              columns={tourneyColumns}
              dataSource={tourneyData}
            />
          </div> 
        }
      </div>
    </DefaultLayout>
  );
}

function DimensionsListPage() {
  const params: any = useParams();
  const [dimensions, setDimensions] = useState<{[x in string]: DimensionType}>({});
  useEffect(() => {
    getDimension().then((res: any) => {
      //@ts-ignore
      setDimensions(res);
    }).catch((error) => {
      console.error(error);
    })
  }, []);
  return (
    <DefaultLayout>
      <div className='DimensionPage'>
        <h2>Dimensions Observed</h2>
        {dimensions &&
          Object.values(dimensions).map((dimension: DimensionType) => {
            return (
              <DimensionCard key={dimension.id} dimension={dimension}/>
            )
          })
        }
      </div>
    </DefaultLayout>
  );
}
DimensionsPage.DimensionsListPage = DimensionsListPage;
export default DimensionsPage
