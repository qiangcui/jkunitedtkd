import { useEffect, useRef, useState } from 'react';
import { assetUrl } from '../assetUrl';

const HERO_POSTER = assetUrl('/media/Untitled-design.jpg');
const HERO_VIDEO_MOBILE = assetUrl('/media/JK-United-Video-3-mobile.mp4');
const HERO_VIDEO_DESKTOP = assetUrl('/media/JK-United-Video-3-desktop.mp4');

function pickHeroVideoSrc() {
  if (typeof window === 'undefined') {
    return HERO_VIDEO_DESKTOP;
  }

  return window.matchMedia('(max-width: 767px)').matches
    ? HERO_VIDEO_MOBILE
    : HERO_VIDEO_DESKTOP;
}

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(pickHeroVideoSrc);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );
  const [showFallbackImage, setShowFallbackImage] = useState(false);

  const mediaClass = isMobile
    ? 'h-full w-full object-cover brightness-[0.68] contrast-[1.14] saturate-[1.06]'
    : 'h-full w-full object-cover brightness-[0.5] contrast-[1.05]';

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateSource = () => {
      setIsMobile(mediaQuery.matches);
      setShowFallbackImage(false);
      setVideoSrc(mediaQuery.matches ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP);
    };

    updateSource();
    mediaQuery.addEventListener('change', updateSource);
    return () => mediaQuery.removeEventListener('change', updateSource);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || showFallbackImage) return;

    const playVideo = () => {
      void video.play().catch(() => setShowFallbackImage(true));
    };

    video.load();
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      playVideo();
      return;
    }

    video.addEventListener('loadeddata', playVideo, { once: true });
    return () => video.removeEventListener('loadeddata', playVideo);
  }, [videoSrc, showFallbackImage]);

  return (
    <div className="absolute inset-0 z-0">
      {!showFallbackImage ? (
        <video
          ref={videoRef}
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={() => setShowFallbackImage(true)}
          className={mediaClass}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <img
          src={HERO_POSTER}
          alt=""
          aria-hidden="true"
          decoding="async"
          className={mediaClass}
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
    </div>
  );
}
