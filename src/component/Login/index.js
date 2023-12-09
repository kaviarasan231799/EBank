import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', isSuccess: false, empty: ''}

  onChangeUser = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  success = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  fail = empty => {
    this.setState({isSuccess: true, empty})
  }

  onBankSubmit = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.success(data.jwt_token)
    } else {
      this.fail(data.error_msg)
    }
  }

  render() {
    const {userId, pin, isSuccess, empty} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="inside-container">
          <div className="bank-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-login-img"
            />
          </div>
          <form className="form-container" onSubmit={this.onBankSubmit}>
            <h1 className="heading">Welcome Back!</h1>
            <div className="input-container">
              <label htmlFor="userId" className="userId-input">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                className="input-userId"
                value={userId}
                onChange={this.onChangeUser}
              />
              <label htmlFor="pin" className="userId-input">
                PIN
              </label>
              <input
                type="password"
                id="pin"
                className="input-userId"
                value={pin}
                onChange={this.onChangePin}
              />
              <button className="button" type="submit">
                Login
              </button>
              <div className="error-container">
                {isSuccess === true && (
                  <p className="invalid-container">{empty}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
