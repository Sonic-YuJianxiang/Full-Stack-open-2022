import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return(
    <td>{text} {value}</td>
  )
}

const Statistics = ({good, neutral, bad, all, getAverage, getPositive}) => {
  return(
    <tbody>
      <tr><StatisticLine text="good" value={good}/></tr>
      <tr><StatisticLine text="neutral" value={neutral}/></tr>
      <tr><StatisticLine text="bad" value={bad}/></tr>
      <tr><StatisticLine text="all" value={all}/></tr>
      <tr><StatisticLine text="average" value={getAverage}/></tr>
      <tr><StatisticLine text="positive" value={getPositive}/></tr>
    </tbody>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const increaseGood = () =>{
    setGood(good + 1)
    setAll(all + 1)
  }

  const increaseNeutral = () =>{
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const increaseBad = () =>{
    setBad(bad + 1)
    setAll(all + 1)
  }

  const getAverage = () => all ? (good-bad)/all : all

  const getPositive = () => good ? good*100/all + '%' : good
  

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={increaseGood} text="good"/>
      <Button handleClick={increaseNeutral} text="neutral"/>
      <Button handleClick={increaseBad} text="bad"/>
      <h2>statistics</h2>
      {all === 0 ? (
        'Empty Feedback'
      ):(
        <table>
          <Statistics good={good} neutral={neutral} bad={bad} all={all} getAverage={getAverage()} getPositive={getPositive()} />
        </table>
      )}
    </div>
  )
}

export default App;
