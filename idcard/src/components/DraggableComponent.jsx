import React from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";


const DraggableComponent = ({ children, id, onResize, onDrag, style }) => {
  return (
    <Draggable onDrag={onDrag}>
      <ResizableBox
        width={200} // Default width
        height={100} // Default height
        minConstraints={[100, 50]} // Minimum size
        maxConstraints={[300, 150]} // Maximum size
        onResize={(e, data) => {
          e.stopPropagation(); // Prevent dragging while resizing
          onResize(id, data.size);
        }}
        handle={<span className="custom-handle" />} // Correctly use the handle
        resizeHandles={["se"]} // Specify which corner to allow resizing
        style={{ position: "absolute", ...style }} // Apply passed style
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {children}
        </div>
      </ResizableBox>
    </Draggable>
  );
};

export default DraggableComponent;
