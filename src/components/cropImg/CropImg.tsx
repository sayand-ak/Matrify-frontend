import { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface CropImgProps {
  imageUrl: string | null; // Updated prop type to handle null as well
}

export function CropImg({ imageUrl }: CropImgProps) {
  const cropperRef = useRef<Cropper>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>('');

  const handleCrop = () => {
    if (imageUrl && cropperRef.current) { // Check if imageUrl is valid
      // Get the cropped image data
      const croppedData = cropperRef.current.getCroppedCanvas().toDataURL();

      // Update state with the cropped image URL
      setCroppedImageUrl(croppedData);
    }
  };

  return (
    <div>
      {imageUrl ? (
        <Cropper
          src={imageUrl}
          style={{ height: 400, width: '100%' }}
          aspectRatio={1}
          guides={true}
          crop={handleCrop}
        />
      ) : (
        <p>No image to crop</p>
      )}
      {croppedImageUrl && <img src={croppedImageUrl} alt="Cropped Image" />}
    </div>
  );
}
