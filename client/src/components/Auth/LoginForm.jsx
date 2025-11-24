import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { loginUser } from '../../services/authService';
import { isValidEmail } from '../../utils/validation';
import styles from './AuthForm.module.css';

const LoginForm = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!form.email) {
      nextErrors.email = 'Email is required';
    } else if (!isValidEmail(form.email)) {
      nextErrors.email = 'Enter a valid email';
    }
    if (!form.password) {
      nextErrors.password = 'Password is required';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setStatus({ type: null, message: '' });
    try {
      const data = await loginUser(form);
      login({ user: data.user, token: data.token });
      navigate('/');
      setStatus({ type: 'success', message: data.message || 'Login successful' });
    } catch (error) {
      const message = error?.response?.data?.message || 'Login failed';
      setStatus({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit} noValidate>
      <h1 className={styles.title}>{t('auth.loginTitle')}</h1>
      <p className={styles.subtitle}>{t('auth.loginSubtitle')}</p>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          {t('auth.emailLabel')}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          className={styles.input}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          autoComplete="email"
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          {t('auth.passwordLabel')}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          className={styles.input}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          autoComplete="current-password"
        />
        {errors.password && <span className={styles.errorText}>{errors.password}</span>}
      </div>

      <div className={styles.actions}>
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? t('auth.loginButton') : t('auth.loginButton')}
        </button>
      </div>

      {status.type && (
        <div
          className={`${styles.status} ${
            status.type === 'success' ? styles.statusSuccess : styles.statusError
          }`}
        >
          {status.message}
        </div>
      )}
    </form>
  );
};

export default LoginForm;
