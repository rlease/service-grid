import React from "react";
import PropTypes from "prop-types";
import "./hexagonGrid.css";

const Point = (x, y) => ({ x, y });

// Hexagons are always the same polygon, just shifted
// TODO: Add testing (size = 0, size is negative, midWidth = 0, etc.)
const Hexagon = (size, midWidth, height, offsetx = 0, offsety = 0, pos) => {
  return {
    position: pos,
    points: [
      Point(offsetx + midWidth, offsety),
      Point(offsetx + midWidth * 2, offsety + height),
      Point(offsetx + midWidth * 2, offsety + height + size),
      Point(offsetx + midWidth, offsety + height * 2 + size),
      Point(offsetx, offsety + height + size),
      Point(offsetx, offsety + height)
    ]
  };
};

// TODO List
// Add ability to add text to hexes
// Add ability to show routes betweeen hexes
// TODO: Add some testing to this.
class HexagonGrid extends React.Component {
  constructor (props) {
    super();
    // Some state stuff is going to go here eventually
  }

  getGrid = () => {
    const { size, rows, columns, spacing } = this.props;
    let grid = [];
    const midWidth = size * Math.cos(Math.PI / 6);
    const height = size / 2;

    for (let i = 0; i < rows; i++) {
      const isOdd = i % 2 === 1;
      const offsety = (size + size / 2 + spacing) * i;

      // Every other row has one less column
      for (let j = isOdd ? 1 : 0; j < columns; j++) {
        const xSpacing = (midWidth * 2 + spacing) * j;
        const offsetx = isOdd ? xSpacing - midWidth - spacing / 2 : xSpacing;
        const hex = Hexagon(size, midWidth, height, offsetx, offsety, { x: i, y: j });

        grid.push(hex);
      }
    }
    return grid;
  }

  render() {
    const grid = this.getGrid();
    return (
      <svg viewBox="0 0 100 100">{grid.map(hex => {
        return (
          <polygon
           key={`${hex.position.x},${hex.position.y}`}
           className="hex normal"
           points={hex.points.map(point => `${point.x},${point.y}`).join(" ")}
          />
        );
      })}
      </svg>
    );
  }
};

HexagonGrid.defaultProps = {
  size: 5,
  rows: 2,
  columns: 2,
  spacing: 1
};

HexagonGrid.propTypes = {
  size: PropTypes.number,
  rows: PropTypes.number,
  columns: PropTypes.number,
  spacing: PropTypes.number
};

export default HexagonGrid;
