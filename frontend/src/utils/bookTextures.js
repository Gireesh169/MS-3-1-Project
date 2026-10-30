import * as THREE from "three";

/**
 * Creates high-resolution procedural canvas textures for realistic 3D books and journals.
 * Generates front cover, spine, back cover, and realistic ribbed paper leaf edges.
 */

export const BOOK_DATA = [
  {
    title: "Designing Data-Intensive Systems",
    subtitle: "Reliability & Scalability",
    author: "Martin Kleppmann",
    category: "SYSTEMS ARCHITECTURE",
    color: "#0f2b48",
    accent: "#38bdf8",
    gold: true,
    symbol: "atom",
  },
  {
    title: "Quantum Computing Horizons",
    subtitle: "From Qubits to Superposition",
    author: "E. Preskill & D. Deutsch",
    category: "QUANTUM PHYSICS",
    color: "#1e1b4b",
    accent: "#818cf8",
    gold: true,
    symbol: "rings",
  },
  {
    title: "Deep Learning Foundations",
    subtitle: "Neural Architectures & Transformers",
    author: "Yoshua Bengio et al.",
    category: "ARTIFICIAL INTELLIGENCE",
    color: "#064e3b",
    accent: "#34d399",
    gold: false,
    symbol: "network",
  },
  {
    title: "Distributed Microservices",
    subtitle: "Patterns for Resilient Clouds",
    author: "ScholarSphere Press",
    category: "SOFTWARE ENGINEERING",
    color: "#4a044e",
    accent: "#f472b6",
    gold: true,
    symbol: "nodes",
  },
  {
    title: "Advanced Algorithms & Proofs",
    subtitle: "Complexity & Heuristics",
    author: "Cormen, Leiserson & Rivest",
    category: "MATHEMATICS",
    color: "#451a03",
    accent: "#fbbf24",
    gold: true,
    symbol: "geometry",
  },
  {
    title: "Modern Molecular Biology",
    subtitle: "CRISPR & Genomic Horizons",
    author: "Doudna & Charpentier",
    category: "BIOCHEMISTRY",
    color: "#083344",
    accent: "#22d3ee",
    gold: false,
    symbol: "dna",
  },
  {
    title: "Astrophysics & Deep Cosmos",
    subtitle: "Gravitational Waves & Black Holes",
    author: "Hawking & Penrose",
    category: "COSMOLOGY",
    color: "#09090b",
    accent: "#a78bfa",
    gold: true,
    symbol: "celestial",
  },
  {
    title: "Journal of Academic Research",
    subtitle: "Peer-Reviewed Series Vol. 42",
    author: "ScholarSphere Consortium",
    category: "ACADEMIC JOURNAL",
    color: "#1c1917",
    accent: "#f59e0b",
    gold: true,
    isJournal: true,
    symbol: "crest",
  },
  {
    title: "Autonomous Robotics & Vision",
    subtitle: "Perception & Kinematics",
    author: "Thrun & Burgard",
    category: "ROBOTICS",
    color: "#172554",
    accent: "#60a5fa",
    gold: false,
    symbol: "compass",
  },
  {
    title: "Cryptographic Protocols",
    subtitle: "Zero-Knowledge & Privacy",
    author: "Shamir & Rivest",
    category: "SECURITY & CIPHERS",
    color: "#022c22",
    accent: "#10b981",
    gold: true,
    symbol: "key",
  },
];

// Cache textures to avoid recreating canvases
const textureCache = new Map();

/**
 * Generates an array of 6 materials for a BoxGeometry (Right, Left, Top, Bottom, Front, Back)
 */
