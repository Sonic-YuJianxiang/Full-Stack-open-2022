import '../index.css'

const Notification = ({ notification, displayStyle }) => {

  if (notification === null){
    return null
  }

  let className = displayStyle ? 'green' : 'red'
  return (
    <div className={className}>
      {notification}
    </div>
  )
}

export default Notification