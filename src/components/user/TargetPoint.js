import React from 'react';

// Imagenes
import facebookIcon from './../../assets/socialNetworks/facebook@3x.png';
import twitterIcon from './../../assets/socialNetworks/twitter@3x.png';
import playVideoIcon from './../../assets/phone/play@3x.png';

const TargetPoint = () => (
  <div className="targetPoint">
    <div className="phone">
      <img className="playVideo" alt="playVideo" src={playVideoIcon} />
    </div>
    <div className="apple-store" />
    <div className="social-networks">
      <img className="icon" alt="Facebook" src={facebookIcon} />
      <img className="icon" alt="twitter" src={twitterIcon} />
    </div>
  </div>
);

export default TargetPoint;
