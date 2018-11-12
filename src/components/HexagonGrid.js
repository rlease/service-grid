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
    ],
    class: "normal"
  };
};

// TODO List
// Add ability to add text to hexes
// Add ability to show routes betweeen hexes
// TODO: Add some testing to this.
class HexagonGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.getGrid(props),
      paths: []
    };
  }

  componentDidMount() {
    this.connect(
      this.getHex(0, 0),
      this.getHex(0, 2),
      this.props.spacing
    );
  }

  // Test cases:
  // horizontally adjacent hexes
  // vertically adjacent hexes
  // hexes in the same column but separated by one row
  // hexes along the outside of the grid (should keep path inside "border")
  // ignore connecting hexes in separate grids for the meantime
  // what if startHex has a greater x,y value than endHex
  connect = (startHex, endHex, spacing) => {
    // draw path consisting of these three types of segments
    // vertical edge of hex
    // bottom left/top right edge of hex
    // bottom right/top left edge of hex

    if (!startHex || !endHex) {
      return;
    }

    const { min: minX, max: maxX } = this.getMinMax(
      startHex.position.x,
      endHex.position.x
    );
    const { min: minY, max: maxY } = this.getMinMax(
      startHex.position.y,
      endHex.position.y
    );

    let paths = [];
    for (let i = minY + 1; i < maxY; i++) {
      // Draw a chevron
      const hex = this.getHex(minX, startHex.position.y + 1);
      const bl = this.getBorderPath(hex, "bottomLeft", spacing);
      // const br = this.getBorderPath(hex, "bottomRight", spacing);

      console.log(hex, bl);
      paths.push(bl);
    }

    // TODO: Another loop for vertical paths

    const grid = this.state.grid;

    grid[this.getHexPositionString(startHex)].class += " connected";
    grid[this.getHexPositionString(endHex)].class += " connected";
    this.setState({ grid, paths });
  };

  // Return a set of points that represents a border between hexes
  // only border available right now is bottomLeft
  getBorderPath = (hex, border, spacing) => {
    const points = hex.points;
    const borderSpacing = spacing / 4;

    return [
      Point(points[3].x, points[3].y + borderSpacing),
      Point(points[3].x, points[3].y + 3 * borderSpacing),
      Point(points[4].x - 2 * borderSpacing, points[4].y + 2 * borderSpacing),
      Point(points[4].x - 2 * borderSpacing, points[4].y)
    ];
  };

  getMinMax = (x, y) => (x >= y ? { min: y, max: x } : { min: x, max: y });

  getHexPositionString = hex => `${hex.position.x},${hex.position.y}`;

  getHex = (x, y) => {
    const { rows, columns } = this.props;
    if (x < 0 || x > rows - 1 || y < 0 || y > columns - 1) {
      console.error(
        `Attempting to get hex at (${x},${y}). Rows range from [0-${rows -
          1}], columns range from [0-${columns - 1}].`
      );
    }

    return this.state.grid[`${x},${y}`];
  };

  getGrid = props => {
    const { size, rows, columns, spacing } = props;
    let grid = {};
    const midWidth = size * Math.cos(Math.PI / 6);
    const height = size / 2;

    // TODO this definitely needs some comments
    for (let i = 0; i < rows; i++) {
      const isOdd = i % 2 === 1;
      const offsety = (size + size / 2 + spacing) * i;

      // Every other row has one less column
      for (let j = isOdd ? 1 : 0; j < columns; j++) {
        const xSpacing = (midWidth * 2 + spacing) * j;
        const offsetx = isOdd ? xSpacing - midWidth - spacing / 2 : xSpacing;
        const hex = Hexagon(size, midWidth, height, offsetx, offsety, {
          x: i,
          y: j
        });

        grid[`${i},${j}`] = hex;
      }
    }

    return grid;
  };

  render() {
    const { grid, paths } = this.state;
    const keys = Object.keys(grid);

    return (
      <svg viewBox="0 0 100 100">
        {keys.map(key => {
          const hex = grid[key];
          return (
            <polygon
              key={`${hex.position.x},${hex.position.y}`}
              className={`hex ${hex.class}`}
              points={hex.points
                .map(point => `${point.x},${point.y}`)
                .join(" ")}
            />
          );
        })}
        {paths.map((path, i) => (
          <polygon
            key={`path-${i}`}
            points={path.map(point => `${point.x},${point.y}`).join(" ")}
          />
        ))}
      </svg>
    );
  }
}

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
