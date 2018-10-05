import React, { Component } from "react";

class App extends Component {
  render() {
    const Point = (x, y) => ({ x, y });

    // Hexagons are always the same polygon, just shifted
    const Hexagon = ( size, midWidth, height, offsetx = 0, offsety = 0 ) => {
      return [
        Point(offsetx + midWidth, offsety),
        Point(offsetx + midWidth * 2, offsety + height),
        Point(offsetx + midWidth * 2, offsety + height + size),
        Point(offsetx + midWidth, offsety + height * 2 + size),
        Point(offsetx, offsety + height + size),
        Point(offsetx, offsety + height)
      ];
    };

    // TODO: Add some testing to this.
    const HexagonGrid = ({ size, rows, columns, spacing }) => {
      let grid = [];
      const midWidth = size * Math.cos(Math.PI / 6);
      const height = size / 2;

      for (let i = 0; i < rows; i++) {
        const isOdd = i % 2 === 1;
        const offsety = (size + size/2 + spacing) * i;

        // Every other row has one less column
        for (let j = isOdd ? 1 : 0; j < columns; j++) {
          const xSpacing = (midWidth * 2 + spacing) * j;
          const offsetx = isOdd ? xSpacing - midWidth - spacing / 2 : xSpacing;
          const hexPoints = Hexagon(size, midWidth, height, offsetx, offsety);

          grid.push(
            <polygon
              key={`${i},${j}`}
              points={hexPoints.map(point => `${point.x},${point.y}`).join(" ")}
            />
          );
        }
      }

      return <svg viewBox="0 0 100 100">{grid}</svg>
    };

    return <HexagonGrid size={5} rows={3} columns={6} spacing={1} />;
  }
}

export default App;
