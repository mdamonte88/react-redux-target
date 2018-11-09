import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CircleMarket extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    optionsStyle: PropTypes.object
  };

  render() {
    const {
      optionsStyle,
      text
    } = this.props;

    return (
      <div style={optionsStyle} className={optionsStyle.class}>
        {text}
      </div>
    );
  }
}