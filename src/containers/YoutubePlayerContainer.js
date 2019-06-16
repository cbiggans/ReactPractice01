import React from 'react'
import { connect } from 'react-redux'
import EventKeyMapper from '../lib/eventKeyMapper'
import { extractVideoId } from '../lib/VideoPlayerWrapper.js'


class YoutubePlayerContainer extends React.Component {
  constructor(props) {
    super(props)

    // TODO XXX: This should be part of state or find a different way to do this
    //  This is not a perfect way because the render method is only called
    //  if the store/state changes, so this isn't a great way to keep state
    //  TECHNICALLY render is called again after componentDidMount, so theoretically
    //  this hack works, but would like to find another solution if possible
    this.componentHasMounted = false
    this.currentVideoId = ''

    console.log('CurrentURL: ', this.props.currentMark)
    this.playerWrapper = this.props.playerWrapper

    this.eventKeyMapper = new EventKeyMapper(this, this.playerWrapper)
    // Check if this has been loaded yet.
    //  If it has, don't add this again
    if(!document.getElementById('youtube_iframe_api')) {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.id = 'youtube_iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  timedUpdateLoop() {
    var self = this
    return window.setInterval(() => {
      var currentTime = self.playerWrapper.getCurrentTime()
      self.props.updateSettings({currentTime: currentTime})
    }, 5000)
  }

  componentDidMount() {
    // Add event listeners
    // window.addEventListener('keypress', this.handleKeypress, false)
    // Keydown handler needs to be used if want to use ctrl/alt
    // window.addEventListener('keydown', this.handleKeypress, false)
    // Set an instance variable when done mounting so YoutubeAPI can render
    this.componentHasMounted = true
    this.eventKeyMapper.addEventListener()

    this.updateTimeInterval = this.timedUpdateLoop()
  }

  componentWillUnmount() {
    this.eventKeyMapper.removeEventListener()
    window.clearInterval(this.updateTimeInterval)

    this.componentHasMounted = false
  }

	cleanTime() {
    return Math.round(this.playerWrapper.getCurrentTime())
  }

  render() {
    var videoId = extractVideoId(this.props.currentMark.url)

    // TODO XXX: It would be nice if this were update player settings instead of just
    //  hasNewCurrentTime so that it could be reused to control more than just currentTime
    //  Would be good to control stepping/jumping time with this as well so the
    //  Key event class wouldn't have to modify this instance directly
    if(this.playerWrapper && this.props.settings.playback.hasNewCurrentTime) {
      this.playerWrapper.setTime(this.props.settings.playback.currentTime)
      this.props.completedTimeUpdate()
    }

    if (videoId && this.componentHasMounted) {
      if (videoId !== this.currentVideoId) {
        this.currentVideoId = videoId

        // Currently having issue where this is running before component is mounted
        //  This should only mount if component is mounted, but I need to make sure
        //  that we have the videoId, so there needs to be an action run, or we need
        //  to check if the video has been created
        this.playerWrapper.loadNewData({url: this.props.currentMark.url})
        if(window.YT) {
          this.playerWrapper.loadNewVideo()
        } else {
          window['onYouTubeIframeAPIReady'] = (e) => {
            this.playerWrapper.loadNewVideo(e)
          }
        }
      }
    }

    return (
      <div>
        <div id='player'></div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(YoutubePlayerContainer)
