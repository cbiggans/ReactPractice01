import React from 'react'

class NoteTakerContainer extends React.Component {
	constructor() {
    super();
    
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		this.video = '1cH2cerUpMQ' //video id
    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
        videoId: this.video,
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

	cleanTime() {
    return Math.round(this.player.getCurrentTime())
  }

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
      default:
        break;
    };
  }

  render() {
		// 2. This code loads the IFrame Player API code asynchronously.
		// debugger;
		// var tag = document.createElement('script');

		// tag.src = "https://www.youtube.com/iframe_api";
		// var firstScriptTag = document.getElementsByTagName('script')[0];
		// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		// // 3. This function creates an <iframe> (and YouTube player)
		// //    after the API code downloads.
		// var player;
		// var YT = {}
		// function onYouTubeIframeAPIReady() {
		// 	debugger;
		// 	player = new YT.Player('player', {
		// 		height: '390',
		// 		width: '640',
		// 		videoId: 'M7lc1UVf-VE',
		// 		events: {
		// 			'onReady': onPlayerReady,
		// 			'onStateChange': onPlayerStateChange
		// 		}
		// 	});
		// }

		// // 4. The API will call this function when the video player is ready.
		// function onPlayerReady(event) {
		// 	event.target.playVideo();
		// }

		// // 5. The API calls this function when the player's state changes.
		// //    The function indicates that when playing a video (state=1),
		// //    the player should play for six seconds and then stop.
		// var done = false;
		// function onPlayerStateChange(event) {
		// 	if (event.data == YT.PlayerState.PLAYING && !done) {
		// 		setTimeout(stopVideo, 6000);
		// 		done = true;
		// 	}
		// }
		// function stopVideo() {
		// 	player.stopVideo();
		// }

    return (
      <div>
        <div>Let's take some notes!</div>
        <div id='player'></div>
      </div>
    )
  }
}

export default NoteTakerContainer
