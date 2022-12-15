import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)

  const getRandomNum = () => {
    setSelected(Math.floor(Math.random() * 7))
  }

  const points = new Array(anecdotes.length).fill(0)

  const [votes, setVotes] = useState([...points])
  const [maxVoted, setMaxVoted] = useState("")

  const voteAnecdote = () => {
    // votes[selected] += 1
    votes[selected] = votes[selected] + 1
    setVotes([...votes])
    setMaxVoted(votes.indexOf(Math.max(...votes)))
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={getRandomNum} text="next anecdote" />
      <Button handleClick={voteAnecdote} text="vote" />
      <h2>Anecdote with most votes</h2>
      {Math.max(...votes)===0 ? '': (<div>
        <p>Anecdote has most votes: {anecdotes[maxVoted]}</p>
        <p>It has {votes[maxVoted]} votes</p>
      </div>)}
    </div>
  )
}

export default App;
