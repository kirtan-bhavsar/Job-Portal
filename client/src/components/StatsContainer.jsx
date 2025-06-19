import React from 'react';
import StatItem from './StatItem';
import { FaTrash,FaSuitcaseRolling,FaCalendarCheck,FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer.js'


const StatsContainer =  ({jobStats}) => {


   const statsDisplayContent = [
       {
           count:jobStats.pending || 0,
           title:'Pending applications',
           color:'#f59e0b',
           bcg:'#fef3c7',
           icon: <FaSuitcaseRolling/>
       },
       {
           count:jobStats.interview || 0,
           title:'Interviews Scheduled',
           color:'#647acb',
           bcg:'#e0e8f9',
           icon: <FaCalendarCheck/>
       },
       {
           count:jobStats.declined || 0,
           title:'Jobs declined',
           color:'#d66a6a',
           bcg:'#ffeeee',
           icon: <FaBug/>
       },
   ]


  
       return(
           <Wrapper>
              { statsDisplayContent.map((item) => {
           return <StatItem key={item.title} {...item}></StatItem>
       })}
           </Wrapper>
       )


   // return(
   //     <h1>StatsContainer</h1>
   // )


}


export default StatsContainer;


