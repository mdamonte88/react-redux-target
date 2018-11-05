import React from 'react';
import { FormattedMessage } from 'react-intl';

import LogoutButton from 'components/user/LogoutButton';
import TargetPoint from 'components/common/TargetPoint';

const HomePage = () => (
  <div className="slidesContainer homepage">
    <div className="slide col-6">
      <p className="title"><FormattedMessage id="home.welcome" /></p>
      <LogoutButton />
    </div>
    <div className="slide col-6">
      <TargetPoint />
    </div>
  </div>
);

export default HomePage;
