import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useVideoPlayer from '../../hooks/use-video-player';
import { AppRoute, CreateAppRoute } from '../../routes';
import { redirectToRoute } from '../../store/action';
import { fetchFilmAction } from '../../store/api-actions';
import { getFilm } from '../../store/films-data/selectors';
import { formatDuration } from '../../utils';
import LoadingScreen from '../loading-screen/loading-screen';

import FullScreenSVG from '../../assets/img/icons/full-screen.svg';
import PauseSVG from '../../assets/img/icons/pause.svg';
import PlaySVG from '../../assets/img/icons/play-s.svg';

function PlayerPage(): JSX.Element {
  const id = parseInt(useParams<{ id: string }>().id, 10);
  const film = useSelector(getFilm);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const {
    playerState,
    togglePlay,
    requestFullscreen,
    handleOnTimeUpdate,
    handleVideoProgress,
  } = useVideoPlayer(videoRef);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id && id !== film?.id) {
      dispatch(fetchFilmAction(id));
    }
  }, [dispatch, id, film?.id]);

  if (!film) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="player">
      <video className="player__video" poster={film.previewImage} ref={videoRef} onTimeUpdate={handleOnTimeUpdate}>
        <source src={film.videoLink}></source>
      </video>

      <button type="button" className="player__exit" onClick={() => {
        dispatch(redirectToRoute(CreateAppRoute[AppRoute.Film](id)));
      }}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time" onClick={(evt) => {
            const offsetX = evt.clientX - evt.currentTarget.offsetLeft;
            const totalWidth = evt.currentTarget.clientWidth;
            const change = Math.floor(offsetX / totalWidth * 100);
            handleVideoProgress(change);
          }}
          >
            <progress className="player__progress" value={playerState.progress} max="100">
            </progress>
            <div className="player__toggler" style={{ left: `${playerState.progress}%` }}>Toggler</div>
          </div>
          <div className="player__time-value">{formatDuration(playerState.timeElapsed)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={() => togglePlay()}>
            {playerState.isPlaying ? <img src={PauseSVG} alt="Pause" /> : <img src={PlaySVG} alt="Play" />}
            <span>{playerState.isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen" onClick={() => requestFullscreen()}>
            <img src={FullScreenSVG} alt="Full screen" />
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;
