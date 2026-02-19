import React from 'react';

function NewTaskModal({ isOpen, formData, onFormChange, onSubmit, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border-2 border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900">Create New Task</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="-m-10">
            <label className="block text-sm font-bold text-slate-700 mb-2">Task Title *</label>
            <input
              type="text"
              placeholder="Enter task title..."
              value={formData.title}
              onChange={(e) => onFormChange('title', e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none font-semibold text-slate-800 placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-2">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => onFormChange('priority', e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none font-semibold text-slate-800"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Assignee</label>
            <input
              type="text"
              placeholder="Enter name..."
              value={formData.assignee}
              onChange={(e) => onFormChange('assignee', e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none font-semibold text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => onFormChange('dueDate', e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none font-semibold text-slate-800"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all hover:shadow-lg active:scale-95"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewTaskModal;
