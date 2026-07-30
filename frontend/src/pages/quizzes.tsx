import React from 'react';
import { motion } from 'framer-motion';
import { Card, Badge, Button, Progress } from '../components';
import { Zap, Trophy, Target, Award } from 'lucide-react';
import '../components/pages.css';

const Quizzes: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = React.useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);

  const userStats = [
    {
      label: 'Total XP',
      value: '2,450',
      icon: <Zap size={24} />,
      color: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    },
    {
      label: 'Level',
      value: '12',
      icon: <Trophy size={24} />,
      color: 'linear-gradient(135deg, #5B8FFF 0%, #4873E8 100%)',
    },
    {
      label: 'Streak',
      value: '7 days',
      icon: <Target size={24} />,
      color: 'linear-gradient(135deg, #10b981 0%, #6ee7b7 100%)',
    },
    {
      label: 'Badges',
      value: '8',
      icon: <Award size={24} />,
      color: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
    },
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Investment Basics',
      category: 'investing',
      difficulty: 'easy',
      xp: 100,
      questions: 5,
      completed: true,
      score: 5,
      description: 'Learn the fundamentals of investing and portfolio management',
      duration: '5-7 min',
    },
    {
      id: 2,
      title: 'Budgeting 101',
      category: 'budgeting',
      difficulty: 'easy',
      xp: 100,
      questions: 5,
      completed: true,
      score: 4,
      description: 'Master the art of budgeting and expense tracking',
      duration: '5-7 min',
    },
    {
      id: 3,
      title: 'Credit Score Mastery',
      category: 'credit',
      difficulty: 'medium',
      xp: 150,
      questions: 8,
      completed: false,
      score: 0,
      description: 'Understand credit scores and improve your financial health',
      duration: '8-10 min',
    },
    {
      id: 4,
      title: 'Tax Planning Strategies',
      category: 'tax',
      difficulty: 'hard',
      xp: 250,
      questions: 10,
      completed: false,
      score: 0,
      description: 'Advanced tax planning and optimization techniques',
      duration: '12-15 min',
    },
    {
      id: 5,
      title: 'Cryptocurrency Basics',
      category: 'investing',
      difficulty: 'hard',
      xp: 200,
      questions: 8,
      completed: false,
      score: 0,
      description: 'Introduction to crypto and blockchain technology',
      duration: '10-12 min',
    },
    {
      id: 6,
      title: 'Emergency Fund Essentials',
      category: 'savings',
      difficulty: 'easy',
      xp: 80,
      questions: 4,
      completed: false,
      score: 0,
      description: 'Build and maintain an effective emergency fund',
      duration: '4-6 min',
    },
  ];

  const quizQuestions = [
    {
      question: 'What is compound interest?',
      options: [
        'Interest calculated only on principal',
        'Interest on principal and previously earned interest',
        'Interest paid monthly',
        'A type of savings account',
      ],
      correct: 1,
    },
    {
      question: 'Which investment is typically the safest?',
      options: ['Stocks', 'Bonds', 'Cryptocurrency', 'Futures'],
      correct: 1,
    },
    {
      question: 'What percentage of income should go to savings?',
      options: ['5%', '10%', '15-20%', '50%'],
      correct: 2,
    },
  ];

  const badges = [
    { id: 1, name: 'First Step', icon: '🎯', unlocked: true },
    { id: 2, name: 'Learner', icon: '📚', unlocked: true },
    { id: 3, name: 'Expert', icon: '🏆', unlocked: true },
    { id: 4, name: 'Streak Master', icon: '🔥', unlocked: true },
    { id: 5, name: 'Quiz Champion', icon: '👑', unlocked: true },
    { id: 6, name: 'Financial Guru', icon: '💎', unlocked: false },
    { id: 7, name: 'Speed Runner', icon: '⚡', unlocked: false },
    { id: 8, name: 'Perfect Score', icon: '100', unlocked: false },
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Kumar', xp: 5240, avatar: 'AK' },
    { rank: 2, name: 'Sarah Chen', xp: 4890, avatar: 'SC' },
    { rank: 3, name: 'You', xp: 2450, avatar: 'JD', isUser: true },
    { rank: 4, name: 'Priya Sharma', xp: 2120, avatar: 'PS' },
    { rank: 5, name: 'Mike Johnson', xp: 1890, avatar: 'MJ' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (selectedQuiz !== null) {
    const quiz = quizzes.find((q) => q.id === selectedQuiz);
    const question = quizQuestions[currentQuestion];

    return (
      <motion.div className="page-content" variants={containerVariants} initial="hidden" animate="visible">
        <Button variant="ghost" onClick={() => setSelectedQuiz(null)}>
          ← Back to Quizzes
        </Button>

        <Card variant="glass">
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>{quiz?.title}</h2>
              <Badge variant="primary">Question {currentQuestion + 1}/{quizQuestions.length}</Badge>
            </div>
            <Progress value={currentQuestion + 1} max={quizQuestions.length} />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>{question?.question}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {question?.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (idx === question?.correct) {
                      setScore(score + 1);
                    }
                    if (currentQuestion < quizQuestions.length - 1) {
                      setCurrentQuestion(currentQuestion + 1);
                    }
                  }}
                  style={{
                    padding: '1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    background: 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 150ms ease-in-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#5B8FFF';
                    e.currentTarget.style.background = 'rgba(91, 143, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>{option}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div className="page-content" variants={containerVariants} initial="hidden" animate="visible">
      {/* User Stats */}
      <motion.div className="quiz-progress" variants={itemVariants}>
        {userStats.map((stat, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <Card variant="glass">
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  background: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  marginBottom: '1rem',
                }}
              >
                {stat.icon}
              </div>
              <div className="progress-label">{stat.label}</div>
              <div className="progress-value">{stat.value}</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Badges */}
      <motion.div variants={itemVariants}>
        <h2 style={{ marginBottom: '1rem' }}>Your Badges</h2>
        <Card variant="default">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '1rem' }}>
            {badges.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.1 }}
                style={{
                  textAlign: 'center',
                  opacity: badge.unlocked ? 1 : 0.4,
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    fontSize: '2.5rem',
                    marginBottom: '0.5rem',
                    filter: !badge.unlocked ? 'grayscale(1)' : 'none',
                  }}
                >
                  {badge.icon}
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#1f2937' }}>
                  {badge.name}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Available Quizzes */}
      <motion.div variants={itemVariants}>
        <h2 style={{ marginBottom: '1rem' }}>Available Quizzes</h2>
        <motion.div className="quizzes-grid" variants={containerVariants}>
          {quizzes.map((quiz) => (
            <motion.div key={quiz.id} variants={itemVariants}>
              <Card variant="default" interactive hoverEffect className="quiz-card">
                <div className="quiz-header">
                  <h3 className="quiz-title">{quiz.title}</h3>
                  <Badge className={`quiz-difficulty ${quiz.difficulty}`}>{quiz.difficulty}</Badge>
                </div>

                <p className="quiz-description">{quiz.description}</p>

                <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Progress</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                      {quiz.completed ? '100%' : '0%'}
                    </span>
                  </div>
                  <Progress
                    value={quiz.completed ? 100 : 0}
                    max={100}
                    variant={quiz.completed ? 'success' : 'primary'}
                  />
                </div>

                <div className="quiz-meta">
                  <span>⏱️ {quiz.duration}</span>
                  <span>📊 {quiz.questions} Q</span>
                  <span>⭐ +{quiz.xp} XP</span>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => setSelectedQuiz(quiz.id)}
                  style={{ marginTop: '1rem' }}
                >
                  {quiz.completed ? 'Retake' : 'Start'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div variants={itemVariants}>
        <h2 style={{ marginBottom: '1rem' }}>Leaderboard</h2>
        <Card variant="default">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  background: user.isUser ? 'rgba(91, 143, 255, 0.1)' : '#f9fafb',
                  borderRadius: '0.75rem',
                  border: user.isUser ? '1px solid rgba(91, 143, 255, 0.3)' : 'none',
                }}
              >
                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    background: user.rank <= 3 ? ['#fbbf24', '#c0cfe4', '#ff9d6d'][user.rank - 1] : '#e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    color: user.rank <= 3 ? 'white' : '#6b7280',
                    marginRight: '1rem',
                  }}
                >
                  {user.rank}
                </div>
                <div
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #5B8FFF 0%, #4873E8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    marginRight: '1rem',
                  }}
                >
                  {user.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>{user.name}</div>
                </div>
                <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#5B8FFF' }}>
                  {user.xp} XP
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Quizzes;
