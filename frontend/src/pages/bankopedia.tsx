import React from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Bookmark } from 'lucide-react';
import { Card, Badge, Button, Input } from '../components';
import '../components/pages.css';

const Bankopedia: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const categories = [
    { id: 'basics', name: 'Basics', icon: '💰', count: 12 },
    { id: 'investing', name: 'Investing', icon: '📈', count: 18 },
    { id: 'budgeting', name: 'Budgeting', icon: '📊', count: 15 },
    { id: 'credit', name: 'Credit', icon: '💳', count: 10 },
    { id: 'savings', name: 'Savings', icon: '🏦', count: 14 },
    { id: 'tax', name: 'Tax', icon: '📋', count: 11 },
  ];

  const terms = [
    {
      id: 1,
      title: 'Compound Interest',
      category: 'investing',
      description: 'Interest calculated on both the principal amount and previously earned interest, accelerating wealth growth over time.',
      tags: ['investing', 'growth', 'basics'],
      difficulty: 'beginner',
    },
    {
      id: 2,
      title: 'Budget Allocation',
      category: 'budgeting',
      description: 'Strategic distribution of your income across different categories like housing, food, and savings.',
      tags: ['budgeting', 'planning', 'money-management'],
      difficulty: 'beginner',
    },
    {
      id: 3,
      title: 'Diversification',
      category: 'investing',
      description: 'Spreading investments across different asset classes to reduce risk and improve potential returns.',
      tags: ['investing', 'risk', 'strategy'],
      difficulty: 'intermediate',
    },
    {
      id: 4,
      title: 'Emergency Fund',
      category: 'savings',
      description: 'Money set aside (usually 3-6 months of expenses) to cover unexpected financial emergencies.',
      tags: ['savings', 'safety-net', 'planning'],
      difficulty: 'beginner',
    },
    {
      id: 5,
      title: 'Credit Score',
      category: 'credit',
      description: 'A numerical representation of your creditworthiness based on your credit history and payment behavior.',
      tags: ['credit', 'loans', 'financial-health'],
      difficulty: 'beginner',
    },
    {
      id: 6,
      title: 'Tax Brackets',
      category: 'tax',
      description: 'Income ranges to which different tax rates apply, determining the percentage of tax you owe.',
      tags: ['tax', 'income', 'planning'],
      difficulty: 'intermediate',
    },
  ];

  const filteredTerms = selectedCategory
    ? terms.filter((term) => term.category === selectedCategory)
    : terms;

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
      <div style={{ maxWidth: '600px' }}>
        <h1 style={{ marginBottom: '1rem' }}>Bankopedia</h1>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Your comprehensive financial knowledge base</p>

        <div className="bankopedia-search">
          <Input
            type="text"
            placeholder="Search terms..."
            icon={<Search size={18} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <motion.div className="bankopedia-categories" variants={itemVariants}>
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            className="category-card"
            variant="default"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            style={{
              background: selectedCategory === cat.id ? 'linear-gradient(135deg, rgba(91, 143, 255, 0.1) 0%, rgba(0, 212, 255, 0.05) 100%)' : 'white',
              border: selectedCategory === cat.id ? '2px solid #5B8FFF' : '1px solid #e5e7eb',
              padding: '1.5rem',
              borderRadius: '1rem',
              cursor: 'pointer',
              transition: 'all 250ms ease-in-out',
              textAlign: 'center',
            }}
          >
            <div className="category-icon">{cat.icon}</div>
            <div className="category-name">{cat.name}</div>
            <div className="category-count">{cat.count} topics</div>
          </motion.button>
        ))}
      </motion.div>

      <div>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>
            {selectedCategory
              ? categories.find((c) => c.id === selectedCategory)?.name + ' Topics'
              : 'All Topics'}
          </h2>
          <p style={{ color: '#6b7280', margin: 0 }}>
            {filteredTerms.length} {filteredTerms.length === 1 ? 'topic' : 'topics'}
          </p>
        </div>

        <motion.div className="terms-grid" variants={containerVariants}>
          {filteredTerms.map((term) => (
            <motion.div key={term.id} variants={itemVariants}>
              <Card variant="default" interactive hoverEffect className="term-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <Badge variant="primary">{term.category}</Badge>
                  <Button variant="ghost" size="sm" icon={<Bookmark size={16} />} />
                </div>
                <h3 className="term-title">{term.title}</h3>
                <p className="term-description">{term.description}</p>
                <div className="term-tags">
                  {term.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Bankopedia;
