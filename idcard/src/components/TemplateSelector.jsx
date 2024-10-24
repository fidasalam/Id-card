// src/components/TemplateSelector.jsx
import React from 'react';

const templates = [
  {
    id: 1,
    studentDetails: [
      {
        name: 'John Doe',
        class: '10th Grade',
        rollNo: '12345',
        bloodGroup: 'A+',
        profilePic: '/images/profile.png',
      },
    ],
    schoolLogo: '/images/paypal.png',
    schoolDetails: 'ABC High School\n123 School Lane\nCity, Country',
    bgImage: '/images/gallery3.png',
  },
  {
    id: 2,
    studentDetails: [
      {
        name: 'Jane Smith',
        class: '9th Grade',
        rollNo: '67890',
        bloodGroup: 'B-',
        profilePic: '/images/profile1.jpg',
      },
    ],
    schoolLogo: '/images/logo-dark.png',
    schoolDetails: 'XYZ Secondary School\n456 Education Ave\nCity, Country',
    bgImage: '/images/gallery2.png',
  },
];

const TemplateSelector = ({ onSelectTemplate }) => {
  return (
    <div>
      <h2>Select a Template</h2>
      {templates.map((template) => (
        <button key={template.id} onClick={() => onSelectTemplate(template)}>
          Template {template.id}
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
