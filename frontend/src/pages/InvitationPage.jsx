import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import InvitationMessage from '../components/InvitationMessage';
import WeddingDetails from '../components/WeddingDetails';
import LocationSection from '../components/LocationSection';
import RSVPSection from '../components/RSVPSection';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';
import Footer from '../components/Footer';
import AnimatedPetals from '../components/AnimatedPetals';

export default function InvitationPage({ config }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5F6] relative">
      <AnimatedPetals />
      <Navbar config={config} />
      <main className="flex-grow relative z-10">
        <HeroSection config={config} />
        <InvitationMessage config={config} />
        <WeddingDetails config={config} />
        <LocationSection config={config} />
        <RSVPSection config={config} />
      </main>
      <WhatsAppFloatingButton config={config} />
      <Footer config={config} />
    </div>
  );
}
