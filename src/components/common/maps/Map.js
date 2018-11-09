import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import CircleMarket from './markers/Circle';

const keys = [{ key: 'AIzaSyDLZWU3aS4i_1_mMMf3aNCExQ4YnTYOyKk', email: 'mdamonte@rootstrap.com' },
  { key: 'AIzaSyD-Mg4KaP7Z6BjBWzR1OCQZKoWHUqmIM8g', email: 'mdamonte@rootstrap.com' }];

class SimpleMap extends PureComponent {
  static propTypes = {
    center: PropTypes.object,
    zoom: PropTypes.number
  };

  static defaultProps = {
    center: {
      lat: -34.8812514,
      lng: -56.1787937
    },
    zoom: 15
  };

  getDefaultTargets() {
    const markers = [{ id: 1, lat: -34.8794514, lng: -56.1779299, options: { width: '44px', height: '52px', class: 'markerPoint' } },
      { id: 2, lat: -34.8798514, lng: -56.1854299, options: { width: '44px', height: '52px', class: 'markerPoint' } },
      { id: 3, lat: -34.8768514, lng: -56.1840299, options: { width: '44px', height: '52px', class: 'markerPoint' } },
      { id: 4, lat: -34.8748514, lng: -56.1839299, options: { width: '44px', height: '52px', class: 'markerPoint' } },
      { id: 5, lat: -34.8738514, lng: -56.1891299, options: { width: '44px', height: '52px', class: 'markerPoint' } }
    ];

    return markers.map(marker => <CircleMarket key={marker.id} lat={marker.lat} lng={marker.lng} text="" optionsStyle={marker.options} />);
  }

  render() {
    const {
      center,
      zoom
    } = this.props;

    return (
      // Important! Always set the container height explicitly
      <div className="googleMapContainer" style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: keys[0].key }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {this.getDefaultTargets()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
