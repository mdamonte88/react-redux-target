import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CircleMarket extends PureComponent {
  static propTypes = {
    id: PropTypes.number,
    text: PropTypes.string,
    target: PropTypes.object,
    style: PropTypes.object
  };

  render() {
    const {
      id,
      style,
      text
    } = this.props;

    const { target } = this.props;
    const className = (id === target.id) ? 'marker-point__selected' : 'marker-point';

    return (
      <div id={`target-${id}`} style={style} className={className} >
        {text}
      </div>
    );
  }
}

const mapState = state => ({
  target: state.getIn(['target', 'target']).toJS()
});

const mapDispatch = () => ({});

export default connect(mapState, mapDispatch)(CircleMarket);
