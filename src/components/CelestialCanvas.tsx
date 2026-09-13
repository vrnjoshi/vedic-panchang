import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PanchangData } from '../types';
import { VEDIC_NAKSHATRAS } from '../data/nakshatras';

import earthTextureImg from '../assets/textures/earth.jpg';
import earthCloudsImg from '../assets/textures/earth_clouds.png';
import sunTextureImg from '../assets/textures/sun.jpg';
import sunProminencesImg from '../assets/textures/sun_prominences.png';
import moonTextureImg from '../assets/textures/moon.jpg';

interface CelestialCanvasProps {
  panchang: PanchangData;
  offsetDays?: number;
}

export const CelestialCanvas: React.FC<CelestialCanvasProps> = ({ panchang, offsetDays = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Celestial Objects
  const earthTiltGroupRef = useRef<THREE.Group | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const earthCloudsRef = useRef<THREE.Mesh | null>(null);
  const sunGroupRef = useRef<THREE.Group | null>(null);
  const sunMeshRef = useRef<THREE.Mesh | null>(null);
  const sunProminence1Ref = useRef<THREE.Sprite | null>(null);
  const sunProminence2Ref = useRef<THREE.Sprite | null>(null);
  const sunGlowRef = useRef<THREE.Sprite | null>(null);
  const sunPointLightRef = useRef<THREE.PointLight | null>(null);
  const sunlightRef = useRef<THREE.DirectionalLight | null>(null);
  const moonMeshRef = useRef<THREE.Mesh | null>(null);
  const tithiSectorRef = useRef<THREE.Mesh | null>(null);
  const nakshatraSpritesRef = useRef<THREE.Sprite[]>([]);

  // Interaction state
  const isDraggingRef = useRef(false);
  const previousPointerPosRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0 });
  const targetSceneRotationRef = useRef({ x: 0.35, y: -0.4 });
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 16, 26));

  const orbitRadiusSun = 15;
  const orbitRadiusMoon = 5.4;

  // NASA SDO Fiery Solar Corona Halo Gradient
  const createSunGlowTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 256, 256);

    const grd = ctx.createRadialGradient(128, 128, 20, 128, 128, 128);
    grd.addColorStop(0, 'rgba(255, 245, 215, 1)');
    grd.addColorStop(0.25, 'rgba(249, 115, 22, 0.9)');
    grd.addColorStop(0.55, 'rgba(220, 38, 38, 0.45)');
    grd.addColorStop(0.8, 'rgba(153, 27, 27, 0.12)');
    grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 256, 256);

    return new THREE.CanvasTexture(canvas);
  };

  // Vedic Nakshatra Badge with high-DPI rendering and iOS Emoji compatibility
  const createNakshatraBadgeTexture = (
    index: number,
    emoji: string,
    hindiName: string,
    englishName: string
  ) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 512, 512);

    // Deep cosmic gradient background with rich opacity (guarantees solid backdrop)
    const bgGrad = ctx.createRadialGradient(256, 256, 40, 256, 256, 240);
    bgGrad.addColorStop(0, 'rgba(26, 22, 68, 0.98)');
    bgGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.96)');
    bgGrad.addColorStop(1, 'rgba(217, 119, 6, 0.92)');

    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.arc(256, 256, 240, 0, Math.PI * 2);
    ctx.fill();

    // Outer golden boundary ring
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(256, 256, 232, 0, Math.PI * 2);
    ctx.stroke();

    // Inner subtle cosmic glow ring
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.45)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(256, 256, 220, 0, Math.PI * 2);
    ctx.stroke();

    // Dedicated illuminated backdrop disc specifically behind the Nakshatra symbol
    // Ensures symbols are vibrantly visible and never blend with dark canvas backgrounds
    const iconDiscGrad = ctx.createRadialGradient(256, 175, 10, 256, 175, 115);
    iconDiscGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    iconDiscGrad.addColorStop(0.5, 'rgba(251, 191, 36, 0.25)');
    iconDiscGrad.addColorStop(0.85, 'rgba(129, 140, 248, 0.15)');
    iconDiscGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = iconDiscGrad;
    ctx.beginPath();
    ctx.arc(256, 175, 115, 0, Math.PI * 2);
    ctx.fill();

    // Ensure Unicode Emoji Presentation Selector (\uFE0F) is present
    // This tells iOS Safari / WebKit and Android to render standard colorful graphical emoji instead of monochrome text glyphs
    const formattedEmoji = emoji.includes('\uFE0F') ? emoji : `${emoji}\uFE0F`;

    // CRITICAL iOS / iPhone Safari Fix:
    // Explicitly set fillStyle to opaque white before drawing text glyphs
    // Provide system emoji fonts first in font stack
    ctx.save();
    ctx.font = '145px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 12;
    ctx.fillText(formattedEmoji, 256, 175);
    ctx.restore();

    // Sacred Devanagari Hindi Name
    ctx.save();
    ctx.font = 'bold 54px sans-serif';
    ctx.fillStyle = '#fef08a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 8;
    ctx.fillText(hindiName, 256, 320);
    ctx.restore();

    // English Name & Lunar Mansion Number
    ctx.save();
    ctx.font = '600 38px sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 6;
    ctx.fillText(`${index + 1}. ${englishName}`, 256, 388);
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
    return texture;
  };

  const createNakshatraRing = () => {
    const group = new THREE.Group();
    const radius = orbitRadiusSun + 2.8;

    const circleGeo = new THREE.BufferGeometry();
    const points: THREE.Vector3[] = [];
    const segments = 108;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, -Math.sin(theta) * radius));
    }
    circleGeo.setFromPoints(points);
    const circleMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.5 });
    group.add(new THREE.Line(circleGeo, circleMat));

    const nakshatraDegrees = 360 / 27;
    nakshatraSpritesRef.current = [];

    for (let i = 0; i < 27; i++) {
      const angleDeg = i * nakshatraDegrees;
      const rad = (angleDeg * Math.PI) / 180;
      const innerR = radius - 1.4;
      const outerR = radius + 0.6;

      const p1 = new THREE.Vector3(Math.cos(rad) * innerR, 0, -Math.sin(rad) * innerR);
      const p2 = new THREE.Vector3(Math.cos(rad) * outerR, 0, -Math.sin(rad) * outerR);
      const tickGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const tickMat = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0xf59e0b : 0x818cf8,
        transparent: true,
        opacity: i % 3 === 0 ? 0.8 : 0.45,
      });
      group.add(new THREE.Line(tickGeo, tickMat));

      const midAngleDeg = angleDeg + nakshatraDegrees / 2;
      const midRad = (midAngleDeg * Math.PI) / 180;
      const badgeR = radius + 2.0;

      const nData = VEDIC_NAKSHATRAS[i];
      if (nData) {
        const badgeTexture = createNakshatraBadgeTexture(
          i,
          nData.emoji,
          nData.name,
          nData.transliteration
        );

        const spriteMat = new THREE.SpriteMaterial({
          map: badgeTexture,
          transparent: true,
          opacity: 1.0,
          depthWrite: false,
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(Math.cos(midRad) * badgeR, 0.3, -Math.sin(midRad) * badgeR);
        sprite.scale.set(2.2, 2.2, 1);
        group.add(sprite);
        nakshatraSpritesRef.current.push(sprite);
      }
    }

    return group;
  };

  const createOrbitPaths = () => {
    const group = new THREE.Group();

    const makeOrbitLine = (radius: number, color: number, opacity: number) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(128).map((p) => new THREE.Vector3(p.x, 0, p.y));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineDashedMaterial({
        color,
        transparent: true,
        opacity,
        dashSize: 0.5,
        gapSize: 0.2,
      });
      const line = new THREE.Line(geometry, material);
      line.computeLineDistances();
      return line;
    };

    group.add(makeOrbitLine(orbitRadiusSun, 0xf59e0b, 0.4));
    group.add(makeOrbitLine(orbitRadiusMoon, 0x60a5fa, 0.5));
    return group;
  };

  // Initialize Scene
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 16, 26);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Deep cosmic space background
    renderer.setClearColor(0x060913, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    containerRef.current.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // Load authentic NASA satellite textures
    const textureLoader = new THREE.TextureLoader();

    const earthTexture = textureLoader.load(earthTextureImg);
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const earthCloudsTexture = textureLoader.load(earthCloudsImg);

    const sunTexture = textureLoader.load(sunTextureImg);
    sunTexture.colorSpace = THREE.SRGBColorSpace;

    const sunProminencesTexture = textureLoader.load(sunProminencesImg);
    sunProminencesTexture.colorSpace = THREE.SRGBColorSpace;

    const moonTexture = textureLoader.load(moonTextureImg);
    moonTexture.colorSpace = THREE.SRGBColorSpace;

    // Gentle ambient light so dark sides maintain subtle form
    const ambientLight = new THREE.AmbientLight(0x334155, 0.45);
    scene.add(ambientLight);

    // Directional sunlight emanating from Sun towards Earth
    const dirSunLight = new THREE.DirectionalLight(0xffecd1, 2.6);
    dirSunLight.position.set(orbitRadiusSun, 0, 0);
    scene.add(dirSunLight);
    sunlightRef.current = dirSunLight;

    // ==========================================
    // 1. AUTHENTIC NASA EARTH (Blue Marble)
    // ==========================================
    const earthTiltGroup = new THREE.Group();
    earthTiltGroup.rotation.z = (23.44 * Math.PI) / 180; // Authentic axial tilt (23.44°)
    scene.add(earthTiltGroup);
    earthTiltGroupRef.current = earthTiltGroup;

    const earthGeo = new THREE.SphereGeometry(1.6, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.05,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthTiltGroup.add(earthMesh);
    earthMeshRef.current = earthMesh;

    // Authentic Cloud Layer
    const cloudGeo = new THREE.SphereGeometry(1.63, 64, 64);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: earthCloudsTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthMesh.add(cloudMesh);
    earthCloudsRef.current = cloudMesh;

    // Delicate Blue Atmospheric Glow
    const atmosphereGeo = new THREE.SphereGeometry(1.72, 48, 48);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    earthMesh.add(atmosphere);

    // ==========================================
    // 2. NASA SDO 304 Å FIERY SUN & CORONA
    // ==========================================
    const sunGroup = new THREE.Group();
    scene.add(sunGroup);
    sunGroupRef.current = sunGroup;

    // 2a. Spherical Fiery Photosphere
    const sunGeo = new THREE.SphereGeometry(2.2, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTexture,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);
    sunMeshRef.current = sunMesh;

    // 2b. Omnidirectional Sun Light
    const sunPointLight = new THREE.PointLight(0xffedd5, 3.4, 250, 0.45);
    sunGroup.add(sunPointLight);
    sunPointLightRef.current = sunPointLight;

    // 2c. Primary Coronal Prominence Flare Sprite (NASA SDO Leap Prominences)
    const promMat1 = new THREE.SpriteMaterial({
      map: sunProminencesTexture,
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.95,
      depthWrite: false,
    });
    const promSprite1 = new THREE.Sprite(promMat1);
    promSprite1.scale.set(4.8, 4.8, 1);
    sunGroup.add(promSprite1);
    sunProminence1Ref.current = promSprite1;

    // 2d. Secondary Animated Coronal Plasma Layer (creates churning flame dynamics)
    const promMat2 = new THREE.SpriteMaterial({
      map: sunProminencesTexture,
      color: 0xffaa44,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.65,
      depthWrite: false,
      rotation: Math.PI / 4,
    });
    const promSprite2 = new THREE.Sprite(promMat2);
    promSprite2.scale.set(5.0, 5.0, 1);
    sunGroup.add(promSprite2);
    sunProminence2Ref.current = promSprite2;

    // 2e. Radiant Fiery Solar Atmospheric Corona Glow
    const sunGlowMat = new THREE.SpriteMaterial({
      map: createSunGlowTexture(),
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.92,
      depthWrite: false,
    });
    const sunGlow = new THREE.Sprite(sunGlowMat);
    sunGlow.scale.set(8.8, 8.8, 1);
    sunGroup.add(sunGlow);
    sunGlowRef.current = sunGlow;

    // ==========================================
    // 3. AUTHENTIC NASA LUNAR SURFACE
    // ==========================================
    const moonGeo = new THREE.SphereGeometry(0.65, 48, 48);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.85,
      metalness: 0.05,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    scene.add(moonMesh);
    moonMeshRef.current = moonMesh;

    // Tithi Sector Wedge
    const tithiGeo = new THREE.BufferGeometry();
    const tithiMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      depthTest: true,
    });
    const tithiMesh = new THREE.Mesh(tithiGeo, tithiMat);
    tithiMesh.renderOrder = 5;
    scene.add(tithiMesh);
    tithiSectorRef.current = tithiMesh;

    // Nakshatra Ring
    scene.add(createNakshatraRing());

    // Orbit paths
    scene.add(createOrbitPaths());

    // Starfield (2,500 distant celestial stars)
    const starCount = 2500;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const colorPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xdce6ff),
      new THREE.Color(0xffeedd),
      new THREE.Color(0xffd79e),
    ];

    for (let i = 0; i < starCount; i++) {
      const r = 120 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const brightness = 0.5 + Math.random() * 0.5;
      starColors[i * 3] = color.r * brightness;
      starColors[i * 3 + 1] = color.g * brightness;
      starColors[i * 3 + 2] = color.b * brightness;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // Mouse & Touch Controls
    const domEl = renderer.domElement;

    const onPointerDown = (clientX: number, clientY: number) => {
      isDraggingRef.current = true;
      previousPointerPosRef.current = { x: clientX, y: clientY };
      rotationVelocityRef.current = { x: 0, y: 0 };
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      if (!isDraggingRef.current) return;
      const deltaX = clientX - previousPointerPosRef.current.x;
      const deltaY = clientY - previousPointerPosRef.current.y;
      previousPointerPosRef.current = { x: clientX, y: clientY };

      const factor = 0.005;
      targetSceneRotationRef.current.y += deltaX * factor;
      targetSceneRotationRef.current.x += deltaY * factor;
      targetSceneRotationRef.current.x = Math.max(
        -Math.PI / 2.2,
        Math.min(Math.PI / 2.2, targetSceneRotationRef.current.x)
      );

      rotationVelocityRef.current = {
        x: deltaY * factor * 0.4,
        y: deltaX * factor * 0.4,
      };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => onPointerUp();

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => onPointerUp();

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.025;
      const newDistance = targetCameraPosRef.current.length() + zoomFactor;
      if (newDistance >= 10 && newDistance <= 55) {
        targetCameraPosRef.current.normalize().multiplyScalar(newDistance);
      }
    };

    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    domEl.addEventListener('wheel', handleWheel, { passive: false });

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      // Inertia & Smooth Dragging
      if (!isDraggingRef.current) {
        targetSceneRotationRef.current.y += rotationVelocityRef.current.y;
        targetSceneRotationRef.current.x += rotationVelocityRef.current.x;
        rotationVelocityRef.current.x *= 0.92;
        rotationVelocityRef.current.y *= 0.92;
      }

      scene.rotation.y += (targetSceneRotationRef.current.y - scene.rotation.y) * 0.1;
      scene.rotation.x += (targetSceneRotationRef.current.x - scene.rotation.x) * 0.1;

      // Subtle natural celestial rotations
      if (earthMeshRef.current) earthMeshRef.current.rotation.y += 0.0008;
      if (earthCloudsRef.current) earthCloudsRef.current.rotation.y += 0.0012;
      // (Note: Moon axial rotation is tidally locked to Earth and updated with orbit)

      // ==========================================
      // DYNAMIC FIERY SOLAR ANIMATION (Like SDO)
      // ==========================================
      // Photosphere axial rotation
      if (sunMeshRef.current) {
        sunMeshRef.current.rotation.y += 0.0014;
      }

      // Primary leaping solar prominence flares (breathing & slow rotation)
      if (sunProminence1Ref.current) {
        sunProminence1Ref.current.material.rotation += 0.00045;
        const pulse1 = 4.8 + Math.sin(time * 2.1) * 0.11 + Math.cos(time * 3.8) * 0.05;
        sunProminence1Ref.current.scale.set(pulse1, pulse1, 1);
        sunProminence1Ref.current.material.opacity = 0.9 + Math.sin(time * 1.7) * 0.08;
      }

      // Secondary counter-rotating coronal plasma layer (creates churning solar prominence loop effect)
      if (sunProminence2Ref.current) {
        sunProminence2Ref.current.material.rotation -= 0.00035;
        const pulse2 = 5.0 + Math.cos(time * 1.9) * 0.14 + Math.sin(time * 3.1) * 0.06;
        sunProminence2Ref.current.scale.set(pulse2, pulse2, 1);
        sunProminence2Ref.current.material.opacity = 0.62 + Math.cos(time * 2.3) * 0.1;
      }

      // Radiant atmospheric aura breathing
      if (sunGlowRef.current) {
        const auraPulse = 8.8 + Math.sin(time * 1.4) * 0.35;
        sunGlowRef.current.scale.set(auraPulse, auraPulse, 1);
      }

      // Subtle solar radiance light pulsation
      if (sunPointLightRef.current) {
        sunPointLightRef.current.intensity = 3.4 + Math.sin(time * 2.4) * 0.25;
      }

      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCameraPosRef.current, 0.06);
        cameraRef.current.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newWidth / newHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newWidth, newHeight);
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      domEl.removeEventListener('wheel', handleWheel);
      renderer.dispose();
    };
  }, []);

  // Update Sun & Moon 3D coordinates, Tidal Locking, Earth Rotation & Tithi Sector
  useEffect(() => {
    if (!sunGroupRef.current || !moonMeshRef.current || !tithiSectorRef.current) return;

    const sunLon = panchang.angles.sunTropical;
    const moonLon = panchang.angles.moonTropical;
    const relAngle = panchang.angles.relative;

    const sunRad = (sunLon * Math.PI) / 180;
    const moonRad = (moonLon * Math.PI) / 180;

    const sunX = Math.cos(sunRad) * orbitRadiusSun;
    const sunZ = -Math.sin(sunRad) * orbitRadiusSun;

    // Sun Revolution Position along the Ecliptic
    sunGroupRef.current.position.set(sunX, 0, sunZ);
    if (sunlightRef.current) {
      sunlightRef.current.position.set(sunX, 0, sunZ);
      sunlightRef.current.target.position.set(0, 0, 0);
      sunlightRef.current.target.updateMatrixWorld();
    }

    // Moon Revolution Position along its Lunar Orbit
    const moonX = Math.cos(moonRad) * orbitRadiusMoon;
    const moonZ = -Math.sin(moonRad) * orbitRadiusMoon;
    moonMeshRef.current.position.set(moonX, 0, moonZ);

    // AUTHENTIC TIDAL LOCKING PHYSICS:
    // The Moon's orbital period matches its axial rotation period exactly (1:1 resonance).
    // The same lunar hemisphere (Near Side) continuously faces the Earth center (0, 0, 0).
    // As the Moon revolves around Earth, lookAt(0, 0, 0) dynamically turns the Moon on its polar axis!
    moonMeshRef.current.lookAt(0, 0, 0);

    // AUTHENTIC EARTH DIURNAL AXIAL ROTATION:
    // Earth completes exactly 1 full rotation (360° / 2π rad) per 24-hour solar day.
    if (earthMeshRef.current) {
      const earthAngle = ((offsetDays || 0) * Math.PI * 2) % (Math.PI * 2);
      earthMeshRef.current.rotation.y = earthAngle;
    }
    if (earthCloudsRef.current) {
      const cloudAngle = (((offsetDays || 0) * Math.PI * 2 * 1.05) % (Math.PI * 2));
      earthCloudsRef.current.rotation.y = cloudAngle;
    }

    // Active Nakshatra Highlighting:
    // Enlarge the sprite representing the currently occupied Nakshatra
    if (nakshatraSpritesRef.current.length === 27) {
      nakshatraSpritesRef.current.forEach((sprite, idx) => {
        if (idx === panchang.nakshatra.index) {
          sprite.scale.set(3.0, 3.0, 1);
          sprite.material.opacity = 1.0;
        } else {
          sprite.scale.set(2.2, 2.2, 1);
          sprite.material.opacity = 0.88;
        }
      });
    }

    const segments = 64;
    const relAngleRad = (relAngle * Math.PI) / 180;
    const vertices: number[] = [];

    for (let i = 0; i < segments; i++) {
      const a1 = sunRad + (i / segments) * relAngleRad;
      const a2 = sunRad + ((i + 1) / segments) * relAngleRad;

      const x1 = Math.cos(a1) * (orbitRadiusSun + 0.3);
      const z1 = -Math.sin(a1) * (orbitRadiusSun + 0.3);

      const x2 = Math.cos(a2) * (orbitRadiusSun + 0.3);
      const z2 = -Math.sin(a2) * (orbitRadiusSun + 0.3);

      vertices.push(0, 0, 0);
      vertices.push(x1, 0, z1);
      vertices.push(x2, 0, z2);
    }

    tithiSectorRef.current.geometry.dispose();
    const newGeo = new THREE.BufferGeometry();
    newGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    newGeo.computeVertexNormals();
    tithiSectorRef.current.geometry = newGeo;
  }, [panchang, offsetDays]);

  return (
    <div
      ref={containerRef}
      id="canvas-container"
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: 'none' }}
    />
  );
};
