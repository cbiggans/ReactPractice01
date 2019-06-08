import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions/'
import YoutubePlayerContainer from './YoutubePlayerContainer'
import NoteTakerNoteForm from './NoteTakerNoteForm'
import NoteList from './NoteList'

class NoteTakerContainer extends React.Component {

  componentDidMount() {
    var markId = this.props.match.params.id
    
    this.props.setCurrentMark(markId)
    this.props.fetch(markId)
  }

  render() {
    var noteTakerForm;

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
                                bookmark={this.props.bookmark}
                                closeNewNote={this.props.closeNewNote}
                                updateSettings={this.props.updateSettings}
                                completedTimeUpdate={this.props.completedTimeUpdate} />
        {noteTakerForm}
        <NoteList notes={this.props.notes}
                  currentMark={this.props.currentMark}
                  handleTimestampClicked={this.props.setVideoTime} 
                  changeNoteOrder={this.props.changeNoteOrder}
                  handleDestroyNote={this.props.destroyNote} />
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
    bookmark: (currentTime) => dispatch(actions.notes.createBookmark(currentTime)),
    closeNewNote: () => dispatch(actions.notes.closeNew()),
    destroyNote: (id, markId) => dispatch(actions.notes.destroy(id, markId)),
    fetch: (markId) => dispatch(actions.notes.fetch(markId)),
    handleChange: (e) => dispatch(actions.notes.handleChange(e)),
    handleSubmit: (e) => dispatch(actions.notes.handleSubmit(e)),
    setVideoTime: (timestamp) => dispatch(actions.videos.setVideoTime(timestamp)),
    updateSettings: (data) => dispatch(actions.videos.updateSettings(data)),
    completedTimeUpdate: () => dispatch(actions.videos.completedTimeUpdate()),
    changeNoteOrder: (markId, order) => dispatch(actions.notes.changeNoteOrder(markId, order)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTakerContainer)
