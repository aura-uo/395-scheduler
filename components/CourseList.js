import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import TermSelector from './TermSelector';
import CourseSelector from './CourseSelector';
import {terms, getCourseTerm} from '../utils/course';

const CourseList = ({courses}) => {
    const [selectedTerm, setSelectedTerm] = useState('Fall');
    const termCourses = courses.filter(course => selectedTerm === getCourseTerm(course));
    return (
        <ScrollView>
            <TermSelector terms={terms} selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm}/>
            <CourseSelector courses={termCourses} />
        </ScrollView>
    );
};

export default CourseList;