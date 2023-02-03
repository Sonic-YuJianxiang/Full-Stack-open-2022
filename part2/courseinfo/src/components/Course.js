import React from "react"

const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => 
                <Part key={part.id} name={part.name} exercises={part.exercises}/>
            )}
        </div>
    )
}

const Part = ( {name, exercises} ) => {
    return (
        <div>
            <p>
                {name} {exercises}
            </p>
        </div>
    )
}

const Total = ({ parts }) => {
    return (
      <h3>total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises</h3>
    )
  }

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;