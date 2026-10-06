import { HtmlTemplate } from '@/types/renderer';

export const TEMPLATES: HtmlTemplate[] = [
  {
    id: 'cyber-hologram',
    title: 'Cyberpunk Holographic Card',
    description: 'Futuristic glass card with animated neon borders, floating glow, and micro-particles.',
    category: 'animated',
    formatRecommendation: 'mp4',
    defaultDuration: 3,
    defaultFps: 30,
    width: 1200,
    height: 630,
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #030712;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
    overflow: hidden;
  }
  .wrapper {
    position: relative;
    padding: 3px;
    border-radius: 28px;
    background: linear-gradient(60deg, #f72585, #7209b7, #3a0ca3, #4361ee, #4cc9f0, #f72585);
    background-size: 300% 300%;
    animation: rotateGradient 4s linear infinite;
    box-shadow: 0 0 50px rgba(114, 9, 183, 0.4), 0 20px 40px rgba(0, 0, 0, 0.8);
  }
  .card {
    background: #080d1a;
    border-radius: 26px;
    padding: 50px;
    width: 640px;
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  .card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(76, 201, 240, 0.08) 0%, transparent 60%);
    animation: pulseGlow 3s ease-in-out infinite alternate;
  }
  .chip {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: rgba(76, 201, 240, 0.12);
    color: #4cc9f0;
    border: 1px solid rgba(76, 201, 240, 0.3);
    margin-bottom: 24px;
  }
  h1 {
    font-size: 40px;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    color: #94a3b8;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 32px;
  }
  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 24px;
  }
  .author {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f72585, #4cc9f0);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 16px;
  }
  .author-info h4 { font-size: 15px; color: #f1f5f9; }
  .author-info span { font-size: 12px; color: #64748b; }
  .status-badge {
    font-size: 13px;
    color: #10b981;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .status-badge::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 10px #10b981;
  }
  @keyframes rotateGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes pulseGlow {
    0% { transform: scale(0.9); opacity: 0.5; }
    100% { transform: scale(1.1); opacity: 1; }
  }
</style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <span class="chip">Automated Rendering</span>
      <h1>Autonomous Motion & Visual Generator</h1>
      <p>Transform raw code into pristine cinematic video streams and crisp social media cards ready for distribution.</p>
      <div class="meta">
        <div class="author">
          <div class="avatar">HV</div>
          <div class="author-info">
            <h4>html-to-visual</h4>
            <span>High-Speed Chromium Pipeline</span>
          </div>
        </div>
        <div class="status-badge">System Active</div>
      </div>
    </div>
  </div>
</body>
</html>`,
  },
  {
    id: 'aurora-waves',
    title: 'Aurora Flowing Mesh',
    description: 'Smooth morphing gradient waves with soft atmospheric blur and modern typography.',
    category: 'animated',
    formatRecommendation: 'mp4',
    defaultDuration: 4,
    defaultFps: 30,
    width: 1200,
    height: 630,
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #020617;
    font-family: -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
    overflow: hidden;
    position: relative;
  }
  .aurora {
    position: absolute;
    width: 800px;
    height: 800px;
    filter: blur(90px);
    opacity: 0.6;
    border-radius: 50%;
    animation: drift 6s ease-in-out infinite alternate;
  }
  .aurora-1 {
    top: -100px;
    left: -100px;
    background: radial-gradient(circle, #6366f1, #3b82f6);
  }
  .aurora-2 {
    bottom: -150px;
    right: -100px;
    background: radial-gradient(circle, #ec4899, #8b5cf6);
    animation-delay: -3s;
  }
  .content {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 800px;
    padding: 60px 40px;
    background: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(28px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 32px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
  }
  h1 {
    font-size: 46px;
    font-weight: 800;
    color: #f8fafc;
    letter-spacing: -0.03em;
    margin-bottom: 18px;
    line-height: 1.15;
  }
  p {
    font-size: 19px;
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 30px;
  }
  .pill-group {
    display: flex;
    gap: 12px;
    justify-content: center;
  }
  .pill {
    padding: 8px 18px;
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.08);
    color: #f1f5f9;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
  @keyframes drift {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(120px, 60px) scale(1.15); }
  }
</style>
</head>
<body>
  <div class="aurora aurora-1"></div>
  <div class="aurora aurora-2"></div>
  <div class="content">
    <h1>Design. Render. Animate.</h1>
    <p>Empower your automated workflows with serverless HTML-to-media transcoding at enterprise speed.</p>
    <div class="pill-group">
      <span class="pill">⚡ MP4 Transcoding</span>
      <span class="pill">✨ 60 FPS GIFs</span>
      <span class="pill">🎯 Pixel-Perfect PNG</span>
    </div>
  </div>
</body>
</html>`,
  },
  {
    id: 'terminal-code',
    title: 'Developer Terminal Window',
    description: 'Clean macOS dark terminal window with syntax highlighting and pulse cursor.',
    category: 'ui',
    formatRecommendation: 'gif',
    defaultDuration: 2.5,
    defaultFps: 24,
    width: 1200,
    height: 630,
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #090d16;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    overflow: hidden;
  }
  .terminal {
    width: 760px;
    background: #0d1117;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(99, 102, 241, 0.15);
    overflow: hidden;
  }
  .header {
    background: #161b22;
    padding: 12px 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .red { background: #ff5f56; }
  .yellow { background: #ffbd2e; }
  .green { background: #27c93f; }
  .title {
    margin-left: auto;
    margin-right: auto;
    font-size: 12px;
    color: #8b949e;
  }
  .body {
    padding: 28px;
    color: #c9d1d9;
    font-size: 15px;
    line-height: 1.8;
  }
  .comment { color: #8b949e; }
  .keyword { color: #ff7b72; }
  .fn { color: #d2a8ff; }
  .str { color: #a5d6ff; }
  .var { color: #79c0ff; }
  .cursor {
    display: inline-block;
    width: 9px;
    height: 17px;
    background: #58a6ff;
    vertical-align: middle;
    animation: blink 1s step-start infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }
</style>
</head>
<body>
  <div class="terminal">
    <div class="header">
      <div class="dot red"></div>
      <div class="dot yellow"></div>
      <div class="dot green"></div>
      <div class="title">render-engine.ts — bash</div>
    </div>
    <div class="body">
      <p class="comment">// 🚀 1. Send HTML payload to the REST endpoint</p>
      <p><span class="keyword">const</span> <span class="var">visual</span> = <span class="keyword">await</span> <span class="fn">htmlToVisual</span>({</p>
      <p>&nbsp;&nbsp;format: <span class="str">'mp4'</span>,</p>
      <p>&nbsp;&nbsp;fps: <span class="var">60</span>,</p>
      <p>&nbsp;&nbsp;duration: <span class="var">3.0</span>,</p>
      <p>&nbsp;&nbsp;dimensions: { width: <span class="var">1920</span>, height: <span class="var">1080</span> },</p>
      <p>&nbsp;&nbsp;html: <span class="str">'&lt;div class="hero"&gt;Future Ready&lt;/div&gt;'</span></p>
      <p>});</p>
      <br/>
      <p><span class="keyword">console</span>.<span class="fn">log</span>(<span class="str">'Render completed:'</span>, <span class="var">visual</span>.url); <span class="cursor"></span></p>
    </div>
  </div>
</body>
</html>`,
  },
  {
    id: 'metrics-card',
    title: 'SaaS Metric & Growth Badge',
    description: 'High-contrast analytics badge with live glowing indicators and stats.',
    category: 'marketing',
    formatRecommendation: 'png',
    width: 1200,
    height: 630,
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 50% 30%, #1e1b4b 0%, #030712 90%);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  .card {
    width: 600px;
    background: rgba(17, 24, 39, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 24px;
    padding: 44px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), 0 0 45px rgba(99, 102, 241, 0.2);
    color: #fff;
  }
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #34d399;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 24px;
  }
  .number {
    font-size: 64px;
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .sub {
    font-size: 18px;
    color: #94a3b8;
    margin-bottom: 32px;
  }
  .progress-wrap {
    background: rgba(255, 255, 255, 0.08);
    height: 10px;
    border-radius: 999px;
    overflow: hidden;
    position: relative;
    margin-bottom: 28px;
  }
  .progress-bar {
    width: 88%;
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #10b981);
    border-radius: 999px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #64748b;
  }
  .footer strong { color: #f1f5f9; }
</style>
</head>
<body>
  <div class="card">
    <div class="tag">● 99.98% Conversion Fidelity</div>
    <div class="number">10,000,000+</div>
    <div class="sub">Visual assets rendered in production monthly</div>
    <div class="progress-wrap">
      <div class="progress-bar"></div>
    </div>
    <div class="footer">
      <span>Latency: <strong>~240ms</strong></span>
      <span>Uptime: <strong>99.99%</strong></span>
      <span>Compression: <strong>Lossless</strong></span>
    </div>
  </div>
</body>
</html>`,
  },
];
