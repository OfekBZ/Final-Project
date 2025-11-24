import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { fetchAdminStats } from '../services/adminService';
import styles from '../styles/Admin.module.css';

const AdminDashboardPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [stats, setStats] = useState({ usersCount: 0, booksCount: 0, reviewsCount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth.user || auth.user.role !== 'admin') {
      navigate('/');
    }
  }, [auth, navigate]);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchAdminStats();
        setStats(data);
      } catch (err) {
        const message = err?.response?.data?.message || 'Failed to load admin stats';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <section>
      <h1>{t('admin.dashboardTitle')}</h1>
      <p className={styles.muted}>{t('admin.dashboardSubtitle')}</p>

      {loading && <p className={styles.muted}>{t('admin.loadingStats')}</p>}
      {error && <p className={styles.errorText}>{error}</p>}

      {!loading && !error && (
        <>
          <div className={styles.statsGrid}>
            <div className={styles.card}>
              <p className={styles.label}>{t('admin.usersLabel')}</p>
              <p className={styles.value}>{stats.usersCount}</p>
            </div>
            <div className={styles.card}>
              <p className={styles.label}>{t('admin.booksLabel')}</p>
              <p className={styles.value}>{stats.booksCount}</p>
            </div>
            <div className={styles.card}>
              <p className={styles.label}>{t('admin.reviewsLabel')}</p>
              <p className={styles.value}>{stats.reviewsCount}</p>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.button} onClick={() => navigate('/admin/users')}>
              {t('admin.manageUsersButton')}
            </button>
            <button type="button" className={styles.button} onClick={() => navigate('/books')}>
              {t('admin.browseBooksButton')}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default AdminDashboardPage;
