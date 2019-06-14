import React from 'react'
import HomeContainer from './components/HomeContainer'
import MarkSessionContainer from './components/MarkSessionContainer'
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
          <Route exact path="/" component={HomeContainer} />
          <Route path="/session/:id" component={MarkSessionContainer} />
          <Route path="/marks/" component={MarkContainer} />
          <Route path="/take-notes/:id" component={NoteTakerContainer} />
        </Provider>
      </Router>
    )
  }
}

export default App
