import React from 'react'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryVoronoiContainer } from 'victory'
import CheckBounds from './CheckBounds'

const StepCLTemplate = ({data}) => {

    console.log('stepCLT: ', data)
    let data_cl = [];
    let overshoot = [], peakMax = [];
    let tr = [], ts = [], tp = [];
    let trMax = [], tsMax = [], tpMax = [];
    let steadyState = [], steadyStateInfBounds = [], steadyStateSupBounds = [];

    if(data){
        const input_data = data.dataStorage
        const specifications = data.inputs

        const strToArray = (text) => {
            let array = []
            let value
            let myStr = text.split(',')
            for (let i = 0; i < myStr.length; i++){
                value = parseFloat(myStr[i])
                if(!isNaN(value)){
                    array.push(value)
                }
                continue
            }
            return array
        }

        const x_cl = strToArray(input_data.x_axis_cl)
        const y_cl = strToArray(input_data.y_axis_cl)

        x_cl.forEach((element, index) => {
            data_cl[index] = {"x": element, "y": y_cl[index]};
        });

        const Overshoot = parseFloat(input_data.overshoot)
        const PeakTime = parseFloat(input_data.peakTime)
        const SteadyStateValue = parseFloat(input_data.steadyStateValue)
        const Peak = parseFloat(input_data.peak)
        const RiseTime = parseFloat(input_data.riseTime)
        const SettlingTime = parseFloat(input_data.settlingTime)
        const Yss = parseFloat(input_data.yss)

        const maxOvershoot = parseFloat(specifications.overshoot)
        const maxPeakTime = parseFloat(specifications.peakTime)
        const maxRiseTime = parseFloat(specifications.riseTime)
        const maxSettlingTime = parseFloat(specifications.settlingTime)
        const varSteadyState = parseFloat(specifications.varSteadyState)
        const maxPeak = Yss * maxOvershoot / 100 + Yss
        const sup_margin = (1. + varSteadyState / 100) * Yss 
        const inf_margin = (1. - varSteadyState / 100) * Yss 

        const checkSupLimit = (value,maxValue) => {
            let sucesso = false
            if(value <= maxValue){
                sucesso = true
            }
            return sucesso
        }

        const checkYss = (InfValue, inf_margin, sup_margin) => {
            let sucesso = false

            if(InfValue >= inf_margin && InfValue <= sup_margin){
                sucesso = true
            }

            return sucesso
        }

        const sucesso_ts = checkSupLimit(SettlingTime, maxSettlingTime)
        const sucesso_tp = checkSupLimit(PeakTime, maxPeakTime)
        const sucesso_tr = checkSupLimit(RiseTime, maxRiseTime)
        const sucesso_overshoot = checkSupLimit(Peak, maxPeak)
        const sucesso_yss = checkYss(SteadyStateValue, inf_margin, sup_margin)

        console.log(sucesso_yss,sucesso_overshoot,sucesso_tp,sucesso_tr, sucesso_ts)

        overshoot = Overshoot !== 0?[
            {"x": PeakTime, "y": SteadyStateValue, label:`M = ${Overshoot.toPrecision(3)} %`},
            {"x": PeakTime, "y": Peak}
        ]:[]

        steadyState = [
            {"x": 0,"y": SteadyStateValue,label: "valor estacionário"},
            {"x": data_cl[data_cl.length - 1].x,"y": SteadyStateValue},
        ]
        tr = [
            {"x": RiseTime, "y": 0, label: "tr"},
            {"x": RiseTime, "y": SteadyStateValue}
        ]
        ts = [
            {"x": SettlingTime, "y": 0, label: "ts"},
            {"x": SettlingTime, "y": SteadyStateValue}
        ]
        tp = [
            {"x": PeakTime, "y": 0, label: "tp"},
            {"x": PeakTime, "y": Peak}
        ]

        peakMax = Overshoot !== 0?[
            {"x": 0, "y": maxPeak},
            {"x": maxSettlingTime, "y": maxPeak}
        ]:[]

        steadyStateInfBounds = [
            {"x": maxSettlingTime,"y": inf_margin},
            {"x": data_cl[data_cl.length - 1].x,"y": inf_margin},
           
        ]
        steadyStateSupBounds = [
            {"x": maxSettlingTime,"y": sup_margin},
            {"x": data_cl[data_cl.length - 1].x,"y": sup_margin},
        ]
        trMax = [
            {"x": maxRiseTime, "y": 0, label: "tr max"},
            {"x": maxRiseTime, "y": Yss}
        ]
        tsMax = maxSettlingTime <= data_cl[data_cl.length - 1].x?[
            {"x": maxSettlingTime, "y": 0, label: "ts max"},
            {"x": maxSettlingTime, "y": maxPeak}
        ]:[]
        tpMax = [
            {"x": maxPeakTime, "y": 0, label: "tp max"},
            {"x": maxPeakTime, "y": maxPeak}
        ]
        
    }

    return (
        <>
        <div className="stepCLT">
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
                <VictoryLine
                    data = {peakMax}
                    style={{ data: { stroke: "black", 
                                        strokeWidth: 4}}
                    }
                    labelComponent={
                        <VictoryLabel
                            textAnchor='end'
                            //dy={0}
                            //dx={46}
                            style={[
                                { fontSize: 10, fill: 'purple', fontStyle: 'italic' }
                            
                            ]}
                        />
                    }
                />
                <VictoryLine
                    data = {tpMax}
                    style={{ data: { stroke: "black", 
                                        strokeWidth: 2, 
                                        strokeDasharray: "2,2"}}
                    }
                    labelComponent={
                        <VictoryLabel
                            textAnchor='end'
                            //dx={11}
                            //dy={147}
                            style={[
                                { fontSize: 10, fill: 'black', fontStyle: 'italic' }
                            
                            ]}
                        />
                    }
                />
                <VictoryLine
                    data = {trMax}
                    style={{ data: { stroke: "black", 
                                        strokeWidth: 2, 
                                        strokeDasharray: "2,2"}}
                    }
                    labelComponent={
                        <VictoryLabel
                            textAnchor='end'
                            //dx={11}
                            //dy={147}
                            style={[
                                { fontSize: 10, fill: 'black', fontStyle: 'italic' }
                            
                            ]}
                        />
                    }
                />
                <VictoryLine
                    data = {tsMax}
                    style={{ data: { stroke: "black", 
                                        strokeWidth: 2, 
                                        }}
                    }
                    labelComponent={
                        <VictoryLabel
                            textAnchor='end'
                            //dx={11}
                            //dy={147}
                            style={[
                                { fontSize: 10, fill: 'black', fontStyle: 'italic' }
                            
                            ]}
                        />
                    }
                />
                <VictoryLine
                    data = {steadyStateInfBounds}
                    style={{ data: { stroke: "purple", 
                                        strokeWidth: 1}}
                    }
                    labelComponent={
                        <VictoryLabel
                            textAnchor='end'
                            //dy={0}
                            //dx={46}
                            style={[
                                { fontSize: 10, fill: 'purple', fontStyle: 'italic' }
                            
                            ]}
                        />
                    }
                />
                <VictoryLine
                    data = {steadyStateSupBounds}
                    style={{ data: { stroke: "purple", 
                                        strokeWidth: 1}}
                    }
                    labelComponent={
                        <VictoryLabel
                            textAnchor='end'
                            //dy={0}
                            //dx={46}
                            style={[
                                { fontSize: 10, fill: 'purple', fontStyle: 'italic' }
                            
                            ]}
                        />
                    }
                />
            </VictoryChart>

        </div>
        </>
    )
}

export default StepCLTemplate
