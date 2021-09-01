import React from "react";
import styled from "styled-components";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryVoronoiContainer,
  VictoryLegend,
} from "victory";

const BodeDiagram = ({ input_data }) => {
  let data = [];
  let phase = [];

  if (input_data.omega) {
    input_data.omega.forEach((element, index) => {
      data[index] = { x: element, y: input_data.magnitude[index] };
      phase[index] = { x: element, y: input_data.phase[index] };
    });
  }

  let gainMargin = [];
  let phaseMargin = [];
  let gainFreq = [];
  let phaseFreq = [];

  if (input_data.bode_info) {
    gainMargin = input_data.bode_info["gainMargin"];
    phaseMargin = input_data.bode_info["phaseMargin"];
    gainFreq = input_data.bode_info["gainFreq"];
    phaseFreq = input_data.bode_info["phaseFreq"];
  }

  return (
    <>
      {input_data.omega ? (
        <div>
          <MagWrapper className="magWrapper">
            <VictoryChart
              domainPadding={10}
              scale={{ x: "log", y: "linear" }}
              minDomain={{ x: input_data.omega[0] }}
              height={250}
              width={350}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) =>
                    `Magnitude: ${datum.y.toPrecision(
                      2
                    )} dB \n Frequência: ${datum.x.toPrecision(2)} rad/s `
                  }
                />
              }
            >
              <VictoryLabel x={120} y={24} text="Diagramas de Bode" />
              <VictoryLegend
                x={50}
                y={37}
                orientation="horizontal"
                itemsPerRow={2}
                symbolSpacer={6}
                gutter={20}
                style={{
                  data: { fill: "blue", type: "minus", size: 2 },
                }}
                data={[
                  { name: `MG: ${gainMargin} dB`, labels: { fontSize: 12 } },
                  { name: `wg: ${gainFreq} rad/s`, labels: { fontSize: 12 } },
                ]}
              />

              <VictoryAxis
                dependentAxis
                label="Magnitude (dB)"
                axisLabelComponent={<VictoryLabel dy={-30} />}
                style={{ grid: { stroke: () => "grey" } }}
              />

              <VictoryAxis
                axisLabelComponent={<VictoryLabel dy={25} />}
                orientation="bottom"
                style={{ grid: { stroke: () => "grey" } }}
                tickFormat={(t) => (Number.isInteger(Math.log10(t)) ? t : "")}
              />

              <VictoryLine
                data={data}
                style={{ data: { stroke: "#378bec" } }}
              />
            </VictoryChart>
          </MagWrapper>

          <PhaseWrapper>
            <VictoryChart
              domainPadding={10}
              scale={{ x: "log", y: "linear" }}
              minDomain={{ x: input_data.omega[0] }}
              height={250}
              width={350}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) =>
                    `Fase: ${datum.y.toPrecision(
                      2
                    )}° \n Frequência: ${datum.x.toPrecision(2)} rad/s `
                  }
                />
              }
            >
              <VictoryLine
                data={phase}
                style={{ data: { stroke: "#378bec" } }}
              />

              <VictoryLegend
                x={50}
                y={37}
                orientation="horizontal"
                itemsPerRow={2}
                gutter={20}
                symbolSpacer={6}
                style={{
                  data: { fill: "blue", type: "minus", size: 2 },
                }}
                data={[
                  { name: `MF: ${phaseMargin}°`, labels: { fontSize: 12 } },
                  { name: `wf: ${phaseFreq} rad/s`, labels: { fontSize: 12 } },
                ]}
              />

              <VictoryAxis
                dependentAxis
                label="Phase (º)"
                axisLabelComponent={<VictoryLabel dy={-30} />}
                style={{ grid: { stroke: () => "grey" } }}
              />

              <VictoryAxis
                label="Frequência (rad/s)"
                axisLabelComponent={<VictoryLabel dy={5} />}
                orientation="bottom"
                style={{ grid: { stroke: () => "grey" } }}
                tickFormat={(t) => (Number.isInteger(Math.log10(t)) ? t : "")}
                fixLabelOverlap={true}
                offsetY={50}
              />
            </VictoryChart>
          </PhaseWrapper>
        </div>
      ) : (
        []
      )}
    </>
  );
};

const MagWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 550px;
  background-color: #f5f5f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0px 10px;
`;

const PhaseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 550px;
  background-color: #f5f5f5;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: 0px 10px;
`;
export default BodeDiagram;
