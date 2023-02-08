import { describe, expect, test, vi } from "vitest";
describe("spyOn", () => {
  test("method", () => {
    const video = {
      play() {
        return true;
      },
    };

    const spy = vi.spyOn(video, "play");
    expect(spy).not.toHaveBeenCalled();
    const isPlaying = video.play();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(isPlaying).toBe(true);
  });

  test("accessType", () => {
    const audio = {
      _volume: 1,
      set volume(value) {
        this._volume = value;
      },
      get volume() {
        return this._volume;
      },
    };

    const setSpy = vi.spyOn(audio, "volume", "set");
    const getSpy = vi.spyOn(audio, "volume", "get");

    expect(setSpy).not.toHaveBeenCalled();
    expect(getSpy).not.toHaveBeenCalled();

    audio.volume = 100;
    expect(setSpy).toHaveBeenCalledTimes(1);
    expect(setSpy).toHaveBeenCalledWith(100);

    const volume = audio.volume;
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(volume).toBe(100);
  });
})