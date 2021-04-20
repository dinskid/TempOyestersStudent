import React, { useRef, useState, useEffect } from 'react';
import videojs from 'video.js';
import videojsqualityselector from 'videojs-hls-quality-selector';
import 'videojs-contrib-quality-levels';
import './video.css';
import { Scrollbars } from 'react-custom-scrollbars';
export const VideoPlayer = (type) => {
  const videoPlayerRef = useRef(null); // Instead of ID
  const [currentTime, setCurrentTime] = useState(null);
  const [play, setPlay] = useState(null);
  const videoSrc =
    'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8';

  const videoJSOptions = {
    controls: true,
    autoplay: false,
    userActions: { hotkeys: true },
    playbackRates: [0.5, 1, 1.5, 2],
    qualitySelector: true,
  };
  console.log(type);
  useEffect(() => {
    if (videoPlayerRef && type.videoSrc) {
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        player.src(type.videoSrc);

        // player.hlsQualitySelector({
        //   displayCurrentQuality: true,
        // });
        setPlay(player);

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
  }, [type.videoSrc, play]);

  useEffect(() => {
    if (play && type.videoSrc) {
      play.hlsQualitySelector = videojsqualityselector;
      play.hlsQualitySelector({ displayCurrentQuality: true });
    }
  }, [play]);

  if (type.videoSrc) {
    return (
      // <div style={{ position: 'relative', paddingTop: '56.25%' }}>
      //   <iframe
      //     src="https://iframe.mediadelivery.net/embed/2513/e5178aa9-8683-4587-8807-372b1691ed46"
      //     loading="lazy"
      //     style={{
      //       border: 'none',
      //       position: 'absolute',
      //       top: '0',
      //       height: '100%',
      //       width: '100%',
      //     }}
      //     allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      //     allowfullscreen="true"
      //   ></iframe>
      // </div>
      <div
        className="videoPlayerContainer_jt"
        onContextMenu={(e) => e.preventDefault()}
        style={{ width: '100%' }}
      >
        <video
          style={{ width: '100%', height: '100%' }}
          ref={videoPlayerRef}
          className="video-js"
        />
      </div>
    );
  }
};
