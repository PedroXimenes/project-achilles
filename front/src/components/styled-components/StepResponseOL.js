import React from "react";
import styled from "styled-components";

import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryVoronoiContainer,
} from "victory";

export const Step = ({ input_data }) => {
  let data = [];
  input_data.x_axis_ol.forEach((element, index) => {
    data[index] = { x: element, y: input_data.y_axis_ol[index] };
  });
  return (
    <StepWrapper>
      <VictoryChart
        height={250}
        width={350}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) =>
              `Amplitude: ${datum.y.toPrecision(2)} 
      Tempo: ${datum.x.toPrecision(2)}s`
            }
          />
        }
      >
        <VictoryLabel x={75} y={30} text="Resposta ao Degrau (Processo)" />
        <VictoryAxis
          label="Tempo (s)"
          tickLabelComponent={<VictoryLabel dy={-7} />}
        />
        <VictoryAxis
          dependentAxis
          label="Amplitude"
          axisLabelComponent={<VictoryLabel dy={-10} />}
          tickLabelComponent={<VictoryLabel dx={8.8} />}
        />
        <VictoryLine data={data} style={{ data: { stroke: "#378bec" } }} />
      </VictoryChart>
    </StepWrapper>
  );
};

const StepWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  margin: 160px 120px 160px 500px;
  background-color: #f5f5f5;
  border-radius: 10px;
`;
