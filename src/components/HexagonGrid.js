import React from 'react';
import './hexagonGrid.css';

const Point = (x, y) => ({ x, y });

// Hexagons are always the same polygon, just shifted
// TODO: Add testing (size = 0, size is negative, midWidth = 0, etc.)
const Hexagon = (size, midWidth, height, offsetx = 0, offsety = 0) => {
  return [
    Point(offsetx + midWidth, offsety),
    Point(offsetx + midWidth * 2, offsety + height),
    Point(offsetx + midWidth * 2, offsety + height + size),
    Point(offsetx + midWidth, offsety + height * 2 + size),
    Point(offsetx, offsety + height + size),
    Point(offsetx, offsety + height)
  ];
};

// Test cases:
// horizontally adjacent hexes
// vertically adjacent hexes
// hexes in the same column but separated by one row
// hexes along the outside of the grid (should keep path inside "border")
// ignore connecting hexes in separate grids for the meantime
const connect = (startHex, endHex) => {
  // draw path consisting of these three types of segments
  // vertical edge of hex
  // bottom left/top right edge of hex
  // bottom right/top left edge of hex
}

// TODO List
// Add ability to add text to hexes
// Add ability to show routes betweeen hexes
// TODO: Add some testing to this.
const HexagonGrid = ({ size, rows, columns, spacing }) => {
  let grid = [];
  const midWidth = size * Math.cos(Math.PI / 6);
  const height = size / 2;
  // Uncomment to test colors
  // const colors = {
  //   1: 'normal',
  //   2: 'warning',
  //   3: 'error'
  // };

  for (let i = 0; i < rows; i++) {
    const isOdd = i % 2 === 1;
    const offsety = (size + size/2 + spacing) * i;

    // Every other row has one less column
    for (let j = isOdd ? 1 : 0; j < columns; j++) {
      const xSpacing = (midWidth * 2 + spacing) * j;
      const offsetx = isOdd ? xSpacing - midWidth - spacing / 2 : xSpacing;
      const hexPoints = Hexagon(size, midWidth, height, offsetx, offsety);

      // Uncomment to test colors
      // Random number between 1 and 3
      // const randColor = Math.floor(Math.random() * 3 + 1);

      grid.push(
        <polygon
          key={`${i},${j}`}
          //className={`hex ${colors[randColor]}`}
          className="hex normal"
          points={hexPoints.map(point => `${point.x},${point.y}`).join(" ")}
        />
      );
    }
  }

  return <svg viewBox="0 0 100 100">{grid}</svg>
};

export default HexagonGrid;