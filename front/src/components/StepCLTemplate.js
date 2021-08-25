import React from "react";
import {
  VictoryLegend,
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";

const StepCLTemplate = ({ input_data, specifications }) => {
  console.log("input_data: ", input_data, "\n", "sp", specifications);

  let data_cl = [];
  let overshoot = [],
    peakMax = [];
  let tr = [],
    ts = [],
    tp = [];
  let trMax = [],
    tsMax = [],
    tpMax = [];
  let steadyState = [],
    steadyStateInfBounds = [],
    steadyStateSupBounds = [];

  if (input_data && specifications) {
    const x_cl = input_data.x_axis_cl;
    const y_cl = input_data.y_axis_cl;

    x_cl.forEach((element, index) => {
      data_cl[index] = { x: element, y: y_cl[index] };
    });

    const Overshoot = input_data.step_info.Overshoot2;
    const PeakTime = input_data.step_info.PeakTime;
    const SteadyStateValue = input_data.step_info.SteadyStateValue;
    const Peak = input_data.step_info.Peak;
    const RiseTime = input_data.step_info.RiseTime;
    const SettlingTime = input_data.step_info.SettlingTime;
    const Yss = input_data.yss;

    const maxOvershoot = parseFloat(specifications.overshoot);
    const maxPeakTime = parseFloat(specifications.peakTime);
    const maxRiseTime = parseFloat(specifications.riseTime);
    const maxSettlingTime = parseFloat(specifications.settlingTime);
    const varSteadyState = parseFloat(specifications.varSteadyState);
    const maxPeak = (Yss * maxOvershoot) / 100 + Yss;
    const sup_margin = (1 + varSteadyState / 100) * Yss;
    const inf_margin = (1 - varSteadyState / 100) * Yss;

    overshoot =
      Overshoot !== 0
        ? [
            {
              x: PeakTime,
              y: SteadyStateValue,
            },
            { x: PeakTime, y: Peak },
          ]
        : [];

    steadyState = [
      { x: 0, y: SteadyStateValue },
      { x: data_cl[data_cl.length - 1].x, y: SteadyStateValue },
    ];
    tr = [
      { x: RiseTime, y: 0, label: "tr" },
      { x: RiseTime, y: SteadyStateValue },
    ];
    ts = [
      { x: SettlingTime, y: 0, label: "ts" },
      { x: SettlingTime, y: SteadyStateValue },
    ];
    tp = [
      { x: PeakTime, y: 0, label: "tp" },
      { x: PeakTime, y: Peak },
    ];

    peakMax =
      Overshoot !== 0
        ? [
            { x: 0, y: maxPeak },
            { x: maxSettlingTime, y: maxPeak },
          ]
        : [];

    steadyStateInfBounds = [
      { x: maxSettlingTime, y: inf_margin },
      { x: data_cl[data_cl.length - 1].x, y: inf_margin },
    ];
    steadyStateSupBounds = [
      { x: maxSettlingTime, y: sup_margin },
      { x: data_cl[data_cl.length - 1].x, y: sup_margin },
    ];
    trMax = [
      { x: maxRiseTime, y: 0 },
      { x: maxRiseTime, y: Yss },
    ];
    tsMax =
      maxSettlingTime <= data_cl[data_cl.length - 1].x
        ? [
            { x: maxSettlingTime, y: 0 },
            { x: maxSettlingTime, y: maxPeak },
          ]
        : [];
    tpMax = [
      { x: maxPeakTime, y: 0 },
      { x: maxPeakTime, y: maxPeak },
    ];
  }

  return (
    <>
      <div>
        <VictoryChart
          height={250}
          width={350}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) =>
                `Amplitude: ${datum.y.toPrecision(2)} 
                    Tempo: ${datum.x.toPrecision(2)}s`
              }
              labelComponent={
                <VictoryTooltip
                  style={{ fontSize: 7 }}
                  flyoutStyle={{ strokeWidth: 0.5 }}
                  flyoutWidth={70}
                />
              }
            />
          }
        >
          <VictoryLabel
            x={8.8}
            y={20}
            text="Resposta ao Degrau (Malha Fechada)"
            style={{
              fontSize: 12,
            }}
          />
          <VictoryAxis
            label="Tempo (s)"
            tickLabelComponent={<VictoryLabel dy={-7} />}
            style={{
              axisLabel: { fontSize: 11, padding: 20 },
              tickLabels: { fontSize: 9, padding: 10 },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Amplitude"
            axisLabelComponent={<VictoryLabel dy={-10} />}
            tickLabelComponent={<VictoryLabel dx={8.8} />}
            style={{
              axisLabel: { fontSize: 11, padding: 20 },
              tickLabels: { fontSize: 9, padding: 10 },
            }}
          />

          <VictoryLegend
            x={47}
            y={35}
            orientation="horizontal"
            gutter={10}
            symbolSpacer={5}
            style={{
              labels: { fontSize: 6 },
            }}
            data={[
              { name: "tr max", symbol: { fill: "purple" } },
              { name: "tp max", symbol: { fill: "pink" } },
              { name: "ts max", symbol: { fill: "black" } },
              {
                name: `M = ${input_data.step_info.Overshoot2.toPrecision(4)} %`,
                symbol: { fill: "red" },
              },
              { name: "yss", symbol: { fill: "green" } },
            ]}
          />

          <VictoryLine
            data={data_cl}
            style={{ data: { stroke: "#378bec", strokeWidth: 1.5 } }}
          />
          <VictoryLine
            data={steadyState}
            style={{
              data: { stroke: "green", strokeWidth: 1, strokeDasharray: "5,5" },
            }}
          />
          <VictoryLine
            data={tr}
            style={{
              data: { stroke: "grey", strokeWidth: 1, strokeDasharray: "2,2" },
            }}
            labelComponent={
              <VictoryLabel
                textAnchor="start"
                dx={2}
                style={[{ fontSize: 7, fill: "grey", fontStyle: "italic" }]}
              />
            }
          />
          <VictoryLine
            data={ts}
            style={{
              data: { stroke: "grey", strokeWidth: 1, strokeDasharray: "2,2" },
            }}
            labelComponent={
              <VictoryLabel
                textAnchor="start"
                dx={2}
                style={[{ fontSize: 7, fill: "grey", fontStyle: "italic" }]}
              />
            }
          />
          <VictoryLine
            data={tp}
            style={{
              data: { stroke: "grey", strokeWidth: 1, strokeDasharray: "2,2" },
            }}
            labelComponent={
              <VictoryLabel
                textAnchor="start"
                dx={2}
                style={[
                  {
                    fontSize: 7,
                    fill: "grey",
                    fontStyle: "italic",
                  },
                ]}
              />
            }
          />
          <VictoryLine
            data={overshoot}
            style={{ data: { stroke: "red", strokeWidth: 1 } }}
            // labelComponent={
            //   <VictoryLabel
            //     textAnchor="end"
            //     style={[{ fontSize: 10, fill: "red", fontStyle: "italic" }]}
            //   />
            // }
          />

          <VictoryLine
            data={tpMax}
            style={{
              data: {
                stroke: "pink",
                strokeWidth: 2,
                strokeDasharray: "2,2",
              },
            }}
          />
          <VictoryLine
            data={trMax}
            style={{
              data: {
                stroke: "purple",
                strokeWidth: 2,
                strokeDasharray: "2,2",
              },
            }}
          />
          <VictoryLine
            data={tsMax}
            style={{ data: { stroke: "black", strokeWidth: 1 } }}
          />
          <VictoryLine
            data={steadyStateInfBounds}
            style={{ data: { stroke: "brown", strokeWidth: 1 } }}
          />
          <VictoryLine
            data={steadyStateSupBounds}
            style={{ data: { stroke: "brown", strokeWidth: 1 } }}
          />
          <VictoryLine
            data={peakMax}
            style={{ data: { stroke: "black", strokeWidth: 2 } }}
          />
        </VictoryChart>
      </div>
    </>
  );
};

export default StepCLTemplate;
