import { useCallback, useEffect, useMemo, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import {
  profileData,
  UserProfile,
} from '../../actions/users';
import { Row, Col, Layout, Button, Modal, Flex, Select, message } from 'antd';
import MainFooter from '../../components/MainFooter';
import { useHistory } from 'react-router-dom';
const { Content } = Layout;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

export default function AdminPortalPage(props: any) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

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


        </Content>
        <MainFooter />
      </Content>
    </DefaultLayout>
  );
}
