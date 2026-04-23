const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Resep = sequelize.define('Resep', {
  id:          { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nama:        { type: DataTypes.STRING(255), allowNull: false },
  asal_daerah: { type: DataTypes.STRING(255), allowNull: false },
  kategori:    { type: DataTypes.ENUM('Daging','Seafood','Ayam','Sayuran','Nasi','Sup','Kue','Minuman'), allowNull: false },
  kesulitan:   { type: DataTypes.ENUM('Mudah','Sedang','Sulit'), allowNull: false },
  waktu:       { type: DataTypes.INTEGER, allowNull: false },
  porsi:       { type: DataTypes.INTEGER, allowNull: false },
  deskripsi:   { type: DataTypes.TEXT },
  bahan: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const val = this.getDataValue('bahan');
      return val ? JSON.parse(val) : [];
    },
    set(val) {
      this.setDataValue('bahan', JSON.stringify(val));
    }
  },
  langkah: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const val = this.getDataValue('langkah');
      return val ? JSON.parse(val) : [];
    },
    set(val) {
      this.setDataValue('langkah', JSON.stringify(val));
    }
  },
}, { 
  tableName: 'resep', 
  timestamps: true,
  underscored: true
});

module.exports = Resep;