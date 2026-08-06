/**
 * Course and Department Constants
 * Mindoro State University
 */

export const COLLEGES = [
  {
    name: "College of Arts and Sciences",
    courses: [
      "Bachelor of Arts in Political Science (AB Political Science)"
    ]
  },
  {
    name: "College of Business and Management",
    courses: [
      "Bachelor of Science in Entrepreneurship (BS Entrepreneurship)",
      "Bachelor of Science in Tourism Management (BS Tourism Management)",
      "Bachelor of Science in Hospitality Management (BS Hospitality Management)"
    ]
  },
  {
    name: "College of Computer Studies",
    courses: [
      "Bachelor of Science in Information Technology (BSIT)",
      "Bachelor of Science in Computer Engineering (BSCpE)"
    ]
  },
  {
    name: "College of Criminal Justice Education",
    courses: [
      "Bachelor of Science in Criminology (BSCrim)"
    ]
  },
  {
    name: "College of Teacher Education",
    courses: [
      "Bachelor of Elementary Education (BEEd)",
      "Bachelor of Secondary Education (BSEd) - Major in English",
      "Bachelor of Secondary Education (BSEd) - Major in Mathematics",
      "Bachelor of Secondary Education (BSEd) - Major in Science"
    ]
  },
  {
    name: "Institute of Fisheries",
    courses: [
      "Bachelor of Science in Fisheries (BS Fisheries)"
    ]
  }
];

// Flatten all courses for easy lookups
export const ALL_COURSES = COLLEGES.flatMap(college => college.courses);

// Create a mapping for college by course
export const COURSE_TO_COLLEGE = {};
COLLEGES.forEach(college => {
  college.courses.forEach(course => {
    COURSE_TO_COLLEGE[course] = college.name;
  });
});

// Special option for "All" courses/departments
export const EVENT_ACCESS_OPTIONS = [
  "All Courses (Public Event)",
  ...ALL_COURSES
];

export default {
  COLLEGES,
  ALL_COURSES,
  COURSE_TO_COLLEGE,
  EVENT_ACCESS_OPTIONS
};
