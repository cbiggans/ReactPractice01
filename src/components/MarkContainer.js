import React from 'react'
import MarkForm from './MarkForm'
import MarkList from './MarkList'
import { connect } from 'react-redux'
import { markActions } from '../actions'


class MarkContainer extends React.Component{
  componentDidMount() {
    this.props.load()
  }
  render() {
    return (
      <div>
        <MarkForm nextMark={this.props.nextMark}
                  handleChange={this.props.handleChange}
                  handleSubmit={this.props.handleSubmit} />
        <MarkList marks={this.props.marks} 
                  destroyHandler={this.props.destroyHandler} />
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
    load: () => dispatch(markActions.load()),
    handleSubmit: (e) => dispatch(markActions.handleSubmit(e)),
    handleChange: (e) => dispatch(markActions.handleChange(e)),
    destroyHandler: (id) => dispatch(markActions.destroy(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkContainer)
