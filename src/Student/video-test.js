import React from 'react';
import VideoPlayer from '../components/VideoPlayer';

export default function Test() {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [{
      src: 'https://vz-2d9b46f9-87f.b-cdn.net/8f508f52-66ca-4d60-aea8-a8b6e4bdfcc2/playlist.m3u8'
    }],
    playbackRates: [0.5, 1, 1.5, 2],
    fluid: true,
  }
  return (
    <div style={{
      width: '640px',
      height: '480px',
    }}
    >
      <VideoPlayer {...videoJsOptions} />
    </div>
  )
}