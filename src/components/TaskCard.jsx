import React from 'react';
import { getPriorityColor, getInitials } from '../utils/helpers';

function TaskCard({ task, columnId, isDragging, onDragStart, onDelete }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id, columnId)}
      className={`group bg-white p-4 rounded-xl border-2 border-slate-200 cursor-move transition-all duration-200 hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 ${
        isDragging ? 'opacity-50 scale-95 shadow-lg' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${getPriorityColor(task.priority)}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <button
          onClick={() => onDelete(task.id, columnId)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded-lg"
        >
          🗑️
        </button>
      </div>
      
      <h3 className="text-sm font-bold text-slate-900 mb-3 line-clamp-2 leading-snug">{task.title}</h3>
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          🕐
          <span className="text-xs text-slate-200 truncate">{task.dueDate}</span>
        </div>
        <div title={task.assignee} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-md flex-shrink-0">
          {getInitials(task.assignee)}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
