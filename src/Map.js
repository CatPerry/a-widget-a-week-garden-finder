import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { ReactDOM } from 'react-dom';
import { MAP_KEY } from './keys';
const google = window.google = window.google ? window.google : {}

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onButtonClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        selectedPlace: props,
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
  
  render() {
    const style = {
      width: '100vw',
      height: '70vh'
    }

    if (!this.props.loaded) {
      return (
        <div ref='map'>
          Loading map...
      </div>
      )
    }
    return (
      <Map 
        google={this.props.google} 
        initialCenter={{
          lat: 40.7829,
          lng: -73.9654
        }}
        zoom={14}
        centerAroundCurrentLocation={false}
        animation={google.maps.Animation.DROP}
        >

        <Marker onClick={this.onMarkerClick}
          name={'Current location'}
          animation={google.maps.Animation.DROP} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div ref='map'>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: (MAP_KEY)
})(MapContainer)
