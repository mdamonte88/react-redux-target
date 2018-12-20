import React from 'react';
import PropTypes from 'prop-types';

const PointMarker = ({ style }) => (
  <div id="target-new" style={style} className="marker-point__new" >
    <div className="point" />
  </div>
);

PointMarker.propTypes = {
  style: PropTypes.object
};

export default PointMarker;
