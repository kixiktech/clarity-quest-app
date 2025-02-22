
import { FC } from 'react';

interface BackgroundImageProps {
  children: React.ReactNode;
}

const BackgroundImage: FC<BackgroundImageProps> = ({ children }) => {
  return (
    <div 
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-6 py-8 bg-background"
      style={{
        backgroundImage: `url('/lovable-uploads/834bdd6f-02f9-494e-8c6d-4d18709d5eb5.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundImage;
