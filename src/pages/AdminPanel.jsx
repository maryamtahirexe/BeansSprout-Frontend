import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchAllOrders,
  updateOrderStatus,
  selectAllOrders,
} from '../features/orders/ordersSlice';
import {
  fetchMenu,
  selectAllMenuItems,
  deleteMenuItem,
  createMenuItem,
} from '../features/menu/menuSlice';
import { formatPrice, formatDateTime, statusColor, categoryLabel } from '../utils/helpers';
import api from '../services/api';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['pending', 'confirmed', 'preparing', 'ready', 'completed'];

const CATEGORY_OPTIONS = [
  { value: 'coffee',      label: '☕ Coffee'      },
  { value: 'matcha',      label: '🍵 Matcha'      },
  { value: 'pastries',    label: '🥐 Pastries'    },
  { value: 'cold-drinks', label: '🧋 Cold Drinks' },
];

/* ── Add Menu Item Form ── */
function AddItemForm({ onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: 'coffee', image: '', tags: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      toast.error('Name, price and category are required');
      return;
    }
    setLoading(true);
    const payload = {
      name:        form.name.trim(),
      description: form.description.trim(),
      price:       parseFloat(form.price),
      category:    form.category,
      image:       form.image.trim(),
      tags:        form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    };
    const result = await dispatch(createMenuItem(payload));
    setLoading(false);
    if (createMenuItem.fulfilled.match(result)) {
      toast.success(`${form.name} added! 🌸`);
      onClose();
    } else {
      toast.error('Failed to add item');
    }
  };

  const inputClass = "w-full rounded-2xl border border-lilac/50 bg-white/80 px-4 py-2.5 font-body text-sm text-purple-800 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-lilac transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="font-body text-xs text-purple-500 mb-1 block">Item name *</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Lavender Latte" className={inputClass} required />
        </div>
        <div>
          <label className="font-body text-xs text-purple-500 mb-1 block">Price ($) *</label>
          <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" min="0" placeholder="4.50" className={inputClass} required />
        </div>
        <div>
          <label className="font-body text-xs text-purple-500 mb-1 block">Category *</label>
          <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
            {CATEGORY_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <label className="font-body text-xs text-purple-500 mb-1 block">Description</label>
          <input name="description" value={form.description} onChange={handleChange} placeholder="A short description..." className={inputClass} />
        </div>
        <div className="col-span-2">
          <label className="font-body text-xs text-purple-500 mb-1 block">Image URL</label>
          <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." className={inputClass} />
        </div>
        <div className="col-span-2">
          <label className="font-body text-xs text-purple-500 mb-1 block">Tags (comma-separated)</label>
          <input name="tags" value={form.tags} onChange={handleChange} placeholder="vegan, popular, seasonal" className={inputClass} />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose}
          className="flex-1 font-body text-sm py-2.5 rounded-full border border-lilac/50 text-purple-600 hover:bg-lilac/10 transition-all">
          Cancel
        </button>
        <button type="submit" disabled={loading}
          className="flex-1 font-body text-sm py-2.5 rounded-full bg-gradient-to-r from-lilac to-blush text-purple-900 border border-purple-200 hover:scale-[1.02] transition-all disabled:opacity-50">
          {loading ? 'Adding...' : 'Add Item 🌸'}
        </button>
      </div>
    </form>
  );
}

