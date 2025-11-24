import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { fetchUsers, updateUserRole, deleteUser } from '../services/adminService';
import styles from '../styles/Admin.module.css';

const AdminUsersPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    if (!auth.user || auth.user.role !== 'admin') {
      navigate('/');
    }
  }, [auth, navigate]);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchUsers();
        setUsers(data.users || []);
      } catch (err) {
        const message = err?.response?.data?.message || 'Failed to load users';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleRoleChange = async (userId, role) => {
    setUpdating(userId);
    setError('');
    try {
      const data = await updateUserRole(userId, role);
      setUsers((prev) =>
        prev.map((user) => (user._id === userId ? { ...user, role: data.user.role } : user))
      );
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to update role';
      setError(message);
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm(t('admin.deleteUserConfirm'))) return;
    setUpdating(userId);
    setError('');
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to delete user';
      setError(message);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <section>
      <h1>{t('admin.usersTitle')}</h1>
      <p className={styles.muted}>{t('admin.usersSubtitle')}</p>

      {loading && <p className={styles.muted}>{t('admin.loadingUsers')}</p>}
      {error && <p className={styles.errorText}>{error}</p>}

      {!loading && !error && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isSelf = user._id === auth.user?.id;
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        disabled={isSelf || updating === user._id}
                        className={styles.select}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                      {isSelf && <span className={styles.hint}> (You)</span>}
                    </td>
                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(user._id)}
                        disabled={isSelf || updating === user._id}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminUsersPage;
