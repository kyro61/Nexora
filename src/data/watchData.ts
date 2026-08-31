import { WatchModelSpec, TechnicalCallout } from '../types';

export const WATCH_COLLECTION: WatchModelSpec[] = [
  {
    id: 'aurelis',
    name: 'NOXORA AURELIS',
    subtitle: 'Perpetual Calibre NX-901',
    tagline: 'Forged in 18k Rose Gold with brushed slate dial and open balance aperture.',
    price: '$48,500 USD',
    caseMaterial: '18k 4N Rose Gold, hand-polished and satin-brushed',
    caseDiameter: '41.0 mm',
    caseThickness: '10.8 mm',
    waterResistance: '100 meters (10 ATM)',
    caliber: 'In-House Calibre NX-901 Automatic',
    powerReserve: '72 Hours',
    frequency: '28,800 vph (4 Hz)',
    jewels: 31,
    strap: 'Hand-stitched Louisiana Alligator leather in obsidian noir with 18k gold deployant buckle',
    description: 'The Aurelis embodies the pinnacle of contemporary classical horology. Sculpted from proprietary 18k rose gold alloy resistant to magnetic interference and temporal oxidation, its dual-layer dial reveals the rhythmic oscillation of the Glucydur balance wheel.',
    accentColor: '#B08D57',
    metalColor: '#d4af37',
    dialColor: '#171717',
    rotorColor: '#bfa068'
  },
  {
    id: 'obsidian',
    name: 'NOXORA OBSIDIAN',
    subtitle: 'Stealth Tourbillon Concept',
    tagline: 'Monolithic DLC Grade 5 Titanium with carbon-matrix indices and skeleton movement.',
    price: '$62,000 USD',
    caseMaterial: 'Diamond-Like Carbon (DLC) Coated Grade 5 Titanium',
    caseDiameter: '42.0 mm',
    caseThickness: '11.2 mm',
    waterResistance: '150 meters (15 ATM)',
    caliber: 'Calibre NX-908 Stealth Monopoussoir',
    powerReserve: '80 Hours',
    frequency: '28,800 vph (4 Hz)',
    jewels: 35,
    strap: 'High-durability vulcanized FKM ballistic rubber with titanium clasp',
    description: 'Engineered for absolute resilience. The Obsidian absorbs ambient light through microscopic surface micro-grooves, creating a striking void contrast against the hand-beveled titanium bridges and luminescent indices.',
    accentColor: '#8E9299',
    metalColor: '#242528',
    dialColor: '#0a0a0c',
    rotorColor: '#3a3c42'
  },
  {
    id: 'vantage',
    name: 'NOXORA VANTAGE',
    subtitle: 'Grand Chronometer In 904L',
    tagline: 'High-frequency chronometer in surgical 904L steel with abyssal midnight dial.',
    price: '$34,000 USD',
    caseMaterial: 'Surgical Grade 904L Stainless Steel with mirror-beveled lugs',
    caseDiameter: '39.5 mm',
    caseThickness: '9.9 mm',
    waterResistance: '100 meters (10 ATM)',
    caliber: 'Calibre NX-902 High-Beat Chronometer',
    powerReserve: '70 Hours',
    frequency: '36,000 vph (5 Hz)',
    jewels: 29,
    strap: 'Solid 904L integrated H-link steel bracelet with micro-adjustment glide-lock',
    description: 'A tribute to maritime chronometry. Featuring an ultra-slim 9.9mm profile, the Vantage achieves chronometric deviation within +1/-1 second per day under Master Chronometer testing standards.',
    accentColor: '#6B8EAA',
    metalColor: '#D8DEE4',
    dialColor: '#091522',
    rotorColor: '#A2AEB8'
  },
  {
    id: 'eclat',
    name: 'NOXORA ÉCLAT',
    subtitle: 'Sapphire Skeleton Manufacture',
    tagline: 'Full sapphire crystal case exposing the entirety of the hand-skeletonized movement.',
    price: '$89,000 USD',
    caseMaterial: 'Monobloc Pure Synthetic Corundum Sapphire Crystal',
    caseDiameter: '40.5 mm',
    caseThickness: '10.2 mm',
    waterResistance: '50 meters (5 ATM)',
    caliber: 'Calibre NX-990 Openworked Skeleton Calibre',
    powerReserve: '96 Hours (Twin-Barrel)',
    frequency: '21,600 vph (3 Hz)',
    jewels: 38,
    strap: 'Transparent frosted hydrophobic silicone with platinum deployant buckle',
    description: 'Total architectural transparency. Over 180 hours of diamond-machining are required to carve the monobloc sapphire case, revealing every wheel, pinion, ruby jewel, and hand-chamfered bridge in floating suspension.',
    accentColor: '#9AC2D8',
    metalColor: '#C4E1E8',
    dialColor: '#121e25',
    rotorColor: '#E2F0F7'
  }
];

