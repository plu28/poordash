import { ArrowLeft } from "lucide-react";
import React from "react";

interface HeaderProps {
  title: String;
  backButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, backButton }) => {
  return (
    <header className="w-full h-8 flex gap-2 items-center">
      {backButton && (
        <button
          className="h-full flex items-center justify-center">
          <ArrowLeft className="h-7 w-7"/>
        </button>
      )}
      <h1 className="text-2xl font-bold text-gray-900" >{title}</h1>
    </header>
  );
};

export default Header;