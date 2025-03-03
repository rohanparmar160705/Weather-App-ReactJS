// Importing React and necessary hooks
import React, { useState, useEffect, useCallback } from "react";

// Importing components
import Navbar from "./components/Navbar";
import MainWeatherCard from "./components/MainWeatherCard";
import FiveDayForecast from "./components/FiveDayForecast";
import TodayHighlights from "./components/TodayHighlights";

// Importing axios for API requests
import axios from "axios";

// Importing Material UI components for alerts
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

// Defining the main App component
const App = () => {
  // State for weather data
  const [weatherData, setWeatherData] = useState(null);
  // State for selected city, defaulting to "Indore"
  const [city, setCity] = useState("Indore");
  // State for air quality data
  const [airQualityData, setAirQualityData] = useState(null);
  // State for five-day weather forecast
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  // State for handling errors
  const [error, setError] = useState(null);

  // Function to fetch air quality data using latitude and longitude
  const fetchAirQualityData = useCallback((lat, lon) => {
    const API_KEY = "b66ea02fed92424e315b023e0cbf41c8";

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then((response) => {
        setAirQualityData(response.data.list[0]);
      })
      .catch((error) => console.error("Error fetching air quality:", error));
  }, []);

  // Function to fetch weather data for a city
  const fetchWeatherData = useCallback(
    (city) => {
      const API_KEY = "b66ea02fed92424e315b023e0cbf41c8";

      // Reset error state
      setError(null);

      // Fetch current weather data
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("City not found");
          }
          return response.json();
        })
        .then((data) => {
          setWeatherData(data);
          fetchAirQualityData(data.coord.lat, data.coord.lon);
          return axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
          );
        })
        .then((response) => {
          setFiveDayForecast(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(error.message);
          setWeatherData(null);
          setAirQualityData(null);
          setFiveDayForecast(null);
        });
    },
    [fetchAirQualityData]
  );

  // Fetch weather data when the city changes
  useEffect(() => {
    fetchWeatherData(city);
  }, [city, fetchWeatherData]);

  // Function to handle city search input
  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  // JSX structure for rendering the app
  return (
    <div>
      {/* Navbar with search functionality */}
      <Navbar onSearch={handleSearch} />
      <div style={{ marginTop: "-10px" }}>
        {/* Show error alert if city is not found */}
        {error ? (
          <Stack
            sx={{ width: "95%", textAlign: "center", padding: "2rem" }}
            spacing={2}
          >
            <Alert severity="error">
              City not found. Please try another city.
            </Alert>
          </Stack>
        ) : (
          weatherData &&
          airQualityData && (
            <div style={{ display: "flex", padding: "30px", gap: "20px" }}>
              {/* Main weather card and 5-day forecast */}
              <div style={{ flex: "1", marginRight: "10px" }}>
                <MainWeatherCard weatherData={weatherData} />
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: "20px",
                    marginTop: "20px",
                    marginLeft: "125px",
                  }}
                >
                  5 Days Forecast
                </p>
                {fiveDayForecast && (
                  <FiveDayForecast forecastData={fiveDayForecast} />
                )}
              </div>
              {/* Today's highlights section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: "0.5",
                  gap: "20px",
                }}
              >
                <TodayHighlights
                  weatherData={weatherData}
                  airQualityData={airQualityData}
                />
              </div>
            </div>
          )
        )}
      </div>
      <div>
        <h3
          style={{
            padding: "0",
            margin: "0",
            position: "absolute",
            left: "50px",
            bottom: "15px"
          }}
        >
          Created By- Rohan Parmar March 2025
        </h3>
      </div>
    </div>
  );
};

// Exporting the App component
export default App;
