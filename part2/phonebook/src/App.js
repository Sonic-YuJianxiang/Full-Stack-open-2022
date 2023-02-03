import './App.css';
import { useEffect, useState } from 'react'
import Persons from './componets/Persons'
import Filter from './componets/Filter'
import PersonForm from './componets/PersonForm'
import Notification from './componets/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, setFilterName] = useState('')
  const [displayMessage, setDisplayMessage] = useState(null)
  const [ messageStyle, setMessageStyle ] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        // console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const filterByName = (event) => {
    setFilterName(event.target.value)
  }

  const personsFiltered = persons.filter(
    person => person.name.toLowerCase().includes(filterName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      {displayMessage === null ? '' : <Notification message={displayMessage} style={messageStyle}/>}
      <Filter filterName={filterName} filterByName={filterByName} />
      <PersonForm 
        newName = {newName}
        newNum = {newNum}
        persons = {persons}
        setPersons = {setPersons}
        setNewName = {setNewName}
        setNewNum = {setNewNum}
        setDisplayMessage = {setDisplayMessage}
        setMessageStyle = {setMessageStyle}
        handleNameChange = {handleNameChange}
        handleNumChange = {handleNumChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsFiltered={personsFiltered}
        setPersons={setPersons}
        setDisplayMessage = {setDisplayMessage}
        setMessageStyle = {setMessageStyle}
      />
    </div>
  )
}

export default App;
