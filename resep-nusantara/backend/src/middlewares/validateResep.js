const validateResep = (req, res, next) => {
  const { nama, asal_daerah, kategori, kesulitan, waktu, porsi, bahan, langkah } = req.body;
  const errors = [];

  if (!nama?.trim())        errors.push('Nama resep wajib diisi');
  if (!asal_daerah?.trim()) errors.push('Asal daerah wajib diisi');
  if (!kategori)            errors.push('Kategori wajib dipilih');
  if (!kesulitan)           errors.push('Tingkat kesulitan wajib dipilih');
  if (!waktu || waktu <= 0) errors.push('Waktu memasak harus angka positif');
  if (!porsi || porsi <= 0) errors.push('Jumlah porsi harus angka positif');

  const bahanArr = Array.isArray(bahan) ? bahan.filter(b => b?.trim()) : [];
  if (bahanArr.length < 1)
    errors.push('Minimal 1 bahan diperlukan');

  const langkahArr = Array.isArray(langkah) ? langkah.filter(l => l?.trim()) : [];
  if (langkahArr.length < 1)
    errors.push('Minimal 1 langkah memasak diperlukan');

  if (errors.length > 0)
    return res.status(422).json({ success: false, errors });

  req.cleanData = { ...req.body, bahan: bahanArr, langkah: langkahArr };
  next();
};

module.exports = validateResep;

