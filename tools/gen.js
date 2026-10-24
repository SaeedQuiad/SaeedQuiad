// Editorial profile assets. Run: node tools/gen.js
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'assets');

const K = {
  bg: '#0c0c0d', ink: '#f3f0e8', mute: '#8b8880', line: '#26262a', accent: '#ff5b2e',
};
const SANS = `'Inter','Segoe UI Variable Display','Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif`;
const MONO = `'JetBrains Mono','SF Mono','Cascadia Mono',Consolas,monospace`;

const frame = (w, h, body, label) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label}">
<defs>
  <clipPath id="r"><rect width="${w}" height="${h}" rx="20"/></clipPath>
  <radialGradient id="glow" cx=".85" cy="0" r=".9"><stop offset="0" stop-color="${K.accent}" stop-opacity=".16"/><stop offset="1" stop-color="${K.accent}" stop-opacity="0"/></radialGradient>
  <pattern id="grain" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="1" height="1" fill="#fff" opacity=".025"/></pattern>
</defs>
<g clip-path="url(#r)">
  <rect width="${w}" height="${h}" fill="${K.bg}"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <rect width="${w}" height="${h}" fill="url(#grain)"/>
  ${body}
</g>
<rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="19.5" fill="none" stroke="#ffffff" stroke-opacity=".08"/>
</svg>`;
const mono = (x, y, t, o = {}) => `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${o.size || 13}" letter-spacing="${o.ls ?? 2}" fill="${o.fill || K.mute}" text-anchor="${o.anchor || 'start'}">${t}</text>`;

// ---------------- hero ----------------
function hero() {
  const W = 1200, H = 480;
  const body = `
  <path d="M48 76H1152M48 404H1152" stroke="${K.line}"/>
  ${mono(48, 56, 'SAEEDQUIAD')}
  ${mono(600, 56, 'PROFILE / 2026', { anchor: 'middle' })}
  <g>${mono(1152, 56, 'BUILDING', { anchor: 'end' })}</g>
  <circle cx="1048" cy="51" r="4" fill="${K.accent}"><animate attributeName="opacity" values="1;.25;1" dur="2.4s" repeatCount="indefinite"/></circle>

  <g font-family="${SANS}" font-weight="800">
    <text x="40" y="318" font-size="250" letter-spacing="-14" textLength="690" lengthAdjust="spacingAndGlyphs" fill="${K.ink}">Saeed<tspan fill="${K.accent}">.<animate attributeName="fill-opacity" values="1;1;.15;1" keyTimes="0;.5;.75;1" dur="3s" repeatCount="indefinite"/></tspan></text>
  </g>

  <g transform="translate(860 168)">
    ${mono(0, 0, 'FOUNDER', { size: 12 })}
    <text x="0" y="30" font-family="${SANS}" font-weight="600" font-size="26" fill="${K.ink}">77-Technologies</text>
    ${mono(0, 86, 'NOW BUILDING', { size: 12 })}
    <text x="0" y="116" font-family="${SANS}" font-weight="600" font-size="26" fill="${K.ink}">Fern<tspan fill="${K.mute}" font-weight="400"> — chat, calls,</tspan></text>
    <text x="0" y="146" font-family="${SANS}" font-weight="400" font-size="26" fill="${K.mute}">and workspaces</text>
  </g>

  ${mono(48, 444, 'DESKTOP &amp; MOBILE SOFTWARE')}
  ${mono(600, 444, 'RUST · TAURI · TYPESCRIPT', { anchor: 'middle' })}
  ${mono(1152, 444, 'WINDOWS + ANDROID', { anchor: 'end' })}
  <rect x="48" y="403" width="0" height="2" fill="${K.accent}"><animate attributeName="width" values="0;1104;1104;0" keyTimes="0;.45;.8;1" dur="9s" repeatCount="indefinite" calcMode="spline" keySplines=".6 0 .2 1;0 0 1 1;.6 0 .2 1"/></rect>`;
  return frame(W, H, body, 'Saeed - founder of 77-Technologies, building Fern');
}

