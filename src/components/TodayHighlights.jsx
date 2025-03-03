import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import HighlightBox from "./HighlightBox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompressIcon from "@mui/icons-material/Compress";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

const TodayHighlights = ({ weatherData, airQualityData }) => {
  // Extract necessary weather data
  const { main, wind, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi; // Accessing AQI from airQualityData.main
  const { co, no, no2, o3 } = airQualityData?.components || {}; // Extract air quality components

  // Function to return air quality description based on AQI value
  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  // Define air quality styles based on AQI value
  const airQualityStyles = [
    { text: "Good", color: "#2ECC71" },
    { text: "Fair", color: "#F1C40F" },
    { text: "Moderate", color: "#E67E22" },
    { text: "Poor", color: "#E74C3C" },
    { text: "Very Poor", color: "#8E44AD" },
  ];

  // Assign appropriate air quality style based on AQI index
  const airQuality = airQualityIndex
    ? airQualityStyles[airQualityIndex - 1]
    : { text: "Unknown", color: "gray" };

  // Define weather highlights data for display
  const highlights = [
    { title: "Humidity", value: `${main.humidity}%`, Icon: InvertColorsIcon },
    { title: "Pressure", value: `${main.pressure} hPa`, Icon: CompressIcon },
    {
      title: "Visibility",
      value: `${visibility / 1000} km`, // Convert visibility to km
      Icon: VisibilityIcon,
    },
    {
      title: "Feels Like",
      value: `${main.feels_like}°C`,
      Icon: DeviceThermostatIcon,
    },
    { title: "Wind Speed", value: `${wind.speed} m/s`, Icon: AirIcon }, // Wind speed display
  ];

  return (
    <div
      style={{
        backgroundColor: "#4B5563",
        color: "white",
        width: "900px",
        borderRadius: "0.5rem",
        padding: "45px",
        marginRight: "0px",
      }}
    >
      <div style={{ fontSize: "20px" }}>Today's Highlights</div>
      <div style={{ display: "flex", gap: "18px" }}>
        {/* Air Quality Index Section */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            color: "#4B5563",
            padding: "1rem",
            borderRadius: "0.5rem",
            marginTop: "11px",
            width: "400px",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "22px" }}>
              <p>Air Quality Index</p>
              <div
                style={{
                  marginTop: "1rem",
                  fontSize: "16px",
                  fontWeight: "700",
                  backgroundColor: airQuality.color,
                  height: "30px",
                  width: "80px",
                  borderRadius: "6px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {renderAirQualityDescription(airQualityIndex)}
              </div>
            </div>
            <div>
              <AirIcon style={{ fontSize: "35px" }} />
              {/* Display air quality components */}
              <div
                style={{
                  marginTop: "1rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "10px",
                  fontSize: "20px",
                }}
              >
                <div>
                  <p style={{ fontWeight: "bold" }}>CO</p>
                  <p>{co} µg/m³</p>
                </div>
                <div>
                  <p style={{ fontWeight: "bold" }}>NO</p>
                  <p>{no} µg/m³</p>
                </div>
                <div>
                  <p style={{ fontWeight: "bold" }}>NO₂</p>
                  <p>{no2} µg/m³</p>
                </div>
                <div>
                  <p style={{ fontWeight: "bold" }}>O₃</p>
                  <p>{o3} µg/m³</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sunrise and Sunset Section */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            color: "#4B5563",
            padding: "1rem",
            borderRadius: "0.5rem",
            marginTop: "11px",
            width: "410px",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
          }}
        >
          <div style={{ fontSize: "22px" }}>
            <p style={{ marginLeft: "100px" }}>Sunrise And Sunset</p>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
              <div>
                <WbSunnyIcon style={{ fontSize: "40px", marginLeft: "30px" }} />
                <p style={{ fontSize: "25px", marginLeft: "20px" }}>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
              </div>
              <div>
                <NightsStayIcon style={{ fontSize: "40px", marginRight: "35px" }} />
                <p style={{ fontSize: "25px", marginRight: "50px" }}>{new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display weather highlights */}
      <div style={{ display: "flex", gap: "4px", marginTop: "10px" }}>
        {highlights.map((highlight, index) => (
          <HighlightBox key={index} title={highlight.title} value={highlight.value} Icon={highlight.Icon} />
        ))}
      </div>
    </div>
  );
};

export default TodayHighlights;