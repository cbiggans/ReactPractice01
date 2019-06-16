import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions/'
import YoutubePlayerContainer from './YoutubePlayerContainer'
import NoteTakerNoteForm from '../components/NoteTakerNoteForm'
import NoteList from '../components/NoteList'
import VideoPlayerWrapper from '../lib/VideoPlayerWrapper'

class NoteTakerContainer extends React.Component {

  constructor(props) {
    super(props)

    this.playerWrapper = new VideoPlayerWrapper({
      url: props.currentMark.url
    })
  }

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
      noteTakerForm = <button onClick={() => this.props.openNewNote(this.playerWrapper.getCurrentTime())}>ADD NOTE</button>
    }

    return (
      <div>
        <h1>Note Taking</h1>
        <h3>Source: </h3><a href={this.props.currentMark.url} target='blank'>{this.props.currentMark.title}</a>
        <p>Description: {this.props.currentMark.description}</p>
        <YoutubePlayerContainer currentMark={this.props.currentMark}
                                settings={this.props.settings}
                                newNote={this.props.newNote}
                                openNewNote={this.props.openNewNote}
                                updateNewNote={this.props.handleChange}
                                createNewNote={this.props.handleSubmit}
                                bookmark={this.props.bookmark}
                                closeNewNote={this.props.closeNewNote}
                                updateSettings={this.props.updateSettings}
                                completedTimeUpdate={this.props.completedTimeUpdate}
                                playerWrapper={this.playerWrapper} />
        {noteTakerForm}
        <NoteList notes={this.props.notes}
                  currentMark={this.props.currentMark}
                  handleTimestampClicked={this.props.setVideoTime} 
                  editNote={this.props.editNote}
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
    editNote: (note) => dispatch(actions.notes.edit(note)),
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