export function createBookMaterials(bookInfo = BOOK_DATA[0]) {
  const cacheKey = `${bookInfo.title}_materials`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey);
  }

  // 1. Pages Texture (Right, Top, Bottom)
  const pagesTexture = getPagesTexture();

  // 2. Spine Texture (Left)
  const spineTexture = createSpineTexture(bookInfo);

  // 3. Front Cover Texture (Front)
  const frontCoverTexture = createCoverTexture(bookInfo, true);

  // 4. Back Cover Texture (Back)
  const backCoverTexture = createCoverTexture(bookInfo, false);

  const materials = [
    // Right (+X) - Fore-edge pages
    new THREE.MeshStandardMaterial({
      map: pagesTexture,
      roughness: 0.85,
      metalness: 0.05,
    }),
    // Left (-X) - Spine
    new THREE.MeshStandardMaterial({
      map: spineTexture,
      roughness: 0.35,
      metalness: bookInfo.gold ? 0.3 : 0.1,
    }),
    // Top (+Y) - Top pages edge
    new THREE.MeshStandardMaterial({
      map: pagesTexture,
      roughness: 0.85,
      metalness: 0.05,
    }),
    // Bottom (-Y) - Bottom pages edge
    new THREE.MeshStandardMaterial({
      map: pagesTexture,
      roughness: 0.85,
      metalness: 0.05,
    }),
    // Front (+Z) - Front Cover
    new THREE.MeshStandardMaterial({
      map: frontCoverTexture,
      roughness: 0.3,
      metalness: bookInfo.gold ? 0.25 : 0.1,
    }),
    // Back (-Z) - Back Cover
    new THREE.MeshStandardMaterial({
      map: backCoverTexture,
      roughness: 0.3,
      metalness: bookInfo.gold ? 0.25 : 0.1,
    }),
  ];

  textureCache.set(cacheKey, materials);
  return materials;
}

/**
 * Creates ribbed paper texture for book edges
 */
function getPagesTexture() {
  if (textureCache.has("pages_texture")) {
    return textureCache.get("pages_texture");
  }

  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  // Base warm cream paper color
  ctx.fillStyle = "#faf6ed";
  ctx.fillRect(0, 0, 128, 128);

  // Draw fine horizontal lines simulating page leaves
  ctx.fillStyle = "#dcd3c1";
  for (let y = 0; y < 128; y += 3) {
    ctx.fillRect(0, y, 128, 1);
  }

  // Slight aging vignette on edges
  const grad = ctx.createLinearGradient(0, 0, 128, 0);
  grad.addColorStop(0, "rgba(180, 160, 130, 0.35)");
  grad.addColorStop(0.2, "rgba(255, 255, 255, 0)");
  grad.addColorStop(0.8, "rgba(255, 255, 255, 0)");
  grad.addColorStop(1, "rgba(180, 160, 130, 0.35)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set("pages_texture", texture);
  return texture;
}

/**
 * Creates spine texture with book title, author, and decorative foil bands
 */
function createSpineTexture(book) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = book.color;
  ctx.fillRect(0, 0, 128, 768);

  // Subtle spine curvature shadow
  const curveGrad = ctx.createLinearGradient(0, 0, 128, 0);
  curveGrad.addColorStop(0, "rgba(0, 0, 0, 0.45)");
  curveGrad.addColorStop(0.25, "rgba(255, 255, 255, 0.15)");
  curveGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.0)");
  curveGrad.addColorStop(0.75, "rgba(255, 255, 255, 0.15)");
  curveGrad.addColorStop(1, "rgba(0, 0, 0, 0.45)");
  ctx.fillStyle = curveGrad;
  ctx.fillRect(0, 0, 128, 768);

  // Decorative gold bands at top and bottom
  const goldColor = book.accent || "#f59e0b";
  ctx.fillStyle = goldColor;
  ctx.fillRect(16, 40, 96, 4);
  ctx.fillRect(16, 50, 96, 2);
  ctx.fillRect(16, 710, 96, 2);
  ctx.fillRect(16, 720, 96, 4);

  // ScholarSphere emblem on top spine
  ctx.beginPath();
  ctx.arc(64, 90, 14, 0, Math.PI * 2);
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Vertical spine title
  ctx.save();
  ctx.translate(64, 400);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 24px 'Georgia', serif";
  // Truncate if long
  const displayTitle = book.title.length > 28 ? book.title.substring(0, 26) + "..." : book.title;
  ctx.fillText(displayTitle.toUpperCase(), 0, -5);

  ctx.fillStyle = goldColor;
  ctx.font = "14px 'Inter', sans-serif";
  ctx.fillText(book.author.toUpperCase(), 0, 20);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Creates high-detail front and back covers
 */
