import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, Badge, Button } from '../components';
import { Download, Filter } from 'lucide-react';
import '../components/pages.css';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState<'week' | 'month' | 'year'>('month');

  const monthlyData = [
    { month: 'Week 1', spending: 1200, budget: 750 },
    { month: 'Week 2', spending: 1900, budget: 750 },
    { month: 'Week 3', spending: 800, budget: 750 },
    { month: 'Week 4', spending: 1100, budget: 750 },
  ];

  const merchantData = [
    { name: 'Amazon', amount: 450, color: '#5B8FFF' },
    { name: 'Starbucks', amount: 320, color: '#00d4ff' },
    { name: 'Uber', amount: 280, color: '#10b981' },
    { name: 'Netflix', amount: 200, color: '#f59e0b' },
    { name: 'Others', amount: 350, color: '#e5e7eb' },
  ];

  const subscriptions = [
    { id: 1, name: 'Netflix', amount: 199, frequency: 'monthly', category: 'Entertainment' },
    { id: 2, name: 'Spotify', amount: 99, frequency: 'monthly', category: 'Music' },
    { id: 3, name: 'Adobe CC', amount: 599, frequency: 'monthly', category: 'Software' },
    { id: 4, name: 'Gym Membership', amount: 500, frequency: 'monthly', category: 'Health' },
  ];

  const insights = [
    {
      title: 'Top Spending Day',
      value: 'Saturday',
      description: 'Avg: ₹480',
      icon: '📅',
      color: '#f59e0b',
    },
    {
      title: 'Most Spent Category',
      value: 'Food & Dining',
      description: '32% of budget',
      icon: '🍽️',
      color: '#10b981',
    },
    {
      title: 'Average Transaction',
      value: '₹285.50',
      description: '↓ 12% from last month',
      icon: '💳',
      color: '#5B8FFF',
    },
    {
      title: 'Recurring Charges',
      value: '₹1,397',
      description: '/month',
      icon: '🔄',
      color: '#06b6d4',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div className="page-content" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
          <h1 style={{ margin: 0 }}>Analytics & Insights</h1>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="secondary" size="sm" icon={<Filter size={16} />}>
              Filter
            </Button>
            <Button variant="secondary" size="sm" icon={<Download size={16} />}>
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Time Range Selector */}
      <motion.div className="analytics-filters" variants={itemVariants}>
        {(['week', 'month', 'year'] as const).map((range) => (
          <button
            key={range}
            className={`analytics-filter-btn ${timeRange === range ? 'active' : ''}`}
            onClick={() => setTimeRange(range)}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Key Insights */}
      <motion.div className="analytics-grid" variants={itemVariants}>
        {insights.map((insight, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <Card variant="glass">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>{insight.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                    {insight.title}
                  </p>
                  <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
                    {insight.value}
                  </h3>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#9ca3af' }}>{insight.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Spending Trend */}
        <motion.div variants={itemVariants}>
          <Card variant="default">
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Weekly Spending Trend</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Compared to your budget</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                  }}
                />
                <Legend />
                <Bar dataKey="spending" fill="#5B8FFF" radius={[8, 8, 0, 0]} />
                <Bar dataKey="budget" fill="#e5e7eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Top Merchants */}
        <motion.div variants={itemVariants}>
          <Card variant="default">
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Top Merchants</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Your spending by merchant</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {merchantData.map((merchant, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>{merchant.name}</span>
                      <span style={{ color: '#6b7280' }}>₹{merchant.amount}</span>
                    </div>
                    <div
                      style={{
                        height: '0.5rem',
                        background: '#e5e7eb',
                        borderRadius: '9999px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          background: merchant.color,
                          width: `${(merchant.amount / 450) * 100}%`,
                          borderRadius: '9999px',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Subscriptions */}
      <motion.div variants={itemVariants}>
        <Card variant="default">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Recurring Subscriptions</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Total: ₹1,397/month</p>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {subscriptions.map((sub) => (
              <Card key={sub.id} variant="flat">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                  <h4 style={{ margin: 0, color: '#1f2937' }}>{sub.name}</h4>
                  <Badge variant="secondary" size="sm">
                    {sub.frequency}
                  </Badge>
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                  {sub.category}
                </p>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#5B8FFF' }}>₹{sub.amount}</div>
              </Card>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
