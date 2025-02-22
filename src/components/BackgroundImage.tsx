
import { FC, useState, useEffect } from 'react';
import { toast } from "sonner";

interface BackgroundImageProps {
  children: React.ReactNode;
}

const BackgroundImage: FC<BackgroundImageProps> = ({ children }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [useBackupImage, setUseBackupImage] = useState(false);
  
  const primaryImageUrl = '/lovable-uploads/c70bf7b9-f04e-4051-8590-091140fa6340.png';
  const backupImageUrl = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05';

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.src = primaryImageUrl;
    
    img.onload = () => {
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      console.error("Primary image failed to load, switching to backup");
      setUseBackupImage(true);
      // Load backup image
      const backupImg = new Image();
      backupImg.src = backupImageUrl;
      backupImg.onload = () => {
        setImageLoaded(true);
      };
      backupImg.onerror = () => {
        toast.error("Failed to load background image");
        console.error("Backup image also failed to load");
      };
    };
  }, []);

  return (
    <div 
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-6 py-8 bg-background transition-opacity duration-500"
      style={{
        backgroundImage: `url('${useBackupImage ? backupImageUrl : primaryImageUrl}')`,
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
