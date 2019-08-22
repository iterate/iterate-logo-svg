const express = require("express");
const fetch = require('node-fetch');
const app = express();
const port = 3010;

const cords = [
  [{ x: 0, y: 0 }, { x: 0, y: 16 }, { x: 0, y: 24 }, { x: 0, y: 32 }],
  [
    { x: 8, y: 0 },
    { x: 8, y: 8 },
    { x: 16, y: 8 },
    { x: 8, y: 16 },
    { x: 8, y: 24 },
    { x: 16, y: 24 },
    { x: 24, y: 24 }
  ],
  [
    { x: 32, y: 8 },
    { x: 40, y: 8 },
    { x: 48, y: 8 },
    { x: 32, y: 16 },
    { x: 48, y: 16 },
    { x: 32, y: 24 },
    { x: 40, y: 24 },
    { x: 48, y: 24 }
  ],
  [
    { x: 56, y: 8 },
    { x: 64, y: 8 },
    { x: 72, y: 8 },
    { x: 56, y: 16 },
    { x: 56, y: 24 }
  ],
  [
    { x: 88, y: 8 },
    { x: 96, y: 8 },
    { x: 80, y: 16 },
    { x: 96, y: 16 },
    { x: 80, y: 24 },
    { x: 88, y: 24 },
    { x: 96, y: 24 }
  ],
  [
    { x: 104, y: 0 },
    { x: 104, y: 8 },
    { x: 112, y: 8 },
    { x: 104, y: 16 },
    { x: 104, y: 24 },
    { x: 112, y: 24 },
    { x: 120, y: 24 }
  ],
  [
    { x: 128, y: 8 },
    { x: 136, y: 8 },
    { x: 144, y: 8 },
    { x: 128, y: 16 },
    { x: 144, y: 16 },
    { x: 128, y: 24 },
    { x: 136, y: 24 }
  ]
];

async function getLiveLogo() {
  const response = await fetch("https://logo-api.g2.iterate.no/logo");
  const body = await response.json();
  return body;
}

function getCoordinates(index) {
  return {
    x: index % 8,
    y: Math.floor(index / 8)
  };
}

getLiveLogo().then(logoFromApi => {
  const { logo } = logoFromApi;
  const svg = `<svg width="152" height="32">
${logo.map((char, charIndex) =>
  char.map((panel, panelIndex) =>
    panel.map((pixel, pixelIndex) => {
      const { x, y } = getCoordinates(pixelIndex);

      return `<rect width="1" height="1" style="fill:${pixel};" x=${cords[
        charIndex
      ][panelIndex].x + x} y=${cords[charIndex][panelIndex].y + y} />`;
    })
  )
)}
</svg>`;
  return svg;
});

app.get("/", (req, res) => {
  let data = "";
  
  getLiveLogo().then(logoFromApi => {
    const { logo } = logoFromApi;
    const svg = `<svg width="152" height="32">
    ${logo.map((char, charIndex) =>
    char.map((panel, panelIndex) =>
    panel.map((pixel, pixelIndex) => {
        const { x, y } = getCoordinates(pixelIndex);

        return `<rect width="1" height="1" style="fill:${pixel};" x=${cords[
        charIndex
        ][panelIndex].x + x} y=${cords[charIndex][panelIndex].y + y} />`;
    })
    )
    )}
    </svg>`;
    data = svg;
  });
  res.send(data)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
