import React from 'react'
import { connect } from 'react-redux'


class YoutubePlayerContainer extends React.Component {
  constructor(props) {
    super(props)

    console.log("CREATED")

    // TODO XXX: This should be part of state or find a different way to do this
    //  This is not a perfect way because the render method is only called
    //  if the store/state changes, so this isn't a great way to keep state
    //  TECHNICALLY render is called again after componentDidMount, so theoretically
    //  this hack works, but would like to find another solution if possible
    this.componentHasMounted = false
    this.currentVideoId = ''

    // Check if this has been loaded yet.
    //  If it has, don't add this again
    if(!document.getElementById('youtube_iframe_api')) {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.id = 'youtube_iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    this.handleKeypress = this.handleKeypress.bind(this)
  }

	onPlayerStateChange(event) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() === 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() !== 0) {
          console.log('paused @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
      // case window['YT'].PlayerState.BUFFERING:
      //   break
			default:
				return
    };
  };

  componentDidMount() {
    // Add event listeners
    // window.addEventListener('keypress', this.handleKeypress, false)
    // Keydown handler needs to be used if want to use ctrl/alt
    window.addEventListener('keydown', this.handleKeypress, false)
    // Set an instance variable when done mounting so YoutubeAPI can render
    console.log('componentHasMounted: ' + this.componentHasMounted + '->true')
    this.componentHasMounted = true
  }

  componentWillUnmount() {
    console.log('Remove keypress event')
    // window.removeEventListener('keypress', this.handleKeypress)
    window.removeEventListener('keydown', this.handleKeypress)

    this.componentHasMounted = false
  }

  pauseVideo() {
    if(!this.player) {
      return
    }

    this.player.pauseVideo()
  }

  togglePlayback() {
    if(!this.player)
      return

    if(this.player.getPlayerState() === 1) {
      // pause
      this.pauseVideo()
    } else {
      // play
      this.player.playVideo()
    }
  }

  jumpForward(seconds) {
    this.jump(seconds)
  }

  jumpBack(seconds) {
    this.jump(seconds * -1)
  }

  jump(seconds) {
    if(!this.player)
      return

    var currentTime = this.player.getCurrentTime()
    console.log(currentTime)
    this.player.seekTo(currentTime + seconds)
  }

  setPlaybackSpeed(delta) {
    // console.log('Available Playback Rates' + this.player.getAvailablePlaybackRates())
    if(!this.player)
      return

    const availablePlaybackRates = this.player.getAvailablePlaybackRates()

    let currentPlaybackRate = this.player.getPlaybackRate()
    // console.log(currentPlaybackRate)

    let newSpeed = currentPlaybackRate + delta
    this.player.setPlaybackRate(newSpeed)

    // console.log(availablePlaybackRates)
    if(availablePlaybackRates.includes(newSpeed)) {
      console.log(newSpeed)
      return newSpeed
    }

    return newSpeed
  }

