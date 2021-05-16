import React from 'react'
import { VictoryLine, VictoryChart, VictoryScatter, VictoryAxis, VictoryLabel, createContainer} from 'victory'

const RootLocus = ({input_data}) => {
    var data = [];
    const items = [];
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
    console.log(input_data.root_real)
    console.log(input_data.root_imag)

    for (var i = 0; i < 10; i++){
        input_data.root_real.pop()
        input_data.root_gain.pop()
        input_data.root_imag.pop()
    }

    for (var i=0; i < input_data.num_poles; i++){
        data[i] = [];
        items.push(<VictoryLine key={i} data={data[i]} eventKey="" style={{ data:{ stroke: "#378bec"}}} />)
    }
    let poles = [];
   
    input_data.root_imag.forEach((element, index) => {
    for (var i=0; i < input_data.num_poles; i++){
        data[i][index] = {"x": input_data.root_real[index][i], "y": element[i]};
        poles.push({x:input_data.root_real[0][i], y:input_data.root_imag[0][i]})
    }
    });

    return (
        <div className="root-locus">        
            <VictoryChart domainPadding={10} height={250} width={350}
                containerComponent={
                    <VictoryZoomVoronoiContainer labels={({ datum, data=input_data }) => `Real: ${datum.x.toPrecision(2)}\n Imag: ${datum.y.toPrecision(2)} \n Ganho: ${data.root_gain[datum.eventKey]}\n` }/>
                }>
                <VictoryAxis label="Eixo Real" tickLabelComponent={<VictoryLabel dy={-7}/>} fixLabelOverlap={true}/>
                <VictoryAxis dependentAxis 
                />
                <VictoryLabel x={105} y={30} text="Lugar das Raízes" />
                {items}
                <VictoryScatter data={poles} symbol="plus" size={2}/> 
            </VictoryChart>
        </div>
    )


}
export default RootLocus