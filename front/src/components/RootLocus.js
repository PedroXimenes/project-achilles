import React from "react";
import styled from "styled-components";
import {
  VictoryLine,
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryLabel,
  createContainer,
} from "victory";
import Xcomponent from "./Xcomponent";
import Ocomponent from "./Ocomponent";

const RootLocus = ({ input_data }) => {
  var data = [];
  const items = [];
  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

  var i = 0;
  var index = 0;
  var j = 0;
  if (input_data.num_poles) {
    for (
      index = 0;
      index < input_data.num_poles + input_data.num_zeros;
      index++
    ) {
      data[index] = [];
      items.push(
        <VictoryLine
          sortKey={0}
          key={index}
          data={data[index]}
          eventKey=""
          style={{ data: { stroke: "#378bec" } }}
        />
      );
    }
  }

  let poles = [];
  if (input_data.root_real) {
    for (i = 0; i < input_data.num_poles; i++) {
      poles.push({
        x: input_data.root_real[0][i],
        y: input_data.root_imag[0][i],
      });
    }
  }
  let zeros = [];

  if (input_data.zero_real) {
    for (i = 0; i < input_data.num_zeros; i++) {
      zeros.push({ x: input_data.zero_real[i], y: input_data.zero_imag[i] });
    }
  }
  let roots_x = [];
  let roots_y = [];
  if (input_data.num_poles) {
    for (i = 0; i < input_data.num_poles; i++) {
      if (input_data.num_zeros > i) {
        roots_x.push(zeros[j].x);
        roots_y.push(zeros[j].y);
        j++;
      }
      roots_x.push(poles[i].x);
      roots_y.push(poles[i].y);
    }
  }

  let max_X_neg = Math.min.apply(Math, roots_x);
  let max_X_pos = Math.max.apply(Math, roots_x);
  let max_Y_neg = Math.min.apply(Math, roots_y);
  let max_Y_pos = Math.max.apply(Math, roots_y);
  let delta_X_neg = 10;
  let delta_X_pos = 0;
  let delta_Y = 2;

  if (max_X_pos > 0) {
    delta_X_pos = 5;
    delta_X_neg = 5;
  }
  if (input_data.root_real) {
    input_data.root_imag.forEach((element, index) => {
      for (var i = 0; i < input_data.num_poles; i++) {
        data[i][index] = {
          x: input_data.root_real[index][i],
          y: element[i],
          l: true,
        };
      }
    });
  }

  return (
    <>
      {input_data.root_real ? (
        <Wrapper className="rootLocus">
          <VictoryChart
            domain={{
              x: [max_X_neg - delta_X_neg, max_X_pos + delta_X_pos],
              y: [max_Y_neg - delta_Y, max_Y_pos + delta_Y],
            }}
            domainPadding={10}
            height={250}
            width={350}
            containerComponent={
              <VictoryZoomVoronoiContainer
                labels={({ datum, data = input_data }) =>
                  datum.l
                    ? `Real: ${datum.x.toPrecision(2)}
                            Imag: ${datum.y.toPrecision(2)}        
                            Ganho: ${data.root_gain[datum.eventKey]}`
                    : null
                }
              />
            }
          >
            <VictoryAxis
              offsetY={50}
              label="Eixo Real"
              tickLabelComponent={<VictoryLabel dy={-7} />}
              fixLabelOverlap={true}
            />
            <VictoryAxis dependentAxis crossAxis={false} />
            <VictoryLabel x={115} y={30} text="Lugar das Raízes" />
            {items}
            <VictoryScatter
              data={poles}
              dataComponent={<Xcomponent />}
              size={3}
            />
            <VictoryScatter
              data={zeros}
              dataComponent={<Ocomponent />}
              size={3}
            />
          </VictoryChart>
        </Wrapper>
      ) : (
        []
      )}
    </>
  );
};
export default RootLocus;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 550px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin: 10px 10px;
`;
