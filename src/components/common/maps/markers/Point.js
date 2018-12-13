import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class PointMarket extends PureComponent {
  static propTypes = {
    style: PropTypes.object
  };

  render() {
    const {
      style,
    } = this.props;

    return (
      <div id="target-new" style={style} className="marker-point__new" >
        <div className="point" />
      </div>
    );
  }
}
