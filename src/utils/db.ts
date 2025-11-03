import { University, User } from '../types';
import { universities as initialUniversities } from '../data/universities';

const DATA_VERSION = 28;

const initializeUniversities = (): void => {
  const storageKey = 'universitiesData';
  const storedDataRaw = localStorage.getItem(storageKey);
  let needsUpdate = false;
  let currentVersion = 0;

  if (storedDataRaw) {
    try {
      const storedData = JSON.parse(storedDataRaw);
      currentVersion = storedData.version || 0;
      if (currentVersion < DATA_VERSION) {
        needsUpdate = true;
        console.log(`Обнаружена старая версия данных университетов (v${currentVersion}). Требуется обновление до v${DATA_VERSION}.`);
      }
    } catch (error) {
      console.error(`Ошибка парсинга данных из localStorage ('${storageKey}'). Перезапись начальными данными.`, error);
      needsUpdate = true;
    }
  } else {
    needsUpdate = true;
    console.log(`Данные университетов ('${storageKey}') в localStorage не найдены. Инициализация v${DATA_VERSION}...`);
  }

  if (needsUpdate) {
    localStorage.setItem(storageKey, JSON.stringify({
      version: DATA_VERSION,
      universities: initialUniversities
    }));
    console.log(`Данные университетов (v${DATA_VERSION}) сохранены в '${storageKey}'.`);
  }
};

const initializeUsers = (): void => {
  const storageKey = 'users';
  const storedUsers = localStorage.getItem(storageKey);
  if (!storedUsers) {
    const defaultUsers: User[] = [
      {
        username: 'admin',
        password: 'admin123',
        isAdmin: true
      }
    ];
    localStorage.setItem(storageKey, JSON.stringify(defaultUsers));
    console.log(`Пользователи по умолчанию инициализированы в '${storageKey}'.`);
  }
};

export const initializeDB = (): void => {
  initializeUniversities();
  initializeUsers();
};

export const getUniversities = (): University[] => {
  const storageKey = 'universitiesData';
  const dataRaw = localStorage.getItem(storageKey);
  try {
      if (dataRaw) {
          const data = JSON.parse(dataRaw);
          return Array.isArray(data.universities) ? data.universities : [];
      }
      return [];
  } catch (error) {
      console.error(`Ошибка парсинга данных ('${storageKey}') при чтении из localStorage:`, error);
      return [];
  }
};

export const getUniversityById = (id: string): University | undefined => {
  const universities = getUniversities();
  return universities.find(university => university.id === id);
};

const saveUniversitiesData = (universities: University[]) => {
    const storageKey = 'universitiesData';
    try {
        localStorage.setItem(storageKey, JSON.stringify({
            version: DATA_VERSION,
            universities: universities
        }));
    } catch (error) {
        console.error(`Ошибка при сохранении данных университетов в localStorage ('${storageKey}'):`, error);
    }
}

export const addUniversity = (university: University): void => {
    const universities = getUniversities();
    if (universities.some(u => u.id === university.id)) {
        console.warn(`Университет с ID ${university.id} уже существует. Обновление вместо добавления.`);
        updateUniversity(university);
        return;
    }
    const updatedUniversities = [...universities, university];
    saveUniversitiesData(updatedUniversities);
};

export const updateUniversity = (updatedUniversity: University): void => {
    const universities = getUniversities();
    const index = universities.findIndex(u => u.id === updatedUniversity.id);
    if (index !== -1) {
        const updatedUniversities = [
            ...universities.slice(0, index),
            updatedUniversity,
            ...universities.slice(index + 1)
        ];
        saveUniversitiesData(updatedUniversities);
    } else {
        console.warn(`Университет с ID ${updatedUniversity.id} не найден для обновления.`);
    }
};

export const deleteUniversity = (id: string): void => {
    const universities = getUniversities();
    const initialLength = universities.length;
    const filteredUniversities = universities.filter(u => u.id !== id);
    if (filteredUniversities.length < initialLength) {
        saveUniversitiesData(filteredUniversities);
    } else {
        console.warn(`Университет с ID ${id} не найден для удаления.`);
    }
};

export const authenticateUser = (username: string, password: string): User | null => {
  const storageKey = 'users';
  const data = localStorage.getItem(storageKey);
  const users: User[] = data ? JSON.parse(data) : [];

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
  }

  return null;
};