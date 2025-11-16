import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

interface HeaderProps {
  title: string;
  backButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, backButton }) => {
  const navigate = useNavigate();
  return (
    <header className="w-full h-8 flex gap-2 items-center">
      {backButton && (
        <button
          onClick={() => navigate(-1)}
          className="h-full flex items-center justify-center cursor-pointer">
          <ArrowLeft className="h-7 w-7"/>
        </button>
      )}
      <h1 className="text-2xl font-bold text-gray-900" >{title}</h1>
    </header>
  );
};

export default Header;