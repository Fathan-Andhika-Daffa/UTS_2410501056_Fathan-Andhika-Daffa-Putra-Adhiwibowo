const Resep = require('../models/Resep');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const { page=1, limit=6, kategori, kesulitan, search } = req.query;
    const where = {};
    if (kategori)  where.kategori  = kategori;
    if (kesulitan) where.kesulitan = kesulitan;
    if (search) {
      where[Op.or] = [
        { nama:        { [Op.like]: `%${search}%` } },
        { asal_daerah: { [Op.like]: `%${search}%` } },
      ];
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const { count, rows } = await Resep.findAndCountAll({
      where, limit: parseInt(limit), offset,
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / parseInt(limit)),
        limit: parseInt(limit)
      }
    });
  } catch (err) {
    console.error('ERROR GETALL:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const resep = await Resep.findByPk(req.params.id);
    if (!resep) return res.status(404).json({ success:false, message:'Resep tidak ditemukan' });
    res.json({ success: true, data: resep });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const resep = await Resep.create(req.cleanData);
    res.status(201).json({ success: true, message: 'Resep berhasil disimpan!', data: resep });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const resep = await Resep.findByPk(req.params.id);
    if (!resep) return res.status(404).json({ success:false, message:'Resep tidak ditemukan' });
    await resep.update(req.cleanData);
    res.json({ success: true, message: 'Resep diperbarui', data: resep });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const resep = await Resep.findByPk(req.params.id);
    if (!resep) return res.status(404).json({ success:false, message:'Resep tidak ditemukan' });
    await resep.destroy();
    res.json({ success: true, message: 'Resep dihapus' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

