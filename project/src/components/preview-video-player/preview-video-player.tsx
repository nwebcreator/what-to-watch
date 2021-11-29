import { useEffect, useRef, useState } from 'react';

type PreviewVideoPlayerProps = {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  width?: string | number;
  height?: string | number;
};

function PreviewVideoPlayer({ src, poster, autoPlay, muted, width, height }: PreviewVideoPlayerProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (autoPlay) {
      const autoPlayTimer = setTimeout(() => setIsPlaying(true), 1000);
      return () => {
        clearTimeout(autoPlayTimer);
      };
    }
  }, [autoPlay]);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [isPlaying]);

  return (
    <video muted={muted} poster={poster} width={width} height={height} ref={videoRef}>
      <source src={src}></source>
    </video>
  );
}

export default PreviewVideoPlayer;
