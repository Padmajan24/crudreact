import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import './App.css';

const StudentForm = ({ addStudent, updateStudent, currentStudent, setCurrentStudent }) => {
  const [student, setStudent] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (currentStudent) {
      setStudent(currentStudent);
    } else {
      setStudent({ name: '', email: '', phone: '' });
    }
  }, [currentStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student.name || !student.email || !student.phone) {
      alert('Please fill in all fields.');
      return;
    }

    if (!currentStudent) {
      addStudent(student);
    } else {
      updateStudent(student);
    }

    setStudent({ name: '', email: '', phone: '' });
    setCurrentStudent(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={student.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        value={student.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="Phone"
        name="phone"
        value={student.phone}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {currentStudent ? 'Update Student' : 'Add Student'}
      </Button>
    </Box>
  );
};

export default StudentForm;
