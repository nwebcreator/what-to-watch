import { useState, useEffect, MutableRefObject } from 'react';

type PlayerState = {
  isPlaying: boolean;
  progress: number;
  timeElapsed: number;
}

type useVideoPlayerState = {
  playerState: PlayerState;
  togglePlay: () => void;
  handleOnTimeUpdate: () => void;
  handleVideoProgress: (manualChange: number) => void;
  requestFullscreen: () => void;
}

const useVideoPlayer = (videoElement: MutableRefObject<HTMLVideoElement | null>): useVideoPlayerState => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    timeElapsed: 0,
  } as PlayerState);

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    playerState.isPlaying
      ? videoElement?.current?.play()
      : videoElement?.current?.pause();
  }, [playerState.isPlaying, videoElement]);

  const handleOnTimeUpdate = () => {
    if (videoElement?.current) {
      const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
      const timeElapsed = videoElement.current.duration -  videoElement.current.currentTime;
      setPlayerState({
        ...playerState,
        progress,
        timeElapsed,
      });
    }
  };

  const handleVideoProgress = (manualChange: number) => {
    if (videoElement?.current) {
      videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
      const timeElapsed = videoElement.current.duration -  videoElement.current.currentTime;
      setPlayerState({
        ...playerState,
        progress: manualChange,
        timeElapsed,
      });
    }
  };

  const requestFullscreen = ()=>{
    videoElement.current?.requestFullscreen();
  };

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    requestFullscreen,
  };
};

export default useVideoPlayer;
