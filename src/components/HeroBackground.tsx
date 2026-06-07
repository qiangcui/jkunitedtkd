import { useEffect, useState } from 'react';
import { assetUrl } from '../assetUrl';

const HERO_IMAGE = assetUrl('/media/Untitled-design.jpg');

export default function HeroBackground() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );

  const mediaClass = isMobile
    ? 'h-full w-full object-cover brightness-[0.68] contrast-[1.14] saturate-[1.06]'
    : 'h-full w-full object-cover brightness-[0.5] contrast-[1.05]';

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);
    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className={mediaClass}
      />
      <div className="absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
    </div>
  );
}
