import React from 'react'
import HomeContainer from './home/HomeContainer'
import MarkSessionContainer from './session/MarkSessionContainer'
import MarkContainer from './marks/MarkContainer'
import Header from './common/Header'
import NoteTakerContainer from './noteTaker/NoteTakerContainer'
import store from './duck/store'
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
