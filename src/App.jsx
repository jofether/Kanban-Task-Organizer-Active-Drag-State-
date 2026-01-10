import React, { useState } from 'react';
import { ChevronRight, Plus, Clock, AlertCircle } from 'lucide-react';

function App() {
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);

  const [columns, setColumns] = useState({
    todo: {
      id: 'todo',
      title: 'To Do',
      color: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      tasks: [
        { id: 1, title: 'Design system update', priority: 'high', dueDate: 'Jan 15', assignee: 'Sarah' },
        { id: 2, title: 'API documentation', priority: 'medium', dueDate: 'Jan 20', assignee: 'Mike' },
      ],
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      color: 'from-amber-500 to-amber-600',
      lightBg: 'bg-amber-50',
      tasks: [
        { id: 3, title: 'Fix navigation z-index', priority: 'high', dueDate: 'Jan 12', assignee: 'John' },
        { id: 4, title: 'Update hero images', priority: 'medium', dueDate: 'Jan 18', assignee: 'Emma' },
      ],
    },
    done: {
      id: 'done',
      title: 'Done',
      color: 'from-green-500 to-green-600',
      lightBg: 'bg-green-50',
      tasks: [
        { id: 5, title: 'Write unit tests', priority: 'low', dueDate: 'Jan 10', assignee: 'Alex' },
        { id: 6, title: 'Code review completed', priority: 'medium', dueDate: 'Jan 11', assignee: 'Lisa' },
      ],
    },
  });

  const handleDragStart = (e, taskId, columnId) => {
    setDraggedTask(taskId);
    setDraggedFrom(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    if (!draggedTask || !draggedFrom) return;

    if (draggedFrom === targetColumnId) {
      setDraggedTask(null);
      setDraggedFrom(null);
      return;
    }

    const task = columns[draggedFrom].tasks.find(t => t.id === draggedTask);
    setColumns(prev => ({
      ...prev,
      [draggedFrom]: {
        ...prev[draggedFrom],
        tasks: prev[draggedFrom].tasks.filter(t => t.id !== draggedTask),
      },
      [targetColumnId]: {
        ...prev[targetColumnId],
        tasks: [...prev[targetColumnId].tasks, task],
      },
    }));

    setDraggedTask(null);
    setDraggedFrom(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const TaskCard = ({ task, columnId, isDragging }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, task.id, columnId)}
      className={`group bg-white p-4 rounded-lg border border-slate-200 cursor-move transition-all duration-200 hover:shadow-lg hover:border-slate-300 ${
        isDragging ? 'opacity-50 scale-95' : 'hover:scale-102'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-semibold px-2 py-1 rounded-md ${getPriorityColor(task.priority)}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>
      
      <h3 className="text-sm font-semibold text-slate-800 mb-3 line-clamp-2">{task.title}</h3>
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500">{task.dueDate}</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
          {getInitials(task.assignee)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Project Board</h1>
            <p className="text-slate-400">Organize and track your tasks in real-time</p>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all hover:shadow-lg">
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(columns).map(([columnId, column]) => (
          <div
            key={columnId}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, columnId)}
            className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-colors"
          >
            {/* Column Header */}
            <div className={`bg-gradient-to-r ${column.color} p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-white font-bold text-lg">{column.title}</h2>
                  <span className="bg-white bg-opacity-20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {column.tasks.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Column Body */}
            <div className="p-4 min-h-[500px]">
              <div className="space-y-3">
                {column.tasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                    <AlertCircle className="w-12 h-12 mb-2 opacity-20" />
                    <p className="text-sm">No tasks yet</p>
                  </div>
                ) : (
                  column.tasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      columnId={columnId}
                      isDragging={draggedTask === task.id}
                    />
                  ))
                )}
              </div>

              {/* Add Task Button */}
              <button className="w-full mt-4 py-2 px-4 rounded-lg border-2 border-dashed border-slate-600 hover:border-slate-500 text-slate-400 hover:text-slate-300 font-medium text-sm transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
