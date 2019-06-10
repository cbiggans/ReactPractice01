function extractVideoId(url) {
  // e.g. url = https://www.youtube.com/watch?v=VUyBY72mwrQ
  if(url && url.includes('youtube.com')) {
    return url.split('?v=')[1]
  }

  return ''
}

class VideoPlayerWrapper extends Object {

  // Receive all data that is required in order to load the video player
  //  Also for displaying
  constructor(videoData) {
    super(videoData)

    this.loadNewData(this.videoData)
  }

  get videoId() {
    return extractVideoId(this.url)
  }

  get url() {
    return this.videoData.url
  }

  loadNewData(videoData) {
    // May not have the video data at first because of lazy loading
    this.videoData = videoData
  }

  loadNewVideo(e) {
    this.YT = window['YT'];
    this.player = new window['YT'].Player('player', {
      videoId: this.videoId,
      modestbranding: 1,
      events: {
        'onError': this.onPlayerError.bind(this),
        'onReady': (e) => {
          return true;
        }
      }
    });
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

  pauseVideo() {
    if(!this.player || !this.player.pauseVideo) {
      return
    }

    this.player.pauseVideo()
  }

  playVideo() {
    if(!this.player || !this.player.playVideo) {
      return
    }

    this.player.playVideo()
  }

  togglePlayback() {
    if(!this.player)
      return

    if(this.player.getPlayerState() === 1) {
      // pause
      this.pauseVideo()
    } else {
      // play
      this.playVideo()
    }
  }

  getCurrentTime() {
    if(!this.player || !this.player.getCurrentTime)
      return 0

    return this.player.getCurrentTime()
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

    var currentTime = this.getCurrentTime()
    this.player.seekTo(currentTime + seconds)
  }

  setTime(seconds) {
    if(!this.player)
      return

    this.player.seekTo(seconds)
  }

  setPlaybackSpeed(delta) {
    if(!this.player)
      return

    const availablePlaybackRates = this.player.getAvailablePlaybackRates()

    let currentPlaybackRate = this.player.getPlaybackRate()

    let newSpeed = currentPlaybackRate + delta
    this.player.setPlaybackRate(newSpeed)

    if(availablePlaybackRates.includes(newSpeed)) {
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
  }
}

export default VideoPlayerWrapper
