import Die from './components/Die'
import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  function generateNewDie() {
    return {
        value: Math.floor((Math.random() * 6) + 1),
        isHeld: false,
        id: nanoid()
    }
}
  
  function allNewDice() {
    const arrNum = []
    for (let i = 0; i < 10; i++) { // dont use ceil
      arrNum.push(generateNewDie())
    }
    return arrNum
  }

  const diceElements = dice.map(dieVal => {
    const { value, isHeld, id } = dieVal
    return (
    <Die
      key={id}
      value={value}
      isHeld={isHeld}
      handleClick={() => holdDice(id)}
    />
  )})

  function rollDice() {
    setDice(dice.map( oldDie => {
      return oldDie.isHeld === false ? generateNewDie() : oldDie // must put the spread first
      // return oldDie.isHeld === false ? { ...oldDie, value: Math.floor((Math.random() * 6) + 1), id: nanoid() } : oldDie // must put the spread first
    }))
  }

  function holdDice(id) {
    setDice(dice.map( oldDie => {
      return oldDie.id === id ? { ...oldDie, isHeld: !oldDie.isHeld } : oldDie // must put the spread first
    }))
    // console.log(dice)
  }

  useEffect(() => { // useEffect to keep two internal states in sync 
    
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allEqual = dice.every(die => die.value === firstValue) 
    if (allEqual && allHeld) {
        setTenzies(true)
    }
    // let checkArray = []
    // for (let i = 0; i < dice.length; i++) {
    //   let currentDie = dice[i]
    //   if (currentDie.isHeld == true) {
    //     checkArray.push(currentDie.value)
    //   }
    // }
    // const allEqual = arr => arr.every(val => val === arr[0])
    // if (allEqual(checkArray) && checkArray.length == 10) {
    //   setTenzies(true)
    // }
  }, [dice])
  // console.log(tenzies)
  // function holdDice(id) {
  //   setDice(oldDice => oldDice.map(die => {
  //       return die.id === id ? 
  //           {...die, isHeld: !die.isHeld} :
  //           die
  //   }))
  // }

  function newGame() {
    setDice(allNewDice())
    setTenzies(!tenzies)
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <h2>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h2>
      <div className='main--dice-container'>
        {diceElements}
      </div>
      <button className='roll-button' onClick={tenzies ? newGame : rollDice}>{tenzies ? "New Game": "Roll"}</button>
    </main>
  )
}

export default App
