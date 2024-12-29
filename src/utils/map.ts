export function calculateDistance(
  point1: [number, number],
  point2: [number, number]
): number {
  const R = 6371; // Earth's radius in km
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;
  
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  
  return Math.round(d); // Return distance in kilometers
}

function toRad(degrees: number): number {
  return degrees * Math.PI / 180;
} 