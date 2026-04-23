const express  = require('express');
const cors     = require('cors');
const helmet   = require('helmet');
const morgan   = require('morgan');
require('dotenv').config();

const resepRoutes = require('./routes/resepRoutes');
const { sequelize } = require('./config/database');

const app = express();

app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/resepUMKM', resepRoutes);

app.get('/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});

const PORT = process.env.PORT || 5000;
sequelize.authenticate()
  .then(() => { console.log('Database terhubung!'); app.listen(PORT); })
  .catch(err => console.error('Gagal koneksi DB:', err));
