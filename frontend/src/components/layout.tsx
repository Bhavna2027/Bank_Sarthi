import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Settings, LogOut, Home, Zap, BookOpen, BarChart3, Trophy, ChevronDown } from 'lucide-react';
import { Avatar, Button } from '../components';
import './layout.css';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'voice', label: 'Voice Assistant', icon: Zap },
    { id: 'bankopedia', label: 'Bankopedia', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'quizzes', label: 'Quizzes', icon: Trophy },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">BS</div>
            <span className="sidebar-logo-text">BankSarthi</span>
          </div>
          <button className="sidebar-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                className={`sidebar-nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {currentPage === item.id && <div className="sidebar-nav-indicator" />}
              </motion.button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <Avatar size="sm" fallback="JD" />
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">John Doe</div>
              <div className="sidebar-user-email">john@example.com</div>
            </div>
          </div>
          <div className="sidebar-actions">
            <button className="sidebar-action-btn" title="Settings">
              <Settings size={18} />
            </button>
            <button className="sidebar-action-btn" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, title = 'BankSarthi' }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-right">
        <div className="header-search">
          <input
            type="text"
            placeholder="Search..."
            className="header-search-input"
            aria-label="Search"
          />
        </div>

        <motion.button
          className="header-icon-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Notifications"
        >
          <Bell size={20} />
          <span className="header-notification-badge">3</span>
        </motion.button>

        <motion.button
          className="header-icon-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Settings"
        >
          <Settings size={20} />
        </motion.button>
      </div>
    </header>
  );
};

export interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const pageTitle = {
    dashboard: 'Dashboard',
    voice: 'Voice Assistant',
    bankopedia: 'Bankopedia',
    analytics: 'Analytics',
    quizzes: 'Quizzes',
  }[currentPage] || 'BankSarthi';

  return (
    <div className="layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        onNavigate={onPageChange}
      />
      <div className="layout-main">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} title={pageTitle} />
        <main className="layout-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
