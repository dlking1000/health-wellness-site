'use client';

import { useState, useEffect } from 'react';

export default function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Show popup after 30 seconds or when user scrolls 50% down
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('emailPopupSeen');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 30000); // 30 seconds

    const handleScroll = () => {
      const hasSeenPopup = localStorage.getItem('emailPopupSeen');
      if (!hasSeenPopup) {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 50) {
          setIsOpen(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('emailPopupSeen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // MailerLite API integration
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSuccess(true);
        localStorage.setItem('emailPopupSeen', 'true');
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full relative animate-fadeIn">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          aria-label="Close"
        >
          ×
        </button>

        <div className="p-8">
          {!isSuccess ? (
            <>
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🎁</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Your FREE Wellness Starter Kit!
                </h2>
                <p className="text-gray-600">
                  Join thousands of health-conscious readers and receive:
                </p>
              </div>

              <ul className="mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">10-Day Gut Health Challenge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">7 Brain-Boosting Habits Guide</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">50 Immune-Boosting Foods Checklist</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Weekly health tips & exclusive content</span>
                </li>
              </ul>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Subscribing...' : 'Get My FREE Kit Now!'}
                </button>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome Aboard!
              </h3>
              <p className="text-gray-600">
                Check your email for your FREE Wellness Starter Kit!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

