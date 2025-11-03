import { University, User } from '../types';
import { universities as initialUniversities } from '../data/universities';

const DATA_VERSION = 29;

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
        console.log(
          `Detected outdated university dataset (v${currentVersion}). Updating to v${DATA_VERSION}.`
        );
      }
    } catch (error) {
      console.error(
        `Failed to parse university data from localStorage ('${storageKey}'). Overwriting with the latest seed data.`,
        error
      );
      needsUpdate = true;
    }
  } else {
    needsUpdate = true;
    console.log(
      `University dataset not found in localStorage ('${storageKey}'). Initialising v${DATA_VERSION}…`
    );
  }

  if (needsUpdate) {
    localStorage.setItem(storageKey, JSON.stringify({
      version: DATA_VERSION,
      universities: initialUniversities
    }));
    console.log(`University dataset (v${DATA_VERSION}) stored in '${storageKey}'.`);
  }
};

const initializeUsers = (): void => {
  const storageKey = 'users';
  const storedUsers = localStorage.getItem(storageKey);
  if (!storedUsers) {
    const defaultUsers: User[] = [
      {
        username: 'MisterDoctorAadi',
        password: 'DoctorAadi',
        isAdmin: true
      }
    ];
    localStorage.setItem(storageKey, JSON.stringify(defaultUsers));
    console.log(`Default users initialised in '${storageKey}'.`);
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
      console.error(
        `Failed to parse university data ('${storageKey}') when reading from localStorage:`,
        error
      );
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
        console.error(
          `Error while saving university data to localStorage ('${storageKey}'):`,
          error
        );
    }
}

export const addUniversity = (university: University): void => {
    const universities = getUniversities();
    if (universities.some(u => u.id === university.id)) {
        console.warn(`University with ID ${university.id} already exists. Updating instead of adding.`);
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
        console.warn(`University with ID ${updatedUniversity.id} was not found for updating.`);
    }
};

export const deleteUniversity = (id: string): void => {
    const universities = getUniversities();
    const initialLength = universities.length;
    const filteredUniversities = universities.filter(u => u.id !== id);
    if (filteredUniversities.length < initialLength) {
        saveUniversitiesData(filteredUniversities);
    } else {
        console.warn(`University with ID ${id} was not found for deletion.`);
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