  changeVideoSize(direction) {
    if(!this.player)
      return
    const suggestedPlaybackSizes = [{
        width: 320,
        height: 240,
      }, {
        width: 640,
        height: 360,
      }, {
        width: 853,
        height: 480,
      }, {
        width: 1280,
        height: 720,
      }, {
        width: 1920,
        height: 1080,
      }, {
        width: 1920,
        height: 1080,
      }
    ]

    if(!this.currentSize) {
      this.currentSize = 1
    }

    console.log(suggestedPlaybackSizes[this.currentSize])

    if(direction === 'bigger' && this.currentSize < suggestedPlaybackSizes.length - 1) {
        this.currentSize++;
    } else if(direction === 'smaller' && this.currentSize > 0) {
        this.currentSize--;
    }

    const newSize = {
      width: suggestedPlaybackSizes[this.currentSize].width,
      height: suggestedPlaybackSizes[this.currentSize].height,
    }
    this.player.setSize(newSize.width, newSize.height)
    console.log(newSize)
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
    var keyCode = e.which;
    console.log(e, keyCode, e.which)
    switch(e.key) {
      case(';'):  //  ;
        // Jump Forward 10 seconds
        this.jumpForward(10)
        break
      case('b'):  //  b
        // Make the video bigger
        if(!this.player)
          return

        this.changeVideoSize('bigger')
        break
      case('f'):  //  f
        // Go Faster
        this.setPlaybackSpeed(.25)
        break
      case('h'):  //  h
        // Jump Back 10 seconds
        this.jumpBack(10)
        break
      case('i'):  //  i
        // Add New note
        this.props.openNewNote()
        this.pauseVideo()
        e.preventDefault()
        break
      case('j'):  // j
        // Jump back 2 seconds
        this.jumpBack(2)
        break
      case('k'):  //  k
        // Toggle Video
        // console.log(this.player.getCurrentTime())
        this.togglePlayback()
        break
      case('l'):  //  l
        // Jump Forward 2 seconds
        this.jumpForward(2)
        break
      case('m'):  //  m (minimize)
        // Make the Video Smaller
        this.changeVideoSize('smaller')
        break
      case('s'):  //  s
        // Go slower
        this.setPlaybackSpeed(-.25)
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
      this.videoPlaybackKeypressMode(e)
      return
    }

    switch(keyCode) {
      case(13): // Enter
        if(e.shiftKey) {  // Shift Key down as well
          console.log('Shift Key Down')
        }
      default:
        break
    }
  }

  handleKeypress(e) {
    if(this.props.settings.eventMode === 'videoPlayback') {
      this.videoPlaybackKeypressMode(e)
    } else if(this.props.settings.eventMode == 'newNote') {
      this.newNoteKeypressMode(e)
    }
  }

	cleanTime() {
    return Math.round(this.player.getCurrentTime())
  }

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.currentVideoId)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
      default:
        break;
    };
  }

  loadNewVideo(videoId, e) {
    console.log("-------------------CREATE YOUTUBE VIDEO PLAYER-------------------")
    this.YT = window['YT'];
    this.player = new window['YT'].Player('player', {
      videoId: videoId,
      modestbranding: 1,
      start: 45,
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': (e) => {
          return true;
          // if (!this.reframed) {
          //   this.reframed = true;
          //   reframe(e.target.a);
          // }
        }
      }
    });
  }

  render() {
    // if(this.props.currentMark.url.contains('youtube.com')
    console.log('===================RENDER()====================')
    var videoId = extractVideoId(this.props.currentMark.url)
    console.log(videoId)

    // this.videoId = '1cH2cerUpMQ' //video id

    if (videoId && this.componentHasMounted) {
      if (videoId !== this.currentVideoId) {
        console.log("render()")
        this.currentVideoId = videoId

        // Currently having issue where this is running before component is mounted
        //  This should only mount if component is mounted, but I need to make sure
        //  that we have the videoId, so there needs to be an action run, or we need
        //  to check if the video has been created
        if(window.YT) {
          this.loadNewVideo(videoId)
        } else {
          window['onYouTubeIframeAPIReady'] = (e) => {
            this.loadNewVideo(videoId, e)
          }
        }
      }
    }

    return (
      <div>
        <div>Let's take some notes!</div>
        <div id='player'></div>
      </div>
    )
  }

}

function extractVideoId(url) {
    // e.g. url = https://www.youtube.com/watch?v=VUyBY72mwrQ
    console.log('URL:' + url)

    if(url && url.includes('youtube.com')) {
      return url.split('?v=')[1]
    }

    return ''
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(YoutubePlayerContainer)

/*

  var youtubeVidURL = 'http://www.youtube.com/embed/' + this.videoId + '?enablejsapi=1'
  <iframe id='player'
          type='text/html'
          width="640"
          height="390"
          src={youtubeVidURL}
          frameBorder="0"></iframe>
*/

/*
https://developers.google.com/youtube/iframe_api_reference#loadVideoById

this.player.loadVideoById({
  'videoId': 'bHQqvYy5KYo',
  'startSeconds': 5,
  'endSeconds': 60,
  'suggestedQuality': 'large'
})
*/
