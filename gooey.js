
let gooCount = 0;

function gooeyBadge(color, lang, size = 110) {
  const id = `goo-${gooCount++}`;

  const width = size;
  const height = 44;
  const pillHeight = 26;
  const pillY = 5;
  const pillX = 0;
  const pillWidth = width;
  const centerY = pillY + pillHeight / 2;

  const fontSize = Math.min(14, Math.max(9, 150 / lang.length));

  return `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${width}"
    height="${height}"
    viewBox="0 0 ${width} ${height}"
    role="img"
    aria-label="${lang}"
    style="overflow: visible"
  >
    <defs>
      <filter id="${id}" x="-20%" y="-40%" width="140%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 18 -7
          "
          result="goo"
        />
        <feBlend in="SourceGraphic" in2="goo"/>
      </filter>
    </defs>

    <!-- Gooey color drips -->
    <g fill="${color}" filter="url(#${id})">
      <circle cx="16" cy="${centerY}" r="7"/>
      <circle cx="16" cy="${centerY}" r="5" fill="${color}"/>

      <path d="M 24 27 Q 23 34 25 37 Q 28 40 30 36 Q 31 33 30 27 Z">
        <animate
          attributeName="d"
          values="
            M 24 27 Q 23 34 25 37 Q 28 40 30 36 Q 31 33 30 27 Z;
            M 24 27 Q 23 38 25 41 Q 28 44 30 40 Q 31 35 30 27 Z;
            M 24 27 Q 23 34 25 37 Q 28 40 30 36 Q 31 33 30 27 Z
          "
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      <path d="M 85 27 Q 84 32 86 34 Q 89 37 91 33 Q 92 30 91 27 Z">
        <animate
          attributeName="d"
          values="
            M 85 27 Q 84 32 86 34 Q 89 37 91 33 Q 92 30 91 27 Z;
            M 85 27 Q 84 36 86 39 Q 89 42 91 38 Q 92 34 91 27 Z;
            M 85 27 Q 84 32 86 34 Q 89 37 91 33 Q 92 30 91 27 Z
          "
          dur="2.6s"
          repeatCount="indefinite"
        />
      </path>
    </g>

    <!-- Badge background -->
    <rect
      x="${pillX}"
      y="${pillY}"
      width="${pillWidth}"
      height="${pillHeight}"
      rx="13"
      fill="#0d0718"
      stroke="${color}"
      stroke-width="1.5"
    />

    <!-- Language color dot -->
    <circle
      cx="16"
      cy="${centerY}"
      r="5"
      fill="${color}"
    />

    <!-- Language name -->
    <text
      x="29"
      y="${centerY + 5}"
      fill="#ffffff"
      font-family="Arial, sans-serif"
      font-size="${fontSize}"
      font-weight="600"
    >${lang}</text>
  </svg>
  `;
}
