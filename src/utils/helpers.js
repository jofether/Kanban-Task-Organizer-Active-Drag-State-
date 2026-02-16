export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-300';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-300';
  }
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};
