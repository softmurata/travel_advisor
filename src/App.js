import React, { useState, useEffect } from 'react';

import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import { getOwnPlacesData, getPhotos } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';



const App = () => {

    const [places, setPlaces ] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({lat: 35, lng: 150});
    const [bounds, setBounds] = useState({});
    const [childClicked, setChildClicked] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState("");

    const [binaryData, setBinaryData] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, [coordinates])

    useEffect(() => {
        const filteredplaces = places.filter((place) => place.rating > rating);

        setFilteredPlaces(filteredplaces);

    }, [rating]);

    function hexToBase64(str) {
        return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    }

    useEffect(() => {
        setIsLoading(true);

        getPhotos()
        .then((data) => {
            // console.log(data);
            // var binarydata = data;

            // setBinaryData(binarydata);
        })

        getOwnPlacesData()
        .then((data) => {

            // var bdata = data[0].photos[0].photo_reference;
            // setBinaryData(bdata);
            const APIKEY = "AIzaSyDeyjJn71BDfd0R5QGLUqNuDIA8XuMzox8";
            const photo_reference = data[0].photos[0].photo_reference;
            var photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxHeight=200&photo_reference=${photo_reference}&key=${APIKEY}`
            setBinaryData(photo);

            setPlaces(data);
            setIsLoading(false);
        })

        /*
        getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
            setPlaces(data);
            setIsLoading(false);
        })
        */

    }, [type, coordinates, bounds, binaryData])

    return (
        <div>
            <img src={binaryData} />
            <CssBaseline>
                <Header />
                <Grid container spacing={3} style={{ width: '100%'}}>
                    <Grid item xs={12} md={4}>
                        <List 
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Map
                            setCoordinates={setCoordinates}
                            setBounds={setBounds}
                            coordinates={coordinates}
                            places={filteredPlaces.length ? filteredPlaces : places}
                            setChildClicked={setChildClicked}
                        />
                    </Grid>
                </Grid>
            </CssBaseline>
        </div>
    )
}

export default App;
