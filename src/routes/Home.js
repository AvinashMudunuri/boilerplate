import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from 'components/navigation'
import { fetchJoke, rateJoke, getJoke } from 'models/jokes'
import logo from '../logo.svg'
import '../App.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.rateJoke = this.rateJoke.bind(this)
  }
  componentDidMount () {
    const { match } = this.props
    console.log(match.params)
    if (match.params.id) {
      this.props.getJoke(match.params.id)
    } else {
      this.props.fetchJoke()
    }
  }
  rateJoke (e) {
    const { current } = this.props
    const text = e.currentTarget.value
    this.props.rateJoke({id: current.id, joke: current.joke, rating: text})
    this.props.fetchJoke()
  }
  render () {
    const { current } = this.props
    return [
      <div className='App'>
        <Nav />
        <div className='App-intro'>
          {current && <div>
            <p id={current.id}>{current.joke}</p>
            <button onClick={this.rateJoke} value='Funny'>Funny</button>
            <button onClick={this.rateJoke} value='Not Funny'>Not Funny</button>
          </div>
          }
        </div>
      </div>
    ]
  }
}

const s = state => ({
  current: state.jokes.current
})

// d function
const d = dispatch => ({
  fetchJoke: () => dispatch(fetchJoke()),
  rateJoke: (payload) => dispatch(rateJoke(payload)),
  getJoke: (payload) => dispatch(getJoke(payload))
})

export default connect(s, d)(Home)
