const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
const apiKey = process.env.API_KEY;

app.get("/weather", async (req, res) => {
  const latlng = req.params.q;

  try {
    const response_key = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search`,
      {
        params: {
          apikey: apiKey,
          q: latlng,
        },
      }
    );

    const weatherKey = response_key.data.Key;

    const response_weather = await axios.get(
      `https://dataservice.accuweather.com/currentconditions/v1/${weatherKey}`,
      {
        params: {
          apikey: apiKey,
        },
      }
    );
    res.json(response_weather.data);
  } catch (error) {
    console.error("Error fetching weather info:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching weather info" });
  }
});

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
