import React from 'react'
import MarkForm from './MarkForm'
import MarkList from './MarkList'
import { connect } from 'react-redux'


class MarkContainer extends React.Component{
  render() {
    return (
      <div>
        <MarkForm />
        <MarkList />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkContainer)
