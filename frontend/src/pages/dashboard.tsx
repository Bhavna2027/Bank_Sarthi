import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Wallet, ArrowUpRight, ArrowDownLeft, Zap, Award, Target } from 'lucide-react';
import { Card, Badge, Progress, Button } from '../components';
import '../components/pages.css';

const Dashboard: React.FC = () => {
  // Mock data for charts
  const spendingData = [
    { month: 'Jan', amount: 2400, budget: 3000 },
    { month: 'Feb', amount: 2210, budget: 3000 },
    { month: 'Mar', amount: 2290, budget: 3000 },
    { month: 'Apr', amount: 2000, budget: 3000 },
    { month: 'May', amount: 2181, budget: 3000 },
    { month: 'Jun', amount: 2500, budget: 3000 },
  ];

  const categoryData = [
    { name: 'Food & Dining', value: 1200, fill: '#5B8FFF' },
    { name: 'Transport', value: 800, fill: '#00d4ff' },
    { name: 'Shopping', value: 600, fill: '#10b981' },
    { name: 'Entertainment', value: 400, fill: '#f59e0b' },
  ];

  const transactions = [
    { id: 1, merchant: 'Starbucks', amount: -45.50, category: 'Food', date: 'Today', type: 'expense' },
    { id: 2, merchant: 'Salary Deposit', amount: 5000, category: 'Income', date: 'Yesterday', type: 'income' },
    { id: 3, merchant: 'Netflix', amount: -15.99, category: 'Entertainment', date: '2 days ago', type: 'expense' },
    { id: 4, merchant: 'Uber', amount: -23.45, category: 'Transport', date: '3 days ago', type: 'expense' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="page-content"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Greeting Section */}
      <motion.div className="dashboard-greeting" variants={itemVariants}>
        <div>
          <h1 className="greeting-title">Welcome back, John! 👋</h1>
          <p className="greeting-subtitle">Here's your financial overview for this month</p>
        </div>
        <Button icon={<Zap size={18} />} iconPosition="left">
          Quick Actions
        </Button>
      </motion.div>

      {/* Key Metrics */}
      <motion.div className="metrics-grid" variants={itemVariants}>
        {/* Financial Health Score */}
        <Card variant="glass" className="metric-card">
          <div className="metric-header">
            <div className="metric-icon metric-icon-primary">
              <Award size={24} />
            </div>
            <Badge variant="success">↑ 5%</Badge>
          </div>
          <div className="metric-body">
            <p className="metric-label">Financial Health Score</p>
            <div className="metric-value">8.5/10</div>
            <Progress value={85} max={100} variant="primary" />
          </div>
        </Card>

        {/* Monthly Budget */}
        <Card variant="glass" className="metric-card">
          <div className="metric-header">
            <div className="metric-icon metric-icon-success">
              <Target size={24} />
            </div>
            <Badge variant="info">66% used</Badge>
          </div>
          <div className="metric-body">
            <p className="metric-label">Monthly Budget</p>
            <div className="metric-value">₹2,000 / ₹3,000</div>
            <Progress value={2000} max={3000} variant="primary" />
          </div>
        </Card>

        {/* Total Balance */}
        <Card variant="glass" className="metric-card">
          <div className="metric-header">
            <div className="metric-icon metric-icon-cyan">
              <Wallet size={24} />
            </div>
            <Badge variant="primary">Updated now</Badge>
          </div>
          <div className="metric-body">
            <p className="metric-label">Total Balance</p>
            <div className="metric-value">₹25,450.50</div>
            <div className="metric-subtext">+2.5% from last month</div>
          </div>
        </Card>

        {/* Savings Goal */}
        <Card variant="glass" className="metric-card">
          <div className="metric-header">
            <div className="metric-icon metric-icon-emerald">
              <TrendingUp size={24} />
            </div>
            <Badge variant="success">On track</Badge>
          </div>
          <div className="metric-body">
            <p className="metric-label">Savings Goal</p>
            <div className="metric-value">₹8,500 / ₹10,000</div>
            <Progress value={8500} max={10000} variant="success" />
          </div>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Spending Trend */}
        <motion.div variants={itemVariants}>
          <Card variant="default" className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Spending Trend</h3>
              <Badge variant="secondary">Last 6 months</Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B8FFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#5B8FFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#5B8FFF"
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div variants={itemVariants}>
          <Card variant="default" className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Spending by Category</h3>
              <Badge variant="secondary">This month</Badge>
            </div>
            <div className="category-breakdown">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#5B8FFF"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.75rem',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="category-list">
                {categoryData.map((cat, idx) => (
                  <div key={idx} className="category-item">
                    <div className="category-color" style={{ backgroundColor: cat.fill }} />
                    <div className="category-info">
                      <span className="category-name">{cat.name}</span>
                      <span className="category-amount">₹{cat.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div variants={itemVariants}>
        <Card variant="default" className="transactions-card">
          <div className="card-header">
            <h3 className="card-title">Recent Transactions</h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>

          <div className="transactions-list">
            {transactions.map((txn) => (
              <div key={txn.id} className="transaction-item">
                <div className="transaction-left">
                  <div className={`transaction-icon ${txn.type}`}>
                    {txn.type === 'expense' ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                  </div>
                  <div className="transaction-info">
                    <div className="transaction-merchant">{txn.merchant}</div>
                    <div className="transaction-date">{txn.date}</div>
                  </div>
                </div>
                <div className={`transaction-amount ${txn.type}`}>
                  {txn.type === 'expense' ? '−' : '+'} ₹{Math.abs(txn.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Learning & Achievements */}
      <motion.div className="learning-section" variants={itemVariants}>
        <Card variant="glass" className="learning-card">
          <div className="learning-header">
            <h3 className="learning-title">Daily Learning</h3>
            <span className="learning-badge">3 min read</span>
          </div>
          <p className="learning-description">Understand investment strategies and make informed financial decisions</p>
          <Button variant="primary" size="sm" fullWidth>
            Continue Learning
          </Button>
        </Card>

        <Card variant="glass" className="achievement-card">
          <div className="achievement-header">
            <h3 className="achievement-title">Achievements</h3>
            <span className="achievement-count">3/5</span>
          </div>
          <div className="achievement-badges">
            <div className="achievement-badge unlocked">
              <span className="achievement-icon">🎯</span>
            </div>
            <div className="achievement-badge unlocked">
              <span className="achievement-icon">💰</span>
            </div>
            <div className="achievement-badge unlocked">
              <span className="achievement-icon">📈</span>
            </div>
            <div className="achievement-badge locked">
              <span className="achievement-icon">🔓</span>
            </div>
            <div className="achievement-badge locked">
              <span className="achievement-icon">🔓</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
