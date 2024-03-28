const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;


app.get('/weather', async (req, res) => {
    const latlng = "35.17,33.37"
  
    try {
      const response_key = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search`, {
        params: {
          apikey: apiKey,
          q: latlng
        }
      });
  
      const weatherKey = response_key.data.Key;
  
      const response_weather = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${weatherKey}`, {
        params: {
          apikey: apiKey
        }
      });
      res.json(response_weather.data);
    } catch (error) {
      console.error('Error fetching weather info:', error);
      res.status(500).json({ error: 'An error occurred while fetching weather info' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  