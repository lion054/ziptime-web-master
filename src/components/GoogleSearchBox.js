import React, {Component} from "react";
import styled,{ css } from "styled-components";
import { GoogleApiWrapper } from "google-maps-react";
import Google from "../helpers/google";
import Input from "./Input";

class GoogleSearchBox extends Component {
	state = {
    google: {},
    defaultValue: this.props.defaultValue || "",
    value: this.props.value || ""
  }

  initialSearchBox = () => {
    let google = this.props.google;

    let input;
    if (this.addressField && this.addressField.current && this.addressField.current.basicField && this.addressField.current.basicField.current) {
      input = this.addressField.current.basicField.current;
    }

    if(!this.state.googleItem && input != undefined){
      let googleItem = new google.maps.places.Autocomplete(input,{fields:['address_component', 'formatted_address','place_id','geometry','name']});
      
      googleItem.addListener("place_changed", () => {
        let addressRetrived = googleItem.getPlace();

        addressRetrived.typedString = this.state.typedString;

        let location = addressRetrived;

        let address = {
          formattedAddress: location.formatted_address,
          typedString: location.typedString,
          googlePlaceId: location.place_id,
          coordinates: {
              lng: location.geometry.location.lng(),
              lat: location.geometry.location.lat()
          },
          name: location.name,
          type: 2
        }

        let addressComponents = location.address_components || [];
        for (var i = 0; i < addressComponents.length;i++) {
          if (addressComponents[i].types.indexOf("neighborhood") !== -1) address.neighborhood = addressComponents[i].short_name;
          if (!address.neighborhood) {if (addressComponents[i].types.indexOf("sublocality") !== -1) address.neighborhood = addressComponents[i].short_name;}
          if (addressComponents[i].types.indexOf("route") !== -1)  address.street = addressComponents[i].short_name;
          if (addressComponents[i].types.indexOf("street_number") !== -1) address.number = addressComponents[i].short_name;
          if (addressComponents[i].types.indexOf("postal_code") !== -1) address.cep = addressComponents[i].short_name;
          if (addressComponents[i].types.filter(type => ["locality","administrative_area_level_2"].includes(type)).length > 0) address.city = addressComponents[i].short_name;
          if (addressComponents[i].types.indexOf("administrative_area_level_1") !== -1) address.state = addressComponents[i].short_name;
        }

        this.props.onSelectAddress(address);
      });
      this.setState({googleItem});
    }
  };

  addressField = null;

  constructor(props){
    super(props);

    this.addressField = React.createRef();
  }

  componentDidMount = () => {
    this.initialSearchBox();
  }

  componentDidUpdate(prevProps) {
    if (this.props.defaultValue != prevProps.defaultValue) {
      if (this.addressField && this.addressField.current) {
        this.addressField.current.basicField.current.value = this.props.defaultValue;
      }
      
    }
  }

  handleChangeAddress = event => {
    this.setState({typedString: event.target.value});

    if (this.props.onChange != undefined) {
      this.props.onChange(event);
    }
  }

  handleClearAddress = (item) => {
    var { defaultValue } = this.state;
    defaultValue = "";
    this.setState({defaultValue});
    if(this.props.onClear){ this.props.onClear(); }
  };

	render(){
		return (
      <div>
        <Input
          floatSvg={this.props.floatSvg}
          type="normal"
          widthContainer = {this.props.width}
          parentWidth={this.props.width || "85%"}
          parentHeight={this.props.height ||  35}
          position="relative"
          float="left"
          marginTop={this.props.marginTop ? this.props.marginTop : "5"}
          paddingLeft={this.props.paddingLeft}
          marginLeftSvg={this.props.marginLeftSvg}
          marginTopSvg={this.props.marginTopSvg}
          marginBottom={this.props.marginBottom}
          paddingRight={this.props.paddingRight}
          marginRightSvg={this.props.marginRightSvg}
          disabled={this.props.disabled || false}
          cursorChange={this.props.cursorChange}
          placeholder={this.props.placeholder || "Buscar endereço"}
          ref={this.addressField}
          handleClear={this.handleClearAddress}
          onChange={this.handleChangeAddress}
          defaultValue={this.state.defaultValue}
          noBtnClose={this.props.noBtnClose}
          marginLeft={this.props.marginLeft}
          marginRight={this.props.marginRight}
          onClick={this.props.onClick}
        />
      </div>
    );
	}

}

export default GoogleApiWrapper({
  apiKey: Google.apiKey,
  language:"pt-BR"
})(GoogleSearchBox);