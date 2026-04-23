import { useState } from 'react';
import './RecipeForm.css';

const KATEGORI = ['Daging','Seafood','Ayam','Sayuran','Nasi','Sup','Kue','Minuman'];
const KESULITAN = ['Mudah','Sedang','Sulit'];

const EMPTY_FORM = {
  nama: '',
  asal_daerah: '',
  kategori: '',
  kesulitan: '',
  waktu: '',
  porsi: '',
  deskripsi: '',
  bahan: [''],
  langkah: [''],
};

export function RecipeForm({ onSubmit, onCancel }) {
  const [form, setForm]       = useState(EMPTY_FORM);
  const [errors, setErrors]   = useState({});
  const [confirm, setConfirm] = useState(false);

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const addBahan    = ()      => setForm(f => ({ ...f, bahan: [...f.bahan, ''] }));
  const setBahan    = (i, v)  => setForm(f => { const a = [...f.bahan]; a[i] = v; return { ...f, bahan: a }; });
  const delBahan    = (i)     => setForm(f => ({ ...f, bahan: f.bahan.filter((_, j) => j !== i) }));

  const addLangkah  = ()      => setForm(f => ({ ...f, langkah: [...f.langkah, ''] }));
  const setLangkah  = (i, v)  => setForm(f => { const a = [...f.langkah]; a[i] = v; return { ...f, langkah: a }; });
  const delLangkah  = (i)     => setForm(f => ({ ...f, langkah: f.langkah.filter((_, j) => j !== i) }));

  const validate = () => {
    const e = {};
    if (!form.nama.trim())         e.nama         = 'Nama resep wajib diisi';
    if (!form.asal_daerah.trim())  e.asal_daerah  = 'Asal daerah wajib diisi';
    if (!form.kategori)            e.kategori     = 'Pilih kategori';
    if (!form.kesulitan)           e.kesulitan    = 'Pilih tingkat kesulitan';
    if (!form.waktu || form.waktu <= 0)   e.waktu  = 'Waktu harus angka positif';
    if (!form.porsi || form.porsi <= 0)   e.porsi  = 'Porsi harus angka positif';
    if (form.bahan.filter(b => b.trim()).length < 1)
      e.bahan   = 'Minimal 1 bahan diperlukan';
    if (form.langkah.filter(l => l.trim()).length < 1)
      e.langkah = 'Minimal 1 langkah diperlukan';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setConfirm(true);
  };

  const handleConfirm = () => {
    setConfirm(false);
    onSubmit({
      ...form,
      bahan:   form.bahan.filter(b => b.trim()),
      langkah: form.langkah.filter(l => l.trim()),
    });
  };

  if (confirm) {
  return (
    <div className="confirm-wrap">
      <div className="confirm-title">Konfirmasi Pengiriman</div>
      <div className="confirm-text">
        Simpan resep <strong>{form.nama}</strong> ke Nusantara Meals?
      </div>
      <div className="confirm-actions">
        <button className="btn-secondary" onClick={() => setConfirm(false)}>Batal</button>
        <button className="btn-primary" onClick={handleConfirm}>Ya, Simpan!</button>
      </div>
     </div>
    );
  }

  return (
    <div className="recipe-form">

      <div className="form-section">
        <div className="form-section-title">Informasi Dasar</div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nama Resep *</label>
            <input
              className={`form-input ${errors.nama ? 'error' : ''}`}
              value={form.nama}
              onChange={e => set('nama', e.target.value)}
              placeholder="Cth: Rendang Padang"
            />
            {errors.nama && <div className="form-error">⚠ {errors.nama}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Asal Daerah *</label>
            <input
              className={`form-input ${errors.asal_daerah ? 'error' : ''}`}
              value={form.asal_daerah}
              onChange={e => set('asal_daerah', e.target.value)}
              placeholder="Cth: Sumatera Barat"
            />
            {errors.asal_daerah && <div className="form-error">⚠ {errors.asal_daerah}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Kategori *</label>
            <select
              className={`form-select ${errors.kategori ? 'error' : ''}`}
              value={form.kategori}
              onChange={e => set('kategori', e.target.value)}
            >
              <option value="">Pilih Kategori...</option>
              {KATEGORI.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            {errors.kategori && <div className="form-error">⚠ {errors.kategori}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Tingkat Kesulitan *</label>
            <select
              className={`form-select ${errors.kesulitan ? 'error' : ''}`}
              value={form.kesulitan}
              onChange={e => set('kesulitan', e.target.value)}
            >
              <option value="">Pilih Tingkat...</option>
              {KESULITAN.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            {errors.kesulitan && <div className="form-error">⚠ {errors.kesulitan}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Waktu Memasak (menit) *</label>
            <input
              className={`form-input ${errors.waktu ? 'error' : ''}`}
              type="number"
              value={form.waktu}
              onChange={e => set('waktu', e.target.value)}
              placeholder="Cth: 60"
            />
            {errors.waktu && <div className="form-error">⚠ {errors.waktu}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Jumlah Porsi *</label>
            <input
              className={`form-input ${errors.porsi ? 'error' : ''}`}
              type="number"
              value={form.porsi}
              onChange={e => set('porsi', e.target.value)}
              placeholder="Cth: 4"
            />
            {errors.porsi && <div className="form-error">⚠ {errors.porsi}</div>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Deskripsi Singkat</label>
          <textarea
            className="form-textarea"
            value={form.deskripsi}
            onChange={e => set('deskripsi', e.target.value)}
            placeholder="Ceritakan keunikan resep ini..."
          />
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-title">Bahan-Bahan</div>
        {errors.bahan && <div className="form-error" style={{marginBottom:'8px'}}>⚠ {errors.bahan}</div>}
        <div className="dynamic-list">
          {form.bahan.map((b, i) => (
            <div className="dynamic-row" key={i}>
              <input
                className="form-input"
                value={b}
                onChange={e => setBahan(i, e.target.value)}
                placeholder={`Bahan ${i + 1}...`}
              />
              {form.bahan.length > 1 && (
                <button className="btn-remove" onClick={() => delBahan(i)}>−</button>
              )}
            </div>
          ))}
        </div>
        <button className="btn-add-field" onClick={addBahan}>＋ Tambah Bahan</button>
      </div>

      <div className="form-section">
        <div className="form-section-title">Langkah Memasak</div>
        {errors.langkah && <div className="form-error" style={{marginBottom:'8px'}}>⚠ {errors.langkah}</div>}
        <div className="dynamic-list">
          {form.langkah.map((l, i) => (
            <div className="dynamic-row" key={i}>
              <input
                className="form-input"
                value={l}
                onChange={e => setLangkah(i, e.target.value)}
                placeholder={`Langkah ${i + 1}...`}
              />
              {form.langkah.length > 1 && (
                <button className="btn-remove" onClick={() => delLangkah(i)}>−</button>
              )}
            </div>
          ))}
        </div>
        <button className="btn-add-field" onClick={addLangkah}>＋ Tambah Langkah</button>
      </div>

      <div className="form-footer">
        <button className="btn-secondary" onClick={onCancel}>Batal</button>
        <button className="btn-primary"   onClick={handleSubmit}>Simpan Resep</button>
      </div>

    </div>
  );
}