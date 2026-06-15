import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { User, Camera, Save, Loader2, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const DIET_OPTIONS = ['Veg', 'Vegan', 'Keto', 'Low-Carb', 'Mediterranean', 'Protein', 'None'];

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: user?.name || '',
    age: user?.age || '',
    weight: user?.weight || '',
    height: user?.height || '',
    dietPref: user?.dietPref || ['None'],
    avatar: user?.avatar || '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleDiet = (diet) => {
    setForm((prev) => {
      let newPrefs = [...prev.dietPref];
      if (diet === 'None') {
        newPrefs = ['None'];
      } else {
        newPrefs = newPrefs.filter((d) => d !== 'None');
        if (newPrefs.includes(diet)) {
          newPrefs = newPrefs.filter((d) => d !== diet);
        } else {
          newPrefs.push(diet);
        }
        if (newPrefs.length === 0) newPrefs = ['None'];
      }
      return { ...prev, dietPref: newPrefs };
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast.error('Image must be under 1MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        name: form.name,
        age: form.age ? Number(form.age) : undefined,
        weight: form.weight ? Number(form.weight) : undefined,
        height: form.height ? Number(form.height) : undefined,
        dietPref: form.dietPref,
        avatar: form.avatar,
      });
      toast.success('Profile updated! ✅');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading font-bold text-2xl text-white">Your Profile</h1>
            <p className="text-text-secondary text-sm mt-1">Manage your personal information and preferences</p>
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-accent/20 border-2 border-accent/50 flex items-center justify-center overflow-hidden">
                {form.avatar ? (
                  <img src={form.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={36} className="text-accent-light" />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center border-2 border-bg hover:bg-accent-dark transition-colors"
              >
                <Camera size={14} className="text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2 font-medium">Full Name</label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="input-dark"
                  id="profile-name"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2 font-medium">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="input-dark opacity-50 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Physical Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2 font-medium">Age</label>
                <input
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="25"
                  className="input-dark"
                  id="profile-age"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2 font-medium">Weight (kg)</label>
                <input
                  name="weight"
                  type="number"
                  value={form.weight}
                  onChange={handleChange}
                  placeholder="70"
                  className="input-dark"
                  id="profile-weight"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2 font-medium">Height (cm)</label>
                <input
                  name="height"
                  type="number"
                  value={form.height}
                  onChange={handleChange}
                  placeholder="175"
                  className="input-dark"
                  id="profile-height"
                />
              </div>
            </div>

            {/* Diet Preferences */}
            <div>
              <label className="block text-sm text-text-secondary mb-3 font-medium">Dietary Preferences</label>
              <div className="flex flex-wrap gap-2">
                {DIET_OPTIONS.map((diet) => (
                  <button
                    key={diet}
                    type="button"
                    onClick={() => toggleDiet(diet)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      form.dietPref.includes(diet)
                        ? 'bg-accent text-white shadow-glow-sm'
                        : 'bg-surface border border-card-border text-text-secondary hover:border-accent/50'
                    }`}
                  >
                    {form.dietPref.includes(diet) && <Check size={14} />}
                    {diet}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
              id="profile-save"
            >
              {saving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
