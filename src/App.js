import React, { Component } from "react";

class App extends Component {
  render() {
    const Point = (x, y) => ({ x, y });

    const Hexagon = ( size, offsetx = 0, offsety = 0 ) => {
      const midWidth = size * Math.cos(Math.PI / 6);
      const height = size / 2;
      let points = [
        Point(offsetx + midWidth, offsety),
        Point(offsetx + midWidth * 2, offsety + height),
        Point(offsetx + midWidth * 2, offsety + height + size),
        Point(offsetx + midWidth, offsety + height * 2 + size),
        Point(offsetx, offsety + height + size),
        Point(offsetx, offsety + height)
      ];

      return points;
    };

    // TODO: Add some testing to this.
    const HexagonGrid = ({ size, rows, columns, spacing }) => {
      let grid = [];
      const midWidth = size * Math.cos(Math.PI / 6);

      for (let i = 0; i < rows; i++) {
        const isOdd = i % 2 === 1;
        // Every other row has one less column
        for (let j = isOdd ? 1 : 0; j < columns; j++) {
          const xSpacing = (midWidth * 2 + spacing) * j;
          const offsetx = isOdd ? xSpacing - midWidth - spacing / 2 : xSpacing;
          const offsety = (size + size/2 + spacing) * i;
          const hexPoints = Hexagon(size, offsetx, offsety);

          grid.push(
            <polygon
              key={`${i},${j}`}
              points={hexPoints.map(point => `${point.x},${point.y}`).join(" ")}
            />
          );
        }
      }

      return grid;
    }

    return (
      <svg width="400" height="400">
        <HexagonGrid size={50} rows={3} columns={6} spacing={2} />
      </svg>
    );
  }
}

export default App;
