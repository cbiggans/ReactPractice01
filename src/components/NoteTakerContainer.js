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
    var note;
    if(this.props.settings.newNoteEditorOpen) {
      note = <p>NEW NOTE</p>
    } else {
      note = <p>Note</p>
    }

    return (
      <div>
        <h1>Note Taking</h1>
        <YoutubePlayerContainer currentMark={this.props.currentMark}
                                settings={this.props.settings}
                                openNewNote={this.props.openNewNote} />
        <div>
          <h1>Notes</h1>
          {note}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentMark: state.currentMark,
    settings: state.videoNoteTakerSettings,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadMark: (id) => dispatch(markActions.loadMark(id)),
    openNewNote: () => dispatch(markActions.openNewNote()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTakerContainer)
