import { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { profileData, UserProfile } from '../../actions/users';
import { Row, Col, Layout, Tabs, Button, Modal, Flex } from 'antd';
import MainFooter from '../../components/MainFooter';
import { useHistory } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
const { Content, Footer } = Layout;

export default function ProfilePage(props: any) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    profileData()
      .then((res) => {
        setUser(res);
        setLoading(false);
      })
      .catch(() => {
        history.push('/login');
      });
  });

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
            <Button size="large" shape="round" className="button-colorful">
              Profile Settings
            </Button>
          </Flex>
          <pre>{JSON.stringify(user)}</pre>
          <Row justify="space-evenly">
            <Col span={7}>
              <div className="diamond">
                <Flex align="center" vertical gap={4}>
                  <p>Member Since</p>
                  <h3>????</h3>
                </Flex>
              </div>
            </Col>

            <Col span={7} className="pinkContainer">
              <div>
                <h3>About</h3>
                <Button
                  className="editIcon"
                  shape="circle"
                  type="text"
                  size="large"
                  icon={<EditOutlined />}
                />
              </div>
              <p>
                Major: <i>Unknown</i>
              </p>
              <p>
                Graduation Year: <i>Unknown</i>
              </p>
            </Col>

            <Col span={7} className="pinkContainer">
              <div>
                <h3>Bio</h3>
                <BioModal initial={''} onSubmit={() => {}} />
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

function BioModal({
  initial,
  onSubmit,
}: {
  initial: string;
  onSubmit: (bio: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

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
        okButtonProps={{ className: "button-colorful", shape: "round"  }}
        cancelButtonProps={{ className: "button-black", shape: "round"  }}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}
