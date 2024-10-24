// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f8f8f8;
  }

  /* Add CustomizableCanvas styles here */
  .CanvasContainer {
    position: relative;
    width: 600px;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    background-color: white;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .draggable-component {
    position: absolute;
    cursor: move;
    border: 1px dashed #aaa;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    padding: 10px;
    border-radius: 5px;
    transition: all 0.2s ease;
  }




  .draggable-input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
  }
    .id-card {
  background-color: rgba(255, 255, 255, 0.8); /* Card background */
  background-size: cover; /* Cover the entire card */
  background-position: center; /* Center the background image */
  padding: 20px; /* Inner padding */
  margin-bottom: 20px; /* Space between cards */
  border-radius: 8px; /* Rounded corners */
  position: relative; /* Enable absolute positioning for child elements */
  border: 1px solid #ccc; /* Card border */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Soft shadow */
  overflow: hidden; /* Hide overflow content */
}


  .delete-button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 5px 8px;
  }

  .delete-button:hover {
    background-color: darkred;
  }
`;

export default GlobalStyles;
