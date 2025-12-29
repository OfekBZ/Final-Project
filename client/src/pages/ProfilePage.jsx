import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchProfile, updateProfile } from '../services/userService';
import { passwordPattern } from '../utils/validation';
import styles from '../components/Auth/AuthForm.module.css';

const ProfilePage = () => {
  const { auth, updateUser } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!auth.user) {
      navigate('/login');
    }
  }, [auth, navigate]);

  const loadProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchProfile();
      const user = data.data || data.user || data;
      setProfile(user);
      setForm((prev) => ({ ...prev, name: user?.name || '' }));
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to load profile';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.user) {
      loadProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');
    if (!form.name.trim()) {
      setError('Name is required');
      return;
    }

    const payload = { name: form.name.trim() };
    if (form.password) {
      if (!passwordPattern.test(form.password)) {
        setError('Password must include upper, lower, 4 digits, and a special character.');
        return;
      }
      payload.password = form.password;
    }

    setSaving(true);
    try {
      const data = await updateProfile(payload);
      const user = data.data || data.user || data;
      setProfile(user);
      updateUser(user);
      setStatus(data.message || 'Profile updated successfully');
      setForm((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to update profile';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section>
        <p className={styles.subtitle}>Loading profile...</p>
      </section>
    );
  }

  return (
    <section>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.title}>Profile</h1>
        <p className={styles.subtitle}>View and update your account details.</p>

        {error && <p className={styles.errorText}>{error}</p>}
        {status && <div className={`${styles.status} ${styles.statusSuccess}`}>{status}</div>}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className={styles.input}
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input id="email" className={styles.input} value={profile?.email || ''} disabled />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="role">
            Role
          </label>
          <input id="role" className={styles.input} value={profile?.role || ''} disabled />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            New Password (optional)
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            autoComplete="new-password"
          />
          <span className={styles.hint}>
            Leave blank to keep your current password. Must follow the existing password rules.
          </span>
        </div>

        <div className={styles.actions}>
          <button className={styles.button} type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfilePage;
