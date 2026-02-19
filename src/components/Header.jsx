import React from 'react';

function Header({ onAddTask }) {
  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div className="flex flex-row items-start md:items-center justify-between gap-6 bg-white rounded-2xl p-8 shadow-lg border-2 border-slate-100">
        <div>
          <h1 className="text-5xl font-black text-slt-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Project Board
          </h1>
          <p className="text-slate-600 font-semibold text-lg">
            Organize, track, and manage your team's tasks in real-time
          </p>
        </div>
        <button
          onClick={onAddTask}
          className="flex-shrink-0 bg-gradient-to-r from-blue-6 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg"
        >
          ➕
          New Task
        </button>
      </div>
    </div>
  );
}

export default Header;
