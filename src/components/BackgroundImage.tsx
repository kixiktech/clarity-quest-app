
import { FC } from 'react';

interface BackgroundImageProps {
  children: React.ReactNode;
}

const BackgroundImage: FC<BackgroundImageProps> = ({ children }) => {
  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-6 py-8">
      {children}
    </div>
  );
};

export default BackgroundImage;
