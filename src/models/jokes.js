import { createAction, createReducer } from 'redux-act'
import { put, select } from 'redux-saga/effects'
import { createSagaWatcher } from 'utils/sagaUtils'
import { serviceEffect } from 'utils/serviceHandler'

/**
 * Actions
 */

export const fetchJoke = createAction('FETCH_JOKE')
export const fetchJokeSuccess = createAction('FETCH_JOKE_SUCCESS')
export const rateJoke = createAction('RATE_JOKE')
export const getJoke = createAction('GET_JOKE')

const jokeSelector = (state) => state.jokes.ratedJokes
/**
  * Sagas
  */

export const sagas = {
  [fetchJoke]: function * () {
    const response = yield serviceEffect({serviceId: 'fetchJokes'})
    yield put(fetchJokeSuccess(response))
  },
  [getJoke]: function * ({payload}) {
    const jokes = yield select(jokeSelector)
    const joke = jokes.filter((item) => item.id === payload)
    yield put(fetchJokeSuccess(joke[0]))
  }
}

export const jokesSagaWatcher = createSagaWatcher(sagas)
/**
 * Reducers
 */
export const jokes = {
  [fetchJokeSuccess]: (state, { id, joke }) => ({
    ...state,
    current: {
      id,
      joke
    }
  }),
  [rateJoke]: (state, action) => {
    const { id, joke, rating } = action
    return {
      ...state,
      ratedJokes: [
        ...state.ratedJokes,
        {id,
          joke,
          rating}
      ]
    }
  }
}

export const jokesInitialState = {
  current: {},
  ratedJokes: {}
}

export default createReducer(jokes, jokesInitialState)
