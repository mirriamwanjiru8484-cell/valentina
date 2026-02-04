/*
ENHANCED VALENTINE PROPOSAL FEATURES
You are extending an existing React + Tailwind Valentine proposal app.

The app already has:
- YES / NO buttons
- Growing YES button logic
- Changing NO button text
- Success page after YES

Now add the following features cleanly and professionally.

====================================================
1) 💕 BACKGROUND MUSIC TOGGLE
====================================================
- Add a soft romantic background music track (looping)
- Use an <audio> element controlled via React
- Music should NOT autoplay (user gesture required)
- Add a floating button (top-right corner):
  - Shows "🔈 Music On" / "🔇 Music Off"
  - Toggles play/pause
- Music should persist across page changes (proposal → success)
- Music state should be saved in localStorage so refresh keeps preference

====================================================
2) 💌 CONFETTI EXPLOSION ON YES
====================================================
- When YES is clicked:
  - Trigger a confetti animation
  - Confetti should burst from center and fall down
- Use lightweight JS (canvas-confetti or pure CSS if preferred)
- Confetti should:
  - Trigger only once
  - Not re-trigger on refresh of success page
- Confetti colors:
  - Pink, red, white, light purple
- Animation should feel celebratory, not overwhelming

====================================================
3) 📱 WHATSAPP SHARE BUTTON
====================================================
- Add a WhatsApp share button on the SUCCESS PAGE
- Button text:
  "Share the love 💖"
- Clicking it should:
  - Open WhatsApp (web or app)
  - Pre-fill a message like:
    "I just said YES 💍💖 Happy Valentine’s!"
- Use https://wa.me or WhatsApp share URL
- The button should:
  - Be styled nicely with Tailwind
  - Include WhatsApp green color
  - Have hover/active animations

====================================================
4) 🌹 NAME EDITABLE VIA URL PARAM
====================================================
- The name in:
  "Alice, will you be my Valentine?"
  should be dynamic
- Read the name from a URL query parameter:
  Example:
  ?name=Alice
  ?name=My%20Love
- If no name is provided:
  - Default to "My Love"
- Capitalize the first letter automatically
- Use URLSearchParams
- The name should be reused on the success page too

====================================================
5) 🔐 ANTI-REFRESH NO PROGRESS PERSISTENCE
====================================================
- Persist NO-button progress using localStorage:
  - Current NO message index
  - Current YES button scale
- If the page is refreshed:
  - Restore the NO message state
  - Restore YES button size
- Once YES is clicked:
  - Clear NO progress from localStorage
  - Save a flag like "hasSaidYes"
- If "hasSaidYes" is true:
  - Always show the SUCCESS PAGE even after refresh

====================================================
TECHNICAL REQUIREMENTS
====================================================
- Use React hooks only (useState, useEffect)
- Clean separation of logic:
  - music state
  - proposal state
  - success state
- Use Tailwind for styling and transitions
- Use smooth animations (transition, ease-in-out)
- Code should be beginner-friendly and readable
- Avoid unnecessary external dependencies unless helpful

====================================================
UX DETAILS
====================================================
- Everything should feel playful, romantic, and soft
- Use emojis sparingly but effectively
- Buttons should have hover and tap feedback
- Mobile-first layout

Produce clean, working React code that integrates all features seamlessly.
*/


