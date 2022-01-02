import React from 'react'

export const timeChecker = (DepositDueDate) => {
  const date = DepositDueDate.toDate().toDateString()
  const time = DepositDueDate.toDate().toLocaleTimeString()
  var CurrentDate = new Date()
  var GivenDate = new Date(`${date} ${time}`)

  return GivenDate > CurrentDate;
}

export default function Timer({ DepositDueDate }) {
  const date = DepositDueDate.toDate().toDateString()
  const time = DepositDueDate.toDate().toLocaleTimeString()

  return (
    <p style={{ textAlign: 'center' }}>
      <span style={{ fontWeight: 'bold', color: 'cyan' }}> Due on:</span> {date}{' '}
      by {time}
    </p>
  )
}

// import React, { useState, useEffect, useRef } from 'react'

// export default function Timer({ DepositVerified, DepositDueDate }) {
//   const [status, setStatus] = useState(false)
//   const [minutes, setMinutes] = useState(0)
//   const [hours, setHours] = useState(0)
//   const [days, setDays] = useState(0)
//   const [secs, setSecs] = useState(0)
//   const [stoppedAt, setStoppedAt] = useState(new Date().toLocaleString())

//   // getCurrent time
//   const currentTime = Date.now()

//   useEffect(
//     () => DepositVerified && setStatus(true),
//     [DepositVerified, currentTime]
//   )

//   const dateTime = new Date().toLocaleString()
//   const secondsRemaining = Math.floor(DepositDueDate - currentTime)

//   useInterval(
//     () => {
//       // define time values
//       const sec = 1000
//       const min = 60 * sec
//       const hr = 60 * min
//       const day = 24 * hr
//       if (secondsRemaining > 0) {
//         // get Remaining time
//         const rDays = (DepositDueDate - currentTime) % day
//         const rHrs = rDays % hr
//         const rMins = rHrs % min

//         // Define Time to display
//         const days = Math.floor((DepositDueDate - currentTime) / day)
//         const hrs = Math.floor(rDays / hr)
//         const mins = Math.floor(rHrs / min)
//         const secs = Math.floor(rMins / sec)
//         setDays(days)
//         setHours(hrs)
//         setMinutes(mins)
//         setSecs(secs)
//       }
//     },
//     status ? 1000 : null
//   )

//   function useInterval(callback, delay) {
//     const savedCallback = useRef()

//     // Remember the latest callback.
//     useEffect(() => {
//       savedCallback.current = callback
//     }, [callback])

//     // Set up the interval.
//     useEffect(() => {
//       function tick() {
//         savedCallback.current()
//       }
//       if (secondsRemaining <= 0) {
//         setStatus(false)
//         return setStoppedAt(dateTime)
//       } else if (delay !== null) {
//         let id = setInterval(tick, delay)
//         return () => clearInterval(id)
//       }
//     }, [delay])
//   }

//   const twoDigits = (num) => String(num).padStart(2, '0')

//   if (status) {
//     return (
//       <p style={{ textAlign: 'center' }}>
//         <span style={{ fontWeight: 'bold', color: '#0393cc' }}>TimeLeft:</span>{' '}
//         {days > 0 && (
//           <>
//             <span style={{ fontWeight: 'bold' }}>{twoDigits(days)}</span>
//             <span>:days</span>
//           </>
//         )}
//         <span style={{ fontWeight: 'bold' }}>{twoDigits(hours)}</span>
//         hrs: <span style={{ fontWeight: 'bold' }}>{twoDigits(minutes)}</span>
//         mins: <span style={{ fontWeight: 'bold' }}>{twoDigits(secs)}</span>
//         secs
//       </p>
//     )
//   }

//   return (
//     <p style={{ textAlign: 'center' }}>
//       <span style={{ fontWeight: 'bold', color: '#0393cc' }}> Due on:</span>{' '}
//       {stoppedAt}
//     </p>
//   )
// }
