
'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import { createListingAction } from '../../../actions/listing';

interface Province {
  province: string;
  cities: string[];
}

interface FormErrors {
  [key: string]: string | undefined;
}

export default function PostListingPage() {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    price: '',
    province: '',
    city: '',
    quantity: '',
    unit: '',
    description: '',
    images: [] as File[],
    video: null as File | null,
  });

  const [locations, setLocations] = useState<Province[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [successMessage,setSuccessMessage]=useState<string | undefined>(undefined)

  // ✅ Fetch locations
  useEffect(() => {
    fetch('/data/pakistan-location.json')
      .then(res => res.json())
      .then(data => {
        const provincesArray = data.cities.filter(
          (item: any) => typeof item === 'object' && item.province
        );
        setLocations(provincesArray);
      })
      .catch(err => console.error('Failed to load locations:', err));
  }, []);

  // ✅ Update cities
  useEffect(() => {
    const selected = locations.find(p => p.province === formData.province);
    setCities(selected?.cities || []);
    setFormData(prev => ({ ...prev, city: '' }));
  }, [formData.province, locations]);

  // ✅ Image preview
  useEffect(() => {
    const previews = formData.images.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);

    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [formData.images]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, images: files }));

    if (errors.images) {
      setErrors(prev => ({ ...prev, images: '' }));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setFormData(prev => ({ ...prev, video: files[0] }));
  };

  // ✅ CLEAN SUBMIT (NO FRONTEND VALIDATION)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      const submitData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          (value as File[]).forEach(file => {
            submitData.append('images', file);
          });
        } else if (key === 'video') {
          if (value) submitData.append('video', value as File);
        } else {
          submitData.append(key, value as string);
        }
      });

      const result = await createListingAction(submitData);

      if (!result.success) {
        setErrors(result.errors || {});
      } else {
        // ✅ Reset form on success
        setErrors({})
        setSuccessMessage(result.message)
        setFormData({
          category: '',
          title: '',
          price: '',
          province: '',
          city: '',
          quantity: '',
          unit: '',
          description: '',
          images: [],
          video: null,
        });
      }
    } catch (err: any) {
      setErrors({
        general: err?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen text-black bg-white">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 pt-16 md:pt-0">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 mt-4 md:mt-0">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Post New Listing</h1>
            <p className="text-gray-600">Share your product with buyers. Fill in the details below to get started.</p>
          </div>

            {successMessage && (
  <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
    <p className="text-green-800 font-medium">{successMessage}</p>
  </div>
)}
          {/* Error Alert */}
          {errors.general && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{errors.general}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white text-black rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              {/* Category & Title Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Category *</label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition text-gray-400 ${
                      errors.category
                        ? 'border-red-400 focus:border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-[#1F7A3F] hover:border-gray-400'
                    }`}
                  >
                    <option value="">Select a category</option>
                    <option value="CROP">Crop</option>
                    <option value="LIVESTOCK">Livestock</option>
                    <option value="EQUIPMENT">Equipment</option>
                    <option value="SERVICE">Service</option>
                  </select>
                  {errors.category && <p className="text-red-600 text-xs mt-1 font-medium">{errors.category}</p>}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Product Title *</label>
                  <input 
                    type="text"
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="e.g., Fresh Organic Tomatoes"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.title
                        ? 'border-red-400 focus:border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-[#1F7A3F] hover:border-gray-400'
                    }`}
                  />
                  {errors.title && <p className="text-red-600 text-xs mt-1 font-medium">{errors.title}</p>}
                </div>
              </div>

              {/* Price, Quantity, Unit Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Price (PKR) *</label>
                  <input 
                    type="number"
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    placeholder="0"
                    min="1"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.price
                        ? 'border-red-400 focus:border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-[#1F7A3F] hover:border-gray-400'
                    }`}
                  />
                  {errors.price && <p className="text-red-600 text-xs mt-1 font-medium">{errors.price}</p>}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Quantity *</label>
                  <input 
                    type="number"
                    name="quantity" 
                    value={formData.quantity} 
                    onChange={handleChange} 
                    placeholder="0"
                    min="1"
                    step="0.1"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.quantity
                        ? 'border-red-400 focus:border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-[#1F7A3F] hover:border-gray-400'
                    }`}
                  />
                  {errors.quantity && <p className="text-red-600 text-xs mt-1 font-medium">{errors.quantity}</p>}
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Unit *</label>
                  <select 
                    name="unit" 
                    value={formData.unit} 
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition text-gray-400 ${
                      errors.unit
                        ? 'border-red-400 focus:border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-[#1F7A3F] hover:border-gray-400'
                    }`}
                  >
                    <option value="">Select unit</option>
                    <option value="KG">Kilogram (KG)</option>
                    <option value="TON">Ton</option>
                    <option value="PIECE">Piece</option>
                  </select>
                  {errors.unit && <p className="text-red-600 text-xs mt-1 font-medium">{errors.unit}</p>}
                </div>
              </div>

              {/* Province & City Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Province */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Province *</label>
                  <select 
                    name="province" 
                    value={formData.province} 
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition text-gray-400 ${
                      errors.province
                        ? 'border-red-400 focus:border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-[#1F7A3F] hover:border-gray-400'
                    }`}
                  >
                    <option value="">Select Province</option>
                    {locations.map(p => (
                      <option key={p.province} value={p.province}>{p.province}</option>
                    ))}
                  </select>
                  {errors.province && <p className="text-red-600 text-xs mt-1 font-medium">{errors.province}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">City *</label>
                  <select 
                    name="city" 
                    value={formData.city} 
                    onChange={handleChange}
                    disabled={!formData.province}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition text-gray-400 ${
                      errors.city
                        ? 'border-red-400 focus:border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-[#1F7A3F] hover:border-gray-400'
                    } ${!formData.province ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {errors.city && <p className="text-red-600 text-xs mt-1 font-medium">{errors.city}</p>}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Description *</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  placeholder="Describe your product in detail... quality, origin, harvest date, etc."
                  rows={5}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition resize-vertical ${
                    errors.description
                      ? 'border-red-400 focus:border-red-500 bg-red-50'
                      : 'border-gray-300 focus:border-[#1F7A3F] hover:border-gray-400'
                  }`}
                />
                {errors.description && <p className="text-red-600 text-xs mt-1 font-medium">{errors.description}</p>}
              </div>

              {/* Images Upload */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-3">Product Images *</label>
                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition ${
                  errors.images
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-300 hover:border-[#1F7A3F] bg-gray-50 hover:bg-[#1F7A3F]/5'
                }`}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer block">
                    <svg className="mx-auto h-12 w-12 text-[#1F7A3F] mb-3" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-gray-800 font-semibold">Click to upload images or drag and drop</p>
                    <p className="text-gray-500 text-sm mt-1">PNG, JPG, GIF up to 10MB each</p>
                  </label>
                </div>
                {errors.images && <p className="text-red-600 text-xs mt-2 font-medium">{errors.images}</p>}

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">{imagePreviews.length} Image{imagePreviews.length !== 1 ? 's' : ''} Selected</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 group-hover:border-[#1F7A3F] transition"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                images: prev.images.filter((_, i) => i !== index)
                              }));
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 shadow-md opacity-0 group-hover:opacity-100 transition"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-3">Product Video (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#1F7A3F] hover:bg-[#1F7A3F]/5 transition">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer block">
                    <svg className="mx-auto h-12 w-12 text-[#1F7A3F] mb-3" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M14 2l26 13v22L14 37V2z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-gray-800 font-semibold">Click to upload video</p>
                    <p className="text-gray-500 text-sm mt-1">MP4, MOV up to 100MB</p>
                  </label>
                </div>
                {formData.video && (
                  <div className="mt-3 flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-green-700 font-medium">{formData.video.name}</span>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, video: null }))}
                      className="ml-auto text-red-500 hover:text-red-700 text-sm font-medium transition"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-8"></div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-4 px-6 rounded-lg transition duration-300 text-white text-lg flex items-center justify-center gap-2 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#1F7A3F] to-[#186a35] hover:shadow-lg hover:scale-105 active:scale-95'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Publishing Listing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 5a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 11-4 0V7H7v6a2 2 0 11-4 0V5z" clipRule="evenodd" />
                    </svg>
                    Publish Listing
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Info */}
          <div className="mt-8 bg-gradient-to-r from-[#1F7A3F]/10 to-[#F4C430]/10 rounded-lg p-6 border border-[#1F7A3F]/20">
            <h3 className="font-semibold text-gray-900 mb-2">Tips for a Great Listing:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Use clear, descriptive titles that help buyers find your product</li>
              <li>• Upload high-quality images from different angles</li>
              <li>• Provide detailed descriptions including quantity, quality, and origin</li>
              <li>• Set competitive prices based on market rates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}