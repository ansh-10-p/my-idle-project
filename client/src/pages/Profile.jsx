import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';

const Profile = () => {
  const [name, setName] = useState('Alex Dev');
  const [email, setEmail] = useState('alex@example.com');
  const [avatar, setAvatar] = useState('https://api.dicebear.com/7.x/identicon/svg?seed=ai-review');
  const [stats] = useState({ analyses: 12 });

  return (
    <PageWrapper>
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-glass dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex items-center gap-4">
          <img src={avatar} alt="avatar" className="h-16 w-16 rounded-full border border-slate-200 dark:border-slate-700" />
          <div>
            <h1 className="text-2xl font-semibold text-ink dark:text-white">Profile</h1>
            <p className="text-sm text-slate dark:text-slate-300">Local-only mock data.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <span>Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-ink shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <span>Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-ink shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
        </div>

        <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
          <span>Avatar URL</span>
          <input
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-ink shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-100/70 p-4 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
            <p className="text-3xl font-bold text-ink dark:text-white">{stats.analyses}</p>
            <p className="text-sm text-slate dark:text-slate-300">Total analyses</p>
          </div>
        </div>

        <button className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5">
          Save (local only)
        </button>
      </div>
    </PageWrapper>
  );
};

export default Profile;

