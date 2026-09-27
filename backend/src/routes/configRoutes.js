import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      groomName: 'Yameera',
      groomTitle: 'Groom',
      groomLocation: 'Tokyo, Japan',
      brideName: 'Kaveesha',
      brideTitle: 'Bride',
      brideLocation: 'Colombo, Sri Lanka',
      weddingDate: '30 December 2026',
      weddingTime: '10:00 AM',
      receptionTime: '11:30 AM',
      venueName: 'Hotel Shans - Galigamuwa',
      venueAddress: 'Colombo - Kandy Rd, Galigamuwa, Sri Lanka',
      googleMapsUrl: process.env.GOOGLE_MAPS_URL || 'https://www.google.com/maps/dir//hotel+shan+galigamuwa/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3ae310dad6555583:0x6cda49f44d354751?sa=X&ved=1t:155782&ictx=111',
      whatsappPhone: process.env.WHATSAPP_PHONE || '+818055691384',
      invitationMessage: 'Together with our families, we warmly invite you to celebrate our wedding day and share in our joy on this special occasion.',
    }
  });
});

export default router;
