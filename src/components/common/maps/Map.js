import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import CircleMarket from './markers/Circle';

const keys = [
  {
    key: 'AIzaSyDLZWU3aS4i_1_mMMf3aNCExQ4YnTYOyKk',
    email: 'mdamonte@rootstrap.com'
  },
  {
    key: 'AIzaSyD-Mg4KaP7Z6BjBWzR1OCQZKoWHUqmIM8g',
    email: 'mdamonte@rootstrap.com'
  }
];

class SimpleMap extends PureComponent {
  static propTypes = {
    center: PropTypes.object,
    zoom: PropTypes.number,
    markers: PropTypes.array,
    topics: PropTypes.array,
    onClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    center: {
      lat: -34.8812514,
      lng: -56.1787937
    },
    zoom: 16
  };

  constructor(props) {
    super(props);
    this.state = {
      currentZoom: '',
      currentCenter: ''
    };
  }

  /*
    Get the Targets from the user.
    In the case that there aren´t markets It will show a few by default
  */
  getTargets(markers) {
    return markers.map(({ target: { id, lat, lng } = {}, target }) =>
      <CircleMarket
        key={id}
        lat={lat}
        lng={lng}
        optionsStyle={this.getMarkersOptions(target)}
      />);
  }

  getMarkersOptions(target) {
    const options = { width: '44px', height: '52px', class: 'markerPoint' };
    this.topics.map((topic) => {
      if (topic.topic.id === target.topicId) {
        options.backgroundImage = `url(${topic.topic.icon})`;
        options.backgroundRepeat = 'no-repeat';
        options.backgroundSize = '50px';
      }
    });

    return options;
  }

  /*
    EVENTS
  */

  /* Parameters center, zoom, bounds, marginBounds */
  _onBoundsChange = (center, zoom) => {
    this.setState({ currentCenter: center, currentZoom: zoom });
  }

  render() {
    const {
      center,
      zoom,
      markers,
      topics,
      onClick
    } = this.props;

    this.topics = this.props.topics;

    return (
      // Important! Always set the container height explicitly
      <div className="googleMapContainer" style={{ height: '100vh', width: '100%' }} >
        <GoogleMapReact
          bootstrapURLKeys={{ key: keys[0].key }}
          defaultCenter={center}
          defaultZoom={zoom}
          onClick={onClick}
          onBoundsChange={this._onBoundsChange}
        >
          {this.getTargets(markers, topics)}
        </GoogleMapReact>

        <div>
          <span> Zoom: {this.state.currentZoom} </span>
          <br />
          <span> Center: {JSON.stringify(this.state.currentCenter)} </span>
          <br />
        </div>
      </div>
    );
  }
}

export default SimpleMap;
