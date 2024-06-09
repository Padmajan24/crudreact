import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import './App.css'; 

const App = () => {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const serverUrl = 'https://server-task-crud.onrender.com/students'; 

  const fetchStudents = async () => {
    try {
      const response = await axios.get(serverUrl);
      if (Array.isArray(response.data)) {
        setStudents(response.data);
      } else {
        setStudents([]);
        console.error("Fetched data is not an array");
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (student) => {
    try {
      const response = await axios.post(serverUrl, student);
      setStudents([...students, response.data]);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const updateStudent = async (student) => {
    try {
      const response = await axios.put(`${serverUrl}/${student.id}`, student);
      setStudents(students.map((s) => (s.id === student.id ? response.data : s)));
      setCurrentStudent(null); 
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${serverUrl}/${id}`);
      setStudents(students.filter((s) => s.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const editStudent = (student) => {
    setCurrentStudent(student);
  };

  const viewStudentDetails = (student) => {
    setViewStudent(student);
  };

  const handleCloseView = () => {
    setViewStudent(null);
  };

  return (
    <Container className="container ">
      <Typography  variant="h3" gutterBottom>
        Student Management
      </Typography>
      <Paper className="form-container">
        <StudentForm
          addStudent={addStudent}
          updateStudent={updateStudent}
          currentStudent={currentStudent}
          setCurrentStudent={setCurrentStudent}
        />
      </Paper>
      <Paper className="list-container">
        <StudentList
          students={students}
          deleteStudent={deleteStudent}
          editStudent={editStudent}
          viewStudentDetails={viewStudentDetails}
        />
      </Paper>

      <Dialog open={Boolean(viewStudent)} onClose={handleCloseView}>
        <DialogTitle>Student Details</DialogTitle>
        <DialogContent>
          {viewStudent && (
            <div>
              <Typography>Name: {viewStudent.name}</Typography>
              <Typography>Email: {viewStudent.email}</Typography>
              <Typography>Phone: {viewStudent.phone}</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
