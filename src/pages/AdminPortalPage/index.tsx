import { useCallback, useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { profileData, UserProfile } from '../../actions/users';
import { Layout, Flex, Tabs, message } from 'antd';
import MainFooter from '../../components/MainFooter';
import { useHistory, useLocation } from 'react-router-dom';
import { getCompetitions } from '../../actions/competition';
import CompetitionsTab from './CompetitionsTab';
import TeamsTab from './TeamsTab';
import UsersTab from './UsersTab';
const { Content } = Layout;

const TABS = ['competitions', 'teams', 'users'];

export default function AdminPortalPage(props: any) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [competitions, setCompetitions] = useState<string[]>([]);
  const [competitionsLoading, setCompetitionsLoading] = useState(true);

  const history = useHistory();
  const location = useLocation();
  const tabParam = new URLSearchParams(location.search).get('tab') ?? '';
  const activeTab = TABS.includes(tabParam) ? tabParam : TABS[0];

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

  const loadCompetitionsData = useCallback(() => {
    setCompetitionsLoading(true);
    getCompetitions()
      .then((data: { competitions: string[] }) => {
        setCompetitions(data.competitions);
        setCompetitionsLoading(false);
      })
      .catch((error) => {
        message.error('Failed to load competitions.');
        console.error('Error loading competitions:', error);
        setCompetitionsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadProfileData();
    loadCompetitionsData();
  }, [loadProfileData, loadCompetitionsData]);

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
            vertical
          >
            <h1 className="title2">
              Welcome Admin{' '}
              <span className="profileName">{user.username}</span>
            </h1>
            <p>
              You are {user.primaryAdmin ? 'a ' : 'an '}
              <span className="text-colorful">{user.primaryAdmin ? 'primary admin' : 'admin'}</span>.
            </p>
          </Flex>
        </Content>
        <Content className="settings">
          <Tabs
            activeKey={activeTab}
            onChange={(tab) => history.replace({ search: `?tab=${tab}` })}
            items={[
              {
                key: 'competitions',
                label: 'Competitions',
                children: (
                  <CompetitionsTab
                    competitions={competitions}
                    competitionsLoading={competitionsLoading}
                    primaryAdmin={user.primaryAdmin}
                    reloadCompetitions={loadCompetitionsData}
                  />
                ),
              },
              {
                key: 'teams',
                label: 'Teams',
                children: <TeamsTab competitions={competitions} competitionsLoading={competitionsLoading} />,
              },
              {
                key: 'users',
                label: 'Users',
                children: <UsersTab user={user} />,
              },
            ]}
          />
        </Content>
        <MainFooter />
      </Content>
    </DefaultLayout>
  );
}
