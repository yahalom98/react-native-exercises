import React, { useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, SafeAreaView } from 'react-native';

// TODO: Create a student grade book using SectionList
// Organize students by their grade level (A, B, C, D, F)
// Each student should show name and score
// Allow clicking on a student to toggle their selection
// Show total selected students at the bottom

const STUDENTS = [
  { id: '1', name: 'Alice Johnson', score: 95 },
  { id: '2', name: 'Bob Smith', score: 88 },
  { id: '3', name: 'Charlie Brown', score: 92 },
  { id: '4', name: 'Diana Prince', score: 78 },
  { id: '5', name: 'Eve Wilson', score: 85 },
  { id: '6', name: 'Frank Miller', score: 72 },
  { id: '7', name: 'Grace Lee', score: 65 },
  { id: '8', name: 'Henry Davis', score: 58 },
];

// TODO: Organize students by grade
// Hint: Grade A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: below 60
function organizeByGrade(students) {
  // Your code here
  return [];
}

function Exercise5() {
  const [selectedStudents, setSelectedStudents] = useState([]);
  
  // TODO: Organize students by grade
  const gradeData = organizeByGrade(STUDENTS);

  // TODO: Implement toggleSelection function
  const toggleSelection = (studentId) => {
    // Your code here
  };

  // TODO: Implement getGrade function
  const getGrade = (score) => {
    // Your code here
    return 'F';
  };

  // TODO: Implement renderItem function
  const renderItem = ({ item }) => {
    // Your code here
    return null;
  };

  // TODO: Implement renderSectionHeader function
  const renderSectionHeader = ({ section: { title } }) => {
    // Your code here
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Student Grade Book</Text>
        
        {/* TODO: Add SectionList */}
        
        {/* TODO: Display selected count */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {selectedStudents.length} student(s) selected
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    color: '#333',
  },
  footer: {
    padding: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  // TODO: Add your styles here
});

export default Exercise5;

