import React from "react";

/**
 * PUBLIC_INTERFACE
 * TyreLogoSVG: A visually distinctive tyre-themed SVG logo to be used throughout the app for branding.
 * Modern, round tyre with performance accent treads for header/navbar/main container branding.
 */
function TyreLogoSVG({ style = {}, ...props }) {
  return (
    <svg
      width={style.width || 44}
      height={style.height || 44}
      viewBox="0 0 44 44"
      fill="none"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        ...style,
      }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TyreSense tyre logo"
      role="img"
      {...props}
    >
      <defs>
        <radialGradient id="tyre-tread-bg" cx="50%" cy="54%" r="54%">
          <stop offset="0.18" stopColor="#edeef0" />
          <stop offset="0.77" stopColor="#cdcfd4" />
          <stop offset="1" stopColor="#b0b1b7" />
        </radialGradient>
        <linearGradient id="tyre-sidewall" x1="0" y1="0" x2="44" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4e5355" />
          <stop offset="1" stopColor="#18181c" />
        </linearGradient>
        <radialGradient id="tyre-red-accent" cx="54%" cy="50%" r="67%">
          <stop offset="0.20" stopColor="#e10600" />
          <stop offset="0.95" stopColor="#b4081b" />
        </radialGradient>
      </defs>
      {/* Outer sidewall */}
      <circle cx="22" cy="22" r="21" fill="url(#tyre-sidewall)" stroke="#18181c" strokeWidth="2.7"/>
      {/* Tread background */}
      <circle cx="22" cy="22" r="15.2" fill="url(#tyre-tread-bg)" stroke="#7d7d85" strokeWidth="2"/>
      {/* Accent red performance arcs */}
      <path d="M9 17.5 Q22 7 35 17.5" stroke="url(#tyre-red-accent)" strokeWidth="2.5" fill="none" />
      <path d="M13 26 Q22 36 31 26" stroke="url(#tyre-red-accent)" strokeWidth="2.1" fill="none" />
      {/* Chevron/zig-zag treads for dynamism */}
      <path d="M18 13 L22 17 L26 13" stroke="#b4081b" strokeWidth="1.3" fill="none"/>
      <path d="M18 32 L22 28 L26 32" stroke="#b4081b" strokeWidth="1.1" fill="none"/>
      {/* Central hub + dot */}
      <circle cx="22" cy="22" r="3.1" fill="#e10600" stroke="#fff" strokeWidth="0.76" />
      <circle cx="22" cy="22" r="1.1" fill="#b4081b" />
    </svg>
  );
}

export default TyreLogoSVG;
