import axios from 'axios';

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json'; // Updated endpoint

const config = {
  params: {
    key: import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
  },
};

export const GetPlaceDetail = (data) => {
  const query = encodeURIComponent(data.textQuery);
  return axios.get(`${BASE_URL}?query=${query}`, config);
};

export const PHOTO_REF_URL = `https://maps.googleapis.com/maps/api/place/photo?maxheight=1000&maxwidth=600&photoreference={NAME}&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
