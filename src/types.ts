export interface WatchModelSpec {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: string;
  caseMaterial: string;
  caseDiameter: string;
  caseThickness: string;
  waterResistance: string;
  caliber: string;
  powerReserve: string;
  frequency: string;
  jewels: number;
  strap: string;
  description: string;
  accentColor: string;
  metalColor: string;
  dialColor: string;
  rotorColor: string;
}

export interface TechnicalCallout {
  id: string;
  title: string;
  spec: string;
  description: string;
  position3D: [number, number, number];
  componentName: string;
}

export type ScenePhase = 
  | 'hero'          // 0.0 - 0.12
  | 'approach'      // 0.12 - 0.25
  | 'case-profile'  // 0.25 - 0.38
  | 'crystal-entry' // 0.38 - 0.48
  | 'disassembly'   // 0.48 - 0.62
  | 'movement-core' // 0.62 - 0.74
  | 'reconstruction'// 0.74 - 0.84
  | 'craftsmanship' // 0.84 - 0.92
  | 'final-hero';   // 0.92 - 1.0

export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  rotationSpeed?: number;
}
