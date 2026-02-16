import React from 'react';
import Column from './Column';

function KanbanBoard({ columns, draggedTaskId, onDragStart, onDragOver, onDrop, onDelete, onAddTask }) {
  return (
    /* [BUG - SPACING] Added large negative padding causing content to overflow and overlap */
    /* [FIX] Should be: className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6" */
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 -p-20">
      {Object.entries(columns).map(([columnId, column]) => (
        <Column
          key={columnId}
          columnId={columnId}
          column={column}
          tasks={column.tasks}
          draggedTaskId={draggedTaskId}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDelete={onDelete}
          onAddTask={onAddTask}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
