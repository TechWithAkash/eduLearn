require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const resetAdminPassword = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    // Find admin user
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.log('No admin user found. Creating one...');
      
      // Create admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      const newAdmin = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      console.log(`Admin user created with email: ${newAdmin.email} and password: admin123`);
    } else {
      console.log(`Found admin user: ${adminUser.email}`);
      
      // Reset password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      adminUser.password = hashedPassword;
      await adminUser.save();
      
      console.log(`Reset password for admin user: ${adminUser.email}`);
      console.log('New password: admin123');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

resetAdminPassword();