import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import DraggableComponent from "./DraggableComponent";
import TemplateSelector from "./TemplateSelector";
import axios from "axios";

const CanvasContainer = styled.div`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: white;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
  background-image: url(${(props) => props.bgImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Logo = styled.img`
  width: 80px;
  height: auto;
`;

const StudentDetails = styled.div`
  color: #333;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.7);
`;

const ProfilePic = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const SchoolDetails = styled.div`
  font-size: 14px;
  line-height: 1.4;
  max-width: 250px;
  padding: 10px;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const TemplateNameInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 30%;
`;

const CustomizableCanvas = () => {
  const canvasRef = useRef();
  const [template, setTemplate] = useState(null);
  const [positions, setPositions] = useState({
    logo: { x: 20, y: 20 },
    studentDetails: { x: 20, y: 120 },
    profilePic: { x: 500, y: 20 },
    schoolDetails: { x: 20, y: 220 },
  });
  const [sizes, setSizes] = useState({
    logo: { width: 80, height: "auto" },
    studentDetails: { fontSize: "24px" },
    profilePic: { width: 80, height: 80 },
    schoolDetails: { fontSize: "14px" },
  });
  const [bgDimensions, setBgDimensions] = useState({ width: 600, height: 400 });
  const [templateName, setTemplateName] = useState("");
  const [components, setComponents] = useState([]); // State to hold added components

  useEffect(() => {
    if (template) {
      const img = new Image();
      img.src = template.bgImage;
      img.onload = () => {
        setBgDimensions({ width: img.width || 600, height: img.height || 400 });
      };
    }
  }, [template]);

  const handleResize = (id, size) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      [id]: size,
    }));
  };

  const handleDrag = (id, newPosition) => {
    setPositions((prevPositions) => ({
      ...prevPositions,
      [id]: newPosition,
    }));
  };

  const saveCanvas = async () => {
    if (!template || !canvasRef.current) return;

    const canvasHTML = canvasRef.current.outerHTML;

    const canvasData = {
      templateName: templateName,
      templateHTML: canvasHTML,
      bgImage: template.bgImage,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/templates",
        canvasData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to save template");
      }

      console.log("Template saved:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to add a new text component
  const addTextComponent = () => {
    const newComponent = {
      id: `text-${components.length}`,
      type: "text",
      content: "New Text",
      position: { x: 100, y: 100 },
      fontSize: "16px",
    };
    setComponents([...components, newComponent]);
  };

  // Function to add a new image component
  const addImageComponent = () => {
    const newComponent = {
      id: `image-${components.length}`,
      type: "image",
      src: "https://via.placeholder.com/80", // Placeholder image URL
      position: { x: 200, y: 200 },
    };
    setComponents([...components, newComponent]);
  };

  return (
    <div>
      <TemplateSelector onSelectTemplate={setTemplate} />
      <Button onClick={addTextComponent}>Add Text</Button>
      <Button onClick={addImageComponent}>Add Image</Button>
      {template && (
        <>
          <TemplateNameInput
            type="text"
            placeholder="Enter Template Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
          <CanvasContainer
            ref={canvasRef}
            bgImage={template.bgImage}
            width={bgDimensions.width}
            height={bgDimensions.height}
          >
            <DraggableComponent
              onResize={handleResize}
              onDrag={handleDrag}
              id="logo"
              position={positions.logo}
            >
              <Logo
                src={template.schoolLogo}
                alt="School Logo"
                width={sizes.logo.width}
                height={sizes.logo.height}
              />
            </DraggableComponent>
            <DraggableComponent
              onResize={handleResize}
              onDrag={handleDrag}
              id="student-details"
              position={positions.studentDetails}
            >
              <StudentDetails>
                <div
                  id="student-name"
                  style={{
                    fontSize: sizes.studentDetails.fontSize,
                    fontWeight: "bold",
                  }}
                >
                  {template.studentDetails[0].name}
                </div>
                <div
                  id="student-class"
                  style={{ fontSize: "18px", marginTop: "5px" }}
                >
                  {template.studentDetails[0].class}
                </div>
                <div
                  id="student-roll"
                  style={{ fontSize: "16px", marginTop: "5px" }}
                >
                  Roll No: {template.studentDetails[0].rollNo}
                </div>
                <div
                  id="student-blood-group"
                  style={{ fontSize: "16px", marginTop: "5px" }}
                >
                  Blood Group: {template.studentDetails[0].bloodGroup}
                </div>
              </StudentDetails>
            </DraggableComponent>

            <DraggableComponent
              onResize={handleResize}
              onDrag={handleDrag}
              id="profile-pic"
              position={positions.profilePic}
            >
              <ProfilePic
                id="profile-pic"
                src={template.studentDetails[0].profilePic}
                alt="Profile"
                width={sizes.profilePic.width}
                height={sizes.profilePic.height}
              />
            </DraggableComponent>

            <DraggableComponent
              onResize={handleResize}
              onDrag={handleDrag}
              id="school-details"
              position={positions.schoolDetails}
            >
              <SchoolDetails>{template.schoolDetails}</SchoolDetails>
            </DraggableComponent>

            {/* Render dynamically added components */}
            {components.map((component) => {
              if (component.type === "text") {
                return (
                  <DraggableComponent
                    key={component.id}
                    onResize={handleResize}
                    onDrag={handleDrag}
                    id={component.id}
                    position={component.position}
                  >
                    <div style={{ fontSize: component.fontSize }}>
                      {component.content}
                    </div>
                  </DraggableComponent>
                );
              }
              if (component.type === "image") {
                return (
                  <DraggableComponent
                    key={component.id}
                    onResize={handleResize}
                    onDrag={handleDrag}
                    id={component.id}
                    position={component.position}
                  >
                    <img
                      src={component.src}
                      alt={`Dynamic ${component.id}`}
                      style={{ width: "80px", height: "80px" }}
                    />
                  </DraggableComponent>
                );
              }
              return null;
            })}
          </CanvasContainer>
          <Button onClick={saveCanvas}>Save Template</Button>
        </>
      )}
    </div>
  );
};

export default CustomizableCanvas;
