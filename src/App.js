import { useEffect, useState } from 'react'
import './App.css'

const btns = [7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', '.', 0, '=', '+']

const initialStates = {
 firstNum: '',
 nextNum: '',
 operator: '',
}

function App() {
 //ALL STATES

 const [states, setStates] = useState(initialStates)
 const [isFirstEntry, setIsFirstEntry] = useState(true)
 const [result, setResult] = useState('')
 const [equalResult, setEqualResult] = useState(0)
 const [progress, setProgress] = useState('')
 const [checked, setChecked] = useState(false)
 const [background, setBackground] = useState({})

 //MAIN DATA OPERATION FUNCTION

 const operate = (firstNum, operator, nextNum) =>
  eval(`${firstNum}${operator}${nextNum}`)

 //THEME SWITCH

 const toggleHandler = (e) => setChecked(!checked)

 useEffect(() => {
  return checked ? setBackground({ background: 'white' }) : setBackground({})
 }, [checked])

 //OPERATIONS MAIN HANDLER

 const btnHandler = (e) => {
  const value = e.target.innerHTML
  const isNumber = value === '.' ? true : !isNaN(value)

  //PROGRESS DATA LOGIC

  !equalResult ? setProgress((prev) => prev + value) : setProgress(value)

  //NOT RESULT EXISTS OPERATIONS

  if (result === '') {
   setEqualResult(0)

   if (isNumber && states.operator === '=') {
    setStates(initialStates)
    setProgress('')
    setResult('')
   }
   if (isNumber && isFirstEntry)
    setStates({ ...states, firstNum: states.firstNum + value })

   if (!isNumber && isFirstEntry) {
    setStates({ ...states, operator: value })
    setIsFirstEntry(!isFirstEntry)
   }

   if (isNumber && !isFirstEntry)
    setStates({ ...states, nextNum: states.nextNum + value })

   if (!isNumber && !isFirstEntry) {
    setResult(operate(states.firstNum, states.operator, states.nextNum))
    setStates({ firstNum: '', nextNum: '', operator: value })
    setIsFirstEntry(!isFirstEntry)
   }

   if (value === '=') {
    setResult('')
    setEqualResult(operate(states.firstNum, states.operator, states.nextNum))
    setStates(initialStates)
   }

   //IS RESULT EXISTS OPERATIONS
  } else {
   if (isNumber && states.operator === '=') {
    setProgress('')
    setResult('')
   }

   if (isNumber && value !== '=')
    setStates({ ...states, nextNum: states.nextNum + value })

   if (!isNumber) {
    setResult(operate(result, states.operator, states.nextNum))
    setStates({ ...states, operator: value, nextNum: '' })
   }

   if (value === '=') {
    setResult('')
    setEqualResult(operate(result, states.operator, states.nextNum))
    setStates(initialStates)
   }
  }
 }

 return (
  <div className='container' style={background}>
   <div className='calculator'>
    <div className='calculator-theme'>
     <label className='switch'>
      <input type='checkbox' checked={checked} onChange={toggleHandler} />
      <div className='slider'></div>
     </label>
    </div>
    <div className='calculator-display'>
     <div className='progress'>{progress}</div>
     <div className='result'>{!result ? equalResult : result}</div>
    </div>
    <div className='calculator-btns-wrapper'>
     {btns.map((btn, index) => (
      <div className='btns' onClick={btnHandler} key={index}>
       {btn}
      </div>
     ))}
    </div>
   </div>
  </div>
 )
}

export default App
