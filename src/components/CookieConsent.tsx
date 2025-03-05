
import React from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface CookieConsentProps {
  onAccept: () => void;
}

const CookieConsent = ({ onAccept }: CookieConsentProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-md z-50 border-t border-white/10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-white">Cookie Notice</h3>
              <p className="text-sm text-white/70 mt-1">
                We use cookies to enhance your experience, remember your preferences, and understand how 
                you use our platform. This includes essential authentication cookies to keep you logged in.
                By continuing to use our site, you consent to our use of cookies in accordance with our 
                <a href="/privacy" className="text-primary hover:underline"> Privacy Policy</a>.
              </p>
            </div>
          </div>
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" className="text-xs h-8 px-3 bg-white/10 border-white/20 hover:bg-white/20" onClick={onAccept}>
              I understand
            </Button>
            <Button className="text-xs h-8 px-3" onClick={onAccept}>
              Accept all
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
