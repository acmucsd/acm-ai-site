import { useCallback, useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { Button, Flex, Input, Modal, Popconfirm, Select, Table, message } from 'antd';
import {
  UserProfile,
  getUsers as fetchUsers,
  getIdentifiers as fetchIdentifiers,
  promoteUserToAdmin,
  promoteUserToPrimaryAdmin,
  getAdmins,
  removeAdmin,
  Admin,
} from '../../actions/users';

const { Option } = Select;

export default function UsersTab({ user }: { user: UserProfile }) {
  const [users, setUsers] = useState<Array<{ username: string }>>([]);
  const [identifiers, setIdentifiers] = useState<Array<{ identifier: string }>>([]);
  const [filteredUsers, setFilteredUsers] = useState<Array<{ username: string }>>([]);
  const [filteredIdentifiers, setFilteredIdentifiers] = useState<Array<{ identifier: string }>>([]);
  const [selectedUserToPromote, setSelectedUserToPromote] = useState<string | undefined>(undefined);
  const [usersLoading, setUsersLoading] = useState(true);
  const [identifiersLoading, setIdentifiersLoading] = useState(true);
  const [promotingUser, setPromotingUser] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [primaryToRemove, setPrimaryToRemove] = useState<string>();
  const [confirmName, setConfirmName] = useState('');

  // for admin promotion
  const loadUsersData = useCallback(() => {
    setUsersLoading(true);
    fetchUsers()
      .then((data: { users: string[] }) => {
        const userList = data.users.map(username => ({ username }));
        setUsers(userList);
        setFilteredUsers(userList);
        setUsersLoading(false);
      })
      .catch((error) => {
        message.error('Failed to load users.');
        console.error('Error loading users:', error);
        setUsersLoading(false);
      });
  }, []);

  const loadAdmins = useCallback(() => {
    getAdmins()
      .then(setAdmins)
      .catch(() => message.error('Failed to load admins.'));
  }, []);

  // for username/email fuzzy search
  const loadIdentifiers = useCallback(() => {
    setIdentifiersLoading(true);
    fetchIdentifiers()
      .then((data: { identifiers: string[] }) => {
        const identifierList = data.identifiers.map(identifier => ({ identifier }));
        setIdentifiers(identifierList);
        setFilteredIdentifiers(identifierList);
        setIdentifiersLoading(false);
      })
      .catch((error) => {
        message.error('Failed to load identifiers.');
        console.error('Error loading identifiers:', error);
        setIdentifiersLoading(false);
      });
  }, []);

  useEffect(() => {
    loadUsersData();
    loadIdentifiers();
    loadAdmins();
  }, [loadUsersData, loadIdentifiers, loadAdmins]);

  const handleSearchUser = (value: string) => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handlePromoteToAdmin = () => {
    if (!selectedUserToPromote) {
      message.error('Please select a user to promote.');
      return;
    }
    setPromotingUser(true);
    promoteUserToAdmin(selectedUserToPromote)
      .then(() => {
        message.success(`${selectedUserToPromote} has been promoted to admin.`);
        setSelectedUserToPromote(undefined);
        loadUsersData();
        loadAdmins();
      })
      .catch((error) => {
        message.error(`Failed to promote ${selectedUserToPromote} to admin.`);
        console.error('Error promoting user:', error);
      })
      .finally(() => {
        setPromotingUser(false);
      });
  };

  const handlePromoteToPrimaryAdmin = () => {
    if (!selectedUserToPromote) {
      message.error('Please select a user to promote to primary admin.');
      return;
    }
    setPromotingUser(true);
    promoteUserToPrimaryAdmin(selectedUserToPromote)
      .then(() => {
        message.success(`${selectedUserToPromote} has been promoted to primary admin.`);
        setSelectedUserToPromote(undefined);
        loadUsersData();
        loadAdmins();
      })
      .catch((error) => {
        message.error(`Failed to promote ${selectedUserToPromote} to primary admin.`);
        console.error('Error promoting user:', error);
      })
      .finally(() => {
        setPromotingUser(false);
      });
  };

  const handleRemoveAdmin = (username: string) => {
    removeAdmin(username)
      .then(() => {
        message.success(`${username} is no longer an admin.`);
        loadAdmins();
      })
      .catch((error) => message.error(error.response?.data?.error?.message ?? `Failed to remove ${username}.`));
  };

  const closeRemoveModal = () => {
    setPrimaryToRemove(undefined);
    setConfirmName('');
  };

  // Identifier search (usernames and emails)
  const handleSearchIdentifier = (value: string) => {
    if (value.trim() === "") {
      setFilteredIdentifiers(identifiers);
      return;
    }
    const fuse = new Fuse(identifiers, { keys: ["identifier"], threshold: 0.8 });
    setFilteredIdentifiers(fuse.search(value).map(r => r.item));
  };

  return (
    <>
      <div className="userManagement">
        <h2>Manage Users</h2>
        <Table
          size="small"
          rowKey="username"
          pagination={false}
          dataSource={admins}
          className="spaced"
          columns={[
            { title: 'Admin', dataIndex: 'username' },
            { title: 'Role', render: (_, admin) => (admin.primaryAdmin ? 'Primary admin' : 'Admin') },
            {
              render: (_, admin) => user.primaryAdmin && admin.username !== user.username && (
                admin.primaryAdmin ? (
                  <Button danger size="small" onClick={() => setPrimaryToRemove(admin.username)}>Remove</Button>
                ) : (
                  <Popconfirm title={`Remove admin access for ${admin.username}?`} onConfirm={() => handleRemoveAdmin(admin.username)}>
                    <Button danger size="small">Remove</Button>
                  </Popconfirm>
                )
              ),
            },
          ]}
        />
        <Modal
          title={`Remove primary admin ${primaryToRemove}?`}
          open={!!primaryToRemove}
          okText="Remove"
          okButtonProps={{ danger: true, disabled: confirmName !== primaryToRemove }}
          onOk={() => {
            handleRemoveAdmin(primaryToRemove!);
            closeRemoveModal();
          }}
          onCancel={closeRemoveModal}
        >
          <p>They lose all admin access. Type <span className="text-colorful">{primaryToRemove}</span> to confirm.</p>
          <Input value={confirmName} onChange={(e) => setConfirmName(e.target.value)} />
        </Modal>
        {user.primaryAdmin ? (
          <>
            <p>Search for a user and promote them to admin or primary admin.</p>

            <Select
              showSearch
              placeholder="Search User"
              className="userSearchDropdown field"
              value={selectedUserToPromote}
              onChange={setSelectedUserToPromote}
              onSearch={handleSearchUser}
              loading={usersLoading}
              filterOption={(input, option) =>
                (option?.value as string)?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {filteredUsers.map((user) => (
                <Option key={user.username} value={user.username}>
                  {user.username}
                </Option>
              ))}
            </Select>

            {selectedUserToPromote && (
              <Flex gap="middle" className="spaced-top">
                <Button
                  type="primary"
                  onClick={handlePromoteToAdmin}
                  loading={promotingUser}
                >
                  Promote to Admin
                </Button>
                <Button
                  type="primary"
                  onClick={handlePromoteToPrimaryAdmin}
                  loading={promotingUser}
                >
                  Promote to Primary Admin
                </Button>
              </Flex>
            )}
          </>
        ) : (
          <p>Only primary admins can promote users.</p>
        )}
      </div>
      <div className='findUserIdentifiers'>
        <h2>Find Usernames</h2>
        <p>Find forgotten usernames with a fuzzy search.</p>

        <Select
          showSearch
          placeholder="Search Usernames and Emails"
          className="userIdentifierDropdown field"
          onSearch={handleSearchIdentifier}
          loading={identifiersLoading}
          filterOption={false}
        >
          {filteredIdentifiers.map((identifiers) => (
            <Option key={identifiers.identifier} value={identifiers.identifier}>
              {identifiers.identifier}
            </Option>
          ))}
        </Select>
      </div>
    </>
  );
}
