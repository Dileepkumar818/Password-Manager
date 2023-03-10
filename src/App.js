import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const ListItems = props => {
  const {item, onDelete, isChecked} = props
  const {id, web, user, pass} = item

  const deleteItem = () => {
    onDelete(id)
  }

  return (
    <li className="list-item">
      <div>
        <p className="initial">{web[0]}</p>
        <div>
          <p>{web}</p>
          <p>{user}</p>
          {isChecked ? (
            <p>{pass}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="image-star"
            />
          )}
        </div>
      </div>
      <button
        data-testid="delete"
        onClick={deleteItem}
        className="delete-button"
        type="button"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="button-image"
        />
      </button>
    </li>
  )
}

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
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-image"
        />
        <div className="input-manager">
          <div className="input-container">
            <h1 className="head">Add New Password</h1>
            <form className="form-container" onSubmit={this.addList}>
              <div className="input">
                <label htmlFor="website" className="label">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="image"
                  />
                </label>
                <input
                  id="website"
                  type="text"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.onWebsite}
                  className="inputEl"
                />
              </div>
              <div className="input">
                <label htmlFor="username" className="label">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="image"
                  />
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.onUsername}
                  className="inputEl"
                />
              </div>
              <div className="input">
                <label className="label" htmlFor="password">
                  <img
                    className="image"
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
                  className="inputEl"
                />
              </div>
              <button className="addButton" type="submit">
                Add
              </button>
            </form>
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="input-image"
            />
          </div>
        </div>
        <div className="password-container">
          <div className="password-search">
            <div className="passCount">
              <h1>Your Passwords</h1>
              <p className="count">{listCount}</p>
            </div>
            <div>
              <label className="label" htmlFor="search">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="image"
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
              <div className="no-pass">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="input-image"
                />
                <p>No Passwords</p>
              </div>
            ) : (
              <ul className="list-container">
                {filteredList.map(each => (
                  <ListItems
                    key={each.id}
                    item={each}
                    isChecked={isChecked}
                    onDelete={this.onDelete}
                  />
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
