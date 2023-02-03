const Notification = ({ message, style }) => {
    // if (message === null) {
    //     return null
    // }
    let className = style ? 'green' : 'red'
    return (
        <div className={className}>
        {message}
        </div>
    )
};

export default Notification