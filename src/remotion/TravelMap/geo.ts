export type LatLon = { lat: number; lon: number };

export type Box = { x: number; y: number; width: number; height: number };

// Bounding box of the continental US, used to project city coordinates
// onto the stylized map area.
const US_BOUNDS = { lonMin: -125, lonMax: -66, latMin: 24, latMax: 49 };

export const projectToBox = ({ lat, lon }: LatLon, box: Box) => {
  const xRatio = (lon - US_BOUNDS.lonMin) / (US_BOUNDS.lonMax - US_BOUNDS.lonMin);
  const yRatio = (US_BOUNDS.latMax - lat) / (US_BOUNDS.latMax - US_BOUNDS.latMin);

  return {
    x: box.x + xRatio * box.width,
    y: box.y + yRatio * box.height,
  };
};

export const haversineDistanceKm = (a: LatLon, b: LatLon) => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const earthRadiusKm = 6371;

  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);

  const h =
    sinDLat * sinDLat +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinDLon * sinDLon;

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(h));
};

// Point and tangent angle (in degrees) at t along a quadratic bezier curve.
export const quadraticBezierPoint = (
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  t: number,
) => {
  const oneMinusT = 1 - t;

  const x = oneMinusT * oneMinusT * p0.x + 2 * oneMinusT * t * p1.x + t * t * p2.x;
  const y = oneMinusT * oneMinusT * p0.y + 2 * oneMinusT * t * p1.y + t * t * p2.y;

  const dx = 2 * oneMinusT * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
  const dy = 2 * oneMinusT * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);

  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return { x, y, angle };
};
