import React, { useState } from 'react';
import axios from 'axios';
import { Globe, MapPin, User, Ruler, FileText, CheckCircle, ImageIcon } from 'lucide-react';
import './Registerland.css';

const RegisterLand = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    location: '',
    area: '',
    documents: [],
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);

    if (type === 'images' && files.length > 4) {
      setErrorMsg('You can upload a maximum of 4 images.');
      return;
    }

    setFormData({ ...formData, [type]: files });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('ownerName', formData.ownerName);
      data.append('location', formData.location);
      data.append('area', formData.area);

      formData.documents.forEach((file) => data.append('documents', file));
      formData.images.forEach((file) => data.append('images', file));

      const response = await axios.post('http://localhost:5000/api/lands', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        setShowAlert(true);
        setFormData({ ownerName: '', location: '', area: '', documents: [], images: [] });
        onSuccess && onSuccess();
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setErrorMsg('Failed to register land. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormInput = ({ id, label, type = 'text', icon: Icon, placeholder }) => (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-container">
        {Icon && <Icon className="input-icon" />}
        <input
          type={type}
          id={id}
          name={id}
          value={formData[id]}
          onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
          required
          placeholder={placeholder}
        />
      </div>
    </div>
  );

  return (
    <div className="register-page">
      {showAlert && (
        <div className="success-message">
          <CheckCircle className="success-icon" />
          Land successfully registered!
        </div>
      )}
      {errorMsg && <div className="error-message">{errorMsg}</div>}

      <div className="form-card compact">
        <h4 className="form-title">Register Land</h4>
        <p className="form-subtitle">Enter details to secure ownership on the blockchain.</p>

        <form onSubmit={handleSubmit}>
          <FormInput id="ownerName" label="Owner Name" icon={User} placeholder="John Doe" />
          <FormInput id="location" label="Location" icon={MapPin} placeholder="1.2345, 36.7890 or Area Name" />
          <FormInput id="area" label="Area" icon={Ruler} placeholder="e.g., 5.5 Hectares" />

          {/* Documents Upload */}
          <div className="file-upload">
            <FileText className="file-icon" />
            <p>Upload Documents (PDF, DOC, etc.)</p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(e, 'documents')}
              name="documents"
            />
          </div>

          {/* Images Upload */}
          <div className="file-upload">
            <ImageIcon className="file-icon" />
            <p>Upload Images (Max 4)</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'images')}
              name="images"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterLand;
