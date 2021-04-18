import { useContext } from "react";

import { GameContext } from "../../context/game.context";

import VolumeMuteIcon from "@material-ui/icons/VolumeMute";

import "./sound-icon.styles.scss";

const SoundIcon = () => {
  const { setHasSound, hasSound } = useContext(GameContext);

  const handleClick = (e: any) => {
    const soundIcon = e.currentTarget;

    if (hasSound) {
      soundIcon.classList.add("sound-mute");
      setHasSound(false);
    } else {
      soundIcon.classList.remove("sound-mute");
      setHasSound(true);
    }
  };

  return (
    <div className="sound-container">
      <div className="sound sound-mute" onClick={handleClick}>
        <div className="sound--icon fa fa-volume-off"></div>
        <div className="sound--wave sound--wave_one"></div>
        <div className="sound--wave sound--wave_two"></div>
      </div>
    </div>
  );
};

export default SoundIcon;
