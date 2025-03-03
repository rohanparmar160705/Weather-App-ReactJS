import React from "react";
import {
  AcUnit as AcUnitIcon, // ❄️ Freezing
  CloudQueue as CloudQueueIcon, // 🌨️ Cold
  WbCloudy as WbCloudyIcon, // ⛅ Cool
  WbSunny as WbSunnyIcon, // ☀️ Warm
  LocalFireDepartment as LocalFireDepartmentIcon, // 🔥 Hot
  CalendarMonth as CalendarMonthIcon,
  LocationOn as LocationOnIcon,
} from "@mui/icons-material";

const MainWeatherCard = ({ weatherData }) => {
  if (!weatherData) return null; // Prevent errors if data is undefined

  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City Not Found";
  const countryName = weatherData?.sys?.country || "Country Not Found";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "Date Not Found";

  // Function to render the appropriate temperature icon
  const renderTemperatureIcon = () => {
    if (temperatureCelsius === "N/A") return null;
    const temperature = parseFloat(temperatureCelsius);

    if (temperature < 0)
      return <AcUnitIcon style={{ color: "#00f", fontSize: "3rem" }} />; // ❄️ Freezing
    if (temperature >= 0 && temperature < 10)
      return <CloudQueueIcon style={{ color: "#bbb", fontSize: "3rem" }} />; // 🌨️ Cold
    if (temperature >= 10 && temperature < 20)
      return <WbCloudyIcon style={{ color: "#90caf9", fontSize: "3rem" }} />; // ⛅ Cool
    if (temperature >= 20 && temperature < 30)
      return <WbSunnyIcon style={{ color: "#ffa726", fontSize: "3rem" }} />; // ☀️ Warm
    if (temperature >= 30)
      return <LocalFireDepartmentIcon style={{ color: "#d32f2f", fontSize: "3rem" }} />; // 🔥 Hot

    return null;
  };

  return (
    <div
      style={{
        backgroundColor: "#4B5563",
        color: "white",
        borderRadius: "0.5rem",
        width: "250px",
        height: "250px",
        fontSize: "1.5rem",
        padding: "17px",
        textAlign: "center",
        marginLeft: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
      }}
       onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)"; // ✅ Slight zoom-in effect
    e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)"; // ✅ Soft shadow
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
    >
      <div style={{ fontWeight: "bold", fontSize: "1.7rem" }}>Now</div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2.5rem",
          fontWeight: "bold",
          gap: "20px",
        }}
      >
        {temperatureCelsius}°C {renderTemperatureIcon()}
      </div>

      <div style={{fontSize: "1.1rem" ,fontStyle: "italic", fontWeight: "bold", marginTop: "8px" }}>
        {weatherDescription}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "1.3rem",display: "flex", alignItems: "center", gap: "5px" }}>
          <CalendarMonthIcon style={{ }} />
          <span>{currentDate}</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            marginTop: "5px",
            fontSize: "1.2rem"
          }}
        >
          <LocationOnIcon style={{ fontSize: "1.2rem" }} />
          {cityName}, {countryName}
        </div>
      </div>
    </div>
  );
};

export default MainWeatherCard;
