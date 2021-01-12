import React, { useRef, useState, useEffect } from 'react';
import videojs from 'video.js';
require('videojs-hls-quality-selector');

export const VideoPlayer = () => {
  // console.log('videoplayer ', videoSrc);
  const videoPlayerRef = useRef(null); // Instead of ID
  const [currentTime, setCurrentTime] = useState(null);
  const videoSrc =
    'https://secondtrailhojayenga.s3.ap-south-1.amazonaws.com/data/master.m3u8';

  const videoJSOptions = {
    autoplay: 'muted',
    controls: true,
    userActions: { hotkeys: true },
    playbackRates: [0.5, 1, 1.5, 2],
    qualitySelector: true,
  };

  useEffect(() => {
    if (videoPlayerRef) {
      console.log(videoSrc);
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        player.src(videoSrc);

        player.hlsQualitySelector({
          // displayCurrentQuality: true,
        });
        player.on('ended', () => {
          console.log('ended');
        });
        player.on('timeupdate', () => {
          setCurrentTime(player.currentTime());
        });
        console.log('Player Ready');
      });
    }

    return () => {};
  }, []);

  return (
    <div onContextMenu={(e) => e.preventDefault()} style={{ width: '100%' }}>
      <video
        style={{ width: '100%' }}
        ref={videoPlayerRef}
        className="video-js"
      />

      {/* <GlobalStyle /> */}
    </div>
  );
};
