import React, { Component } from "react";

class App extends Component {
  render() {
    const Point = (x, y) => {
      return { x, y };
    };

    const Hexagon = ({ size, sides = 6 }) => {
      // TODO: Add offsets to this so we can create more than one hex
      const root2 = Math.sqrt(2);
      let points = [
        Point(0, (size * root2) / 2),
        Point(size / root2, size * root2),
        Point(size + size / root2, size * root2),
        Point(size + (size * 2) / root2, (size * root2) / 2),
        Point(size + size / root2, 0),
        Point(size / root2, 0)
      ];

      return (
        <polygon
          points={points.map(point => `${point.x},${point.y}`).join(" ")}
        />
      );
    };

    return (
      <svg viewBox="0 0 100 100">
        <Hexagon size={5} />
      </svg>
    );
  }
}

export default App;
