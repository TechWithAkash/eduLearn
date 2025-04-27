require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const forceResetAdmin = async () => {
  try {
    // Connect to MongoDB directly
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Get the users collection directly
    const usersCollection = mongoose.connection.collection('users');
    
    // Find admin user
    const adminUser = await usersCollection.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.log('No admin user found. Creating one...');
      
      // Create a new admin with properly hashed password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      const result = await usersCollection.insertOne({
        name: 'System Administrator',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date()
      });
      
      console.log(`Admin created with ID: ${result.insertedId}`);
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
    } else {
      console.log(`Found admin user: ${adminUser.email}`);
      
      // Force update the password directly in the collection
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      const result = await usersCollection.updateOne(
        { _id: adminUser._id },
        { $set: { password: hashedPassword } }
      );
      
      console.log(`Password updated: ${result.modifiedCount === 1 ? 'Success' : 'Failed'}`);
      console.log(`Use these credentials to log in:`);
      console.log(`Email: ${adminUser.email}`);
      console.log(`Password: admin123`);
    }
    
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    
  } catch (error) {
    console.error('Error:', error);
  }
};

forceResetAdmin();