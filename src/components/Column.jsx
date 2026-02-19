import React from 'react';
import TaskCard from './TaskCard';

function Column({ columnId, column, tasks, draggedTaskId, onDragStart, onDragOver, onDrop, onDelete, onAddTask }) {
  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, columnId)}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-slate-200 flex flex-col transition-all hover:shadow-xl hover:border-slate-300"
    >
      <div className={`bg-gradient-to-r ${column.color} p-5 text-white absolute`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{column.icon}</span>
            <div>
              <h2 className="font-black text-xl">{column.title}</h2>
              <p className="text-sm opacity-90 font-semibold">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Column Body */}
      <div className="flex-1 p-5 min-h-[600px] flex flex-col">
        <div className="space-y-3 flex-1 overflow-y-auto">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-slate-400">
              ⚠️
              <p className="text-sm font-semibold">No tasks yet</p>
              <p className="text-xs opacity-75">Add one to get started</p>
            </div>
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                columnId={columnId}
                isDragging={draggedTaskId === task.id}
                onDragStart={onDragStart}
                onDelete={onDelete}
              />
            ))
          )}
        </div>

        {/* Add Task Button */}
        <button
          onClick={() => onAddTask(columnId)}
          className="w-full mt-4 py-3 px-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-700 font-bold text-sm transition-all flex items-center justify-center gap-2 hover:bg-slate-50"
        >
          ➕
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Column;
