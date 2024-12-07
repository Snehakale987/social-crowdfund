import React, { useState } from 'react';
import '../styles/ImageUploader.css';

function ImageUploader({ images, updateImages }) {
    const [previewImages, setPreviewImages] = useState(images || []);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newPreviewImages = files.map((file) => URL.createObjectURL(file));

        setPreviewImages([...previewImages, ...newPreviewImages]);
        updateImages([...images, ...files]);
    };

    const handleRemoveImage = (index) => {
        const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
        const updatedImages = images.filter((_, i) => i !== index);

        setPreviewImages(updatedPreviewImages);
        updateImages(updatedImages);
    };

    return (
        <div className="image-uploader">
            <h3>Upload Images</h3>
            <input type="file" multiple onChange={handleImageUpload} accept="image/*" />
            <div className="image-preview">
                {previewImages.map((image, index) => (
                    <div key={index} className="image-container">
                        <img src={image} alt={`Preview ${index + 1}`} />
                        <button
                            className="remove-image-button"
                            onClick={() => handleRemoveImage(index)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageUploader;