export const TECHNICAL_CALLOUTS: TechnicalCallout[] = [
  {
    id: 'crystal',
    title: 'DOUBLE-DOMED SAPPHIRE',
    spec: '9 Mohs Hardness Scale',
    description: 'Multi-layer internal anti-reflective coating ensuring distortion-free legibility from acute viewing angles.',
    position3D: [0, 1.6, 0.4],
    componentName: 'Sapphire Crystal'
  },
  {
    id: 'bezel',
    title: 'CERACHROM BEZEL RING',
    spec: 'PVD Platinum Deposition',
    description: 'Extreme scratch resistance and colorfastness unaffected by ultraviolet exposure or seawater immersion.',
    position3D: [0, 1.1, 0.2],
    componentName: 'Polished Bezel'
  },
  {
    id: 'dial',
    title: 'MULTI-TIERED GUILLOCHÉ',
    spec: '3-Layer Architecture',
    description: 'Individually applied hand-chamfered gold indices filled with Grade X1 Super-LumiNova luminescence.',
    position3D: [0, 0.5, 0.1],
    componentName: 'Layered Dial & Hands'
  },
  {
    id: 'movement',
    title: 'CALIBRE NX-901',
    spec: '28,800 VPH • 31 Jewels',
    description: 'Oscillating free-sprung Glucydur balance with Breguet overcoil hairspring and Geneva striping finish.',
    position3D: [0, -0.2, 0.0],
    componentName: 'Manufacture Calibre'
  },
  {
    id: 'rotor',
    title: 'TUNGSTEN OSCILLATING WEIGHT',
    spec: '22k Gold Heavy Edge Segment',
    description: 'Bi-directional ball-bearing winding mechanism delivering 72 hours of uninterrupted energy reserve.',
    position3D: [0, -0.9, -0.3],
    componentName: 'Inertial Rotor'
  }
];

export const CRAFTSMANSHIP_PILLARS = [
  {
    number: '01',
    title: 'ANGLAGE & POLISHING',
    subtitle: 'Hand-Finished Chamfering',
    text: 'Every interior and exterior edge of our bridges is beveled by hand using gentian wood pegs and diamond paste to achieve mirror specular reflection.',
    detail: 'Over 40 hours of manual finishing per movement',
    stat: '45°',
    statLabel: 'Uniform Chamfer Angle'
  },
  {
    number: '02',
    title: 'CÔTES DE GENÈVE',
    subtitle: 'Micro-Wave Striping',
    text: 'Circular and parallel Geneva wave striations are etched across the rhodium-plated bridges with sub-micron precision to diffract light dynamically.',
    detail: 'Traditional wooden wheel lapping technique',
    stat: '0.002mm',
    statLabel: 'Tolerance Threshold'
  },
  {
    number: '03',
    title: 'GLUCYDUR REGULATION',
    subtitle: 'Thermal Invariance',
    text: 'Our free-sprung balance wheel crafted from copper-beryllium alloy maintains isochronism across temperatures ranging from -20°C to +60°C.',
    detail: 'Adjusted in 6 positions over 15 days',
    stat: '±1 SEC',
    statLabel: 'Daily Variance Cap'
  },
  {
    number: '04',
    title: 'SYNTHETIC CORUNDUM',
    subtitle: 'Frictionless Ruby Bearings',
    text: '31 synthetic sapphire jewels lubricated with specialized synthetic horological oils ensure minimum frictional energy loss across the entire gear train.',
    detail: '9.0 on the Mohs hardness scale',
    stat: '31',
    statLabel: 'Precision Jewel Bearings'
  }
];
