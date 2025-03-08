import React from "react";

function Player() {
  const isreference = React.useRef(null);
  const [isplaying, setIsplaying] = React.useState(true);
  const [currentsong, setCurrentsong] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const handleTimeUpdate = () => {
    setCurrentTime(isreference.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(isreference.current.duration);
  };
  React.useEffect(() => {
    if (isreference.current) {
      isreference.current.load();
      isreference.current.play();
    }
  }, [currentsong]);

  const handleplaypause = () => {
    if (isreference.current.paused) {
      setIsplaying(false);
      isreference.current.play();
    } else {
      setIsplaying(true);
      isreference.current.pause();
    }
  };
  const handleprevious = () => {
    if (currentsong > 0) {
      setCurrentsong(currentsong - 1);
      console.log(currentsong);
    }
  };
  const handlenext = () => {
    if (currentsong < 1) {
      setCurrentsong(currentsong + 1);
      console.log(currentsong);
    }
  };

  const handleSliderChange = (event) => {
    const newTime = parseFloat(event.target.value);
    isreference.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const playersong = [
    {
      songname: "Pretty's On The Inside",
      songurl: "/songs/Chloe Adams - Pretty's On The Inside (Nightcore).mp3",
    },
    {
      songname: "Brown Eyed Girl",
      songurl: "/songs/Van Morrison - Brown Eyed Girl (Official Audio).mp3",
    },
  ];
  return (
    <div>
      <h1>Music Beats</h1>
      <div className="box">
        <div className="aligner">
        <h2>Playing song!</h2>
        <h2>{playersong[currentsong].songname}</h2>
        <audio
          ref={isreference}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        >
          <source src={playersong[currentsong].songurl}></source>
        </audio>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          step="0.1"
          onChange={handleSliderChange}
          className="slider"
        />

        <p className="minecraft-font">
          {formatTime(currentTime)} / {formatTime(duration)}
        </p>
        <div>
          <button
            id="btn-back"
            className="minecraft-btn-alt"
            onClick={handleprevious}
          >
            Back
          </button>
          <button
            id="btn-play"
            className={isplaying ? "minecraft-btn" : "minecraft-btn-pause"}
            onClick={handleplaypause}
          >
            {isplaying ? "▶ Play" : "⏹ Stop"}
          </button>
          <button
            id="btn-next"
            className="minecraft-btn-alt"
            onClick={handlenext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Player;
