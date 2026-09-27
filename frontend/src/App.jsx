import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import InvitationPage from './pages/InvitationPage';
import AdminDashboard from './pages/AdminDashboard';
import { fetchWeddingConfig } from './services/api';

export default function App() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetchWeddingConfig().then((data) => {
      setConfig(data);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<InvitationPage config={config} />} />
      <Route path="/admin" element={<AdminDashboard config={config} />} />
    </Routes>
  );
}
