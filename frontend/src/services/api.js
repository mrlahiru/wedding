// API Service for communicating with Express backend

const API_BASE = '/api';

export const fetchWeddingConfig = async () => {
  try {
    const res = await fetch(`${API_BASE}/config`);
    const data = await res.json();
    if (data.success) {
      return data.data;
    }
    throw new Error('Failed to load wedding config');
  } catch (error) {
    console.warn('API config fetch fallback:', error);
    return {
      groomName: 'Yameera',
      groomTitle: 'Groom',
      groomLocation: 'Tokyo, Japan 🌸',
      brideName: 'Kaveesha',
      brideTitle: 'Bride',
      brideLocation: 'Colombo, Sri Lanka 🇱🇰',
      weddingDate: '30 December 2026',
      weddingTime: '10:00 AM',
      receptionTime: '11:30 AM',
      venueName: 'Hotel Shans - Galigamuwa',
      venueAddress: 'Colombo - Kandy Rd, Galigamuwa, Sri Lanka',
      googleMapsUrl: 'https://www.google.com/maps/dir//hotel+shan+galigamuwa/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3ae310dad6555583:0x6cda49f44d354751?sa=X&ved=1t:155782&ictx=111',
      whatsappPhone: '+818055691384',
      invitationMessage: 'Together with our families, we warmly invite you to celebrate our wedding day and share in our joy on this special occasion.',
    };
  }
};

export const submitRSVP = async (rsvpData) => {
  const res = await fetch(`${API_BASE}/rsvp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rsvpData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Error submitting RSVP');
  }
  return data;
};

export const verifyAdminPassword = async (password) => {
  const res = await fetch(`${API_BASE}/rsvp/admin-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Invalid Admin Password');
  }
  return data;
};

export const fetchRSVPs = async (adminPassword) => {
  const res = await fetch(`${API_BASE}/rsvp`, {
    headers: {
      'x-admin-key': adminPassword || '',
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Error fetching RSVP records');
  }
  return data;
};
