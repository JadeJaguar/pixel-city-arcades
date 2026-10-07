// Where each building stands on the city map. Change the numbers here to move a building.
// The key is the location id from the database.
//
// left, top: the center of the plot, in percent of the map (0 = left or top edge)
// width:     the building width, in percent of the map width
// baseY:     which point of the building image sits on the plot center,
//            in percent of the image height (a bigger number moves the building up)
// color:     the neon color of this arcade (map glow and event card edges)
const MAP_SPOTS = {
    1: { left: 24.5, top: 23, width: 30, baseY: 70, color: '#FF3EA5' },   // Neon Joystick, top left
    2: { left: 78.5, top: 75.5, width: 30, baseY: 70, color: '#FFC93C' }, // Coin Castle, bottom right
    3: { left: 21.5, top: 76, width: 30, baseY: 70, color: '#4F9DFF' },   // The Glitch Garage, bottom left
    4: { left: 75.5, top: 24, width: 30, baseY: 70, color: '#2FE6FF' }  // 8-Bit Basement, top right
}

const DEFAULT_COLOR = '#FF3EA5'

export const getArcadeColor = (locationId) => MAP_SPOTS[locationId]?.color ?? DEFAULT_COLOR

export default MAP_SPOTS
