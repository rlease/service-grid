import React, { Component } from "react";

class App extends Component {
  render() {
    const Point = (x, y) => {
      return { x, y };
    };

    const Hexagon = ({ size }) => {
      // TODO: Add offsets to this so we can create more than one hex
      const midWidth = size * Math.cos(Math.PI / 6);
      const height = Math.sqrt((size * size) - (midWidth * midWidth));
      let points = [
        Point(midWidth, 0),
        Point(midWidth * 2, height),
        Point(midWidth * 2, height + size),
        Point(midWidth, height * 2 + size),
        Point(0, height + size),
        Point(0, height)
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
