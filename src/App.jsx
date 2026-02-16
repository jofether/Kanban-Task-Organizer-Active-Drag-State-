import React, { useState } from 'react';
import Header from './components/Header';
import StatsSection from './components/StatsSection';
import KanbanBoard from './components/KanbanBoard';
import NewTaskModal from './components/NewTaskModal';

function App() {
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [nextId, setNextId] = useState(13);
  const [formData, setFormData] = useState({ title: '', priority: 'medium', assignee: '', dueDate: '' });

  const [columns, setColumns] = useState({
    todo: {
      id: 'todo',
      title: 'To Do',
      color: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      icon: '📋',
      tasks: [
        { id: 1, title: 'Design system update', priority: 'high', dueDate: 'Feb 20', assignee: 'Sarah' },
        { id: 2, title: 'API documentation', priority: 'medium', dueDate: 'Feb 25', assignee: 'Mike' },
        { id: 3, title: 'Database optimization', priority: 'high', dueDate: 'Feb 18', assignee: 'John' },
        { id: 4, title: 'Mobile responsiveness fixes', priority: 'medium', dueDate: 'Feb 22', assignee: 'Emma' },
        { id: 5, title: 'User authentication flow', priority: 'high', dueDate: 'Feb 19', assignee: 'Alex' },
      ],
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      color: 'from-amber-500 to-orange-600',
      lightBg: 'bg-amber-50',
      icon: '⚡',
      tasks: [
        { id: 6, title: 'Fix navigation z-index', priority: 'high', dueDate: 'Feb 17', assignee: 'Lisa' },
        { id: 7, title: 'Update hero images', priority: 'medium', dueDate: 'Feb 23', assignee: 'Sarah' },
        { id: 8, title: 'Payment gateway integration', priority: 'high', dueDate: 'Feb 16', assignee: 'Mike' },
      ],
    },
    done: {
      id: 'done',
      title: 'Done',
      color: 'from-green-500 to-emerald-600',
      lightBg: 'bg-green-50',
      icon: '✅',
      tasks: [
        { id: 9, title: 'Write unit tests', priority: 'low', dueDate: 'Feb 10', assignee: 'John' },
        { id: 10, title: 'Code review completed', priority: 'medium', dueDate: 'Feb 11', assignee: 'Emma' },
        { id: 11, title: 'Deploy to staging', priority: 'high', dueDate: 'Feb 14', assignee: 'Alex' },
        { id: 12, title: 'Performance monitoring setup', priority: 'medium', dueDate: 'Feb 13', assignee: 'Lisa' },
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

  const handleAddTask = () => {
    if (!formData.title.trim()) return;

    const newTask = {
      id: nextId,
      title: formData.title,
      priority: formData.priority,
      dueDate: formData.dueDate || 'No date',
      assignee: formData.assignee || 'Unassigned',
    };

    setColumns(prev => ({
      ...prev,
      [selectedColumn]: {
        ...prev[selectedColumn],
        tasks: [...prev[selectedColumn].tasks, newTask],
      },
    }));

    setNextId(nextId + 1);
    setFormData({ title: '', priority: 'medium', assignee: '', dueDate: '' });
    setShowNewTaskModal(false);
  };

  const handleDeleteTask = (taskId, columnId) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.filter(t => t.id !== taskId),
      },
    }));
  };

  const openAddTaskModal = (columnId) => {
    setSelectedColumn(columnId);
    setShowNewTaskModal(true);
  };

  const closeModal = () => {
    setShowNewTaskModal(false);
    setFormData({ title: '', priority: 'medium', assignee: '', dueDate: '' });
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-6 md:p-8">
        <Header onAddTask={() => openAddTaskModal('todo')} />
        <StatsSection columns={columns} />
        <KanbanBoard
          columns={columns}
          draggedTaskId={draggedTask}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDelete={handleDeleteTask}
          onAddTask={openAddTaskModal}
        />
      </div>

      <NewTaskModal
        isOpen={showNewTaskModal}
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleAddTask}
        onClose={closeModal}
      />
    </>
  );
}

export default App;
