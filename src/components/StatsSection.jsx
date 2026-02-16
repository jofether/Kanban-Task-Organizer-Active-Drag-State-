import React from 'react';
import StatsCard from './StatsCard';

function StatsSection({ columns }) {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 md:gap-6 mb-10">
      {Object.entries(columns).map(([columnId, column]) => (
        <StatsCard
          key={columnId}
          icon={column.icon}
          title={column.title}
          count={column.tasks.length}
          color={column.color}
        />
      ))}
    </div>
  );
}

export default StatsSection;
