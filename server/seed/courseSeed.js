// const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const Course = require('../models/Course');
// const User = require('../models/User');

// // Load env variables
// dotenv.config();

// // Sample courses data
// const coursesData = [
//   {
//     title: "Introduction to Mathematics - Class 6",
//     description: "This course covers fundamental mathematical concepts for 6th grade students including arithmetic operations, fractions, decimals, percentages, basic geometry, and introduction to algebra. Through interactive lessons, practice exercises, and real-world applications, students will develop strong mathematical foundations.",
//     category: "Mathematics",
//     grade: "6",
//     price: 799,
//     thumbnail: "/uploads/math-course.jpg",
//     lessons: [
//       { title: "Number Systems and Operations", content: "Introduction to natural numbers, integers, and rational numbers." },
//       { title: "Fractions and Decimals", content: "Understanding fractions, converting between fractions and decimals." },
//       { title: "Percentages", content: "Converting fractions to percentages, calculating percentage of quantities." },
//       { title: "Basic Geometry", content: "Points, lines, angles, and basic 2D shapes." },
//       { title: "Introduction to Algebra", content: "Variables, simple equations, and algebraic expressions." }
//     ],
//     isPublished: true,
//     duration: 12,
//     averageRating: 4.5
//   },
//   {
//     title: "Science Explorer - Class 7",
//     description: "This course introduces 7th grade students to essential scientific concepts across physics, chemistry, and biology. Students will learn about matter, energy, forces, cells, ecosystems, and more through engaging content, virtual experiments, and hands-on activities.",
//     category: "Science",
//     grade: "7",
//     price: 899,
//     thumbnail: "/uploads/science-course.jpg",
//     lessons: [
//       { title: "Matter and States", content: "Properties of solids, liquids, and gases." },
//       { title: "Energy Types and Transformations", content: "Understanding potential and kinetic energy." },
//       { title: "Forces and Motion", content: "Newton's laws and their applications." },
//       { title: "Cells - Building Blocks of Life", content: "Cell structure and functions." },
//       { title: "Ecosystems", content: "Interactions in ecosystems and food webs." }
//     ],
//     isPublished: true,
//     duration: 14,
//     averageRating: 4.7
//   },
//   {
//     title: "Computer Science Fundamentals - Class 8",
//     description: "This course provides 8th grade students with a solid foundation in computer science. Topics include programming basics with Python, algorithms, data structures, web development fundamentals, and an introduction to databases. Students will complete practical projects to apply their knowledge.",
//     category: "Computer Science",
//     grade: "8",
//     price: 1299,
//     thumbnail: "/uploads/cs-course.jpg",
//     lessons: [
//       { title: "Introduction to Programming", content: "Basic programming concepts using Python." },
//       { title: "Algorithms and Flowcharts", content: "Creating and analyzing algorithms." },
//       { title: "Data Structures", content: "Arrays, lists, and dictionaries." },
//       { title: "Web Development Basics", content: "HTML, CSS introduction." },
//       { title: "Introduction to Databases", content: "Basic database concepts and SQL." }
//     ],
//     isPublished: true,
//     duration: 16,
//     averageRating: 4.8
//   },
//   {
//     title: "English Literature and Composition - Class 10",
//     description: "This comprehensive English course for 10th grade students focuses on literature analysis, critical reading, and effective writing. Students will study classic and contemporary texts, develop their writing skills across various genres, and enhance their grammar and vocabulary.",
//     category: "Language Arts",
//     grade: "10",
//     price: 999,
//     thumbnail: "/uploads/english-course.jpg",
//     lessons: [
//       { title: "Literary Analysis", content: "Techniques for analyzing fiction and non-fiction texts." },
//       { title: "Essay Writing", content: "Argumentative, narrative, and expository essays." },
//       { title: "Grammar and Usage", content: "Advanced grammar rules and applications." },
//       { title: "Poetry and Figurative Language", content: "Analyzing and creating poetry." },
//       { title: "Research Writing", content: "Conducting research and creating research papers." }
//     ],
//     isPublished: true,
//     duration: 15,
//     averageRating: 4.6
//   },
//   {
//     title: "Advanced Mathematics - Class 12",
//     description: "This advanced math course prepares 12th grade students for college-level mathematics. Topics include calculus, advanced algebra, trigonometry, statistics, and probability. The course emphasizes problem-solving, theoretical understanding, and practical applications.",
//     category: "Mathematics",
//     grade: "12",
//     price: 1599,
//     thumbnail: "/uploads/advanced-math-course.jpg",
//     lessons: [
//       { title: "Limits and Continuity", content: "Understanding the concept of limits and continuity of functions." },
//       { title: "Differentiation", content: "Rules of differentiation and applications." },
//       { title: "Integration", content: "Indefinite and definite integrals with applications." },
//       { title: "Probability Distributions", content: "Binomial, normal, and other probability distributions." },
//       { title: "Vectors and 3D Geometry", content: "Vector operations and geometry in three dimensions." }
//     ],
//     isPublished: true,
//     duration: 20,
//     averageRating: 4.9
//   }
// ];

