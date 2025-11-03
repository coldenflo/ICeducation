import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { University } from '../types';
import { getUniversities, addUniversity, updateUniversity, deleteUniversity, initializeDB } from '../utils/db';

interface UniversityContextType {
  universities: University[];
  loading: boolean;
  error: string | null;
  refreshUniversities: () => void;
  addNewUniversity: (university: University) => void;
  updateExistingUniversity: (university: University) => void;
  removeUniversity: (id: string) => void;
}

const UniversityContext = createContext<UniversityContextType>({
  universities: [],
  loading: false,
  error: null,
  refreshUniversities: () => {},
  addNewUniversity: () => {},
  updateExistingUniversity: () => {},
  removeUniversity: () => {}
});

export const useUniversities = () => useContext(UniversityContext);

interface UniversityProviderProps {
  children: ReactNode;
}

export const UniversityProvider: React.FC<UniversityProviderProps> = ({ children }) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUniversities = () => {
    try {
      const data = getUniversities();
      setUniversities(data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить университеты, попробуйте еще раз');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeDB();
    refreshUniversities();
  }, []);

  const addNewUniversity = (university: University) => {
    try {
      addUniversity(university);
      refreshUniversities();
    } catch (err) {
      setError('Не удалось добавить уиниверситет, попробуйте еще раз');
      console.error(err);
    }
  };

  const updateExistingUniversity = (university: University) => {
    try {
      updateUniversity(university);
      refreshUniversities();
    } catch (err) {
      setError('Не удалось обновить данные, попробуйте еще раз');
      console.error(err);
    }
  };

  const removeUniversity = (id: string) => {
    try {
      deleteUniversity(id);
      refreshUniversities();
    } catch (err) {
      setError('Не удалось удалить, попробуйте еще раз');
      console.error(err);
    }
  };

  return (
    <UniversityContext.Provider
      value={{
        universities,
        loading,
        error,
        refreshUniversities,
        addNewUniversity,
        updateExistingUniversity,
        removeUniversity
      }}
    >
      {children}
    </UniversityContext.Provider>
  );
};