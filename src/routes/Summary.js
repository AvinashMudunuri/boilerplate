import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Nav from 'components/navigation'
import { getTotal } from 'utils/utilites'

class Summary extends Component {
  renderRow (item, index) {
    const { id, joke, rating } = item
    const url = '/joke/' + id
    return [
      <tr key={index}>
        <th scope='row'>{id}</th>
        <td>{joke}</td>
        <td>{rating}</td>
      </tr>
    ]
  }
  render () {
    const { totalFunny, totalNotFunny, ratedJokes } = this.props
    return [
      <div className='App'>
        <Nav />
        <div className='App-intro'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Joke</th>
                <th scope='col'>Rating</th>
              </tr>
            </thead>
            <tbody>
              {ratedJokes.length > 0
                ? ratedJokes.map((item, index) => this.renderRow(item, index))
                : <tr><td>No Data</td></tr>}
            </tbody>
          </table>
          {ratedJokes.length > 0
            ? <div>
              <h2>Total Funny: {totalFunny}</h2>
              <h2>Total Not Funny: {totalNotFunny}</h2>
            </div>
            : null
          }
        </div>
      </div>
    ]
  }
}

const s = state => ({
  ratedJokes: state.jokes.ratedJokes,
  totalFunny: getTotal(state.jokes.ratedJokes, true),
  totalNotFunny: getTotal(state.jokes.ratedJokes, false)
})

// d function
const d = dispatch => ({})

export default connect(s, d)(Summary)
