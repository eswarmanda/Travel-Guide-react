import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

class App extends Component {
  state = {
    list: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getDataFromTravelGuide()
  }

  getDataFromTravelGuide = async () => {
    const url = `https://apis.ccbp.in/tg/packages`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({list: data.packages, isLoading: false})
    }
  }

  render() {
    const {list, isLoading} = this.state

    return (
      <div className="main-card">
        <div className="travel-card">
          <h1>Travel Guide</h1>
          <div>
            {isLoading ? (
              <div className="loader" data-testid="loader">
                <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={50}
                  width={50}
                />
              </div>
            ) : (
              <ul className="un-order-list">
                {list.map(eachItem => (
                  <li key={eachItem.id} className="list-item">
                    <img
                      className="img"
                      src={eachItem.image_url}
                      alt={eachItem.name}
                    />
                    <h2>{eachItem.name}</h2>
                    <p>{eachItem.description}</p>
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