/* ── Main AdminPanel ── */
export default function AdminPanel() {
  const dispatch  = useDispatch();
  const orders    = useSelector(selectAllOrders);
  const menuItems = useSelector(selectAllMenuItems);

  const [tab,         setTab]         = useState('orders');
  const [dashboard,   setDashboard]   = useState(null);
  const [dashLoading, setDashLoading] = useState(true);
  const [polling,     setPolling]     = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const loadData = useCallback(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchMenu());
  }, [dispatch]);

  useEffect(() => {
    loadData();
    setDashLoading(true);
    api.get('/api/admin/dashboard')
      .then(r => setDashboard(r.data))
      .catch(() => setDashboard(null))
      .finally(() => setDashLoading(false));
  }, [loadData]);

  // Auto-poll orders every 30s
  useEffect(() => {
    if (!polling) return;
    const t = setInterval(() => dispatch(fetchAllOrders()), 30000);
    return () => clearInterval(t);
  }, [dispatch, polling]);

  const handleStatusChange = (id, status) => {
    dispatch(updateOrderStatus({ id, status }));
    toast.success(`Order updated → ${status}`);
  };

  const handleDeleteItem = (id, name) => {
    dispatch(deleteMenuItem(id));
    toast.success(`"${name}" removed`);
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  const tabs = [
    { key: 'orders',    label: '📦 Orders',    badge: orders.filter(o => !['completed'].includes(o.status)).length },
    { key: 'menu',      label: '🍰 Menu',      badge: menuItems.length },
    { key: 'dashboard', label: '📊 Dashboard', badge: null },
  ];

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-start justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-display text-4xl text-purple-900 mb-1">Admin Panel 👑</h1>
            <p className="font-body text-sm text-purple-400">
              Manage BeansSprout operations
            </p>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-lilac/30 shadow-sm">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${polling ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`} />
            <span className="font-body text-xs text-purple-500">{polling ? 'Live updates' : 'Paused'}</span>
            <button
              onClick={() => setPolling(p => !p)}
              className="font-body text-xs text-purple-400 hover:text-purple-700 transition-colors ml-1 border-l border-lilac/30 pl-2"
            >
              {polling ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={loadData}
              className="font-body text-xs text-purple-400 hover:text-purple-700 transition-colors ml-1"
              title="Refresh now"
            >
              ↻
            </button>
          </div>
        </motion.div>

        {/* ── Tabs ── */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 font-body text-sm px-5 py-2.5 rounded-full border whitespace-nowrap transition-all duration-200 ${
                tab === t.key
                  ? 'bg-gradient-to-r from-lilac to-blush text-purple-900 border-purple-300 shadow-lg shadow-lilac/20'
                  : 'bg-white text-purple-500 border-lilac/40 hover:bg-lilac/10 hover:border-lilac/60'
              }`}
            >
              {t.label}
              {t.badge !== null && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  tab === t.key ? 'bg-white/40 text-purple-800' : 'bg-lilac/20 text-purple-600'
                }`}>
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ══════════ DASHBOARD TAB ══════════ */}
        <AnimatePresence mode="wait">
          {tab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              {dashLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-28 rounded-2xl shimmer" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Orders today',  value: dashboard?.ordersToday  ?? '—', emoji: '📦', bg: 'from-lilac/20 to-blush/10',    border: 'border-lilac/25' },
                      { label: 'Revenue today', value: dashboard?.revenueToday != null ? formatPrice(dashboard.revenueToday) : '—', emoji: '💰', bg: 'from-mint/20 to-skyblue/10', border: 'border-mint/25' },
                      { label: 'Total users',   value: dashboard?.totalUsers   ?? '—', emoji: '👥', bg: 'from-beige/40 to-blush/10',   border: 'border-yellow-200/50' },
                      { label: 'Total orders',  value: dashboard?.totalOrders  ?? '—', emoji: '🛒', bg: 'from-skyblue/20 to-lilac/10', border: 'border-skyblue/30' },
                    ].map((s, i) => (
                      <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className={`bg-gradient-to-br ${s.bg} rounded-2xl border ${s.border} p-5 shadow-sm`}
                      >
                        <div className="text-2xl mb-2">{s.emoji}</div>
                        <div className="font-display text-2xl text-purple-900">{s.value}</div>
                        <div className="font-body text-xs text-purple-400 mt-1">{s.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Order status breakdown */}
                  <div className="bg-white rounded-3xl border border-lilac/25 p-6 shadow-sm">
                    <h3 className="font-display text-lg text-purple-900 mb-4">Order Status Breakdown</h3>
                    <div className="space-y-3">
                      {STATUS_OPTIONS.map(status => {
                        const count = orders.filter(o => o.status === status).length;
                        const pct   = orders.length > 0 ? Math.round((count / orders.length) * 100) : 0;
                        return (
                          <div key={status}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-body text-sm capitalize text-purple-700">{status}</span>
                              <span className="font-body text-xs text-purple-400">{count} order{count !== 1 ? 's' : ''}</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className="h-full bg-gradient-to-r from-lilac to-blush rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ══════════ ORDERS TAB ══════════ */}
          {tab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              {/* Filter bar */}
              <div className="flex flex-wrap gap-2 mb-5">
                {['all', ...STATUS_OPTIONS].map(s => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`font-body text-xs px-4 py-1.5 rounded-full border capitalize transition-all ${
                      filterStatus === s
                        ? 'bg-lilac/60 text-purple-800 border-lilac'
                        : 'bg-white text-purple-400 border-lilac/30 hover:bg-lilac/10'
                    }`}
                  >
                    {s === 'all' ? `All (${orders.length})` : `${s} (${orders.filter(o=>o.status===s).length})`}
                  </button>
                ))}
              </div>

              {filteredOrders.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-3">📭</div>
                  <p className="font-body text-purple-400">No orders for this filter</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <motion.div
                      key={order._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white rounded-3xl border border-lilac/25 p-6 shadow-sm hover:shadow-lg hover:shadow-lilac/10 transition-all"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        {/* Order info */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-body text-xs font-semibold text-purple-700 bg-lilac/15 px-2 py-0.5 rounded-full">
                              #{order._id?.slice(-8).toUpperCase()}
                            </span>
                            <span className={`font-body text-xs px-2.5 py-0.5 rounded-full capitalize ${statusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="font-body text-sm font-semibold text-purple-800">
                            {order.userId?.name || 'Customer'}
                          </p>
                          <p className="font-body text-xs text-purple-400">{order.userId?.email}</p>
                          <p className="font-body text-xs text-purple-300 mt-0.5">
                            {formatDateTime(order.createdAt)}
                          </p>
                        </div>

                        {/* Status changer */}
                        <div className="flex items-center gap-2">
                          <select
                            value={order.status}
                            onChange={e => handleStatusChange(order._id, e.target.value)}
                            className="font-body text-xs border border-lilac/50 rounded-full px-3 py-2 bg-white text-purple-700 focus:outline-none focus:ring-2 focus:ring-lilac cursor-pointer"
                          >
                            {STATUS_OPTIONS.map(s => (
                              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Items chips */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {order.items?.map((item, i) => (
                          <span
                            key={i}
                            className="font-body text-xs text-purple-600 bg-lilac/10 rounded-xl px-3 py-1.5 border border-lilac/15"
                          >
                            {item.name} <span className="text-purple-400">×{item.quantity}</span>
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-lilac/20">
                        <span className={`font-body text-xs px-2.5 py-1 rounded-full ${
                          order.paymentStatus === 'paid'
                            ? 'bg-mint text-green-800'
                            : 'bg-beige text-yellow-700'
                        }`}>
                          {order.paymentStatus === 'paid' ? '💳 Paid' : '💸 Pending'}
                        </span>
                        <span className="font-display text-xl text-purple-900">
                          {formatPrice(order.totalAmount)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ══════════ MENU TAB ══════════ */}
          {tab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              {/* Add item toggle */}
              <div className="flex justify-between items-center mb-5">
                <p className="font-body text-sm text-purple-500">
                  {menuItems.length} item{menuItems.length !== 1 ? 's' : ''} in menu
                </p>
                <button
                  onClick={() => setShowAddForm(v => !v)}
                  className="font-body text-sm bg-gradient-to-r from-lilac to-blush text-purple-900 px-5 py-2 rounded-full border border-purple-200 hover:scale-105 transition-all shadow-sm"
                >
                  {showAddForm ? '✕ Cancel' : '+ Add Item'}
                </button>
              </div>

              {/* Add item form */}
              <AnimatePresence>
                {showAddForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mb-6"
                  >
                    <div className="bg-white rounded-3xl border border-lilac/30 p-6 shadow-sm">
                      <h3 className="font-display text-lg text-purple-900 mb-4">Add New Menu Item</h3>
                      <AddItemForm onClose={() => setShowAddForm(false)} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Menu grid */}
              {menuItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-body text-purple-400">No menu items yet. Add your first item above!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {menuItems.map((item) => (
                      <motion.div
                        key={item._id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-2xl border border-lilac/25 p-4 shadow-sm flex gap-3 hover:shadow-md transition-shadow group"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-lilac/20 to-blush/10 flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                          ) : (
                            { coffee: '☕', matcha: '🍵', pastries: '🥐', 'cold-drinks': '🧋' }[item.category] || '🍽'
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-sm text-purple-900 truncate">{item.name}</p>
                          <p className="font-body text-xs text-purple-400 capitalize mt-0.5">
                            {item.category?.replace('-', ' ')}
                          </p>
                          {item.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="font-body text-[10px] bg-lilac/20 text-purple-600 px-1.5 py-0.5 rounded-full">{tag}</span>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-body text-sm font-semibold text-purple-700">
                              {formatPrice(item.price)}
                            </span>
                            <span className={`font-body text-[10px] px-2 py-0.5 rounded-full ${
                              item.available ? 'bg-mint text-green-800' : 'bg-red-100 text-red-600'
                            }`}>
                              {item.available ? '● Active' : '● Hidden'}
                            </span>
                          </div>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteItem(item._id, item.name)}
                          className="text-purple-200 hover:text-red-400 transition-colors self-start flex-shrink-0 p-1 opacity-0 group-hover:opacity-100"
                          title="Delete item"
                        >
                          🗑
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