// // Function to connect to the database
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log('MongoDB Connected...');
//     return true;
//   } catch (err) {
//     console.error('Database connection error:', err.message);
//     process.exit(1);
//   }
// };

// // Function to seed courses
// const seedCourses = async () => {
//   try {
//     // Connect to DB
//     await connectDB();
    
//     // Find a tutor (or create one if needed)
//     let tutor = await User.findOne({ role: 'tutor' });
    
//     if (!tutor) {
//       console.log('No tutor found. Creating a default tutor...');
//       tutor = await User.create({
//         name: 'John Teacher',
//         email: 'teacher@example.com',
//         password: await bcrypt.hash('password123', 10),
//         role: 'tutor'
//       });
//       console.log('Default tutor created');
//     }
    
//     // Delete existing courses
//     await Course.deleteMany({});
//     console.log('Existing courses deleted');
    
//     // Add tutor ID to each course
//     const coursesWithTutor = coursesData.map(course => ({
//       ...course,
//       instructor: tutor._id,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     }));
    
//     // Insert courses
//     await Course.insertMany(coursesWithTutor);
//     console.log(`${coursesWithTutor.length} courses inserted successfully`);
    
//     // Disconnect from database
//     await mongoose.disconnect();
//     console.log('MongoDB Disconnected');
    
//     console.log('Database seeded successfully!');
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     process.exit(1);
//   }
// };

// // Run the seed function
// seedCourses();


const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');
const User = require('../models/User');

// Load env variables
dotenv.config();

