import dayjs from 'dayjs';
import React, { useState } from 'react'
import { generateDate, months } from './func/calendar';
import cn from './func/cn';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function App() {

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate)

  return (
    <div className="flex w-1/2 h-screen mx-auto items-center gap-8">
    <div className="w-96 h-96">
      <div className='flex justify-between font-semibold'>
        <h1>
          {months[today.month()]}, {today.year()}
        </h1>
        <div className="flex items-center gap-4">
          <GrFormPrevious className='h-5 w-5 mt-0.5 cursor-pointer' onClick={() => {
            setToday(today.month(today.month() - 1));
          }}/>
          <h1 className='cursor-pointer' onClick={() => {
            setToday(currentDate);
          }}>Today</h1>
          <GrFormNext className='h-5 w-5 mt-1 cursor-pointer' onClick={() => {
            setToday(today.month(today.month() + 1))
          }}/>
        </div>
      </div>
      <div className="w-full grid grid-cols-7 text-gray-500">
      {days.map((day, index) => {
        return (
          <h1 key={index} className="h-14 grid place-content-center text-sm">{day}</h1>
        )
      })}
    </div>
    <div className="w-full grid grid-cols-7">
      {generateDate(today.month(), today.year()).map(({date, currentMonth, today}, index) => {
        return (
          <div key={index} className="h-14 border-t grid place-content-center text-sm">
            <h1 className={cn(
                currentMonth?"hover:bg-black hover:text-white transition-shadow":"text-gray-400 ",
                today?"bg-blue-700 text-white font-semibold":"",
                "h-10 w-10 grid place-content-center rounded-full cursor-pointer",
                selectDate.toDate().toDateString() === date.toDate().toDateString()?"bg-black text-white":" ",
            )}
            onClick={() => {
              setSelectDate(date)
            }}
            >
                {date.date()}
            </h1>
          </div>
        )
      })}
    </div>
    </div>
    <div className="h-96 w-96 mt-8">
      <h1 className='font-semibold'>Schedule for {selectDate.toDate().toDateString()}</h1>
      <p>No meetings for today.</p>
    </div>
    </div>
  )
}
