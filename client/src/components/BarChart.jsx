import React from 'react';
import{
   BarChart,
   XAxis,
   YAxis,
   Tooltip,
   Bar,
   CartesianGrid,
   ResponsiveContainer
} from 'recharts';

const BarChartComponent = ({data}) => {
return(
   <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} margin={{top:50}}>
         <CartesianGrid strokeDasharray='3 3'/>
         <XAxis dataKey='date'/>
         <YAxis allowDecimals={false}/>
         <Tooltip/>
         <Bar dataKey='count' fill='#2cb1bc' barSize={75}></Bar>
      </BarChart>
   </ResponsiveContainer>
)
}


export default BarChartComponent;
