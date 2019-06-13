import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions/'
import MarkSessionForm from './MarkSessionForm'
import MarkSessionList from './MarkSessionList'


class MarkSessionContainer extends React.Component {
  componentDidMount() {
    if(this.props.list.length === 0) {
      this.props.fetch()
    }
  }

  render() {
    return (
      <div>
        <div>MarkSession</div>
        <MarkSessionForm next={this.props.next}
                         handleChange={this.props.handleChange}
                         handleSubmit={this.props.handleSubmit} />
        <MarkSessionList list={this.props.list} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    list: state.markSessions.list,
    current: state.markSessions.current,
    widgets: state.markSessions.widgets,
    next: state.markSessions.next,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => dispatch(actions.markSessions.fetch()),
    handleChange: (e, id) => dispatch(actions.markSessions.handleChange(e, id)),
    handleSubmit: (e, id) => dispatch(actions.markSessions.handleSubmit(e, id)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MarkSessionContainer)
