import React from 'react'
import MarkForm from './MarkForm'
import MarkList from './MarkList'
import { connect } from 'react-redux'


class MarkContainer extends React.Component{
  render() {
    return (
      <div>
        <MarkForm />
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkContainer)
