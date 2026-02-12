import { useState } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
function CalendarUI() {
    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => {
      setDateState(e)
    }
    return (
      <div className=''>
         <style>{`
        .react-calendar__tile--now {
          background-color: yellow !important;
          color: black !important;
        }
      `}</style>
        <Calendar 
        value={dateState}
        onChange={changeDate}
        />
     
      </div>)
  
}
export default CalendarUI