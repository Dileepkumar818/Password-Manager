import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    isChecked: false,
    search: '',
  }

  onWebsite = event => {
    this.setState({website: event.target.value})
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  addList = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const listItem = {id: v4(), web: website, user: username, pass: password}
    this.setState(prev => ({
      passwordList: [...prev.passwordList, listItem],
      website: '',
      username: '',
      password: '',
    }))
  }

  checkList = () => {
    this.setState(prev => ({isChecked: !prev.isChecked}))
  }

  searchItem = event => {
    this.setState({search: event.target.value})
  }

  onDelete = id => {
    const {passwordList} = this.state
    const lists = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: lists})
    console.log('clicked')
  }

  render() {
    const {
      passwordList,
      website,
      username,
      password,
      isChecked,
      search,
    } = this.state

    const filteredList = passwordList.filter(each =>
      each.web.toLowerCase().includes(search.toLowerCase()),
    )
    const listCount = filteredList.length
    return (
      <div className="bg-conatainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div>
          <div>
            <h1>Add New Password</h1>
            <form onSubmit={this.addList}>
              <label htmlFor="website">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
              </label>
              <input
                id="website"
                type="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.onWebsite}
              />
              <label htmlFor="username">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={this.onUsername}
              />
              <label htmlFor="password">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.onPassword}
              />
              <button type="submit">Add</button>
            </form>
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>
        <div>
          <div>
            <div>
              <h1>Your Passwords</h1>
              <p>{listCount}</p>
            </div>
            <div>
              <label htmlFor="search">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
              </label>
              <input
                value={search}
                id="search"
                type="search"
                onChange={this.searchItem}
              />
            </div>
          </div>
          <hr />
          <input id="check" type="checkbox" onClick={this.checkList} />
          <label htmlFor="check">Show passwords</label>
          <div>
            {listCount === 0 ? (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p>No Passwords</p>
              </div>
            ) : (
              <ul>
                {filteredList.map(each => (
                  <li key={each.id}>
                    <div>
                      <p>{each.web[0]}</p>
                      <div>
                        <p>{each.web}</p>
                        <p>{each.user}</p>
                        {isChecked ? (
                          <p>{each.pass}</p>
                        ) : (
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                            alt="stars"
                          />
                        )}
                      </div>
                    </div>
                    <button
                      data-testid="delete"
                      onClick={this.onDelete}
                      type="button"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
