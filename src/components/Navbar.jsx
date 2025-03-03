import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterDramaTwoToneIcon from "@mui/icons-material/FilterDramaTwoTone";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import Box from "@mui/material/Box";

// Navbar component receives onSearch function as a prop
const Navbar = ({ onSearch }) => {
  // State to store the city name entered by the user
  const [searchCity, setSearchCity] = useState("");

  // Function to handle search button click
  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };

  // Function to get the current location of the user
  const handleCurrentLocationClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Fetch city name based on latitude and longitude using OpenStreetMap API
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const city =
              data.address.city || data.address.town || data.address.village;

            if (city) {
              setSearchCity(city);
              onSearch(city); // Auto-trigger search with the detected city
            } else {
              alert("City not found. Try again.");
            }
          } catch (error) {
            console.error("Error fetching location data:", error);
            alert("Failed to get location. Please try again.");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Failed to get location. Please enable location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div style={{ backgroundColor: "#4B5563", margin: "0" }}>
      <nav>
        <div
          style={{
            margin: "0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            paddingTop: "0px",
            paddingBottom: "0px",
          }}
        >
          {/* Logo Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              color: "#FFFFFF",
              cursor: "pointer",
              transition: "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FilterDramaTwoToneIcon
              style={{ fontSize: "40px", marginLeft: "20px" }}
            />
            <p style={{ fontWeight: "bold", fontSize: "30px" }}>Weather</p>
          </div>

          {/* Search Input Field */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Box sx={{ width: 500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                placeholder="City Name"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    border: "2px solid #E5F4E3",
                  },
                  "& .MuiInputBase-input": {
                    color: "#E5F4E3",
                    caretColor: "#E5F4E3",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#E5F4E3",
                    opacity: 1,
                  },
                }}
              />
            </Box>

            {/* Search Button */}
            <Button
              variant="contained"
              onClick={handleSearchClick}
              sx={{
                borderRadius: "6px",
                backgroundColor: "#FFFFFF",
                color: "#4B5563",
                width: "100px",
                height: "50px",
                fontSize: "15px",
                marginLeft: "10px",
                transition: "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              Search
            </Button>
          </div>

          {/* Current Location Button */}
          <div
            style={{
              fontSize: "16px",
              fontWeight: "700",
              backgroundColor: "#FFFFFF",
              height: "35px",
              width: "170px",
              color: "#4B5563",
              gap: "10px",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "20px",
              cursor: "pointer",
              transition: "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
            onClick={handleCurrentLocationClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <GpsFixedIcon />
            <p style={{ fontSize: "16px" }}>Current Location</p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;