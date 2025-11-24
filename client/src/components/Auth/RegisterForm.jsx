import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { registerUser } from '../../services/authService';
import { isValidEmail, passwordPattern } from '../../utils/validation';
import styles from './AuthForm.module.css';

const RegisterForm = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!form.name) {
      nextErrors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      nextErrors.name = 'Name must be at least 2 characters';
    }

    if (!form.email) {
      nextErrors.email = 'Email is required';
    } else if (!isValidEmail(form.email)) {
      nextErrors.email = 'Enter a valid email';
    }

    if (!form.password) {
      nextErrors.password = 'Password is required';
    } else if (!passwordPattern.test(form.password)) {
      nextErrors.password =
        'Password must have 1 uppercase, 1 lowercase, 4 digits, 1 special (!@#$%^&*_-), min length 8';
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
      const data = await registerUser(form);
      login({ user: data.user, token: data.token });
      setStatus({ type: 'success', message: data.message || 'Registration successful' });
    } catch (error) {
      const message = error?.response?.data?.message || 'Registration failed';
      setStatus({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit} noValidate>
      <h1 className={styles.title}>{t('auth.registerTitle')}</h1>
      <p className={styles.subtitle}>{t('auth.registerSubtitle')}</p>

      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          {t('auth.nameLabel')}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          className={styles.input}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          autoComplete="name"
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

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
          autoComplete="new-password"
        />
        <span className={styles.hint}>
          At least 1 uppercase, 1 lowercase, 4 digits, 1 special (!@#$%^&*_-), min length 8.
        </span>
        {errors.password && <span className={styles.errorText}>{errors.password}</span>}
      </div>

      <div className={styles.actions}>
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? t('auth.registerButton') : t('auth.registerButton')}
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

export default RegisterForm;
