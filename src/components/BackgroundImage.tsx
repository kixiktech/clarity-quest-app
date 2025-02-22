
import { FC, useState, useEffect } from 'react';
import { toast } from "sonner";

interface BackgroundImageProps {
  children: React.ReactNode;
}

const BackgroundImage: FC<BackgroundImageProps> = ({ children }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the image
    const img = new Image();
    // Using an Unsplash image as fallback since the upload failed
    img.src = 'https://images.unsplash.com/photo-1500673922987-e212871fec22';
    
    img.onload = () => {
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      toast.error("Background image failed to load");
      console.error("Background image failed to load");
    };
  }, []);

  return (
    <div 
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-6 py-8 bg-background transition-opacity duration-500"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1500673922987-e212871fec22')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        opacity: imageLoaded ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundImage;