function createCoverTexture(book, isFront = true) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");

  // Base background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 512, 768);
  bgGrad.addColorStop(0, book.color);
  bgGrad.addColorStop(1, "#030712");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 768);

  // Subtle geometric background mesh
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 512; i += 48) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 768);
    ctx.stroke();
  }
  for (let j = 0; j < 768; j += 48) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(512, j);
    ctx.stroke();
  }

  // Elegant gold foil double border
  const goldColor = book.accent || "#f59e0b";
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(32, 32, 448, 704);

  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, 432, 688);

  // Ornate corner brackets
  drawCornerDecorations(ctx, goldColor);

  if (isFront) {
    // Top category badge
    ctx.fillStyle = goldColor;
    ctx.font = "bold 13px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "3px";
    ctx.fillText((book.category || "SCHOLARSPHERE").toUpperCase(), 256, 95);

    // Divider line
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(156, 115, 200, 1);

    // Book Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px 'Georgia', serif";
    wrapText(ctx, book.title, 256, 200, 380, 44);

    // Subtitle
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.font = "italic 16px 'Georgia', serif";
    wrapText(ctx, book.subtitle || "", 256, 320, 360, 24);

    // Central Emblem Graphic
    drawBookEmblem(ctx, book.symbol, 256, 440, goldColor);

    // Author
    ctx.fillStyle = goldColor;
    ctx.font = "bold 15px 'Inter', sans-serif";
    ctx.fillText(book.author.toUpperCase(), 256, 610);

    // Bottom branding
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "11px 'Inter', sans-serif";
    ctx.fillText("SCHOLARSPHERE DIGITAL REPOSITORY • ACADEMIC PRESS", 256, 675);
  } else {
    // Back cover layout
    ctx.fillStyle = goldColor;
    ctx.font = "bold 14px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("DIGITAL KNOWLEDGE INITIATIVE", 256, 120);

    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.font = "14px 'Georgia', serif";
    const blurb =
      "ScholarSphere is a modern digital repository bridging books, peer-reviewed journals, and technical documentation. Empowering learners and researchers worldwide through unified, seamless microservices access.";
    wrapText(ctx, blurb, 256, 200, 360, 26);

    // Simulated barcode at the bottom
    drawBarcode(ctx, 256, 580);

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "11px monospace";
    ctx.fillText("ISBN 978-0-262-03384-8 • DIGITAL EDITION", 256, 670);
  }

  // Spine hinge shadow on left edge
  const hingeGrad = ctx.createLinearGradient(0, 0, 30, 0);
  hingeGrad.addColorStop(0, "rgba(0, 0, 0, 0.65)");
  hingeGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = hingeGrad;
  ctx.fillRect(0, 0, 30, 768);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function drawCornerDecorations(ctx, color) {
  ctx.fillStyle = color;
  const corners = [
    [48, 48],
    [464, 48],
    [48, 720],
    [464, 720],
  ];
  corners.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawBookEmblem(ctx, symbol, x, y, color) {
  ctx.save();
  ctx.translate(x, y);

  // Outer glowing ring
  ctx.beginPath();
  ctx.arc(0, 0, 52, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, 46, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Draw icon according to symbol
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;

  if (symbol === "atom" || symbol === "rings") {
    for (let r = 0; r < 3; r++) {
      ctx.beginPath();
      ctx.ellipse(0, 0, 36, 12, (r * Math.PI) / 3, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (symbol === "crest") {
    // Academic open book icon
    ctx.beginPath();
    ctx.moveTo(0, 15);
    ctx.quadraticCurveTo(-15, -5, -28, -10);
    ctx.lineTo(-28, 18);
    ctx.quadraticCurveTo(-15, 22, 0, 32);
    ctx.quadraticCurveTo(15, 22, 28, 18);
    ctx.lineTo(28, -10);
    ctx.quadraticCurveTo(15, -5, 0, 15);
    ctx.stroke();
  } else {
    // Geometric prism / diamond emblem
    ctx.beginPath();
    ctx.moveTo(0, -26);
    ctx.lineTo(24, 0);
    ctx.lineTo(0, 26);
    ctx.lineTo(-24, 0);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawBarcode(ctx, centerX, y) {
  const width = 180;
  const startX = centerX - width / 2;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(startX - 10, y - 5, width + 20, 60);

  ctx.fillStyle = "#000000";
  let curX = startX;
  const barPattern = [2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 2, 1, 3, 2, 1, 4, 1, 2, 2, 3, 1, 1, 2, 3, 2, 1, 3];
  barPattern.forEach((w, idx) => {
    if (idx % 2 === 0) {
      ctx.fillRect(curX, y, w * 2, 45);
    }
    curX += w * 2.4;
  });
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + " ";
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
}
