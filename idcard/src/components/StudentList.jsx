import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const SelectTemplate = styled.select`
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const PreviewContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
`;

const PreviewTitle = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

function StudentList() {
  const [students, setStudents] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/student");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/templates");
      setTemplates(response.data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchTemplates();
  }, []);

  const handleTemplateChange = (student, templateId) => {
    const template = templates.find((t) => t._id === templateId);
    setSelectedStudent(student);
    setSelectedTemplate(template);
    console.log("Selected Template:", template); // Debugging log
  };

  // Function to replace placeholders in the template with actual student data
  // const generateTemplateWithData = (templateHTML, student) => {
  //   return templateHTML
  //     .replace(/{student\.name}/g, student.name || "")
  //     .replace(/{student\.class}/g, student.class || "")
  //     .replace(/{student\.rollNo}/g, student.rollNo || "")
  //     .replace(/{student\.bloodGroup}/g, student.bloodGroup || "")
  //     .replace(/{student\.profilePic}/g, student.profilePic || "");
  // };

  const generateTemplateWithData = (templateHTML, student) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(templateHTML, "text/html");

    
    if (doc.getElementById("student-name")) {
      doc.getElementById("student-name").textContent = student.name || "";
    }

    
    if (doc.getElementById("student-class")) {
      doc.getElementById("student-class").textContent = student.class || "";
    }

    
    if (doc.getElementById("student-roll")) {
      doc.getElementById("student-roll").textContent = `Roll No: ${
        student.rollNo || ""
      }`;
    }

  
    if (doc.getElementById("student-blood-group")) {
      doc.getElementById("student-blood-group").textContent = `Blood Group: ${
        student.bloodGroup || ""
      }`;
    }

    
    const profileImage = doc.getElementById("profile-pic");
    if (profileImage) {
      profileImage.src = student.profilePic || "";
    }

    return doc.body.innerHTML;
  };

  const renderIDCard = () => {
    if (!selectedTemplate || !selectedStudent) return null;

    const generatedHTML = generateTemplateWithData(
      selectedTemplate.templateHTML,
      selectedStudent
    );
    console.log("Generated HTML:", generatedHTML); 

    return (
      <PreviewContainer>
        <PreviewTitle>ID Card Preview</PreviewTitle>
        <div
          style={{
            backgroundImage: `url(${selectedTemplate.bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "20px",
            borderRadius: "8px",
            width: "376px",
            height: "280px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: generatedHTML }} />
        </div>
      </PreviewContainer>
    );
  };

  return (
    <Container>
      <Title>Student List</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Class</TableHeader>
            <TableHeader>Roll No</TableHeader>
            <TableHeader>Blood Group</TableHeader>
            <TableHeader>Profile Pic</TableHeader>
            <TableHeader>Template</TableHeader>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <TableRow key={student._id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>{student.rollNo}</TableCell>
              <TableCell>{student.bloodGroup}</TableCell>
              <TableCell>
                <img
                  src={student.profilePic}
                  alt={student.name}
                  style={{ width: "50px", borderRadius: "50%" }}
                />
              </TableCell>
              <TableCell>
                <SelectTemplate
                  onChange={(e) =>
                    handleTemplateChange(student, e.target.value)
                  }
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Template
                  </option>
                  {templates.map((template) => (
                    <option key={template._id} value={template._id}>
                      {template.templateName}
                    </option>
                  ))}
                </SelectTemplate>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {renderIDCard()}
    </Container>
  );
}

export default StudentList;