import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  // Get name and WhatsApp number from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const nameParam = urlParams.get('name') || 'My Love';
  const name = nameParam.charAt(0).toUpperCase() + nameParam.slice(1);
  const whatsappNumber = urlParams.get('whatsapp') || ''; // e.g., 1234567890

  // Check for reset parameter
  if (urlParams.get('reset') === 'true') {
    localStorage.clear();
    window.location.href = window.location.pathname; // Reload without params
  }

  // State management
  const [noCount, setNoCount] = useState(() => {
    const saved = localStorage.getItem('noCount');
    return saved ? parseInt(saved) : 0;
  });
  
  const [yesPressed, setYesPressed] = useState(() => {
    return localStorage.getItem('hasSaidYes') === 'true';
  });
  
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [musicPlaying, setMusicPlaying] = useState(() => {
    const saved = localStorage.getItem('musicPlaying');
    return saved !== null ? saved === 'true' : true; // Default to true
  });
  
  const audioRef = useRef(null);

  const noMessages = [
    "NO",
    "Really sure??",
    "Pookie please 🥺",
    "Just think about it",
    "Don't break my heart 💔",
    "Last chance 😭"
  ];

  // Persist NO progress
  useEffect(() => {
    if (!yesPressed) {
      localStorage.setItem('noCount', noCount.toString());
    }
  }, [noCount, yesPressed]);

  // Handle music state
  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        if (musicPlaying) {
          audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        } else {
          audioRef.current.pause();
        }
        localStorage.setItem('musicPlaying', musicPlaying.toString());
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [musicPlaying]);

  // Auto-start music on first user interaction
  useEffect(() => {
    const startMusic = () => {
      if (audioRef.current && musicPlaying) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      }
    };

    // Try to play on any user interaction
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, startMusic, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, startMusic);
      });
    };
  }, []);

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  const getRandomPosition = () => {
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 100;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY)
    };
  };

  const handleNoClick = () => {
    const newCount = (noCount + 1) % noMessages.length;
    setNoCount(newCount);
    if (newCount < noMessages.length - 1) {
      setNoPosition(getRandomPosition());
    }
  };

  const handleYesClick = () => {
    setYesPressed(true);
    localStorage.setItem('hasSaidYes', 'true');
    localStorage.removeItem('noCount');
    
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#ec4899', '#ef4444', '#ffffff', '#f5d0fe'];

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const confettiInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(confettiInterval);
      }

      confetti({
        particleCount: 3,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: colors
      });
    }, 30);
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent("I just said YES 💍💖 Happy Valentine's!");
    // If WhatsApp number is provided, send directly to that number
    // Otherwise, just open share dialog
    const url = whatsappNumber 
      ? `https://wa.me/${whatsappNumber}?text=${message}`
      : `https://wa.me/?text=${message}`;
    window.open(url, '_blank');
  };

  const yesButtonScale = noCount < noMessages.length - 1 
    ? 1 + noCount * 2 
    : 50;

  if (yesPressed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Music */}
        <audio ref={audioRef} loop preload="auto">
          <source src="/music/valentine.mp3" type="audio/mpeg" />
        </audio>

        {/* Music Toggle Button */}
        <button
          onClick={toggleMusic}
          className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 bg-white/80 hover:bg-white text-pink-600 font-semibold py-2 px-3 sm:py-2 sm:px-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 text-xs sm:text-sm"
        >
          {musicPlaying ? '🔈 Music On' : '🔇 Music Off'}
        </button>

        {/* Floating hearts animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              💖
            </div>
          ))}
        </div>

        <div className="text-center z-10 px-2 sm:px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-pink-600 mb-6 sm:mb-8 animate-bounce leading-tight">
            Knew you would say yes! 💖
          </h1>
          
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTd0anRvODR4dGV6YnZ4ZWZ3NWV5Y3hzYzN5ZGRpbzFnb3Q1NXkyZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LmBsnpDCuturMhtLfw/giphy.gif"
            alt="Cute celebration"
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 mx-auto rounded-2xl sm:rounded-3xl shadow-2xl"
          />
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-pink-700 mt-6 sm:mt-8 font-semibold px-2">
            Can't wait to celebrate with you, {name}! ❤️
          </p>

          {/* WhatsApp Share Button */}
          <button
            onClick={shareOnWhatsApp}
            className="mt-6 sm:mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 sm:py-3 sm:px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2 mx-auto text-sm sm:text-base"
          >
            <span>Share the love 💖</span>
          </button>
        </div>

        {/* Watermark */}
        <div className="fixed bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-50">
          <a
            href="https://simon-ndiritu.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] sm:text-xs text-pink-600/70 hover:text-pink-600 transition-colors duration-300 hover:underline"
          >
            Made with 💖 by Mirrshii
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-pink-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Music */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/valentine.mp3" type="audio/mpeg" />

      </audio>

      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 bg-white/80 hover:bg-white text-pink-600 font-semibold py-2 px-3 sm:py-2 sm:px-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 text-xs sm:text-sm"
      >
        {musicPlaying ? '🔈 Music On' : '🔇 Music Off'}
      </button>

      {/* Floating hearts in background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {['❤️', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="text-center z-10">
        {/* Animated GIF */}
        <div className="mb-6 sm:mb-8 relative">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGlvOTdvNm9qajJmeDh6eTM4bzllOTVrMGRkN2NrMmtja2tyZmhnaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KztT2c4u8mYYUiMKdJ/giphy.gif"
            alt="Cute love"
            className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto rounded-full shadow-2xl ring-2 sm:ring-4 ring-pink-300"
          />
          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 text-2xl sm:text-3xl md:text-4xl animate-bounce">💖</div>
          <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 text-2xl sm:text-3xl md:text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>💕</div>
        </div>

        {/* Question text */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-pink-600 mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4 leading-tight" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          {name}, will you be my valentine?
        </h1>

        {/* Buttons */}
        <div className="flex gap-3 sm:gap-4 items-center justify-center flex-wrap px-2">
          <button
            onClick={handleYesClick}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 text-sm sm:text-base md:text-lg"
            style={{
              transform: `scale(${yesButtonScale})`,
              transition: 'transform 0.5s ease-in-out',
              transformOrigin: 'center center',
              position: noCount === noMessages.length - 1 ? 'fixed' : 'relative',
              left: noCount === noMessages.length - 1 ? '50%' : 'auto',
              top: noCount === noMessages.length - 1 ? '50%' : 'auto',
              translate: noCount === noMessages.length - 1 ? '-50% -50%' : 'none',
              zIndex: noCount === noMessages.length - 1 ? 100 : 10
            }}
          >
            YES 💖
          </button>

          <button
            onClick={handleNoClick}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg transition-all duration-300 fixed z-50 text-sm sm:text-base md:text-lg"
            style={{
              left: `${noPosition.x}px`,
              top: `${noPosition.y}px`,
              transition: 'all 0.3s ease'
            }}
          >
            {noMessages[noCount]}
          </button>
        </div>
      </div>

      {/* Watermark */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <a
          href="https://simon-ndiritu.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-pink-600/70 hover:text-pink-600 transition-colors duration-300 hover:underline"
        >
          Made with 💖 by Mirrshii
        </a>
      </div>
    </div>
  );
}

export default App;
