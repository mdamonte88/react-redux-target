import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CircleMarket extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
  };

  render() {
    const {
      className,
      style,
      text
    } = this.props;

    return (
      <div style={style} className={className}>
        {text}
      </div>
    );
  }
}
