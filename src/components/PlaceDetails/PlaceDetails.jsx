import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './style';

const PlaceDetails = ({ place, selected, refProp }) => {

    const classes = useStyles();
    const APIKEY = "AIzaSyDeyjJn71BDfd0R5QGLUqNuDIA8XuMzox8";

    // console.log(place);

    if (selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    
    return (
        <Card elevation={6}>
            <CardMedia
               style={{ height: 350 }}
               image={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=350&maxHeight=350&photo_reference=${place.photos[0].photo_reference}&key=${APIKEY}`}
               title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Rating value={Number(place.rating)} readOnly/>
                    <Typography gutterBottom variant="subtitle1">out of {place.num_reviews} reviews</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
                </Box>
                {place?.awards?.map((award) => (
                    <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
                        <img src={award.images.small} alt={award.display_name}/>
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}

                {place?.cuisine?.map(({ name } ) => (
                    <Chip key={name} size="small" label={name} className={classes.chip}/>
                ))}

                {place?.address && (
                    <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                        <LocationOnIcon />{place.address}
                    </Typography>
                )}
                
                {place?.phone && (
                    <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                        <PhoneIcon />{place.phone}
                    </Typography>
                )}

                <CardActions>
                    <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>

            </CardContent>
        </Card>
    )
}

export default PlaceDetails;