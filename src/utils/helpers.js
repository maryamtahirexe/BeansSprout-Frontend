export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

export const formatDateTime = (dateStr) =>
  new Date(dateStr).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

export const statusColor = (status) => {
  const map = {
    pending:    'bg-beige text-yellow-700',
    confirmed:  'bg-skyblue text-blue-700',
    preparing:  'bg-lilac text-purple-700',
    ready:      'bg-mint text-green-700',
    completed:  'bg-green-100 text-green-800',
  };
  return map[status] || 'bg-gray-100 text-gray-600';
};

export const categoryLabel = (cat) => {
  const map = {
    coffee: '☕ Coffee',
    matcha: '🍵 Matcha',
    pastries: '🥐 Pastries',
    'cold-drinks': '🧊 Cold Drinks',
  };
  return map[cat] || cat;
};

export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
