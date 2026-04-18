const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

let previousContent = "";

// 🌐 Frontend (served directly) - with professional animations
app.get("/", (req, res) => {
  res.send(`
    <html>
    <head>
      <title>ChronoWatch | Professional Change Detector</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #e9edf2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
          padding: 20px;
          position: relative;
        }

        /* Subtle animated background grain */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          animation: subtleShift 60s linear infinite;
        }

        @keyframes subtleShift {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }

        .container {
          max-width: 550px;
          width: 100%;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(0px);
          border-radius: 28px;
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05);
          padding: 2rem;
          transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1), box-shadow 0.3s ease;
          animation: fadeInUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }

        .container:hover {
          transform: translateY(-2px);
          box-shadow: 0 24px 48px -16px rgba(0, 0, 0, 0.15);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Header section with subtle accent */
        .header {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
        }

        .badge {
          display: inline-block;
          background: #eef2ff;
          color: #1e40af;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          padding: 0.25rem 0.75rem;
          border-radius: 40px;
          margin-bottom: 1rem;
          text-transform: uppercase;
          animation: pulseGlow 2s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; background: #e0e7ff; }
        }

        h2 {
          font-size: 1.8rem;
          font-weight: 600;
          background: linear-gradient(135deg, #1f2937 0%, #2d3a4a 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          letter-spacing: -0.3px;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: #6b7280;
          font-size: 0.85rem;
          font-weight: 400;
          border-top: 1px solid #e5e7eb;
          display: inline-block;
          padding-top: 0.5rem;
        }

        /* Input group with smooth animation */
        .input-group {
          margin-bottom: 1.8rem;
        }

        label {
          display: block;
          font-size: 0.8rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
          letter-spacing: 0.3px;
        }

        .url-input-wrapper {
          position: relative;
          transition: all 0.2s ease;
        }

        input {
          width: 100%;
          padding: 0.9rem 1rem;
          font-size: 0.95rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
          transition: all 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          font-family: inherit;
          color: #1f2937;
          outline: none;
        }

        input:focus {
          border-color: #94a3b8;
          box-shadow: 0 0 0 3px rgba(100, 116, 139, 0.1);
          transform: scale(1.01);
        }

        input::placeholder {
          color: #cbd5e1;
          font-weight: 400;
        }

        /* Animated button */
        .check-btn {
          width: 100%;
          background: #1f2937;
          color: white;
          border: none;
          padding: 0.9rem 1.5rem;
          font-size: 0.95rem;
          font-weight: 500;
          border-radius: 40px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: inherit;
          margin-bottom: 1.8rem;
          position: relative;
          overflow: hidden;
        }

        .check-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.5s, height 0.5s;
        }

        .check-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .check-btn:hover {
          background: #111827;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .check-btn:active {
          transform: translateY(1px);
        }

        /* result card with micro-interactions */
        .result-card {
          background: #f8fafc;
          border-radius: 20px;
          padding: 1.2rem 1.5rem;
          text-align: center;
          border: 1px solid #eef2ff;
          transition: all 0.3s ease;
          animation: fadeScale 0.4s ease-out;
        }

        @keyframes fadeScale {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .status-icon {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          display: inline-block;
          animation: gentleBounce 0.5s ease;
        }

        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .result-message {
          font-size: 1rem;
          font-weight: 500;
          color: #1e293b;
          word-break: break-word;
        }

        .no-change {
          color: #2b6e3c;
        }
        .change-detected {
          color: #b45309;
        }
        .error-state {
          color: #b91c1c;
        }

        /* subtle loading animation */
        .loading {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* footer micro */
        .footer-note {
          margin-top: 1.5rem;
          font-size: 0.7rem;
          color: #9ca3af;
          text-align: center;
          border-top: 1px solid #edf2f7;
          padding-top: 1rem;
          letter-spacing: 0.2px;
        }

        /* Responsive touch */
        @media (max-width: 480px) {
          .container {
            padding: 1.5rem;
          }
          h2 {
            font-size: 1.5rem;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="badge">real-time monitor</div>
          <h2>Website Change Detector</h2>
          <div class="subtitle">intelligent version tracking</div>
        </div>

        <div class="input-group">
          <label>🔗 target URL</label>
          <div class="url-input-wrapper">
            <input 
              type="text" 
              id="url" 
              placeholder="https://example.com/page" 
              autocomplete="off"
            />
          </div>
        </div>

        <button class="check-btn" id="checkBtn" onclick="check()">
          <span>⟳</span> Check Website
        </button>

        <div id="resultContainer" style="min-height: 90px;">
          <div class="result-card" style="opacity:0.6;">
            <div class="status-icon">🔍</div>
            <div class="result-message" id="result">ready — enter URL & verify</div>
          </div>
        </div>
        <div class="footer-note">
          ✓ smart content fingerprint • detects modifications
        </div>
      </div>

      <script>
        // Retain the exact original backend logic flow, 
        // but enhance frontend UX with professional animations & loading state.
        const resultElement = document.getElementById("result");
        const resultContainerDiv = document.getElementById("resultContainer");
        
        // Helper to update UI with smooth transition
        function updateResultUI(message, isChange = false, isError = false) {
          // Create new card each time for fresh animation
          const newCard = document.createElement('div');
          newCard.className = 'result-card';
          
          let icon = '🔍';
          let messageClass = '';
          
          if (isError) {
            icon = '⚠️';
            messageClass = 'error-state';
          } else if (isChange) {
            icon = '🔄';
            messageClass = 'change-detected';
          } else if (message.includes('No change')) {
            icon = '✓';
            messageClass = 'no-change';
          } else {
            icon = '📡';
            messageClass = '';
          }
          
          newCard.innerHTML = \`
            <div class="status-icon" style="animation: gentleBounce 0.4s ease;">\${icon}</div>
            <div class="result-message \${messageClass}">\${message}</div>
          \`;
          
          // Animate transition
          const oldCard = resultContainerDiv.firstChild;
          if (oldCard) {
            oldCard.style.opacity = '0';
            oldCard.style.transform = 'translateY(8px)';
            setTimeout(() => {
              if (oldCard && oldCard.parentNode) oldCard.remove();
              resultContainerDiv.appendChild(newCard);
              newCard.style.animation = 'fadeScale 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
            }, 150);
          } else {
            resultContainerDiv.appendChild(newCard);
            newCard.style.animation = 'fadeScale 0.35s ease-out';
          }
        }
        
        // Loading animation state
        function setLoading(isLoading) {
          const btn = document.getElementById("checkBtn");
          if (isLoading) {
            btn.disabled = true;
            btn.style.opacity = '0.7';
            btn.innerHTML = '<span class="loading"></span> scanning content...';
          } else {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.innerHTML = '<span>⟳</span> Check Website';
          }
        }
        
        // MAIN CHECK FUNCTION (preserves original logic but adds loading/animations)
        async function check() {
          const urlInput = document.getElementById("url");
          const url = urlInput.value.trim();
          
          // Basic URL validation feedback
          if (!url) {
            updateResultUI("❌ please enter a valid URL", false, true);
            // subtle shake animation on input
            urlInput.style.transform = 'shake 0.2s ease';
            setTimeout(() => { urlInput.style.transform = ''; }, 300);
            return;
          }
          
          // optional: add http:// if missing simple UX
          let finalUrl = url;
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            finalUrl = 'https://' + url;
          }
          
          setLoading(true);
          
          try {
            // identical backend request (calls /check)
            const res = await fetch("/check", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url: finalUrl })
            });
            
            const data = await res.json();
            let messageText = data.message;
            let isChange = false;
            let isError = false;
            
            if (messageText.includes("changed")) {
              isChange = true;
            } else if (messageText.includes("Error")) {
              isError = true;
            }
            
            // professional micro animation based on detection
            updateResultUI(messageText, isChange, isError);
            
            // Additional subtle effect on body when change detected
            if (isChange) {
              const container = document.querySelector('.container');
              container.style.transition = 'box-shadow 0.2s';
              container.style.boxShadow = '0 0 0 2px rgba(180, 83, 9, 0.15), 0 20px 40px -12px rgba(0,0,0,0.1)';
              setTimeout(() => {
                container.style.boxShadow = '';
              }, 800);
            }
            
          } catch (err) {
            updateResultUI("⚠️ network or fetch error", false, true);
          } finally {
            setLoading(false);
            // subtle focus back
            urlInput.focus();
          }
        }
        
        // support enter key on input field
        const inputField = document.getElementById("url");
        inputField.addEventListener("keypress", function(event) {
          if (event.key === "Enter") {
            event.preventDefault();
            check();
          }
        });
        
        // small initial animation on load
        window.addEventListener('load', () => {
          // prefill example placeholder not intrusive
          const existingMsg = document.getElementById("result");
          if (existingMsg) existingMsg.innerText = "ready — enter URL & verify";
        });
      </script>
    </body>
    </html>
  `);
});

// 🔍 Backend logic (COMPLETELY UNCHANGED — original detection system)
app.post("/check", async (req, res) => {
  try {
    const { url } = req.body;
    const response = await axios.get(url);
    const newContent = response.data;

    let message = "No change detected";

    if (previousContent && previousContent !== newContent) {
      message = "⚠️ Website content changed!";
    }

    previousContent = newContent;

    res.json({ message });
  } catch (err) {
    res.json({ message: "Error fetching website" });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});