import Person from "./Person"

const Persons = ({personsFiltered, setPersons, setDisplayMessage, setMessageStyle}) => {
    return (
        <ul>
            {personsFiltered.map(person =>
                <Person
                    key={person.id}
                    person = {person}
                    setPersons = {setPersons}
                    persons = {personsFiltered}
                    setDisplayMessage = {setDisplayMessage}
                    setMessageStyle = {setMessageStyle}
                />
            )}
        </ul>
    )
};
export default Persons