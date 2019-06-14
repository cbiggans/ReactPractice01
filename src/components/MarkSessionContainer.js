import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions/'
import MarkSessionForm from './MarkSessionForm'
// import MarkSessionList from './MarkSessionList'


class MarkSessionContainer extends React.Component {
  componentDidMount() {
    const markSessionId = this.props.match.params.id

    this.props.setCurrent(markSessionId)
    // this.props.fetchWidgets()
  }

  render() {
    // TODO XXX: Create Widgets w/ form
    // TODO XXX: Display Widgets in list
    //            Make marks clickable to go to NoteTaker
    // TODO XXX: Allow easy creation of Marks
    //            can give them a groupName during this creation
    var currentMarkSessionDisplay
    if(!this.props.displayOptions.currentMarkSessionEditorIsOpen) {
      currentMarkSessionDisplay = (
        <div>
          <h1>{this.props.current.title}</h1>
          <button onClick={this.props.openCurrentEditor}>EDIT SESSION DETAILS</button>
        </div>
      )
    } else {
      // TODO XXX: Will need to update
      //  * next should just be markSession to update
      //  ** defaults to next if no id provided
      //  * update the markSession in the markSession collection
      //  * current needs to look at markSession.collection for source of truth
      currentMarkSessionDisplay = (
        <MarkSessionForm markSession={this.props.current}
                         handleChange={this.props.handleChange}
                         handleSubmit={this.props.handleSubmit} />
      )
    }
    return (
      <div>
        {currentMarkSessionDisplay}
        <div>Widgets</div>
        <button onClick={this.props.openAddWidgetEditor}>ADD WIDGET</button>
      </div>
    )
  }
}

function getCurrentMarkSession(state) {
  return state.markSessions.collection[state.markSessions.currentId] || {}
}

function mapStateToProps(state) {
  // Will want to set current here, but will need to handle the undefined case

  return {
    current: getCurrentMarkSession(state),
    widgets: state.markSessions.widgets,
    next: state.markSessions.next,
    displayOptions: state.markSessions.displayOptions,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrent: (id) => dispatch(actions.markSessions.setCurrent(id)),
    openCurrentEditor: () => dispatch(actions.markSessions.openCurrentEditor()),
    fetch: () => dispatch(actions.markSessions.fetch()),
    handleChange: (e, id) => dispatch(actions.markSessions.handleChange(e, id)),
    handleSubmit: (e, id) => dispatch(actions.markSessions.handleSubmit(e, id)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MarkSessionContainer)
