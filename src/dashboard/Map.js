import React, { Component } from "react";
import MapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import { Icon } from "semantic-ui-react";
import axios from "axios";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";

const TOKEN =
  "pk.eyJ1Ijoic2ltc2Fsb3IiLCJhIjoiY2tmamhwMWVyMGhmMDMwcWh6MXdiM2VteCJ9.PCIgKMZhUfVyhyECwTQKpg";
const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 51.962078,
        longitude: 7.624472,
        zoom: 14,
        bearing: 0,
        pitch: 0,
        width: "100%",
        height: 700,
      },
      popupInfo: null,
      devices: [],
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      const result_devices = await axios(
        "https://counting-backend.codeformuenster.org/devices"
      );
      this.setState({ devices: result_devices.data });
    };
    fetchData();
  }

  renderPopup(index) {
    return (
      this.state.popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom-right"
          longitude={this.state.devices[index].lon}
          latitude={this.state.devices[index].lat}
          onMouseLeave={() => this.setState({ popupInfo: null })}
          closeOnClick={true}
        >
          <Typography>{this.state.devices[index].id}</Typography>
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    return (
      <MapGL
        {...viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={TOKEN}
      >
        <div className="nav" style={navStyle}>
          <NavigationControl
            onViewportChange={(viewport) => this.setState({ viewport })}
          />
          {this.state.devices.map((marker, index) => {
            var image = "circle";
            if (marker.id.includes("ttgo-beam")){
              image = "wifi"
            }
            else if (marker.id.includes("cam")){
              image = "camera"
            }
            else if (marker.id.includes("mobile")){
              image = "mobile"
            }
            else if (marker.id.includes("_street")){
              image = "camera"
            }
            else if (marker.id.includes("hystreet")){
              image = "magic"
            }

            return (
              <div key={index}>
                <Link href={this.state.devices[index].id}>
                  <Marker longitude={marker.lon} latitude={marker.lat}>
                    <Icon
                      name={image}
                      size="big"
                      onMouseEnter={() => this.setState({ popupInfo: index })}
                      onMouseLeave={() => this.setState({ popupInfo: null })}
                    />
                  </Marker>
                </Link>
              </div>
            );
          })}
          {this.renderPopup(this.state.popupInfo)}
        </div>
      </MapGL>
    );
  }
}
