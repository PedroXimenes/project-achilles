import React from 'react'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryVoronoiContainer } from 'victory'

const BodeDiagram = ({input_data}) => {

    let data = [];
    let phase = [];
    input_data.omega.forEach((element, index) => {

    data[index] = {"x": element, "y": input_data.magnitude[index]};
    phase[index] = {"x": element, "y": input_data.phase[index]};
    });
    
    return (
        <div>
            <div className="bode-mag">
                <VictoryChart  domainPadding={10} scale={{x: "log", y:"linear"}} 
                    minDomain={{ x: input_data.omega[0] }} height={250} width={350}
                    containerComponent={
                        <VictoryVoronoiContainer 
                            labels={({ datum }) => `Magnitude: ${datum.y.toPrecision(2)} dB \n Frequência: ${datum.x.toPrecision(2)} rad/s `  }/>} 
                >
                    
                    <VictoryLabel x={120} y={30} text="Diagramas de Bode" />
                   
                    <VictoryAxis dependentAxis label="Magnitude (dB)" 
                        axisLabelComponent={<VictoryLabel dy={-30}/>} 
                        style={{grid:{stroke: ({ tick }) => "grey"}}} 
                    />
                   
                    <VictoryAxis axisLabelComponent={<VictoryLabel dy={25}/>}  
                        orientation="bottom" 
                        style={{grid:{stroke: ({ tick }) => "grey"}}} 
                        tickFormat={(t) => Number.isInteger(Math.log10(t)) ? t: ''}
                     />   
                   
                    <VictoryLine
                    data={data} style={{ data:{ stroke: "#378bec"}}} />
                </VictoryChart>
            </div>

            <div className="bode-phase">
                <VictoryChart domainPadding={10} scale={{x: "log", y:"linear"}} 
                    minDomain={{ x: input_data.omega[0] }} height={250} width={350}
                    containerComponent={
                        <VictoryVoronoiContainer 
                            labels={({ datum }) => `Fase: ${datum.y.toPrecision(2)}° \n Frequência: ${datum.x.toPrecision(2)} rad/s `  }/>} 
                >
                    
                    <VictoryLine 
                    data={phase} style={{ data:{ stroke: "#378bec"}}} 
                    />
                    
                    <VictoryAxis dependentAxis label="Phase (º)" 
                        axisLabelComponent={<VictoryLabel dy={-30}/>} 
                        style={{grid:{stroke: ({ tick }) => "grey"}}} 
                    /> 
                    
                    <VictoryAxis  label="Frequência (rad/s)" 
                        axisLabelComponent={<VictoryLabel dy={5}/>}  orientation="bottom" 
                        style={{grid:{stroke: ({ tick }) => "grey"}}} 
                        tickFormat={(t) => Number.isInteger(Math.log10(t)) ? t: ''} 
                    /> 
                </VictoryChart>

            </div>
        </div>


    )

}
export default BodeDiagram
