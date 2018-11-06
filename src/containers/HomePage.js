import React from 'react';

import LogoutButton from 'components/user/LogoutButton';
import TargetPoint from 'components/user/TargetPoint';
import Welcome from 'components/user/Welcome';

const HomePage = () => (
  <div className="slidesContainer homepage">
    <div className="slide col-6">
      <Welcome currentPage="Home" />
      <div className="content">
        <LogoutButton className="sign-in-button" />
      </div>
    </div>
    <div className="slide col-6">
      <TargetPoint />
    </div>
  </div>
);

export default HomePage;
