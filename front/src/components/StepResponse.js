import React from 'react'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryVoronoiContainer } from 'victory'

const StepResponse = ({ input_data }) => {

    let data = [];
    input_data.x_axis_ol.forEach((element, index) => {
    data[index] = {"x": element, "y": input_data.y_axis_ol[index]};
    });

    let data_cl = [];
    input_data.x_axis_cl.forEach((element, index) => {
    data_cl[index] = {"x": element, "y": input_data.y_axis_cl[index]};
    });

    return (
        <div>
            <div className="step-response">
                <VictoryChart height={250} width={350} 
                containerComponent={
                <VictoryVoronoiContainer 
                    labels={({ datum }) => `Amplitude: ${datum.y.toPrecision(2)}\n Tempo: ${datum.x.toPrecision(2)}s`  }/>} 
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
                        labels={({ datum }) => `Amplitude: ${datum.y.toPrecision(2)}\n Tempo: ${datum.x.toPrecision(2)}s`  }/>} 
                    >   
                    <VictoryLabel x={75} y={30} text="Resposta ao Degrau (Malha Fechada)" />
                    <VictoryAxis label="Tempo (s)" tickLabelComponent={<VictoryLabel dy={-7}/>} />
                    <VictoryAxis dependentAxis label="Amplitude " 
                        axisLabelComponent={<VictoryLabel dy={-10}/>} 
                        tickLabelComponent={<VictoryLabel dx={8.8}/>} 
                        // tickFormat={(t) => `${t.toPrecision(2)}`}
                    />
                    <VictoryLine  
                    data={data_cl} style={{ data:{ stroke: "#378bec"}}}/>
                </VictoryChart>
            </div>
        </div>
    )
}

export default StepResponse
