import React from "react"; // Importing React for component creation

// Functional component HighlightBox receives props: title, value, and Icon
const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF", // White background
        color: "#4B5563", // Dark gray text color
        padding: "1rem", // Padding around content
        borderRadius: "0.5rem", // Rounded corners
        width: "180px", // Fixed width
        height: "80px", // Fixed height
        fontSize: "6px", // Default font size
        transition: "transform 0.4s ease, box-shadow 0.4s ease", // Smooth transition effects
      }}
      // Hover effect: Scales up and adds shadow
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
      }}
      // Removes hover effects on mouse leave
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div>
        {/* Display the title with a larger font size */}
        <div style={{ fontSize: "20px" }}>{title}</div>
        <div
          style={{
            display: "flex", // Arrange elements in a row
            alignItems: "center", // Vertically center items
            justifyContent: "space-evenly", // Even spacing
            fontSize: "50px", // Increase overall font size
          }}
        >
          {/* Render the Icon if provided, with a set size */}
          {Icon && <Icon style={{ fontSize: "25px" }} />}
          {/* Display the value with a larger font */}
          <p style={{ fontSize: "25px" }}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default HighlightBox; // Exporting the component for use in other files
