import React from 'react'
import { connect } from 'react-redux'
import { markActions } from '../actions'
import YoutubePlayerContainer from './YoutubePlayerContainer'
import NoteTakerNoteForm from './NoteTakerNoteForm'
import NoteList from './NoteList'

class NoteTakerContainer extends React.Component {

  componentDidMount() {
    var markId = this.props.match.params.id
    console.log('Mark ID: ' + markId)
    
    this.props.setCurrentMark(markId)
    this.props.fetchNotes(markId)
  }

  render() {
    var noteTakerForm;
    console.log('settings: ', this.props.settings)
    if(this.props.settings.newNoteEditorOpen) {
      noteTakerForm = <NoteTakerNoteForm newNote={this.props.newNote}
                                         settings={this.props.settings}
                                         handleChange={this.props.handleNewNoteChange}
                                         handleSubmit={this.props.handleNewNoteSubmit} />
    } else {
      noteTakerForm = <p>Note</p>
    }

    return (
      <div>
        <h1>Note Taking</h1>
        <YoutubePlayerContainer currentMark={this.props.currentMark}
                                settings={this.props.settings}
                                openNewNote={this.props.openNewNote} />
        {noteTakerForm}
        <NoteList notes={this.props.notes}
                  currentMark={this.props.currentMark} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentMark: state.marks.currentMark,
    settings: state.noteTakerSettings,
    newNote: state.notes.newNote,
    notes: state.notes,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentMark: (id) => dispatch(markActions.setCurrentMark(id)),
    openNewNote: () => dispatch(markActions.openNewNote()),
    fetchNotes: (markId) => dispatch(markActions.fetchNotes(markId)),
    handleNewNoteChange: (e) => dispatch(markActions.handleNewNoteChange(e)),
    handleNewNoteSubmit: (e) => dispatch(markActions.handleNewNoteSubmit(e)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTakerContainer)
