import React from 'react';
import BarChart from './BarChart.jsx';
import AreaChart from './AreaChart.jsx';
import { useState } from 'react';
import Wrapper from '../assets/wrappers/ChartsContainer.js';


const ChartsContainer = ({monthlyJobStats}) => {

    const [barChart,setBarChart] = useState(true);

   return(
    <Wrapper>
        <h4>Monthly Applications</h4>
        <button type='button' onClick={() => setBarChart(!barChart)}>
            {barChart? 'Area Chart' : 'Bar Chart'}
        </button>
        {barChart ? <BarChart monthlyJobStats={monthlyJobStats}></BarChart> : <AreaChart monthlyJobStats={monthlyJobStats}></AreaChart>}
    </Wrapper>
      )
}


export default ChartsContainer;
