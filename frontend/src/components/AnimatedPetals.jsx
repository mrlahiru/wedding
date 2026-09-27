import React from 'react';

// Generates smooth, continuous drifting romantic rose petals in the background
export default function AnimatedPetals() {
  const petals = [
    { left: '5%', size: 14, duration: 11, delay: 0, opacity: 0.7, drift: 40 },
    { left: '15%', size: 18, duration: 14, delay: 3, opacity: 0.6, drift: -50 },
    { left: '25%', size: 12, duration: 10, delay: 1.5, opacity: 0.65, drift: 35 },
    { left: '35%', size: 16, duration: 13, delay: 5, opacity: 0.55, drift: -40 },
    { left: '48%', size: 20, duration: 16, delay: 2, opacity: 0.7, drift: 45 },
    { left: '60%', size: 13, duration: 12, delay: 4.5, opacity: 0.6, drift: -30 },
    { left: '72%', size: 17, duration: 15, delay: 1, opacity: 0.65, drift: 50 },
    { left: '82%', size: 15, duration: 11, delay: 6, opacity: 0.55, drift: -35 },
    { left: '92%', size: 19, duration: 14, delay: 2.5, opacity: 0.7, drift: 40 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes fallingRosePetal {
          0% {
            transform: translateY(-5vh) translateX(0px) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: var(--petal-opacity, 0.7);
          }
          50% {
            transform: translateY(50vh) translateX(var(--petal-drift, 40px)) rotate(180deg) scale(1);
            opacity: var(--petal-opacity, 0.7);
          }
          90% {
            opacity: var(--petal-opacity, 0.7);
          }
          100% {
            transform: translateY(105vh) translateX(calc(var(--petal-drift, 40px) * -0.5)) rotate(360deg) scale(0.8);
            opacity: 0;
          }
        }
        .romantic-petal {
          position: absolute;
          top: -20px;
          border-radius: 18px 0px 18px 0px;
          background: linear-gradient(135deg, #FDA4AF 0%, #FB7185 50%, #F43F5E 100%);
          box-shadow: 0 2px 8px rgba(244, 63, 94, 0.25);
          animation-name: fallingRosePetal;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          animation-iteration-count: infinite;
        }
      `}</style>

      {petals.map((p, i) => (
        <div
          key={i}
          className="romantic-petal"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size * 1.25}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--petal-opacity': p.opacity,
            '--petal-drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
