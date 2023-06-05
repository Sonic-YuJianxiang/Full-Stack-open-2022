import PropTypes from 'prop-types'

const LoginForm = ({ loginHandle, userName, passWord, setUserName, setPassWord }) => {

  return (
    <form onSubmit={loginHandle}>
      <div>
          username
        <input
          type="text"
          value={userName}
          id="username"
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
          password
        <input
          type="password"
          value={passWord}
          id="password"
          name="Password"
          onChange={({ target }) => setPassWord(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )

}

LoginForm.propTypes = {
  loginHandle: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  setPassWord: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  passWord: PropTypes.string.isRequired
}

export default LoginForm