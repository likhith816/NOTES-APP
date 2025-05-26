import React from 'react';
import { StickyNote } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-purple-600 text-white py-4 mb-6 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <StickyNote className="mr-2" size={24} />
          <h1 className="text-xl font-semibold">Notes App</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;