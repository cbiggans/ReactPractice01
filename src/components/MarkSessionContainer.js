import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions/'
import MarkSessionForm from './MarkSessionForm'


class MarkSessionContainer extends React.Component {
  render() {
    return (
      <div>
        <div>MarkSession</div>
        <MarkSessionForm newSession={this.props.newSession}
                         handleChange={this.props.handleChange} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    list: state.markSessions.list,
    current: state.markSessions.current,
    widgets: state.markSessions.widgets,
    newSession: state.markSessions.newSession,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleChange: (e, id) => dispatch(actions.markSessions.handleChange(e, id)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MarkSessionContainer)
