import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import './App.css';

const StudentList = ({ students, deleteStudent, editStudent, viewStudentDetails }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => editStudent(student)} sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => deleteStudent(student.id)} sx={{ marginRight: 1 }}>
                    Delete
                  </Button>
                  <Button variant="contained" color="info" onClick={() => viewStudentDetails(student)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No students</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentList;
