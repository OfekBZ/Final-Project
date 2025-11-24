import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(undefined);

const getInitialAuth = () => {
  const storedToken = localStorage.getItem('be_token');
  const storedUser = localStorage.getItem('be_user');
  return {
    token: storedToken,
    user: storedUser ? JSON.parse(storedUser) : null,
  };
};

const persist = (user, token) => {
  if (token) {
    localStorage.setItem('be_token', token);
  }
  localStorage.setItem('be_user', JSON.stringify(user));
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getInitialAuth);

  const login = ({ user, token }) => {
    persist(user, token);
    setAuth({ user, token });
  };

  const logout = () => {
    localStorage.removeItem('be_token');
    localStorage.removeItem('be_user');
    setAuth({ user: null, token: null });
  };

  const addFavoriteLocal = (bookId) => {
    setAuth((prev) => {
      if (!prev.user) return prev;
      if (prev.user.favorites?.includes(bookId)) return prev;
      const user = { ...prev.user, favorites: [...(prev.user.favorites || []), bookId] };
      persist(user, prev.token);
      return { ...prev, user };
    });
  };

  const removeFavoriteLocal = (bookId) => {
    setAuth((prev) => {
      if (!prev.user) return prev;
      const user = {
        ...prev.user,
        favorites: (prev.user.favorites || []).filter((fav) => fav !== bookId),
      };
      persist(user, prev.token);
      return { ...prev, user };
    });
  };

  const value = useMemo(
    () => ({
      auth,
      login,
      logout,
      addFavoriteLocal,
      removeFavoriteLocal,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
