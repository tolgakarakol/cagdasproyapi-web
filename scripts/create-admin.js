const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://tolgakarakol_db_user:Cagdas2026@cluster0.zuy4t94.mongodb.net/cagdasproyapi?appName=Cluster0';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const username = 'cagdasproadmin';
    const password = 'cpy2026**';
    const name = 'Admin';

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('Admin already exists!');
      existingAdmin.password = await bcrypt.hash(password, 10);
      await existingAdmin.save();
      console.log('Password reset to admin');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Admin.create({
        username,
        password: hashedPassword,
        name
      });
      console.log('Admin created successfully!');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seed();
