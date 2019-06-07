import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions/'
import YoutubePlayerContainer from './YoutubePlayerContainer'
import NoteTakerNoteForm from './NoteTakerNoteForm'
import NoteList from './NoteList'

class NoteTakerContainer extends React.Component {

  componentDidMount() {
    var markId = this.props.match.params.id
    console.log('Mark ID: ' + markId)
    
    this.props.setCurrentMark(markId)
    this.props.fetch(markId)
  }

  render() {
    var noteTakerForm;
    console.log('settings: ', this.props.settings)
    if(this.props.settings.newNoteEditorOpen) {
      noteTakerForm = <NoteTakerNoteForm newNote={this.props.newNote}
                                         settings={this.props.settings}
                                         handleChange={this.props.handleChange}
                                         handleSubmit={this.props.handleSubmit} />
    } else {
      noteTakerForm = <p>Note</p>
    }

    return (
      <div>
        <h1>Note Taking</h1>
        <YoutubePlayerContainer currentMark={this.props.currentMark}
                                settings={this.props.settings}
                                openNewNote={this.props.openNewNote}
                                closeNewNote={this.props.closeNewNote} />
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
    setCurrentMark: (id) => dispatch(actions.marks.setCurrentMark(id)),
    openNewNote: (currentTime) => dispatch(actions.notes.openNew(currentTime)),
    closeNewNote: () => dispatch(actions.notes.closeNew()),
    fetch: (markId) => dispatch(actions.notes.fetch(markId)),
    handleChange: (e) => dispatch(actions.notes.handleChange(e)),
    handleSubmit: (e) => dispatch(actions.notes.handleSubmit(e)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTakerContainer)
