import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import { meters2ScreenPixels } from 'google-map-react/utils';
import PropTypes from 'prop-types';
import PointMarker from './markers/Point';
import CircleMarker from './markers/Circle';

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
    onClick: PropTypes.func.isRequired,
    onChildClick: PropTypes.func.isRequired
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
    In the case that there aren´t markers It will show a few by default
  */
  getTargets(markers) {
    return markers.map(({ target: { id, lat, lng } = {}, target }) =>
      (id === -1 ?
        <PointMarker
          key={id}
          id={id}
          lat={lat}
          lng={lng}
        /> :
        <CircleMarker
          key={id}
          id={id}
          lat={lat}
          lng={lng}
          style={this.getMarkersStyles(target)}
        />));
  }

  getMarkersStyles({ lat, lng, radius, topicId }) {
    const { w, h } = meters2ScreenPixels(radius, { lat, lng }, this.state.currentZoom);

    const options = {
      width: w,
      height: h,
    };
    this.topics.map(({ topic }) => {
      if (topic.id === topicId) {
        options.backgroundImage = `url(${topic.icon})`;
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
      onClick,
      onChildClick
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
          onChildClick={onChildClick}
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
