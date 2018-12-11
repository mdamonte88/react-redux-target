import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CircleMarket extends PureComponent {
  static propTypes = {
    id: PropTypes.number,
    text: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
  };

  render() {
    const {
      className,
      id,
      style,
      text
    } = this.props;

    return (
      <div id={`target-${id}`} style={style} className={className}>
        {text}
      </div>
    );
  }
}
