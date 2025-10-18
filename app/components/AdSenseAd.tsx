'use client';

import { useEffect } from 'react';

interface AdSenseAdProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSenseAd({ 
  slot = 'auto',
  format = 'auto',
  style = { display: 'block' },
  className = 'my-8'
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      // Push ad to AdSense queue
      if (typeof window !== 'undefined') {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-3425980701787946"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
