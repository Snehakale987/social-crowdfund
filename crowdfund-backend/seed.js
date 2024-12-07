const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Cause = require('./models/Cause');
const Category = require('./models/Category');
const Donor = require('./models/Donor');

// Load environment variables
dotenv.config();

// Connect to MongoDB using environment variables
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Seed Data
const users = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: '$2b$10$eRZ.PvP93w9dB12FOpxOeuHaJHO6gpzqURH.D07T.oFbTzBrIo1hy', // bcrypt hash for "password123"
        image: 'john-profile.jpg',
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: '$2b$10$eRZ.PvP93w9dB12FOpxOeuHaJHO6gpzqURH.D07T.oFbTzBrIo1hy', // bcrypt hash for "password123"
        image: 'jane-profile.jpg',
    },
];

const categories = [
    { name: 'Education', image: 'education' },
    { name: 'Health', image: 'health' },
    { name: 'Environment', image: 'environment' },
];

const causes = [
    {
        title: 'Build a School',
        progress: 50,
        targetAmount: 10000,
        fundsRaised: 5000,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2025-12-01'),
        images: ['build-a-school.jpg'],
        description: 'Help us build a school in a remote village to provide education to underprivileged children.',
        updates: [
            { date: '2024-11-10', text: 'Foundation work has started!' },
            { date: '2024-11-15', text: 'Walls are being constructed.' },
        ],
        isTrending: true,
    },
    {
        title: 'Clean the Beach',
        progress: 20,
        targetAmount: 5000,
        fundsRaised: 1000,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['beach-clean1.jpg', 'beach-clean2.jpg'],
        description: 'Join us in cleaning our local beach and making it a safe place for everyone.',
        updates: [
            { date: '2024-11-12', text: 'Organized volunteers for the first cleanup drive.' },
        ],
        isTrending: true,
    },
    {
        title: 'Provide Clean Drinking Water',
        progress: 30,
        targetAmount: 15000,
        fundsRaised: 4500,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['clean-water1.jpg', 'clean-water2.jpg'],
        description: 'Join us in bringing clean and safe drinking water to remote villages. Your support can make a huge difference in preventing waterborne diseases and ensuring better health for communities in need.',
        updates: [
            { date: '2024-11-12', text: 'Identified 5 remote villages in need of clean drinking water.' },
            { date: '2024-11-18', text: 'Partnered with local NGOs to initiate water purification systems.' },
        ],
        isTrending: true,
    },
    {
        title: 'Feed the Hungry',
        progress: 40,
        targetAmount: 10000,
        fundsRaised: 4000,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['feed-hungry1.jpg', 'feed-hungry2.jpg'],
        description: 'Provide food to underprivileged families in urban slums.',
        updates: [
            { date: '2024-11-11', text: 'Delivered meals to 200 families.' },
            { date: '2024-11-15', text: 'Started a weekly food drive.' },
        ],
        isTrending: true,
    },
    {
        title: 'Scholarships for Girls',
        progress: 70,
        targetAmount: 15000,
        fundsRaised: 10500,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['scholarships1.jpg', 'scholarships2.jpg'],
        description: 'Support education for young girls by providing scholarships.',
        updates: [
            { date: '2024-11-12', text: 'Distributed 50 scholarships.' },
        ],
        isTrending: true,
    },
    {
        title: 'Rebuild Homes After Floods',
        progress: 25,
        targetAmount: 20000,
        fundsRaised: 5000,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['flood-rebuild1.jpg', 'flood-rebuild2.jpg'],
        description: 'Help families rebuild their homes after devastating floods.',
        updates: [
            { date: '2024-11-10', text: 'Identified 100 families in need.' },
        ],
        isTrending: true,
    },
    {
        title: 'Vaccination Camps',
        progress: 50,
        targetAmount: 10000,
        fundsRaised: 5000,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['vaccination1.jpg', 'vaccination2.jpg'],
        description: 'Organize vaccination drives for underprivileged children.',
        updates: [
            { date: '2024-11-15', text: 'Vaccinated 500 children.' },
        ],
        isTrending: false,
    },
    {
        title: 'Save Endangered Species',
        progress: 15,
        targetAmount: 25000,
        fundsRaised: 3750,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['endangered-species1.jpg', 'endangered-species2.jpg'],
        description: 'Support wildlife conservation efforts to save endangered species.',
        updates: [
            { date: '2024-11-18', text: 'Launched awareness campaigns.' },
        ],
        isTrending: false,
    },
    {
        title: 'Books for Rural Schools',
        progress: 60,
        targetAmount: 8000,
        fundsRaised: 4800,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['books1.jpg', 'books2.jpg'],
        description: 'Provide textbooks and reading materials to rural schools.',
        updates: [
            { date: '2024-11-10', text: 'Delivered books to 5 schools.' },
        ],
        isTrending: false,
    },
    {
        title: 'Elderly Care Packages',
        progress: 35,
        targetAmount: 12000,
        fundsRaised: 4200,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['elderly-care1.jpg', 'elderly-care2.jpg'],
        description: 'Support elderly individuals with essential care packages.',
        updates: [
            { date: '2024-11-12', text: 'Distributed packages to 200 elderly individuals.' },
        ],
        isTrending: true,
    },
    {
        title: 'Solar Power for Villages',
        progress: 20,
        targetAmount: 30000,
        fundsRaised: 6000,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['solar1.jpg', 'solar2.jpg'],
        description: 'Provide solar power systems to remote villages.',
        updates: [
            { date: '2024-11-14', text: 'Installed solar panels in 2 villages.' },
        ],
        isTrending: true,
    },
    {
        title: 'Mental Health Awareness',
        progress: 55,
        targetAmount: 12000,
        fundsRaised: 6600,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['mental-health1.jpg', 'mental-health2.jpg'],
        description: 'Raise awareness about mental health and support counseling programs.',
        updates: [
            { date: '2024-11-16', text: 'Organized mental health workshops.' },
        ],
        isTrending: false,
    },
    {
        title: 'Clean Drinking Water for Schools',
        progress: 75,
        targetAmount: 18000,
        fundsRaised: 13500,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['clean-water-schools1.jpg', 'clean-water-schools2.jpg'],
        description: 'Install water purification systems in schools.',
        updates: [
            { date: '2024-11-12', text: 'Installed systems in 10 schools.' },
        ],
        isTrending: false,
    },
    {
        title: 'Plant Fruit Trees',
        progress: 40,
        targetAmount: 8000,
        fundsRaised: 3200,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['fruit-trees1.jpg', 'fruit-trees2.jpg'],
        description: 'Plant fruit trees to support sustainable agriculture.',
        updates: [
            { date: '2024-11-17', text: 'Planted 500 fruit trees.' },
        ],
        isTrending: true,
    },
    {
        title: 'Build Community Libraries',
        progress: 65,
        targetAmount: 20000,
        fundsRaised: 13000,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['community-libraries1.jpg', 'community-libraries2.jpg'],
        description: 'Establish libraries in underprivileged areas.',
        updates: [
            { date: '2024-11-10', text: 'Opened 3 new community libraries.' },
        ],
        isTrending: false,
    },
    {
        title: 'Aid for Refugees',
        progress: 30,
        targetAmount: 25000,
        fundsRaised: 7500,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['refugee-aid1.jpg', 'refugee-aid2.jpg'],
        description: 'Support refugees with essential supplies and shelter.',
        updates: [
            { date: '2024-11-13', text: 'Provided aid to 300 refugees.' },
        ],
        isTrending: true,
    },
    {
        title: 'Support Orphanages',
        progress: 45,
        targetAmount: 15000,
        fundsRaised: 6750,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['orphanage1.jpg', 'orphanage2.jpg'],
        description: 'Provide resources and funding for orphanages.',
        updates: [
            { date: '2024-11-14', text: 'Donated educational supplies to 5 orphanages.' },
        ],
        isTrending: false,
    },
    {
        title: 'Distribute Warm Clothes',
        progress: 50,
        targetAmount: 10000,
        fundsRaised: 5000,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['warm-clothes1.jpg', 'warm-clothes2.jpg'],
        description: 'Provide warm clothing to people in colder regions.',
        updates: [
            { date: '2024-11-11', text: 'Distributed jackets and blankets to 200 families.' },
        ],
        isTrending: true,
    },
    {
        title: 'Support Young Artists',
        progress: 70,
        targetAmount: 12000,
        fundsRaised: 8400,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['young-artists1.jpg', 'young-artists2.jpg'],
        description: 'Help young artists showcase their talent and find opportunities.',
        updates: [
            { date: '2024-11-15', text: 'Funded 10 art exhibitions.' },
        ],
        isTrending: false,
    },
    {
        title: 'Restore Historical Monuments',
        progress: 20,
        targetAmount: 30000,
        fundsRaised: 6000,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['restore-monuments1.jpg', 'restore-monuments2.jpg'],
        description: 'Preserve and restore historical monuments for future generations.',
        updates: [
            { date: '2024-11-14', text: 'Started restoration work on 2 monuments.' },
        ],
        isTrending: false,
    },
    {
        title: 'Child Nutrition Program',
        progress: 85,
        targetAmount: 10000,
        fundsRaised: 8500,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['child-nutrition1.jpg', 'child-nutrition2.jpg'],
        description: 'Provide nutritious meals to children in need.',
        updates: [
            { date: '2024-11-10', text: 'Served meals to 1000 children.' },
        ],
        isTrending: true,
    },
    {
        title: 'Women Empowerment Workshops',
        progress: 60,
        targetAmount: 15000,
        fundsRaised: 9000,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['women-empowerment1.jpg', 'women-empowerment2.jpg'],
        description: 'Organize skill-building workshops for women.',
        updates: [
            { date: '2024-11-16', text: 'Trained 50 women in tailoring and crafts.' },
        ],
        isTrending: true,
    },
    {
        title: 'Community Health Camps',
        progress: 45,
        targetAmount: 12000,
        fundsRaised: 5400,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01'),
        images: ['health-camps1.jpg', 'health-camps2.jpg'],
        description: 'Conduct health check-ups and provide medicines in rural areas.',
        updates: [
            { date: '2024-11-15', text: 'Organized 5 health camps.' },
        ],
        isTrending: false,
    }
];

