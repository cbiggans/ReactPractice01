import React from 'react'
import MarkContainer from './components/MarkContainer'
import Header from './components/Header'
import NoteTakerContainer from './components/NoteTakerContainer'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends React.Component{
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Header />
          <Route exact path="/" component={MarkContainer} />
          <Route path="/take-notes/:id" component={NoteTakerContainer} />
        </Provider>
      </Router>
    )
  }
}

export default App
