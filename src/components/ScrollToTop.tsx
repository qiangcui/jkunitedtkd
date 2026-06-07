import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="md:hidden fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#1E3A8A]/40 bg-[#0A1128]/95 text-white shadow-lg shadow-black/30 backdrop-blur-sm transition-all active:scale-95 hover:border-[#CC2936]/60 hover:bg-[#CC2936]"
      aria-label="Scroll to top"
    >
      <ArrowUp size={26} strokeWidth={2.5} />
    </button>
  );
}
