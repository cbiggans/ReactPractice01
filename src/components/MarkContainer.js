import React from 'react'
import MarkForm from './MarkForm'
import MarkList from './MarkList'
import { connect } from 'react-redux'
import { markActions } from '../actions'


class MarkContainer extends React.Component{
  render() {
    return (
      <div>
        <MarkForm nextMark={this.props.nextMark}
                  handleChange={this.props.handleChange}
                  handleSubmit={this.props.handleSubmit} />
        <MarkList marks={this.props.marks} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    marks: state.marks,
    nextMark: state.nextMark,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (e) => dispatch(markActions.handleSubmit(e)),
    handleChange: (e) => dispatch(markActions.handleChange(e)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkContainer)
