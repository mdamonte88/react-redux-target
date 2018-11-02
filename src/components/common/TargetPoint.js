import React from 'react';

// Imagenes
import facebookIcon from './../../assets/socialNetworks/facebook@3x.png';
import twitterIcon from './../../assets/socialNetworks/twitter@3x.png';
import playVideoIcon from './../../assets/phone/play@3x.png';

const TargetPoint = () => (
  <div>
    <div id="phone" className="phone">
      <img id="playVideo" alt="playVideo" src={playVideoIcon} />
    </div>
    <div id="appleStore" />
    <div id="socialNetworks">
      <img id="facebookIcon" className="icon" alt="Facebook" src={facebookIcon} />
      <img id="twitterIcon" className="icon" alt="twitter" src={twitterIcon} />
    </div>
  </div>
);

export default TargetPoint;
