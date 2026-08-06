/**
 * Course and Department Constants
 * Mindoro State University
 */

export const COLLEGES = [
  "College of Arts and Sciences",
  "College of Business and Management",
  "College of Computer Studies",
  "College of Criminal Justice Education",
  "College of Teacher Education",
  "Institute of Fisheries"
];

export const COURSES_BY_COLLEGE = {
  "College of Arts and Sciences": [
    "Bachelor of Arts in Political Science (AB Political Science)"
  ],
  "College of Business and Management": [
    "Bachelor of Science in Entrepreneurship (BS Entrepreneurship)",
    "Bachelor of Science in Tourism Management (BS Tourism Management)",
    "Bachelor of Science in Hospitality Management (BS Hospitality Management)"
  ],
  "College of Computer Studies": [
    "Bachelor of Science in Information Technology (BSIT)",
    "Bachelor of Science in Computer Engineering (BSCpE)"
  ],
  "College of Criminal Justice Education": [
    "Bachelor of Science in Criminology (BSCrim)"
  ],
  "College of Teacher Education": [
    "Bachelor of Elementary Education (BEEd)",
    "Bachelor of Secondary Education (BSEd) - Major in English",
    "Bachelor of Secondary Education (BSEd) - Major in Mathematics",
    "Bachelor of Secondary Education (BSEd) - Major in Science"
  ],
  "Institute of Fisheries": [
    "Bachelor of Science in Fisheries (BS Fisheries)"
  ]
};

// Flatten all courses for easy lookups
export const ALL_COURSES = Object.values(COURSES_BY_COLLEGE).flat();

// Create a mapping for college by course
export const COURSE_TO_COLLEGE = {};
Object.entries(COURSES_BY_COLLEGE).forEach(([college, courses]) => {
  courses.forEach(course => {
    COURSE_TO_COLLEGE[course] = college;
  });
});

// Special option for "All" courses in events
export const EVENT_ACCESS_OPTIONS = [
  "All Courses (Public Event)",
  ...ALL_COURSES
];

export default {
  COLLEGES,
  COURSES_BY_COLLEGE,
  ALL_COURSES,
  COURSE_TO_COLLEGE,
  EVENT_ACCESS_OPTIONS
};
