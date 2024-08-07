import React, { useState } from "react";
import { useField } from "formik";
import "./picureUplode.scss";

const PictureUpload = ({ name }) => {
  const [field, meta, helpers] = useField(name);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    helpers.setValue(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div
      className={`profile-picture-upload ${dragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="file-input"
        id="file-input"
      />
      <label htmlFor="file-input" className="upload-label">
        {preview ? (
          <img
            src={preview}
            alt="Profile Preview"
            className="profile-preview"
          />
        ) : (
          <div className="placeholder">
            <p>Drag & Drop or Click to Upload</p>
          </div>
        )}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default PictureUpload;
