import React from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
import 'videojs-mobile-ui';
import 'videojs-mobile-ui/dist/videojs-mobile-ui.css';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';
require('videojs-playbackrate-adjuster');

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });
    this.player.mobileUi();
    this.player.hlsQualitySelector({
      displayCurrentQuality: true,
    });

    this.player.on('timeupdate', (e, d) => {
      videojs.log(e);
      console.log(this.player.currentTime());
    });
    this.player.on('seeked', (...args) => {
      console.log(args);
      console.log('seeked to ', this.player.currentTime());
    })
  };

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video ref={node => this.videoNode = node} className="video-js"></video>
        </div>
      </div>
    )
  }
}
