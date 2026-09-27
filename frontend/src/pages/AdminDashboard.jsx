import React, { useState, useEffect } from 'react';
import { Users, CheckCircle2, XCircle, Search, RefreshCw, Download, MessageCircle, ShieldCheck, Lock, LogOut, KeyRound } from 'lucide-react';
import { fetchRSVPs, verifyAdminPassword } from '../services/api';
import Navbar from '../components/Navbar';

export default function AdminDashboard({ config }) {
  const [passwordInput, setPasswordInput] = useState('');
  const [adminPassword, setAdminPassword] = useState(
    sessionStorage.getItem('wedding_admin_key') || ''
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(sessionStorage.getItem('wedding_admin_key'))
  );
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [guests, setGuests] = useState([]);
  const [summary, setSummary] = useState({ total: 0, attending: 0, notAttending: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const loadData = async (keyToUse = adminPassword) => {
    if (!keyToUse) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetchRSVPs(keyToUse);
      if (res.success) {
        setGuests(res.data || []);
        setSummary(res.summary || { total: 0, attending: 0, notAttending: 0 });
        setIsAuthenticated(true);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch RSVP records');
      if (err.message.includes('Unauthorized')) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('wedding_admin_key');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminPassword) {
      loadData(adminPassword);
    }
  }, [adminPassword]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      await verifyAdminPassword(passwordInput);
      sessionStorage.setItem('wedding_admin_key', passwordInput);
      setAdminPassword(passwordInput);
      setIsAuthenticated(true);
      loadData(passwordInput);
    } catch (err) {
      setLoginError(err.message || 'Incorrect Admin Password');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('wedding_admin_key');
    setAdminPassword('');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // Filtered Guests
  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.phone.includes(searchTerm);

    if (statusFilter === 'ATTENDING') {
      return matchesSearch && g.attending === true;
    }
    if (statusFilter === 'NOT_ATTENDING') {
      return matchesSearch && g.attending === false;
    }
    return matchesSearch;
  });

  const handleExportCSV = () => {
    if (!guests.length) return;

    const headers = ['Name', 'Phone', 'Status', 'Response Date', 'Notes'];
    const rows = guests.map((g) => [
      `"${g.name.replace(/"/g, '""')}"`,
      `"${g.phone}"`,
      g.attending ? 'Attending' : 'Declined',
      `"${new Date(g.createdAt).toLocaleString()}"`,
      `"${(g.note || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wedding_rsvp_guests_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const attendanceRate = summary.total > 0
    ? Math.round((summary.attending / summary.total) * 100)
    : 0;

  // Password Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFF0F2] via-[#FFF5F6] to-[#FFF0F3] flex flex-col justify-center items-center px-4 relative overflow-hidden">
        <Navbar config={config} />
        
        {/* Ambient Light Red Glows */}
        <div className="absolute top-1/4 -left-16 w-72 h-72 rounded-full bg-rose-200/40 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 -right-16 w-72 h-72 rounded-full bg-red-200/35 blur-3xl pointer-events-none animate-pulse" />

        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm p-8 rounded-3xl border border-rose-200/90 shadow-xl rose-shadow text-center space-y-6 z-10 animate-fadeInUp">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center border-2 border-rose-300 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="font-serif text-3xl font-bold text-charcoal">
              Admin Access
            </h2>
            <p className="text-xs text-gray-500">
              Please enter the host password to access guest RSVPs.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {loginError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {loginError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-rose-500" />
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                required
                className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/20 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:from-[#C5A059] hover:to-[#B8860B] text-white font-bold text-sm shadow-md shadow-gold-500/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loginLoading ? 'Verifying...' : 'Unlock Dashboard'}
            </button>
          </form>

          <p className="text-[11px] text-gray-400">
            Default Password: <code className="bg-rose-50 px-1.5 py-0.5 rounded text-rose-700 font-mono">admin123</code> (Configurable in <code className="bg-rose-50 px-1.5 py-0.5 rounded text-rose-700 font-mono">.env</code>)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F6] via-[#FFEBF0] to-[#FFF5F6] pb-16">
      <Navbar config={config} />

      <div className="pt-24 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gold-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-gold-600 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <span>Wedding Management</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-charcoal mt-1">
              Guest RSVP Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadData(adminPassword)}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl border border-gold-300 text-gold-700 bg-gold-50 hover:bg-gold-100 font-medium text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            <button
              onClick={handleExportCSV}
              disabled={!guests.length}
              className="px-4 py-2.5 rounded-xl bg-gold-500 text-white hover:bg-gold-600 font-medium text-xs flex items-center gap-2 shadow-sm transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 font-medium text-xs flex items-center gap-1.5 transition-colors"
              title="Logout Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-gold-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-bold uppercase tracking-wider">Total RSVPs</span>
              <Users className="w-5 h-5 text-gold-500" />
            </div>
            <p className="font-serif text-3xl font-bold text-charcoal">{summary.total}</p>
            <p className="text-xs text-gray-500">Recorded responses</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-emerald-600">
              <span className="text-xs font-bold uppercase tracking-wider">Attending</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="font-serif text-3xl font-bold text-emerald-700">{summary.attending}</p>
            <p className="text-xs text-emerald-600">Confirmed guests</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-rose-600">
              <span className="text-xs font-bold uppercase tracking-wider">Not Attending</span>
              <XCircle className="w-5 h-5 text-rose-500" />
            </div>
            <p className="font-serif text-3xl font-bold text-rose-700">{summary.notAttending}</p>
            <p className="text-xs text-rose-600">Declined invitations</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gold-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gold-600">
              <span className="text-xs font-bold uppercase tracking-wider">Acceptance Rate</span>
              <span className="text-xs font-bold text-gold-700">{attendanceRate}%</span>
            </div>
            <div className="w-full bg-gold-100 rounded-full h-2.5 mt-2">
              <div
                className="bg-gold-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${attendanceRate}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Based on total responses</p>
          </div>

        </div>

        {/* Filter Controls & Search */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gold-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gold-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 bg-gold-50/20"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {[
                { key: 'ALL', label: `All (${summary.total})` },
                { key: 'ATTENDING', label: `Attending (${summary.attending})` },
                { key: 'NOT_ATTENDING', label: `Declined (${summary.notAttending})` },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setStatusFilter(filter.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-colors ${
                    statusFilter === filter.key
                      ? 'bg-gold-500 text-white shadow-sm'
                      : 'bg-gold-50 text-gold-700 hover:bg-gold-100 border border-gold-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

          </div>

          {/* Guest List Table */}
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200">
              {error}
            </div>
          )}

          <div className="overflow-x-auto rounded-2xl border border-gold-100">
            <table className="w-full text-left text-sm text-charcoal">
              <thead className="bg-gold-50/70 border-b border-gold-200 text-xs uppercase tracking-wider text-gold-800 font-bold">
                <tr>
                  <th className="py-3.5 px-4">Guest Name</th>
                  <th className="py-3.5 px-4">Phone Number</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Response Date</th>
                  <th className="py-3.5 px-4">Note / Message</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      Loading guest list...
                    </td>
                  </tr>
                ) : filteredGuests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No matching guest responses found.
                    </td>
                  </tr>
                ) : (
                  filteredGuests.map((guest) => {
                    const cleanPhone = guest.phone.replace(/[^\d]/g, '');
                    const dateStr = guest.createdAt
                      ? new Date(guest.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Recent';

                    return (
                      <tr key={guest._id || guest.name} className="hover:bg-gold-50/30 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-charcoal">
                          {guest.name}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-gray-600 text-xs">
                          {guest.phone}
                        </td>
                        <td className="py-3.5 px-4">
                          {guest.attending ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Attending
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              Declined
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-gray-500">
                          {dateStr}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-gray-600 italic max-w-xs truncate">
                          {guest.note || '—'}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <a
                            href={`https://wa.me/${cleanPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200"
                            title="Message Guest on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}
