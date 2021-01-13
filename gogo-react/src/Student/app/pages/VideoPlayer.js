import React, { useRef, useState, useEffect } from 'react';
import videojs from 'video.js';
import videojsqualityselector from 'videojs-hls-quality-selector';
import 'videojs-contrib-quality-levels';

export const VideoPlayer = ({ videoSrc }) => {
  const videoPlayerRef = useRef(null); // Instead of ID
  const [currentTime, setCurrentTime] = useState(null);
  // const videoSrc =
  //   'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8';

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

        // player.hlsQualitySelector({
        //   displayCurrentQuality: true,
        // });

        player.hlsQualitySelector = videojsqualityselector;
        player.hlsQualitySelector({ displayCurrentQuality: true });

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
  }, [videoSrc]);

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
