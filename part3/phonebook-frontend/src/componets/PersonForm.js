import personService from '../services/persons'

const PersonForm = ({
    newName,
    newNum,
    persons,
    setPersons,
    setNewName,
    setNewNum,
    setDisplayMessage,
    setMessageStyle,
    handleNameChange,
    handleNumChange}) => {

    const addPerson = event => {
        event.preventDefault()
        const personObject = {
          name: newName,
          number: newNum,
          id: persons.length + 1
        }
        // console.log(persons.filter(person=>person.name === newName))
        if (persons.find(person => person.name === newName)) {
            const personAlreadyAdded = persons.filter(person=>person.name === newName)
            const answer = window.confirm( newName + ' is already added to phonebook, shall we replace the old number')
            if (answer) {
                updatePersons(personAlreadyAdded, newNum)
            }
        }
        else {
            addNewPerson(personObject)
        }
    }

    const addNewPerson = (personObject) => {
        personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessageStyle(true)
          setDisplayMessage('Added ' + newName)
          setNewName('')
          setNewNum('')
        })
        .catch(error => {
            setDisplayMessage(error.response.data.error)
            setMessageStyle(false)
            setTimeout(() => {
                setDisplayMessage(null)
            }, 3500)
        })
    }

    const updatePersons = (person, number) => {
        personService
        .update(person[0].id, person[0], number)
        .then(returnedPerson => {
            setPersons(persons.map(eachPerson =>
                eachPerson.id !== person[0].id ? eachPerson: returnedPerson
            ))
        })
        .catch(error => {
            setDisplayMessage(error.response.data.error)
            setMessageStyle(false)
            setTimeout(() => {
                setDisplayMessage(null)
            }, 3500)
        })
    }
    
    return (
        <form onSubmit={addPerson}>
            <div>
            name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
            number: <input value={newNum} onChange={handleNumChange} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
};

export default PersonForm