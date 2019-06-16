import React from 'react'
import { connect } from 'react-redux'
import actions from '../duck/actions/'
import MarkSessionForm from '../common/markSession/MarkSessionForm'
import MarkWidgetContainer from './MarkWidgetContainer'
import MarkWidgetForm from '../common/markWidget/MarkWidgetForm'


class MarkSessionContainer extends React.Component {
  componentDidMount() {
    const markSessionId = this.props.match.params.id

    this.props.setCurrent(markSessionId)
    this.props.fetchWidgets(markSessionId)
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

    var widgetSectionHeader
    if(this.props.widgets.displayOptions.openEditors.newEditor) {
      widgetSectionHeader = (
        <MarkWidgetForm markWidget={this.props.widgets.next}
                        handleChange={this.props.handleWidgetChange}
                        handleSubmit={this.props.handleWidgetSubmit} />
      )
    } else {
      widgetSectionHeader = (
        <button onClick={() => {this.props.openWidgetEditor()}}>ADD WIDGET</button>
      )
    }

    return (
      <div>
        {currentMarkSessionDisplay}
        <div>Widgets</div>
        {widgetSectionHeader}
        <MarkWidgetContainer />
      </div>
    )
  }
}

function getCurrentMarkSession(state) {
  return state.markSessions.collection[state.markSessions.currentId] || {}
}

function mapStateToProps(state) {
  // Will want to set current here, but will need to handle the undefined case
  // const getMarksFromIds = (collection, markIds) => {
  //   
  // }

  return {
    current: getCurrentMarkSession(state),
    marks: {
      collection: state.marks.collection,
    },
    widgets: {
      markIdOrderMap: state.markWidgets.markIdOrderMap,
      collection: state.markWidgets.collection,
      next: state.markWidgets.next,
      displayOptions: state.markWidgets.displayOptions,
    },
    next: state.markSessions.next,
    displayOptions: state.markSessions.displayOptions,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    openWidgetEditor: (id) => dispatch(actions.markWidgets.openEditor(id)),
    setCurrent: (id) => dispatch(actions.markSessions.setCurrent(id)),
    openCurrentEditor: () => dispatch(actions.markSessions.openCurrentEditor()),
    fetch: () => dispatch(actions.markSessions.fetch()),
    fetchWidgets: (sessionId) => dispatch(actions.markWidgets.fetch(sessionId)),
    handleChange: (e, id) => dispatch(actions.markSessions.handleChange(e, id)),
    handleSubmit: (e, id) => dispatch(actions.markSessions.handleSubmit(e, id)),
    handleWidgetChange: (e, id) => dispatch(actions.markWidgets.handleChange(e, id)),
    handleWidgetSubmit: (e, id) => dispatch(actions.markWidgets.handleSubmit(e, id)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MarkSessionContainer)
