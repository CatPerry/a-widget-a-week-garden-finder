import React, { Component } from 'react';
import MapContainer from './Map';
import { Map, InfoWindow, Marker, GoogleApiWrapper, toggleBounce } from 'google-maps-react';
import $ from 'jquery';

//next feature to implement:
//map all data points on a map layer for a given list by button click, e.g.: for data: use 
// this.state.data forEach/map.
const google = window.google = window.google ? window.google : {}
var map, position, marker, infowindow;

class Json extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      commGard: [],
      foodStations: [],
      lat: 0,
      lng: 0,
    };
    this.moveToLocation = this.moveToLocation.bind(this);
  }

  moveToLocation = (e) => {    
    const style = {
      width: '100vw',
      height: '100vh'
    }
    let arr = e.target.id.split(',');
    let lat = parseFloat(arr[0]);
    let lng = parseFloat(arr[1]);
    let name = arr[2];
    let address = arr[3]; 
    let additionalinfo;

    let mapOptions = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    if (arr[4] !== undefined) {
      additionalinfo = arr[4];
      infowindow = new google.maps.InfoWindow({
        content: `<strong>${name}</strong><br>${address}<br><br>${additionalinfo}`,
        maxWidth: 200
      });
    } else {
      infowindow = new google.maps.InfoWindow({
        content: `<strong>${name}</strong><br>${address}`,
        maxWidth: 200
      });
    }

    map = new google.maps.Map(document.querySelector(".extra"),
      mapOptions);
    let center = new google.maps.LatLng(lat, lng);
    // using global variable:
    map.panTo(center);
    marker = new google.maps.Marker({
      position: {lat: lat, lng: lng}, 
      map: map,
      animation: google.maps.Animation.DROP,
      });
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });
  }

  componentDidMount() {
    fetch('https://data.cityofnewyork.us/resource/w5vt-2izh.json')
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch(err => console.error(err));
      

    fetch('https://data.cityofnewyork.us/resource/yes4-7zbb.json')
      .then(response => response.json())
      .then(data => this.setState({ commGard: data }))
      .catch(err => console.error(err));

    fetch('https://data.cityofnewyork.us/resource/94pk-v63f.json')
      .then(response => response.json())
      .then(data => this.setState({ foodStations: data }))
      .catch(err => console.error(err));
  }

  render() {
    const { data } = this.state;
    const { commGard } = this.state;
    const { foodStations } = this.state;
    const { lat , lng } = this.state;
    return (
      <div className="container">
        <div className="mapArea"></div>
        <ul className="colA">
          <h2>Manhattan Gardens</h2>
          {data.map(hit =>
            <li key={`${hit.bbl}${hit.location}`}>
              <p><strong>{hit.name}</strong></p>
              <p>{hit.location}</p>
              <p>{hit.type}</p>
              <button 
                id={`${hit.latitude},${hit.longitude},${hit.name},${hit.location}`} 
                onClick={(e) => this.moveToLocation(e, lat , lng, hit )} 
                props={this.props}>
                Map location
              </button>
            </li>
          )}
        </ul>
        <ul className="colA">
          <h2>Food Markets/Food Boxes</h2>
          {foodStations.map(food =>
            <li key={`${food.address}`}>
              <p><a href={food.website}><strong>{food.facilityname}</strong></a></p>
              <p>{food.address}</p>
              <p>{food.accepts_ebt}</p>
              <p>{food.additionalinfo}</p>
              <button
                id={`${food.latitude},${food.longitude},${food.facilityname},${food.address},${food.additionalinfo}`}
                onClick={(e) => this.moveToLocation(e, lat, lng, food)}
                props={this.props}>
                Map location
              </button>
            </li>
          )}
        </ul>
        <ul className="colR">
          <h2>Community Gardens (all boros)</h2>
          {commGard.map(gard =>
            <li key={`${gard.bbl}${gard.address}`}>
              <p><strong>{gard.garden_name}</strong></p>
              <p>{gard.neighborhoodname}</p>
              <p>{gard.address}</p>
              <button
                id={`${gard.latitude},${gard.longitude},${gard.garden_name},${gard.address}`}
                onClick={(e) => this.moveToLocation(e, lat, lng, gard)}
                props={this.props}>
                Map location
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Json;