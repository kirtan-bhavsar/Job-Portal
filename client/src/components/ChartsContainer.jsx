import React from 'react';
import BarChart from './BarChart.jsx';
import AreaChart from './AreaChart.jsx';
import { useState } from 'react';
import Wrapper from '../assets/wrappers/ChartsContainer.js';


const ChartsContainer = ({data}) => {

    const [barChart,setBarChart] = useState(true);

    console.log(data);
    console.log('data from ChartsContainer');

   return(
    <Wrapper>
        <h4>Monthly Applications</h4>
        <button type='button' onClick={() => setBarChart(!barChart)}>
            {barChart? 'Area Chart' : 'Bar Chart'}
        </button>
        {barChart ? <BarChart data={data}></BarChart> : <AreaChart data={data}></AreaChart>}
    </Wrapper>
      )
}


export default ChartsContainer;
