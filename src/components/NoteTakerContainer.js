import React from 'react'
import { connect } from 'react-redux'
import { markActions } from '../actions'
import YoutubePlayerContainer from './YoutubePlayerContainer'
import NoteTakerNoteForm from './NoteTakerNoteForm'

class NoteTakerContainer extends React.Component {

  componentDidMount() {
    var markId = this.props.match.params.id
    console.log('Mark ID: ' + markId)
    
    this.props.loadMark(markId)
  }

  render() {
    var note;
    if(this.props.settings.newNoteEditorOpen) {
      note = <NoteTakerNoteForm newNote={this.props.newNote}
                                handleChange={this.props.handleNewNoteChange}
                                handleSubmit={this.props.handleNewNoteSubmit} />
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
    newNote: state.newNote,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadMark: (id) => dispatch(markActions.loadMark(id)),
    openNewNote: () => dispatch(markActions.openNewNote()),
    handleNewNoteChange: (e) => dispatch(markActions.handleNewNoteChange(e)),
    handleNewNoteSubmit: (e) => dispatch(markActions.handleNewNoteSubmit(e)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTakerContainer)
