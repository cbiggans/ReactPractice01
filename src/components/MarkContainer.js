import React from 'react'
import MarkForm from './MarkForm'
import MarkList from './MarkList'
import { connect } from 'react-redux'


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
    handleSubmit: (e) => {
      e.preventDefault()
      console.log('form submitted')
      dispatch({
        type: 'ADD_NEXT_MARK'
      })
    },
    handleChange: (e) => {
      const { name, value } = e.target
      console.log('changing ' + name + ' to ' + value)
      dispatch({
        type: 'UPDATE_MARK_FIELD',
        payload: {
          name: name,
          value: value,
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkContainer)
