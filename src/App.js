import { useState } from 'react';
import left_arrow from './assests/reshot-icon-arrow-left-CYVEH429PZ.svg';
import right_arrow from './assests/reshot-icon-arrow-chevron-right-WDGHUKQ634.svg';

const daysOfWeek=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const months=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
function App() {
  const [selectedDate,setSelectedDate] =useState(new Date());


  //color for current date
  const isSameDay=(date1,date2)=>
  {
      return date1.getDate()===date2.getDate() && date1.getMonth()===date2.getMonth() && date1.getFullYear()===date2.getFullYear();
  }
  const handleChangeMonth=(e)=>
  {
    const newMonth=parseInt(e.target.value,10) //,10 for integer conversion
    setSelectedDate(new Date(selectedDate.getFullYear(),newMonth,1));
  }

  const handleChangeYear=(e)=>
  {
    const newYear=parseInt(e.target.value,10);
    setSelectedDate(new Date(newYear,selectedDate.getMonth(),1));
  }
  const daysInMonth=()=>
  {
      const daysArray=[];
      const firstDay= new Date(selectedDate.getFullYear(),selectedDate.getMonth(),1); //get the first day
      const lastDay= new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,0); //get the last day

      //pushing the null values before the starting date if it is empty
      //example=> if month start from friday before that we want to push null values
      for(let i=0;i<firstDay.getDay();i++){
          daysArray.push(null);
      }


      //pushing the date values from the starting date 
      //example=> if month start from friday that we want to push in array .. i=> date
      for(let i=1;i<=lastDay.getDate();i++){
        daysArray.push(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),i));
      }
      // console.log(firstDay); testing
      // console.log(lastDay); testing
      return daysArray;
  }
  // daysInMonth(); testing
  return (
    <>
      <div className="calendar">
          <div className="header">
              <button onClick={()=>{setSelectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-1,1))}}>
                  <img src={left_arrow}/>
              </button>
              <select value={selectedDate.getMonth()} onChange={handleChangeMonth}>
                 {
                  months.map((month,index)=>(
                    <option key={index} value={index}>{month}</option>
                  ))
                 } {/* for mapping the month in option from today*/}
              </select>

              {/* for month 10 years*/}
              <select value={selectedDate.getFullYear()} onChange={handleChangeYear}>
                {
                  Array.from({length:10}, (_,i)=>selectedDate.getFullYear()-5+i).map((year)=>(
                    <option key={year} value={year}> 
                      {year}</option>
                  ))
                }
              </select>

              <button onClick={()=>{setSelectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,1))}}>
                  <img src={right_arrow}/>
              </button>
          </div>
          <div className='daysOfWeek'>
              {
                daysOfWeek.map((day)=>
                (
                  <div key={day}>{day}</div>
                ))
              }
          </div>
          <div className='days'>
              {
                daysInMonth().map((day,index)=>(
                  <div key={index} className={day?(isSameDay(day,new Date()))?"day current":"day": "empty"}>
                    {day?day.getDate():""}
                  </div>
                ))
              }
          </div>
      </div>

    </>
  );
}

export default App;