const donors = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        amount: 500,
        anonymous: false,
        cause: null, // To be assigned dynamically
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        amount: 300,
        anonymous: true,
        cause: null, // To be assigned dynamically
    },
];

// Seed Function
const seedDatabase = async () => {
    try {
        console.log('Deleting all existing data...');

        // Delete existing data
        await User.deleteMany({});
        await Category.deleteMany({});
        await Cause.deleteMany({});
        await Donor.deleteMany({});

        console.log('Seeding users...');
        // Insert users
        const userDocs = await User.insertMany(users);

        console.log('Seeding categories...');
        // Insert categories
        const categoryDocs = await Category.insertMany(categories);

        console.log('Seeding causes...');
        // Assign a creator and donors dynamically for each cause
        const causeData = causes.map((cause, index) => ({
            ...cause,
            category: categoryDocs[index % categoryDocs.length]._id, // Assign a category
            creator: userDocs[index % userDocs.length]._id, // Assign a creator
            donors: donors.map((donor) => ({
                user: userDocs.find((user) => user.email === donor.email)._id,
                amount: donor.amount,
            })), // Inline donors for the Cause schema
        }));

        const causeDocs = await Cause.insertMany(causeData);

        console.log('Seeding donors...');
        // Dynamically assign donors to causes
        const donorData = donors.map((donor, index) => ({
            ...donor,
            cause: causeDocs[index % causeDocs.length]._id, // Assign a cause
        }));

        await Donor.insertMany(donorData);

        console.log('Database seeded successfully!');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding the database:', err);
        mongoose.connection.close();
    }
};

// Run the seed function
seedDatabase();
