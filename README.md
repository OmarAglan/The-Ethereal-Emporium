# The Ethereal Emporium

A WebGL-powered 3D art gallery for sculptures and paintings.

Built with Three.js and Vite. The goal is an elegant, performant space to showcase 3D pieces and 2D artworks with museum-like lighting and smooth navigation.

## Features (current)
- Three.js scene with basic lighting and a floor
- Orbit controls for exploring the gallery
- Responsive renderer with resize handling
- WebGL capability check and graceful fallback

## Roadmap (next)
- Import external 3D models (GLTF/GLB) for sculptures
- Image-based paintings framed on walls (texture-mapped planes)
- Proper gallery room layout (walls, spacing, paths)
- Environment lighting (HDRI), tone mapping, and post-processing (bloom)
- Artwork metadata HUD and selection/inspection mode
- Mobile/touch UX tuning and performance profiling
- Deployment (GitHub Pages / Vercel)

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```
This starts the Vite dev server and serves `index.html` at a local URL.

### Build
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Project Structure
```
.
├─ css/
│  └─ style.css       # Global styles and HUD overlay
├─ js/
│  └─ main.js         # Three.js scene bootstrapper
├─ index.html          # Entry HTML for Vite
├─ package.json        # Scripts and dependencies
└─ README.md           # You are here
```

## Tech Notes
- Three.js v0.164+ uses `three/addons/...` imports for examples (e.g. OrbitControls).
- Keep renderer dimensions in sync with the window on resize.

## Contributing
Issues and PRs are welcome. Please keep code clear and readable, prefer descriptive names, and avoid unnecessary complexity.

## License
MIT


