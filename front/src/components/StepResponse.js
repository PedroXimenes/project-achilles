import React from 'react'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryVoronoiContainer } from 'victory'

const StepResponse = ({ input_data }) => {

    let data = [];
    input_data.x_axis_ol.forEach((element, index) => {
        data[index] = {"x": element, "y": input_data.y_axis_ol[index]};
    }); // Malha aberta

    let data_cl = [];
    input_data.x_axis_cl.forEach((element, index) => {
        data_cl[index] = {"x": element, "y": input_data.y_axis_cl[index]};
    }); // Malha fechada

    var S = input_data.step_info
    console.log('Step_info' + S)
    
    let overshoot = [];
    let tr = [], ts = [], tp = [];
    let steadyState = [];
    if(S !== null){
        overshoot = S['Overshoot2'] !== 0?[
            {"x": S['PeakTime'], "y": S['SteadyStateValue'], label:`M = ${S['Overshoot2'].toPrecision(3)} %`},
            {"x": S['PeakTime'], "y": S['Peak']}
        ]:[]

        steadyState = [
            {"x": 0,"y": S['SteadyStateValue'],label: "valor estacionário"},
            {"x": data_cl[data_cl.length - 1].x,"y": S['SteadyStateValue']},
        ]
        tr = [
            {"x": S['RiseTime'], "y": 0, label: "tr"},
            {"x": S['RiseTime'], "y": S['SteadyStateValue']}
        ]
        ts = [
            {"x": S['SettlingTime'], "y": 0, label: "ts"},
            {"x": S['SettlingTime'], "y": S['SteadyStateValue']}
        ]
        tp = [
            {"x": S['PeakTime'], "y": 0, label: "tp"},
            {"x": S['PeakTime'], "y": S['Peak']}
        ]
        
    }
    console.log(overshoot,steadyState,tr,ts,tp)
    return (
        <div>
            <div className="step-response">
                <VictoryChart height={250} width={350} 
                containerComponent={
                <VictoryVoronoiContainer 
                    labels={({ datum }) => 
                    `Amplitude: ${datum.y.toPrecision(2)} 
                    Tempo: ${datum.x.toPrecision(2)}s`  }/>} 
                >
                    <VictoryLabel x={75} y={30} text="Resposta ao Degrau (Processo)" />
                    <VictoryAxis label="Tempo (s)" tickLabelComponent={<VictoryLabel dy={-7}/>}/>
                    <VictoryAxis dependentAxis label="Amplitude" 
                        axisLabelComponent={<VictoryLabel dy={-10}/>} 
                        tickLabelComponent={<VictoryLabel dx={8.8}/>} 
                    />
                    <VictoryLine  
                        data={data} style={{ data:{ stroke: "#378bec"}}} 
                    />
                </VictoryChart>
            </div>

            <div className="step-response2">
                <VictoryChart height={250} width={350} 
                containerComponent={
                    <VictoryVoronoiContainer 
                        labels={({ datum }) => 
                        `Amplitude: ${datum.y.toPrecision(2)} 
                        Tempo: ${datum.x.toPrecision(2)}s`  }/>} 
                    >   
                    <VictoryLabel x={75} y={30} 
                        text="Resposta ao Degrau (Malha Fechada)" />
                    <VictoryAxis label="Tempo (s)" tickLabelComponent={<VictoryLabel dy={-7}/>}/>
                    <VictoryAxis dependentAxis label="Amplitude" 
                        axisLabelComponent={<VictoryLabel dy={-10}/>} 
                        tickLabelComponent={<VictoryLabel dx={8.8}/>} 
                    />
                    <VictoryLine  
                        data={data_cl} 
                        style={{ data:{ stroke: "#378bec"}}}
                    
                    />
                   <VictoryLine
                        data = {steadyState}
                        style = {{ data: { stroke: "green", 
                                           strokeWidth: 1, 
                                           strokeDasharray: "5,5"}}}
                        labelComponent={
                            <VictoryLabel
                                textAnchor='start'
                                dx={170}
                                //dy={-50}
                                style={[
                                    { fontSize: 10, fill: 'green', fontStyle: 'italic' }
                                
                                ]}
                            />
                          }
                    />
                   <VictoryLine
                        data = {tr}
                        style={{ data: { stroke: "grey", 
                                         strokeWidth: 1, 
                                         strokeDasharray: "2,2"}}
                        }
                        labelComponent={
                            <VictoryLabel
                                textAnchor='end'
                                //dx={10}
                                //dy={125}
                                style={[
                                    { fontSize: 10, fill: 'grey', fontStyle: 'italic' }
                                
                                ]}
                            />
                        }
                    />
                   <VictoryLine
                        data = {ts}
                        style={{ data: { stroke: "grey", 
                                         strokeWidth: 1, 
                                         strokeDasharray: "2,2"}}
                        }
                        labelComponent={
                            <VictoryLabel
                                textAnchor='end'
                                //dx={10}
                                //dy={125}
                                style={[
                                    { fontSize: 10, fill: 'grey', fontStyle: 'italic' }
                                
                                ]}
                            />
                        }
                        
                    />
                   <VictoryLine
                        data = {tp}
                        style={{ data: { stroke: "grey", 
                                         strokeWidth: 1, 
                                         strokeDasharray: "2,2"}}
                        }
                        labelComponent={
                            <VictoryLabel
                                textAnchor='end'
                                //dx={11}
                                //dy={147}
                                style={[
                                    { fontSize: 10, fill: 'grey', fontStyle: 'italic' }
                                
                                ]}
                            />
                        }
                    />
                    <VictoryLine
                        data = {overshoot}
                        style={{ data: { stroke: "red", 
                                         strokeWidth: 1}}
                        }
                        labelComponent={
                            <VictoryLabel
                                textAnchor='end'
                                //dy={0}
                                //dx={46}
                                style={[
                                    { fontSize: 10, fill: 'red', fontStyle: 'italic' }
                                
                                ]}
                            />
                        }
                    />
                   
                </VictoryChart>
            </div>
        </div>
    )
}

export default StepResponse
