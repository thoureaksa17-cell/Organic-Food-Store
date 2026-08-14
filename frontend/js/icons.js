// Small flat-illustration SVGs for each product category/icon key.
// Keeping produce as vector icons avoids depending on external image hosts
// and keeps the palette perfectly consistent with the rest of the site.

const ICONS = {
  tomato: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="68" rx="38" ry="34" fill="#d94f3c"/>
      <ellipse cx="46" cy="58" rx="12" ry="9" fill="#f0806c" opacity="0.6"/>
      <path d="M60 34c-6-10-20-12-26-6 8 2 12 8 14 14 4-4 8-6 12-8z" fill="#4f7a4f"/>
      <path d="M60 34c6-10 20-12 26-6-8 2-12 8-14 14-4-4-8-6-12-8z" fill="#5f8f5c"/>
      <circle cx="60" cy="30" r="6" fill="#3a5c3a"/>
    </svg>`,
  honey: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="34" y="42" width="52" height="56" rx="8" fill="#f2b53c"/>
      <rect x="34" y="42" width="52" height="56" rx="8" fill="url(#g)" opacity="0.25"/>
      <rect x="40" y="26" width="40" height="18" rx="4" fill="#e9a52c"/>
      <rect x="46" y="16" width="28" height="12" rx="3" fill="#8a5a2b"/>
      <path d="M44 58c6 6 6 12 0 18 6 6 6 12 0 18" stroke="#c9820f" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M76 58c-6 6-6 12 0 18-6 6-6 12 0 18" stroke="#c9820f" stroke-width="4" fill="none" stroke-linecap="round"/>
    </svg>`,
  broccoli: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="52" y="70" width="16" height="30" rx="6" fill="#dfe6cf"/>
      <circle cx="60" cy="50" r="30" fill="#4f7a4f"/>
      <circle cx="40" cy="46" r="16" fill="#5f8f5c"/>
      <circle cx="80" cy="46" r="16" fill="#5f8f5c"/>
      <circle cx="60" cy="34" r="16" fill="#6ea368"/>
      <circle cx="46" cy="60" r="14" fill="#436b43"/>
      <circle cx="74" cy="60" r="14" fill="#436b43"/>
    </svg>`,
  nuts: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="42" cy="70" rx="16" ry="20" fill="#b9834a"/>
      <ellipse cx="72" cy="60" rx="15" ry="19" fill="#c99a5f"/>
      <ellipse cx="58" cy="88" rx="17" ry="14" fill="#a8703a"/>
      <path d="M42 50c0-8 6-14 14-14" stroke="#8a5a2b" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`,
  avocado: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 20c22 0 34 24 34 46s-14 38-34 38-34-16-34-38S38 20 60 20z" fill="#4f7a4f"/>
      <path d="M60 30c16 0 25 20 25 38s-11 30-25 30-25-12-25-30S44 30 60 30z" fill="#d7e59a"/>
      <circle cx="60" cy="70" r="14" fill="#8a5a2b"/>
    </svg>`,
  spinach: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 100C40 90 30 66 36 44c4 10 12 16 20 18-2-14 2-26 12-34 2 14 10 22 20 26 8 14 4 34-8 44-6 4-14 4-20 2z" fill="#5f8f5c"/>
      <path d="M60 100V60" stroke="#3a5c3a" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  leaf: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 90C20 60 40 28 90 26c4 46-26 68-60 64z" fill="#5f8f5c"/>
      <path d="M30 90 82 32" stroke="#3a5c3a" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`
};

function getIcon(key) {
  return ICONS[key] || ICONS.leaf;
}
