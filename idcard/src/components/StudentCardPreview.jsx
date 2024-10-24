import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled components for the form and preview area
const FormContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const PreviewCard = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #45a049;
  }
`;

const StudentCardPreview = () => {
  const [student, setStudent] = useState({
    name: '',
    class: '',
    rollNo: '',
    bloodGroup: '',
    profilePic: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Data:", student);
    addStudent(student)
    
  };

const addStudent=async(student)=>{
  const response= await axios.post('http://localhost:5000/api/student', student, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)

}
  return (
    <FormContainer>
      <h2>Add Student Details</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="class"
          placeholder="Class"
          value={student.class}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="rollNo"
          placeholder="Roll Number"
          value={student.rollNo}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          value={student.bloodGroup}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="profilePic"
          placeholder="Profile Picture URL"
          value={student.profilePic}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </form>

      {/* Preview the student card */}
      <PreviewCard>
   
      </PreviewCard>
    </FormContainer>
  );
};

export default StudentCardPreview;
