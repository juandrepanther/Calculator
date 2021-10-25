import { useState } from 'react'
import './App.css'

const btns = [7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', '.', 0, '=', '+']

const initialStates = {
 firstNum: '',
 nextNum: '',
 operator: '',
}

function App() {
 const [states, setStates] = useState(initialStates)
 const [isFirstEntry, setIsFirstEntry] = useState(true)
 const [result, setResult] = useState('')
 const [equalResult, setEqualResult] = useState(0)
 const [progress, setProgress] = useState('')

 const operate = (firstNum, operator, nextNum) =>
  eval(`${firstNum}${operator}${nextNum}`)

 const btnHandler = (e) => {
  const value = e.target.innerHTML
  const isNumber = value === '.' ? true : !isNaN(value)

  !equalResult ? setProgress((prev) => prev + value) : setProgress(value)

  //notResult Exists Operations
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
    console.log('equal value')
    setResult('')
    setEqualResult(operate(states.firstNum, states.operator, states.nextNum))
    setStates(initialStates)
   }

   //isResultExist Operations
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
    console.log('result')
    setStates(initialStates)
   }
  }
 }

 return (
  <div className='container'>
   <div className='calculator'>
    <div className='calculator-theme'>
     <label className='switch'>
      <input type='checkbox' />
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
