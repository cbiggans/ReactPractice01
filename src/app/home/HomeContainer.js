import React from 'react'
import { connect } from 'react-redux'
import actions from '../duck/actions/'
import MarkSessionForm from '../common/markSession/Form'
import MarkSessionList from '../common/markSession/List'


class HomeContainer extends React.Component {
  componentDidMount() {
    if(this.props.collection.length !== {}) {
      this.props.fetch()
    }
  }

  render() {
    return (
      <div>
        <div>MarkSession</div>
        <MarkSessionForm markSession={this.props.next}
                         handleChange={this.props.handleChange}
                         handleSubmit={this.props.handleSubmit} />
        <MarkSessionList collection={this.props.collection} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    collection: state.markSessions.collection,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
