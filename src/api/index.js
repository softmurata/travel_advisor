import axios from 'axios';

export const getPhotos = async() => {
  try {
    const APIKEY = "AIzaSyDeyjJn71BDfd0R5QGLUqNuDIA8XuMzox8";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.7,139.7&radius=100&type=restaurant&key=${APIKEY}`
    const response = await axios.get(url);
    
    // console.log(response.data.results);
    const data = response.data.results;

    const photourl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT&key=${APIKEY}`
    const photoresponse = await axios.get(photourl);

    // <img src="data:image/jpeg;base64,{binary data}" />

    // console.log(photoresponse)

    return photoresponse;

  } catch(error) {
    console.log(error);
  }
}

export const getOwnPlacesData = async() => {
  try {
    const APIKEY = "AIzaSyDeyjJn71BDfd0R5QGLUqNuDIA8XuMzox8";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.7,139.7&radius=100&type=restaurant&key=${APIKEY}`
    const response = await axios.get(url);
    
    // console.log(response.data.results);
    const data = response.data.results;

    const photourl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT&key=${APIKEY}`
    const photoresponse = await axios.get(photourl);

    // <img src="data:image/jpeg;base64,{binary data}" />

    console.log(data)

    return data;

  } catch(error) {
    console.log(error);
  }
}

export const getPlacesData = async (type, sw, ne) => {
    try {
        const { data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lat,
            },
            headers: {
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
              'X-RapidAPI-Key': '2c3b4e7c54msh0ac7d359f24e6cdp1e6cb5jsn2dcf9b1f34a6'
            }
          });
        

        return data;

    } catch (error){
        console.log(error);
    }
}
