import React, { useState, useEffect } from "react";
import styled,{ css } from "styled-components";
import Container from "./Container";

import { Map, TileLayer, Marker, Popup, Polygon, Polyline, FeatureGroup } from 'react-leaflet';

import { EditControl } from "react-leaflet-draw";
import L from 'leaflet';

const defaultMarker = require('../assets/images/defaultMarker.svg');

const MarkerIcon = L.Icon.extend({
    options: {
        iconUrl: defaultMarker,
        iconAnchor: [17.5,46],
        popupAnchor: [0,-48],
        iconSize: [35,46]
    }
});

function ZiptimeMap (props) {
	// const [polygons, setPolygons] = useState(props.polygons || []);
 //    const [markers, setMarkers] = useState(props.markers || []);
 //    const [polylines, setPolylines] = useState(props.polylines || []);
 //    const [center, setCenter] = useState(props.center);
 //    const [zoom, setZoom] = useState(props.zoom);
    const { 
        polygons=[],
        markers=[],
        polylines=[],
        center,
        zoom,
        editableFeatures=[] 
    } = props;

    let leafletMap;
    let _editableFG;

    useEffect(() => {
        verifyBounds();
    }, [polygons, markers, polylines, center, zoom])

    const verifyBounds = () => {
        let bounds = [];

        for (let i = 0; i < polylines.length; i++) { bounds = bounds.concat(polylines[i].path); }
        
        for (let i = 0; i < polygons.length; i++) { bounds = bounds.concat(polygons[i].bounds); }

        for (var i = 0; i < markers.length; i++) { bounds.push(markers[i].position); }
        
        for (var i = 0; i < editableFeatures.length; i++) { 
            if (editableFeatures[i].type == 'Point') { bounds.push(editableFeatures[i].coordinates); }
            else if (editableFeatures[i].type == 'Polygon') { bounds = bounds.concat(editableFeatures[i].coordinates); }
        }

        bounds = bounds.map(coord => L.latLng(coord));
        if (bounds.length == 1) { bounds = bounds[0].toBounds(500); }

        bounds = new L.latLngBounds(bounds);

        if (bounds.isValid()) { 
            if (bounds.getNorthEast().lat != bounds.getSouthWest().lat && bounds.getNorthEast().lng != bounds.getSouthWest().lng) {
                return leafletMap.leafletElement.fitBounds(bounds, {animate:false}); 
            }

            leafletMap.leafletElement.fitBounds(bounds.getNorthEast().toBounds(500),{animate:false});
        }
    }


    const _onChange = () => {

        // _editableFG contains the edited geometry, which can be manipulated through the leaflet API
        const { featureChanged } = props;

        if (!_editableFG || !featureChanged) { return; }

        let geojsonData = {
            type: "FeatureCollection",
            features: []
        };

        for (let leaflet_id in _editableFG.leafletElement._layers) {
            let layer = _editableFG.leafletElement._layers[leaflet_id];

            if((layer.options.properties || {}).notEditable && layer.options.position){
                let oldCoord = layer.options.position;
                if(oldCoord.lng && oldCoord.lat){
                    layer._latlng = {
                        ...layer._latlng,
                        lat: oldCoord.lat,
                        lng: oldCoord.lng
                    }
                }
            }

            geojsonData.features.push({
                ...layer.toGeoJSON(),
                properties: layer.options.properties
            });
        }

        _editableFG.leafletElement.eachLayer(layer => {
            if (!layer.options.properties) { _editableFG.leafletElement.removeLayer(layer); }
        });

        featureChanged(geojsonData);
    }

    const _onEdited = (e) => {
        _onChange();
    }

    const _onCreated = (e) => {

        _onChange();
    }

    const _onDeleted = (e) => {
    
        _onChange();
    }

    const _onEditStart = (e) => {
        // console.log('_onEditStart', e);
    }

    const _onEditStop = (e) => {
        // console.log('_onEditStop', e);
    }

    return (
        <div>
            <Container
                float="left"
                height={props.height || "500px"}
                width={props.width || "100%"}
                borderRadius= "4px"
                marginBottom={props.marginBottom}
            >
                <Map 
                    ref={leaf => {
                        leafletMap = leaf
                    }}
                    editable 
                    center={center || {lng:-46.633950,lat:-23.550389}} 
                    zoom={zoom || 16} 
                    maxBounds={props.maxBounds}
                    maxZoom={18}
                    // zIndexOffset={-100}
                    zIndex={100}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" colorido
                    />

                    {props.editMap &&
                        <FeatureGroup 
                            ref={(reactFGref) => { _editableFG = reactFGref; }}
                        >
                            <EditControl
                                position='topright'
                                onEdited={_onEdited}
                                onCreated={_onCreated}
                                onDeleted={_onDeleted}
                                onMounted={_onMounted}
                                onEditStart={_onEditStart}
                                onEditStop={_onEditStop}
                                onDeleteStart={_onDeleteStart}
                                onDeleteStop={_onDeleteStop}
                                draw={{
                                    polygon: props.drawPolygon || false,
                                    rectangle: props.drawRectangle || false,
                                    polyline: props.drawPolyline || false,
                                    circle: props.drawCircle || false,
                                    marker: props.drawMarker || false,
                                    circlemarker: props.drawCircleMarker || false
                                }}
                            />
                            
                            {editableFeatures.map((feature,index) => {
                                if (feature.type == 'Point') {
                                    return (
                                        <Marker 
                                            position={feature.coordinates} 
                                            key={feature.properties.index != undefined ? feature.properties.index : index}
                                            properties={feature.properties}
                                            icon={new MarkerIcon({
                                                iconUrl: ((feature.properties || {}).style || {}).icon || defaultMarker,
                                                iconAnchor: ((feature.properties || {}).style || {}).iconAnchor || [17.5,46],
                                                popupAnchor: ((feature.properties || {}).style || {}).popupAnchor || [0,-48],
                                                iconSize: ((feature.properties || {}).style || {}).iconSize || [35,46]
                                            })}
                                        >
                                            {(feature.properties || {}).infoWindow &&
                                                <Popup>{(feature.properties || {}).infoWindow}</Popup>
                                            }
                                        </Marker>
                                    )
                                } else if(feature.type == 'Polygon') {
                                    return (
                                        <Polygon 
                                            key={`${Math.random()}|||${feature.properties.index != undefined ? feature.properties.index : index}`}
                                            properties={feature.properties}
                                            positions={(feature.coordinates || []).map(coords => [coords.lat,coords.lng])}
                                            color={(feature.properties || {}).color || "red"}
                                        />
                                    )
                                }
                                
                                return <div key={index}/>
                            })}
                        </FeatureGroup>
                    }
        
                    <div>
                        {markers.map((marker,key) => {
                            return (
                                <Marker 
                                    position={marker.position} 
                                    key={key}
                                    icon={new MarkerIcon({
                                        iconUrl: marker.icon || defaultMarker,
                                        iconAnchor: marker.iconAnchor || [17.5,46],
                                        popupAnchor: marker.popupAnchor || [0,-48],
                                        iconSize: marker.iconSize || [35,46]
                                    })}
                                >
                                    {marker.infoWindow &&
                                        <Popup>{marker.infoWindow}</Popup>
                                    }
                                </Marker>
                            )
                        })}

                        {polygons.map((polygon,key) => {
                            return(
                                <Polygon 
                                    key={key}
                                    positions={polygon.bounds.map(coords => [coords.lat,coords.lng])}
                                    color={polygon.color || "red"}
                                />
                            )
                        })}
              
                        {polylines.map((polyline,key) => {
                            return (
                                <Polyline 
                                    key={key}
                                    positions={polyline.path}
                                    color={polyline.color}
                                    weigth={polyline.weight}
                                    opacity={polyline.opacity}
                                />
                            )
                        })}
                    </div>
                </Map>
            </Container>
        </div>
    );
	
}

export default ZiptimeMap;