// ---------------- fern ----------------
function fern() {
  const W = 1200, H = 440;
  const feats = [
    ['Team chat', 'Encrypted messaging for teams'],
    ['Calls & meetings', 'With AI noise suppression'],
    ['Business workspaces', 'Controls, calendar, storage'],
    ['Windows + Android', 'One account across both'],
    ['Tauri + Rust', 'Small, fast native shell'],
  ];
  let list = '';
  feats.forEach(([a, b], i) => {
    const y = 104 + i * 62;
    list += `<path d="M640 ${y - 34}H1152" stroke="${K.line}"/>
    ${mono(640, y, String(i + 1).padStart(2, '0'), { fill: K.accent, ls: 1 })}
    <text x="690" y="${y}" font-family="${SANS}" font-weight="600" font-size="21" fill="${K.ink}">${a.replace('&', '&amp;')}</text>
    <text x="1152" y="${y}" text-anchor="end" font-family="${SANS}" font-size="16" fill="${K.mute}">${b}</text>`;
  });
  list += `<path d="M640 ${104 + 5 * 62 - 34}H1152" stroke="${K.line}"/>`;
  // a quiet voice waveform
  let bars = '';
  for (let i = 0; i < 38; i++) {
    const h = 6 + Math.round(Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 34);
    const d = (1.4 + (i % 5) * 0.18).toFixed(2);
    bars += `<rect x="${48 + i * 12}" y="${360 - h / 2}" width="4" height="${h}" rx="2" fill="${i > 26 ? K.line : K.ink}" opacity="${i > 26 ? 1 : 0.85}">${i <= 26 ? `<animate attributeName="height" values="${h};${Math.max(4, h * 0.35)};${h}" dur="${d}s" repeatCount="indefinite"/><animate attributeName="y" values="${360 - h / 2};${360 - Math.max(4, h * 0.35) / 2};${360 - h / 2}" dur="${d}s" repeatCount="indefinite"/>` : ''}</rect>`;
  }
  const body = `
  ${mono(48, 56, '01 — NOW BUILDING')}
  <text x="44" y="190" font-family="${SANS}" font-weight="800" font-size="132" letter-spacing="-6" textLength="292" lengthAdjust="spacingAndGlyphs" fill="${K.ink}">Fern<tspan fill="${K.accent}">.</tspan></text>
  <text x="48" y="244" font-family="${SANS}" font-size="21" fill="${K.mute}">Team messaging, calls and Business</text>
  <text x="48" y="274" font-family="${SANS}" font-size="21" fill="${K.mute}">workspaces, from 77-Technologies.</text>
  ${bars}
  ${list}`;
  return frame(W, H, body, 'Fern: team chat, calls and meetings with AI noise suppression, Business workspaces, Windows and Android, Tauri and Rust');
}

// ---------------- stack ----------------
function stack() {
  const items = [['rust', 'Rust'], ['tauri', 'Tauri'], ['typescript', 'TypeScript'], ['javascript', 'JavaScript'], ['nextdotjs', 'Next.js'], ['nodedotjs', 'Node'], ['bun', 'Bun'], ['deno', 'Deno'], ['mongodb', 'MongoDB'], ['webrtc', 'WebRTC'], ['android', 'Android'], ['python', 'Python'], ['cplusplus', 'C++']];
  const W = 1200, H = 226, cols = 13, cw = (W - 96) / cols;
  let s = '';
  items.forEach(([slug, name], i) => {
    const p = fs.readFileSync(path.join(__dirname, 'icons', slug + '.svg'), 'utf8').match(/ d="([^"]+)"/)[1];
    const cx = 48 + cw * i + cw / 2;
    s += `<g opacity=".9"><g transform="translate(${cx - 15} 108) scale(1.25)" fill="${K.ink}"><path d="${p}"/></g>
    <text x="${cx}" y="172" text-anchor="middle" font-family="${SANS}" font-size="13" fill="${K.mute}">${name}</text></g>`;
    if (i) s += `<path d="M${48 + cw * i} 100V180" stroke="${K.line}"/>`;
  });
  const body = `
  ${mono(48, 56, '02 — TOOLS')}
  ${mono(1152, 56, 'RUST FIRST', { anchor: 'end' })}
  <path d="M48 76H1152M48 196H1152" stroke="${K.line}"/>
  <rect x="48" y="75" width="${cw}" height="2" fill="${K.accent}"><animate attributeName="x" values="${[...Array(13).keys()].map((i) => 48 + cw * i).join(';')};48" dur="13s" calcMode="discrete" repeatCount="indefinite"/></rect>
  ${s}`;
  return frame(W, H, body, 'Stack: ' + items.map((i) => i[1]).join(', '));
}

const out = { 'hero-ed.svg': hero(), 'fern-ed.svg': fern(), 'stack-ed.svg': stack() };
for (const [n, c] of Object.entries(out)) { fs.writeFileSync(path.join(OUT, n), c); console.log(n, c.length); }
