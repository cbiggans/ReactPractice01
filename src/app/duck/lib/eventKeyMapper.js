

class EventKeyMapper extends Object {
  constructor(playerContainer, playerWrapper) {
    super(playerContainer);

    this.playerContainer = playerContainer
    this.playerWrapper = playerWrapper
    this.handleKeypress = this.handleKeypress.bind(this)
  }

  addEventListener() {
    window.addEventListener('keydown', this.handleKeypress, false)
  }

  removeEventListener() {
    window.removeEventListener('keydown', this.handleKeypress)
  }

  handleKeypress(e) {
    if(this.playerContainer.props.settings.eventMode === 'videoPlayback') {
      this.videoPlaybackKeypressMode(e)
    } else if(this.playerContainer.props.settings.eventMode === 'newNote') {
      this.newNoteKeypressMode(e)
    }
  } 

  videoPlaybackKeypressMode(e) {
    // n -> Add new comment
    // k -> pause video
    // j -> back predefined # of seconds (2 seconds by default)
    // l -> forward predefined # of seconds (2 seconds by default)
    // ; -> forward longer predefined # of seconds (10 seconds by default)
    // h -> back longer predefined # of seconds (10 seconds by default)
    // f -> faster .25X
    // s -> slower .25X
    // esc -> exit out of write mode & back to video play control mode
    // b -> bigger
    // m -> smaller
    // 
    // var keyCode = e.which;
    // console.log(e, keyCode, e.which)
    switch(e.key) {
      case(';'):  //  ;
        // Jump Forward 10 seconds
        this.playerWrapper.jumpForward(10)
        break
      case('h'):  //  h
        // Jump Back 10 seconds
        this.playerWrapper.jumpBack(10)
        break
      case('i'):  //  i
        // Add New note
        this.playerContainer.props.openNewNote(this.playerWrapper.getCurrentTime())
        this.playerWrapper.pauseVideo()
        e.preventDefault()
        break
      case('j'):  // j
        // Jump back 2 seconds
        this.playerWrapper.jumpBack(2)
        break
      case('k'):  //  k
        // Toggle Video
        this.playerWrapper.togglePlayback()
        break
      case('l'):  //  l
        // Jump Forward 2 seconds
        this.playerWrapper.jumpForward(2)
        break
      case('b'):  //  l
        // Jump Forward 2 seconds
        this.playerContainer.props.bookmark(this.playerWrapper.getCurrentTime())
        break
      case('S'):  //  S
        // Go slower
        this.playerWrapper.setPlaybackSpeed(-.25)
        break
      case('F'):  //  f
        // Go Faster
        this.playerWrapper.setPlaybackSpeed(.25)
        break
      case('B'):  //  b
        // Make the video bigger
        this.playerWrapper.changeVideoSize('bigger')
        break
      case('M'):  //  m (minimize)
        // Make the Video Smaller
        this.playerWrapper.changeVideoSize('smaller')
        break
      default:
        break
    }
  }

  newNoteKeypressMode(e) {
    var keyCode = e.which;
    console.log(e, keyCode, e.which)

    // If the alt key is pressed down, use videoPlaybackKeypress handler
    if(e.altKey) {
      switch(e.key) {
        case('u'):
        case('U'):
          this.playerContainer.props.updateNewNote({
            target: {
              name: 'timestamp',
              value: this.playerWrapper.getCurrentTime()
            }
          })
          return
        case('P'):
          this.playerWrapper.setTime(this.playerContainer.props.newNote.timestamp)
          this.playerWrapper.playVideo()
          // this.play()
          return
        default:
          break
      }

      this.videoPlaybackKeypressMode(e)
      return
    }

    switch(e.key) {
      case('Enter'): // Enter
        if(!e.shiftKey) {  // Shift Key down as well
          console.log('Shift Key is not Down')
          // TODO XXX: This is needed to submit the form, I should pass in the
          //  id of the form to this event creation to make this better
          // There could be a better way of doing this, could instead just call
          //  the actual submit action (handleSubmit) instead probably to achieve
          //  the exact same thing with less hack. Because I'm using react this is possible
          // document.getElementById('newNoteForm').dispatchEvent(
          //   new Event('submit')
          // )
          this.playerContainer.props.createNewNote(e)
        }
        break
      case('Escape'):
        this.playerContainer.props.closeNewNote()
        break
      default:
        break
    }
  }
}

export default EventKeyMapper
