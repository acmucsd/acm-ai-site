import { useCallback, useEffect, useMemo, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { profileData, updateProfile, UserProfile } from '../../actions/users';
import { Row, Col, Layout, Button, Modal, Flex, Select } from 'antd';
import MainFooter from '../../components/MainFooter';
import { useHistory } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import majors from './majors';
const { Content } = Layout;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

export default function ProfilePage(props: any) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const loadProfileData = useCallback(() => {
    profileData()
      .then((res) => {
        setUser(res);
        setLoading(false);
      })
      .catch(() => {
        history.push('/login');
      });
  }, [history]);

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  return (
    <DefaultLayout>
      <Content className="ProfilePage">
        <Content>
          <Flex
            className="profileHeader"
            justify="space-between"
            align="center"
          >
            <h1 className="title2">
              {!loading && user ? (
                <>
                  Welcome Back,{' '}
                  <span className="profileName">{user.username}.</span>
                </>
              ) : (
                <></>
              )}
            </h1>
          </Flex>

          <Row justify="space-evenly">
            <Col span={24} lg={7}>
              <div className="diamond">
                <Flex align="center" vertical gap={4}>
                  <p>Member Since</p>
                  <h3>
                    {user &&
                      dateFormatter.format(Date.parse(user.creationDate))}
                  </h3>
                </Flex>
              </div>
            </Col>

            <Col span={24} lg={7} className="pinkContainer">
              <div>
                <h3>About</h3>
                {user && (
                  <AboutModal
                    initial={{
                      major: user?.major,
                      graduationYear: user?.graduationYear,
                    }}
                    onSubmit={async (values) => {
                      await updateProfile(values);
                      loadProfileData();
                    }}
                  />
                )}
              </div>
              <p>Major: {user?.major ?? <i>Unknown</i>}</p>
              <p>Graduation Year: {user?.graduationYear ?? <i>Unknown</i>}</p>
            </Col>

            <Col span={24} lg={7} className="pinkContainer">
              <div>
                <h3>Options</h3>
              </div>
              <p>
                <i>Empty</i>
              </p>
            </Col>
          </Row>
        </Content>
        <MainFooter />
      </Content>
    </DefaultLayout>
  );
}

function AboutModal({
  initial,
  onSubmit,
}: {
  initial: {
    major?: string;
    graduationYear?: number;
  };
  onSubmit: (values: {
    major?: string;
    graduationYear?: number;
  }) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [major, setMajor] = useState(initial.major);
  const [graduationYear, setGraduationYear] = useState(initial.graduationYear);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    onSubmit({ major, graduationYear: graduationYear })
      .then(() => {
        setOpen(false);
        setConfirmLoading(false);
      })
      .catch(() => {
        setConfirmLoading(false);
      });

    setConfirmLoading(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // Based on membership portal
  const years = useMemo(() => {
    const years: number[] = [];
    const currentYear = new Date().getUTCFullYear();
    // Ensure the user's graduation year is listed in the dropdown in case
    // they're taking longer than expected to graduate
    for (
      let year = Math.min(
        initial.graduationYear ?? currentYear,
        currentYear - 2
      );
      year <= currentYear + 6;
      year += 1
    ) {
      years.push(year);
    }
    return years;
  }, [initial.graduationYear]);

  return (
    <>
      <Button
        onClick={showModal}
        className="editIcon"
        shape="circle"
        type="text"
        size="large"
        icon={<EditOutlined />}
      />
      <Modal
        className="bioModal"
        title="Edit Bio"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Save"
        okButtonProps={{ className: 'button-colorful', shape: 'round' }}
        cancelButtonProps={{ className: 'button-black', shape: 'round' }}
      >
        <Flex gap={16} vertical>
          <div>
            <p>Major</p>
            <Select
              style={{ width: '100%' }}
              value={major}
              onChange={(value) => {
                setMajor(value);
              }}
              options={majors.map((major) => ({
                label: major,
                value: major,
              }))}
            />
          </div>

          <div>
            <p>Graduation Year</p>
            <Select
              style={{ width: '100%' }}
              value={graduationYear}
              onChange={(value) => {
                setGraduationYear(value);
              }}
              options={years.map((year) => ({
                label: year,
                value: year,
              }))}
            />
          </div>
        </Flex>
      </Modal>
    </>
  );
}
