import React, { useEffect, useState } from 'react';
import globalStyles from './styles/global';
import designSystem, { colors, typography } from './styles/designSystem';
import Layout from './components/layout';
import Dashboard from './pages/dashboard';
import VoiceAssistant from './pages/voice';
import Bankopedia from './pages/bankopedia';
import Analytics from './pages/analytics';
import Quizzes from './pages/quizzes';

export interface AppState {
  currentPage: 'dashboard' | 'voice' | 'bankopedia' | 'analytics' | 'quizzes';
  isLoading: boolean;
  apiStatus: string;
}

function App() {
  const [state, setState] = useState<AppState>({
    currentPage: 'dashboard',
    isLoading: true,
    apiStatus: 'Checking...',
  });

  useEffect(() => {
    // Inject global styles
    const style = document.createElement('style');
    style.innerHTML = globalStyles;
    document.head.appendChild(style);

    // Inject CSS variables
    const variablesStyle = document.createElement('style');
    variablesStyle.innerHTML = `
      :root {
        --primary: ${colors.primary[500]};
        --secondary: ${colors.gray[500]};
        --success: ${colors.success};
        --warning: ${colors.warning};
        --error: ${colors.error};
        --font-body: ${typography.fontFamily.body};
        --font-display: ${typography.fontFamily.display};
        --font-mono: ${typography.fontFamily.mono};
      }
    `;
    document.head.appendChild(variablesStyle);

    // Check API health
    fetch('http://localhost:8000/health')
      .then((res) => res.json())
      .then((data) => {
        setState((prev) => ({
          ...prev,
          apiStatus: data.status || 'ok',
          isLoading: false,
        }));
      })
      .catch(() => {
        setState((prev) => ({
          ...prev,
          apiStatus: 'unavailable',
          isLoading: false,
        }));
      });

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(variablesStyle);
    };
  }, []);

  const handlePageChange = (page: string) => {
    setState((prev) => ({
      ...prev,
      currentPage: page as AppState['currentPage'],
    }));
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (state.currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'voice':
        return <VoiceAssistant />;
      case 'bankopedia':
        return <Bankopedia />;
      case 'analytics':
        return <Analytics />;
      case 'quizzes':
        return <Quizzes />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout currentPage={state.currentPage} onPageChange={handlePageChange}>
        {renderPage()}
      </Layout>

      {/* API Status Indicator (Development) */}
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            padding: '0.75rem 1rem',
            background: state.apiStatus === 'ok' ? '#10b981' : '#ef4444',
            color: 'white',
            borderRadius: '0.5rem',
            fontSize: '0.75rem',
            fontWeight: '600',
            zIndex: 1000,
          }}
        >
          API: {state.apiStatus}
        </div>
      )}
    </>
  );
}

export default App;
