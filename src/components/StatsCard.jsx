import React from 'react';

function StatsCard({ icon, title, count, color }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md border-2 border-slate-100 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="text-sm font-bold text-slate-700 mb-1">{title}</h3>
      <p className={`text-3xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {count}
      </p>
    </div>
  );
}

export default StatsCard;
