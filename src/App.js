import React, { Component } from "react";

class App extends Component {
  render() {
    const Point = (x, y) => ({ x, y });

    const Hexagon = ({ size, offsetx = 0, offsety = 0 }) => {
      const midWidth = size * Math.cos(Math.PI / 6);
      const height = Math.sqrt((size * size) - (midWidth * midWidth));
      let points = [
        Point(offsetx + midWidth, offsety),
        Point(offsetx + midWidth * 2, offsety + height),
        Point(offsetx + midWidth * 2, offsety + height + size),
        Point(offsetx + midWidth, offsety + height * 2 + size),
        Point(offsetx, offsety + height + size),
        Point(offsetx, offsety + height)
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
        <Hexagon size={5} offsetx={10} />
        <Hexagon size={5} offsetx={5} offsety={10} />
      </svg>
    );
  }
}

export default App;
