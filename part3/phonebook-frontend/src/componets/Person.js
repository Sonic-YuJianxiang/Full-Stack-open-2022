import personService from '../services/persons'

const Person = ({ person, setPersons, persons, setDisplayMessage, setMessageStyle }) => {
  const handleClick = () => {
    const answer = window.confirm(`Delete ${person.name} ?`)
    if (answer){
      handleDelete()
    }
  }

  const handleDelete = () => {
    personService
      .deletePerson(person.id)
      .then(returnedPerson => {
        setPersons(persons.filter(eachPerson=>eachPerson.id !== person.id))
      })
      .catch(error => {
        setPersons(persons.filter(eachPerson=>eachPerson.id !== person.id))
        setMessageStyle(false)
        setDisplayMessage(`the number of ${person.name} was already deleted from server`)
      })
      setTimeout(() => {
        setDisplayMessage(null)
      }, 3500)
  }

    return (
      <li>
        {person.name} {person.number}
        <button  onClick={handleClick}>delete</button>
      </li>
    )
  };
  
  export default Person