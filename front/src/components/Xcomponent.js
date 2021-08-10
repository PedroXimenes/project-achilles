import React from 'react'

class Xcomponent extends React.Component {
    render() {
      const {x, y} = this.props;
      const xSymbol = "x";
      return (
      
          <text x={x} y={y} fontSize={12} dy={3} dx={-2} fontWeight={'bold'}>
            {xSymbol}
          </text>

      );
    }
  }

export default Xcomponent