// Sample courses data with placeholder images
const coursesData = [
  {
    title: "Introduction to Mathematics - Class 6",
    description: "This course covers fundamental mathematical concepts for 6th grade students including arithmetic operations, fractions, decimals, percentages, basic geometry, and introduction to algebra. Through interactive lessons, practice exercises, and real-world applications, students will develop strong mathematical foundations.",
    category: "Mathematics",
    grade: "6",
    price: 799,
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop",
    lessons: [
      { title: "Number Systems and Operations", content: "Introduction to natural numbers, integers, and rational numbers." },
      { title: "Fractions and Decimals", content: "Understanding fractions, converting between fractions and decimals." },
      { title: "Percentages", content: "Converting fractions to percentages, calculating percentage of quantities." },
      { title: "Basic Geometry", content: "Points, lines, angles, and basic 2D shapes." },
      { title: "Introduction to Algebra", content: "Variables, simple equations, and algebraic expressions." }
    ],
    isPublished: true,
    duration: 12,
    averageRating: 4.5
  },
  {
    title: "Science Explorer - Class 7",
    description: "This course introduces 7th grade students to essential scientific concepts across physics, chemistry, and biology. Students will learn about matter, energy, forces, cells, ecosystems, and more through engaging content, virtual experiments, and hands-on activities.",
    category: "Science",
    grade: "7",
    price: 899,
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
    lessons: [
      { title: "Matter and States", content: "Properties of solids, liquids, and gases." },
      { title: "Energy Types and Transformations", content: "Understanding potential and kinetic energy." },
      { title: "Forces and Motion", content: "Newton's laws and their applications." },
      { title: "Cells - Building Blocks of Life", content: "Cell structure and functions." },
      { title: "Ecosystems", content: "Interactions in ecosystems and food webs." }
    ],
    isPublished: true,
    duration: 14,
    averageRating: 4.7
  },
  {
    title: "Computer Science Fundamentals - Class 8",
    description: "This course provides 8th grade students with a solid foundation in computer science. Topics include programming basics with Python, algorithms, data structures, web development fundamentals, and an introduction to databases. Students will complete practical projects to apply their knowledge.",
    category: "Computer Science",
    grade: "8",
    price: 1299,
    thumbnail: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=800&auto=format&fit=crop",
    lessons: [
      { title: "Introduction to Programming", content: "Basic programming concepts using Python." },
      { title: "Algorithms and Flowcharts", content: "Creating and analyzing algorithms." },
      { title: "Data Structures", content: "Arrays, lists, and dictionaries." },
      { title: "Web Development Basics", content: "HTML, CSS introduction." },
      { title: "Introduction to Databases", content: "Basic database concepts and SQL." }
    ],
    isPublished: true,
    duration: 16,
    averageRating: 4.8
  },
  {
    title: "English Literature and Composition - Class 10",
    description: "This comprehensive English course for 10th grade students focuses on literature analysis, critical reading, and effective writing. Students will study classic and contemporary texts, develop their writing skills across various genres, and enhance their grammar and vocabulary.",
    category: "Language Arts",
    grade: "10",
    price: 999,
    thumbnail: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop",
    lessons: [
      { title: "Literary Analysis", content: "Techniques for analyzing fiction and non-fiction texts." },
      { title: "Essay Writing", content: "Argumentative, narrative, and expository essays." },
      { title: "Grammar and Usage", content: "Advanced grammar rules and applications." },
      { title: "Poetry and Figurative Language", content: "Analyzing and creating poetry." },
      { title: "Research Writing", content: "Conducting research and creating research papers." }
    ],
    isPublished: true,
    duration: 15,
    averageRating: 4.6
  },
  {
    title: "Advanced Mathematics - Class 12",
    description: "This advanced math course prepares 12th grade students for college-level mathematics. Topics include calculus, advanced algebra, trigonometry, statistics, and probability. The course emphasizes problem-solving, theoretical understanding, and practical applications.",
    category: "Mathematics",
    grade: "12",
    price: 1599,
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    lessons: [
      { title: "Limits and Continuity", content: "Understanding the concept of limits and continuity of functions." },
      { title: "Differentiation", content: "Rules of differentiation and applications." },
      { title: "Integration", content: "Indefinite and definite integrals with applications." },
      { title: "Probability Distributions", content: "Binomial, normal, and other probability distributions." },
      { title: "Vectors and 3D Geometry", content: "Vector operations and geometry in three dimensions." }
    ],
    isPublished: true,
    duration: 20,
    averageRating: 4.9
  }
];

// Function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');
    return true;
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

// Function to seed courses
const seedCourses = async () => {
  try {
    // Connect to DB
    await connectDB();
    
    // Find a tutor (or create one if needed)
    let tutor = await User.findOne({ role: 'tutor' });
    
    if (!tutor) {
      console.log('No tutor found. Creating a default tutor...');
      tutor = await User.create({
        name: 'John Teacher',
        email: 'teacher@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'tutor'
      });
      console.log('Default tutor created');
    }
    
    // Delete existing courses
    await Course.deleteMany({});
    console.log('Existing courses deleted');
    
    // Add tutor ID to each course
    const coursesWithTutor = coursesData.map(course => ({
      ...course,
      instructor: tutor._id,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    // Insert courses
    await Course.insertMany(coursesWithTutor);
    console.log(`${coursesWithTutor.length} courses inserted successfully`);
    
    // Disconnect from database
    await mongoose.disconnect();
    console.log('MongoDB Disconnected');
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedCourses();