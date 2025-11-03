import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUniversities } from '../context/UniversityContext';
import { University, Program, Scholarship, Cost } from '../types';

interface NewUniversityFormState {
  name: string;
  location: string;
  slug: string;
  description: string;
  image: string;
  logo: string;
  countryRanking: string;
  worldRanking: string;
  programs: string;
  scholarships: string;
  additionalCosts: string;
  applicationRequirements: string;
  englishRequirements: string;
  applicationDeadline: string;
}

const defaultFormState: NewUniversityFormState = {
  name: '',
  location: '',
  slug: '',
  description: '',
  image: '',
  logo: '',
  countryRanking: '',
  worldRanking: '',
  programs: '',
  scholarships: '',
  additionalCosts: '',
  applicationRequirements: '',
  englishRequirements: '',
  applicationDeadline: '',
};

const AdminPanel: React.FC = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  const {
    universities,
    loading,
    error,
    addNewUniversity,
    removeUniversity,
    refreshUniversities,
  } = useUniversities();

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [formState, setFormState] = useState<NewUniversityFormState>(defaultFormState);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const isAdmin = useMemo(() => Boolean(isAuthenticated && user?.isAdmin), [isAuthenticated, user]);

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const didLogin = await login(loginForm.username.trim(), loginForm.password);
    if (!didLogin) {
      setLoginError('Incorrect username or password.');
    } else {
      setLoginError(null);
      setLoginForm({ username: '', password: '' });
      await refreshUniversities();
    }
  };

  const parsePrograms = (raw: string): Program[] => {
    return raw
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const [name, language] = line.split('|').map(part => part.trim());
        return {
          name,
          language: language || 'English',
        };
      });
  };

  const parseScholarships = (raw: string): Scholarship[] => {
    return raw
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const [type, benefitsRaw] = line.split('|').map(part => part.trim());
        const benefits = (benefitsRaw || '')
          .split(';')
          .map(benefit => benefit.trim())
          .filter(Boolean);
        return {
          type,
          benefits,
        };
      });
  };

  const parseCosts = (raw: string): Cost[] => {
    return raw
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const [name, amount] = line.split('|').map(part => part.trim());
        return {
          name,
          amount: amount || '',
        };
      });
  };

  const parseRequirements = (raw: string): string[] => {
    return raw
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
  };

  const resetForm = () => {
    setFormState(defaultFormState);
    setFormError(null);
  };

  const handleAddUniversity = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    if (!formState.name.trim()) {
      setFormError('University name is required.');
      return;
    }

    const slugValue = formState.slug.trim() || formState.name.trim().replace(/\s+/g, '-');

    const newUniversity: Omit<University, 'id'> = {
      name: formState.name.trim(),
      location: formState.location.trim(),
      slug: slugValue,
      description: formState.description.trim() || undefined,
      image: formState.image.trim() || undefined,
      logo: formState.logo.trim() || undefined,
      englishRequirements: formState.englishRequirements.trim() || undefined,
      applicationDeadline: formState.applicationDeadline.trim() || undefined,
      countryRanking: formState.countryRanking ? Number(formState.countryRanking) : undefined,
      worldRanking: formState.worldRanking ? Number(formState.worldRanking) : undefined,
      programs: parsePrograms(formState.programs),
      scholarships: parseScholarships(formState.scholarships),
      additionalCosts: parseCosts(formState.additionalCosts),
      applicationRequirements: parseRequirements(formState.applicationRequirements),
    };

    setSubmitting(true);
    try {
      await addNewUniversity(newUniversity);
      setSuccessMessage(`University “${newUniversity.name}” added successfully.`);
      resetForm();
    } catch (error) {
      console.error(error);
      setFormError('Failed to add university. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUniversity = async (id: string, name: string) => {
    const confirmed = window.confirm(`Delete university “${name}”?`);
    if (!confirmed) {
      return;
    }
    try {
      await removeUniversity(id);
    } catch (error) {
      console.error(error);
      setFormError('Failed to delete university. Please try again.');
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Admin Panel
          </h1>
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={loginForm.username}
                onChange={event => setLoginForm({ ...loginForm, username: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={event => setLoginForm({ ...loginForm, password: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                autoComplete="current-password"
              />
            </div>
            {loginError && <p className="text-sm text-red-600">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md shadow hover:bg-primary/90 transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Admin Panel</h1>
            <p className="text-gray-600 mt-2">
              Manage the university catalogue: add new entries and delete outdated ones.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-gray-600">
                Signed in as <span className="font-medium text-gray-800">{user.username}</span>
              </span>
            )}
            <button
              type="button"
              onClick={logout}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add University</h2>
          <p className="text-sm text-gray-600 mb-6">
            Use the format <span className="font-medium">"Name | Language"</span> for programs,
            <span className="font-medium">"Scholarship type | Benefit 1; Benefit 2"</span> for scholarships,
            and <span className="font-medium">"Cost name | Amount"</span> for additional costs. Enter each item on a new line.
          </p>
          <form onSubmit={handleAddUniversity} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
              <input
                type="text"
                value={formState.name}
                onChange={event => setFormState({ ...formState, name: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="e.g., Fudan University"
                required
              />
            </div>
            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formState.location}
                onChange={event => setFormState({ ...formState, location: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="City, country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={formState.slug}
                onChange={event => setFormState({ ...formState, slug: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="fudan-university"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formState.description}
                onChange={event => setFormState({ ...formState, description: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                rows={3}
                placeholder="Short overview of the university"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                value={formState.image}
                onChange={event => setFormState({ ...formState, image: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
              <input
                type="url"
                value={formState.logo}
                onChange={event => setFormState({ ...formState, logo: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">China ranking</label>
              <input
                type="number"
                value={formState.countryRanking}
                onChange={event => setFormState({ ...formState, countryRanking: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="e.g., 25"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">World ranking</label>
              <input
                type="number"
                value={formState.worldRanking}
                onChange={event => setFormState({ ...formState, worldRanking: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="e.g., 250"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Programs</label>
              <textarea
                value={formState.programs}
                onChange={event => setFormState({ ...formState, programs: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                rows={3}
                placeholder={'Business Administration | English\nComputer Science | English'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scholarships</label>
              <textarea
                value={formState.scholarships}
                onChange={event => setFormState({ ...formState, scholarships: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                rows={3}
                placeholder={'Full Scholarship | Tuition waiver; Accommodation'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional costs</label>
              <textarea
                value={formState.additionalCosts}
                onChange={event => setFormState({ ...formState, additionalCosts: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                rows={3}
                placeholder={'Accommodation | CNY 1,500 / month'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application requirements</label>
              <textarea
                value={formState.applicationRequirements}
                onChange={event => setFormState({ ...formState, applicationRequirements: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                rows={3}
                placeholder={'Passport copy\nHigh school diploma'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">English requirements</label>
              <input
                type="text"
                value={formState.englishRequirements}
                onChange={event => setFormState({ ...formState, englishRequirements: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="IELTS 6.5 or equivalent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application deadline</label>
              <input
                type="text"
                value={formState.applicationDeadline}
                onChange={event => setFormState({ ...formState, applicationDeadline: event.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="30 June 2025"
              />
            </div>
            {formError && (
              <div className="col-span-1 md:col-span-2 text-sm text-red-600">
                {formError}
              </div>
            )}
            {successMessage && (
              <div className="col-span-1 md:col-span-2 text-sm text-green-600">
                {successMessage}
              </div>
            )}
            <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary text-white py-2 px-5 rounded-md shadow hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Saving…' : 'Add'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="py-2 px-5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Clear form
              </button>
            </div>
          </form>
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Universities</h2>
            <button
              type="button"
              onClick={refreshUniversities}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Refresh
            </button>
          </div>

          {loading && <p className="text-gray-600">Loading universities...</p>}
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

          {!loading && universities.length === 0 && (
            <p className="text-gray-600">No universities available yet.</p>
          )}

          {!loading && universities.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {universities.map(university => (
                    <tr key={university.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{university.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {university.location || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{university.slug}</td>
                      <td className="px-4 py-3 text-sm text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteUniversity(university.id, university.name)}
                          className="text-red-600 hover:text-red-500 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;

