import logo from './logo.svg';
import './App.css';

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.course.parts[0].name} exercise={props.course.parts[0].exercises}/>
      <Part part={props.course.parts[1].name} exercise={props.course.parts[1].exercises}/>
      <Part part={props.course.parts[2].name} exercise={props.course.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises { props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
  )
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Usign props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </div>
  )
}

export default App;
