import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import AdminRegistration from './pages/AdminRegistration';
import UserRegistration from './pages/UserRegistration';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-registration" element={<AdminRegistration />} />
            <Route path="/user-registration" element={<UserRegistration />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;