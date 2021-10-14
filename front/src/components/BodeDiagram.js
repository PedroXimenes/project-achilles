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
  let criticFreq = [];
  let gainFreq = [];

  if (input_data.bode_info) {
    gainMargin = input_data.bode_info["gainMargin"];
    phaseMargin = input_data.bode_info["phaseMargin"];
    criticFreq = input_data.bode_info["criticFreq"];
    gainFreq = input_data.bode_info["gainFreq"];
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
                  { name: `GM: ${gainMargin} dB`, labels: { fontSize: 12 } },
                  {
                    name: `𝜔180: ${criticFreq} rad/s`,
                    labels: { fontSize: 12 },
                  },
                ]}
              />

              <VictoryAxis
                dependentAxis
                crossAxis={false}
                label="Magnitude (dB)"
                axisLabelComponent={<VictoryLabel dy={-13} />}
                tickLabelComponent={<VictoryLabel dx={7} />}
                style={{ grid: { stroke: () => "grey" } }}
              />

              <VictoryAxis
                offsetY={50}
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
                  { name: `PM: ${phaseMargin}°`, labels: { fontSize: 12 } },
                  { name: `𝜔PM: ${gainFreq} rad/s`, labels: { fontSize: 12 } },
                ]}
              />

              <VictoryAxis
                dependentAxis
                crossAxis={false}
                label="Fase (º)"
                tickLabelComponent={<VictoryLabel dx={7} />}
                axisLabelComponent={<VictoryLabel dy={-13} />}
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
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  width: 550px;
  background-color: #f5f5f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0px 10px;
  padding-left: 15px;
`;

const PhaseWrapper = styled.div`
  display: flex;
  box-sizing: border-box;

  justify-content: center;
  align-items: center;
  width: 550px;
  background-color: #f5f5f5;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: 0px 10px;
  padding-left: 15px;
`;
export default BodeDiagram;
