import React from 'react'
import MarkContainer from './components/MarkContainer'
import store from './store'
import { Provider } from 'react-redux'


class App extends React.Component{
  render() {
    return (
      <Provider store={store}>
        <MarkContainer />
      </Provider>
    )
  }
}

export default App
