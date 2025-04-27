// require('dotenv').config({ path: __dirname + '/../.env' });
// const mongoose = require('mongoose');
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');

// const createAdminUser = async () => {
//   try {
//     // Connect to database
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
    
//     // Check if any admin exists
//     const adminExists = await User.findOne({ role: 'admin' });
    
//     if (adminExists) {
//       console.log('Admin user already exists');
//       process.exit(0);
//     }
    
//     // Admin credentials - preferably from environment variables
//     const name = process.env.ADMIN_NAME || 'System Admin';
//     const email = process.env.ADMIN_EMAIL;
//     const password = process.env.ADMIN_PASSWORD;
    
//     if (!email || !password) {
//       console.error('Admin email and password must be provided in environment variables');
//       process.exit(1);
//     }
    
//     // Create admin user
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
    
//     const admin = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: 'admin'
//     });
    
//     console.log(`Admin user created successfully: ${admin.email}`);
//     process.exit(0);
//   } catch (error) {
//     console.error('Error creating admin user:', error);
//     process.exit(1);
//   }
// };

// createAdminUser();

require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createAdminUser = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    // Check if any admin exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Admin credentials - preferably from environment variables
    const name = process.env.ADMIN_NAME || 'System Admin';
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (!email || !password) {
      console.error('Admin email and password must be provided in environment variables');
      process.exit(1);
    }
    
    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log(`Admin user created successfully: ${admin.email}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();