import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

const HistoryCard = ({ item, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="space-y-2 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70"
    >
      {/* Top Row */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink dark:text-white">
            {item.title}
          </p>
          <p className="text-xs text-slate dark:text-slate-300">
            {item.language}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-sm dark:border-slate-700 dark:text-slate-100"
          >
            {open ? "Hide" : "Details"}
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="rounded-lg bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Expandable Section */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-2 text-sm text-slate dark:text-slate-200 overflow-hidden"
          >
            <p>{item.summary}</p>

            {item.bugReport?.length > 0 && (
              <ul className="list-disc space-y-1 pl-4">
                {item.bugReport.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const History = ({ history, onDelete }) => {
  return (
    <PageWrapper>
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-glass dark:border-slate-800 dark:bg-slate-900/70">
        <div>
          <h1 className="text-2xl font-semibold text-ink dark:text-white">
            History
          </h1>
          <p className="text-sm text-slate dark:text-slate-300">
            Local-only records.
          </p>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {history.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-slate dark:text-slate-300"
              >
                No history yet. Run an analysis first.
              </motion.p>
            ) : (
              history.map((item) => (
                <HistoryCard key={item.id} item={item} onDelete={onDelete} />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
};

export default History;
