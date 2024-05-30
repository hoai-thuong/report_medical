const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// const dbUri = 'mongodb+srv://caothihoaithuongt66:LHWvnvPVQrhsdvDG@cluster0.8vl7mdu.mongodb.net/hl7_db?retryWrites=true&w=majority&appName=Cluster0';
const dbUri = 'mongodb+srv://test165:chuthoconoichuthocon@cluster0.8vl7mdu.mongodb.net/hl7_db?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbUri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));




// Schema and Model definitions
const hl7MessageSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now }
});
const HL7Message = mongoose.model('hl7_messages', hl7MessageSchema);

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
});
const Account = mongoose.model('account', accountSchema);

// API endpoints
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, fullName, email, phoneNumber, role, department } = req.body;

    const existingAccount = await Account.findOne({ $or: [{ username }, { email }] });
    if (existingAccount) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const newAccount = new Account({ username, password, fullName, email, phoneNumber, role, department });
    await newAccount.save();

    res.status(201).json({ message: 'Account created successfully' });
  } catch (err) {
    console.error('Error registering account:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const account = await Account.findOne({ username, password });
    if (!account) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    let redirectUrl = '/';
    if (username.startsWith('admin')) {
      redirectUrl = '/admin';
    } else if (username.includes('bs')) {
      redirectUrl = '/doctor';
    }

    res.json({ message: 'Login successful', redirectUrl });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/accounts', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    console.error('Error fetching accounts:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/hl7_messages', async (req, res) => {
  try {
    const messages = await HL7Message.find();
    res.json(messages);
  } catch (err) {
    console.error('Error fetching HL7 messages:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/patient/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await HL7Message.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    console.error('Error fetching patient by ID:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Account.find({ role: 'bác sĩ' }, 'fullName email phoneNumber department');
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving doctors', error });
  }
});

app.get('/api/doctors/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const doctor = await Account.findOne({ username, role: 'bác sĩ' });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving doctor information', error });
  }
});

app.put('/api/doctor/:id', async (req, res) => {
  try {
    const doctorId = req.params.id;
    const updateData = req.body;

    const updatedDoctor = await Account.findByIdAndUpdate(doctorId, updateData, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor updated successfully', updatedDoctor });
  } catch (err) {
    console.error('Error updating doctor:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
});
const Department = mongoose.model('Department', departmentSchema);

app.get('/api/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    console.error('Error fetching departments:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/departments', async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Department name is required' });
    }

    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res.status(400).json({ message: 'Department already exists' });
    }

    const newDepartment = new Department({ name, description });
    await newDepartment.save();

    res.status(201).json({ message: 'Department created successfully', department: newDepartment });
  } catch (err) {
    console.error('Error creating department:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
