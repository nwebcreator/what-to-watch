import { renderHook, act } from '@testing-library/react-hooks';
import useVideoPlayer from './use-video-player';

describe('Hook: useVideoPlayer', () => {

  it('should return array with 5 elements', () => {
    const mockVideoRef = { current: null };
    const { result } = renderHook(() =>
      useVideoPlayer(mockVideoRef),
    );

    const { playerState, togglePlay, handleOnTimeUpdate, handleVideoProgress, requestFullscreen } = result.current;

    expect(Object.keys(result.current)).toHaveLength(5);
    expect(playerState).toBeInstanceOf(Object);
    expect(togglePlay).toBeInstanceOf(Function);
    expect(handleOnTimeUpdate).toBeInstanceOf(Function);
    expect(handleVideoProgress).toBeInstanceOf(Function);
    expect(requestFullscreen).toBeInstanceOf(Function);
  });

  it('should be correctly change state', () => {
    const mockVideoRef = {
      current: {
        play: jest.fn(),
        pause: jest.fn(),
        requestFullscreen: jest.fn(),
      } as unknown as HTMLVideoElement,
    };
    const { result } = renderHook(() =>
      useVideoPlayer(mockVideoRef),
    );

    const { togglePlay, requestFullscreen } = result.current;
    expect(result.current.playerState.isPlaying).toEqual(false);
    act(() => togglePlay());
    expect(result.current.playerState.isPlaying).toEqual(true);
    act(() => togglePlay());
    act(() => requestFullscreen());
    act(() => requestFullscreen());

    expect(mockVideoRef.current.play).toBeCalled();
    expect(mockVideoRef.current.pause).toBeCalled();
    expect(mockVideoRef.current.requestFullscreen).toBeCalledTimes(2);
  });
});
