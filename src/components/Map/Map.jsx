import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from "./style";


const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {

    const classes = useStyles();

    const isDesktop = useMediaQuery('(min-width: 600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAXC7m5iZw_562wu1MfXBrOhL52CPMdji8' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => {
                    setChildClicked(child);
                }}
            >
                {places?.map((place, i) => (
                    <div
                       className={classes.markerContainer}
                       lat={Number(place.geometry.location.lat)}
                       lng={Number(place.geometry.location.lng)}
                       key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.icon ? place.icon : "https://loco-pctr.c.yimg.jp/L1nT0Ke8h94Ofz4d8DOMV8i56SkP1DLoQV-fLBzXXF0oME3S_myxqS68rh6nvrqlZx8_Dakpr1w8vcef4VuLsCshH2GrJJpMZv3FfmbtaV8LdR6q6MLuk-FIVxhzp1_YTo2ElyhkCQPm91vsHdNESsyUZ9a5S2WEER6CLRRvXOPwDBgB6VLQcNCSme0pP2Nn"}
                                        alt={place.name} 
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }

                    </div>
                ))}

            </GoogleMapReact>
        </div>
    )
}

export default Map;