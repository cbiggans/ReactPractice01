import React from 'react'
import { connect } from 'react-redux'
import { markActions } from '../actions'
import YoutubePlayerContainer from './YoutubePlayerContainer'

class NoteTakerContainer extends React.Component {

  componentDidMount() {
    var markId = this.props.match.params.id
    console.log('Mark ID: ' + markId)
    
    this.props.loadMark(markId)
  }

  render() {
    return (
      <div>
        <h1>Note Taking</h1>
        <YoutubePlayerContainer currentMark={this.props.currentMark} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentMark: state.currentMark
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadMark: (id) => dispatch(markActions.loadMark(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTakerContainer)
