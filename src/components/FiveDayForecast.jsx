import React from "react";
import { Thermostat, CalendarMonth } from "@mui/icons-material";

// Component to display a five-day weather forecast
const FiveDayForecast = ({ forecastData }) => {
  // Return null if no forecast data is provided
  if (!forecastData) return null;

  // Process the forecast data to get one entry per day
  const dailyForecasts = forecastData.list.reduce((acc, forecast) => {
    const date = new Date(forecast.dt_txt).toLocaleDateString(); // Extract date
    if (!acc[date]) {
      acc[date] = forecast; // Store only the first occurrence of each date
    }
    return acc;
  }, {});

  return (
    <div
      style={{
        marginLeft: "55px", // Add left margin to position the forecast
      }}
    >
      <div
        style={{
          backgroundColor: "#4B5563", // Dark gray background
          color: "white", // White text color
          borderRadius: "0.5rem", // Rounded corners
          width: "250px", // Fixed width
          padding: "20px", // Inner padding
          transition: "transform 0.4s ease, box-shadow 0.4s ease", // Smooth transition effect
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)"; // Slight zoom effect on hover
          e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)"; // Shadow effect
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"; // Reset transform on mouse leave
          e.currentTarget.style.boxShadow = "none"; // Remove shadow effect
        }}
      >
        {/* Loop through the first 5 days of forecast data */}
        {Object.values(dailyForecasts)
          .slice(0, 5) // Limit to 5 days
          .map((forecast, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px", // Space between forecast entries
                display: "flex", // Align elements in a row
                alignItems: "center", // Center items vertically
                justifyContent: "space-between", // Space elements evenly
              }}
            >
              {/* Date Column */}
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  minWidth: "60px", // Consistent width
                }}
              >
                <CalendarMonth
                  style={{ fontSize: "1.2em", marginRight: "5px" }} // Calendar icon
                />
                {new Date(forecast.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short", // Short day name (e.g., Mon, Tue)
                  day: "numeric", // Day number
                })}
              </div>

              {/* Temperature Column */}
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  minWidth: "50px", // Ensures uniform width
                  textAlign: "center",
                }}
              >
                <Thermostat style={{ fontSize: "1.2em", marginRight: "5px" }} />
                {Math.round(forecast.main.temp)}°C {/* Display temperature */}
              </div>

              {/* Weather Description Column */}
              <div
                style={{
                  fontSize: "15px",
                  textAlign: "left",
                  minWidth: "80px", // Ensures text alignment consistency
                }}
              >
                {forecast.weather[0].description} {/* Weather condition text */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;