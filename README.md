# 💖 Valentine's Day Proposal Website

A romantic, interactive Valentine's Day proposal website built with React, Vite, and Tailwind CSS. Features a playful YES/NO button interaction, background music, confetti animations, and social sharing capabilities.

![Valentine's Proposal](https://img.shields.io/badge/Made%20with-React-61dafb?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind-06b6d4?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Built%20with-Vite-646cff?style=for-the-badge&logo=vite)

## ✨ Features

### 🎯 Interactive Proposal Experience
- **Dynamic YES Button** - Grows larger with each "NO" click, eventually covering the entire screen
- **Moving NO Button** - Randomly repositions itself to avoid clicks (playful mechanic)
- **Progressive Messages** - NO button cycles through 6 different pleading messages
- **Confetti Celebration** - Beautiful confetti explosion when YES is clicked

### 🎵 Background Music
- **Toggleable Music** - Soft romantic music with on/off toggle button
- **Persistent State** - Music preference saved across page refreshes
- **Auto-play Support** - Starts playing on user interaction

### 📱 Social Sharing
- **WhatsApp Integration** - Share the good news directly to WhatsApp
- **Custom Messages** - Pre-filled romantic message ready to share
- **Direct Messaging** - Optional: Send directly to a specific WhatsApp number

### 🎨 Beautiful Design
- **Gradient Backgrounds** - Pink and red romantic color schemes
- **Animated Hearts** - Floating heart emojis throughout the page
- **Cute GIFs** - Animated images from Giphy
- **Smooth Animations** - CSS transitions and transform effects
- **Responsive Design** - Perfect on mobile, tablet, and desktop

### 💾 State Persistence
- **Progress Saving** - NO button clicks and progress saved to localStorage
- **Success State** - Once YES is clicked, always shows success page
- **Reset Option** - URL parameter to reset and start over

### 🌐 Customization
- **Dynamic Name** - Personalize with any name via URL parameter
- **Custom WhatsApp Number** - Configure recipient WhatsApp number
- **Easy Reset** - Simple URL parameter to reset state

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd valentines_proposal
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 🎮 How to Use

### Basic Usage
1. Open the website
2. See the romantic proposal with animated GIFs
3. Click YES to accept (recommended! 💕)
4. Try clicking NO to see the playful interaction
5. Share your happiness on WhatsApp!

### URL Parameters

#### Personalize the Name
```
http://localhost:5173/?name=Alice
http://localhost:5173/?name=Sarah
http://localhost:5173/?name=My%20Love
```

#### Add WhatsApp Number
```
http://localhost:5173/?whatsapp=1234567890
http://localhost:5173/?name=Alice&whatsapp=919876543210
```
Format: Country code + number (no spaces, no +)

#### Reset the App
```
http://localhost:5173/?reset=true
```

### Examples
```
http://localhost:5173/?name=Emily&whatsapp=447123456789
http://localhost:5173/?name=Sarah
http://localhost:5173/?reset=true
```

## 🎨 Customization

### Change the Name
Default is "My Love". Customize via URL:
```
?name=YourLovesName
```

### Add Your WhatsApp Number
Share button will send directly to your number:
```
?whatsapp=1234567890
```

### Change Music
Edit `src/App.jsx` - Update the audio source URL:
```jsx
<audio ref={audioRef} loop preload="auto">
  <source src="YOUR_MUSIC_URL.mp3" type="audio/mpeg" />
</audio>
```

### Change GIFs
Replace Giphy URLs in `src/App.jsx`:
```jsx
// Proposal page GIF
src="YOUR_GIPHY_URL"

// Success page GIF
src="YOUR_GIPHY_URL"
```

### Modify Colors
Edit Tailwind classes in `src/App.jsx`:
- Background: `bg-gradient-to-br from-pink-100 via-red-100 to-pink-200`
- Buttons: `bg-gradient-to-r from-pink-500 to-red-500`
- Text: `text-pink-600`

### Adjust Button Behavior
In `src/App.jsx`, modify:
```jsx
// YES button scaling factor
const yesButtonScale = noCount < noMessages.length - 1 
  ? 1 + noCount * 2  // Change multiplier (currently 2x per click)
  : 50;              // Final maximum scale

// NO button messages
const noMessages = [
  "NO",
  "Your custom message 1",
  "Your custom message 2",
  // Add more messages...
];
```

## 📁 Project Structure

```
valentines_proposal/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main application component
│   ├── App.css         # Custom animations (floating hearts)
│   ├── index.css       # Tailwind imports & responsive utilities
│   └── main.jsx        # React entry point
├── index.html          # HTML template
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## 🛠️ Built With

- **[React](https://react.dev/)** - UI library
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[canvas-confetti](https://github.com/catdad/canvas-confetti)** - Confetti animations
- **[Giphy](https://giphy.com/)** - Animated GIFs

## 📦 Dependencies

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "canvas-confetti": "^1.9.3",
  "tailwindcss": "^3.4.17"
}
```

## 🎯 Features Breakdown

### 1. Progressive YES Button Growth
- Starts at normal size
- Grows 2x with each NO click
- At final click (6th), scales to 50x covering entire screen
- Smooth 0.5s ease-in-out transition

### 2. Evasive NO Button
- Randomly repositions after each click
- Stays within viewport bounds
- Stops moving on final message
- Gets covered by massive YES button

### 3. State Persistence
Stores in localStorage:
- `noCount` - Current NO message index
- `hasSaidYes` - Success state
- `musicPlaying` - Music on/off preference

### 4. Confetti Animation
- Triggers on YES click
- 3-second duration
- Pink, red, white, purple colors
- Random burst patterns

## 🎨 Responsive Design

### Mobile (< 640px)
- Compact button sizes
- Smaller text and images
- Touch-friendly (48px minimum)
- Optimized spacing

### Tablet (640px - 1024px)
- Medium-sized elements
- Balanced layouts
- Comfortable spacing

### Desktop (> 1024px)
- Full-sized elements
- Maximum visual impact
- Enhanced hover effects

## 🐛 Troubleshooting

### Music Not Playing
1. Click the music toggle button
2. Interact with the page (browsers block autoplay)
3. Check browser console for errors
4. Verify audio URL is accessible

### Confetti Not Showing
- Confetti only triggers once per session
- Refresh and click YES again to see it
- Check if `canvas-confetti` is installed

### State Not Resetting
Use the reset URL parameter:
```
http://localhost:5173/?reset=true
```

Or clear localStorage manually:
```javascript
localStorage.clear();
location.reload();
```

### Button Not Growing
- Check browser console for errors
- Verify React state is updating
- Ensure CSS transforms are supported

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
1. Build: `npm run build`
2. Publish directory: `dist`
3. Deploy from `dist` folder

## 📝 License

This project is open source and available for personal use.

## 💝 Credits

**Created by [Simon Ndiritu](https://simon-ndiritu.vercel.app)**

Made with 💖 for making Valentine's Day proposals special!

## 🤝 Contributing

Feel free to fork this project and customize it for your own proposal! Ideas for improvements:
- More GIF options
- Additional animation effects
- Sound effects
- Countdown timer
- Photo gallery
- Custom fonts

## 📧 Support

For questions or suggestions, visit [Simon's Portfolio](https://simon-ndiritu.vercel.app)

---

**May your proposal be accepted! 💕**
