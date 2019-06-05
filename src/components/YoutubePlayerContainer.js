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
			default:
				return
    };
  };

  // When a currentMark has been loaded in, we then want to load the youtube api
  //  Should detect when currentMark has been changed & has proper url value
  componentDidMount() {
    // Add event listeners
    window.addEventListener('keypress', this.handleKeypress, false)


    // Set an instance variable when done mounting so YoutubeAPI can render
    console.log('componentHasMounted: ' + this.componentHasMounted + '->true')
    this.componentHasMounted = true


  }

  componentWillUnmount() {
    console.log('Remove keypress event')
    window.removeEventListener('keypress', this.handleKeypress)

    this.componentHasMounted = false
  }

  handleKeypress(e) {
    var keyCode = e.which;
    console.log(e, keyCode, e.which)
    switch(keyCode) {
      case(105):
        // Add New comment
        console.log('you pressed i')
    }
    // n -> Add new comment
    // k -> pause video
    // j -> back predefined # of seconds (2 seconds by default)
    // l -> forward predefined # of seconds (2 seconds by default)
    // ; -> forward longer predefined # of seconds (10 seconds by default)
    // h -> back longer predefined # of seconds (10 seconds by default)
    // f -> faster .25X
    // s -> slower .25X
    // esc -> exit out of write mode & back to video play mode
    // 
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
