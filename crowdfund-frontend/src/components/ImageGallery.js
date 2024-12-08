import React, { useState } from 'react';
import '../styles/ImageGallery.css';

function ImageGallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(images[0]); // Default to the first image

    const handleImageClick = (image) => {
        setSelectedImage(image); // Update the selected image on click
    };

    return (
        <div className="image-gallery">
            {/* Selected Image Display */}
            <div className="selected-image-container">
                <img
                    src={`http://test-797390839.us-east-1.elb.amazonaws.com/${selectedImage}`}
                    alt="Selected Cause"
                    className="selected-image"
                />
            </div>

            {/* Thumbnail Gallery */}
            <div className="thumbnail-gallery">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={`http://test-797390839.us-east-1.elb.amazonaws.com/${image}`}
                        alt={`Cause Thumbnail ${index + 1}`}
                        className={`thumbnail-image ${
                            selectedImage === image ? 'active' : ''
                        }`}
                        onClick={() => handleImageClick(image)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ImageGallery;
