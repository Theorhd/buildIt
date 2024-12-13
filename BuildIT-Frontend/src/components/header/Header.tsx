import { Link } from "react-router-dom";
import logo from '/buildit-logo.png';
import { useTranslation } from 'react-i18next';

import {
  ChevronLeftIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import Navbar from "./Navbar";

export default function Header({ isNavbarOpen, toggleNavbar }: { isNavbarOpen: boolean, toggleNavbar: () => void }) {

  const { t } = useTranslation();

  return (
    <header className='h-full bg-bgPrimary flex flex-col justify-between select-none'>
      <div className="">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center">
            <img src={logo} className="w-8" alt="BuildIT logo" />
            <h1 className="text-2xl text-primary ml-2 font-bold">BUILD<span className="text-secondary">IT</span></h1>
          </Link>
          <ChevronLeftIcon onClick={()=>{toggleNavbar()}} className="w-4 h-4 cursor-pointer" />
        </div>


        <div className={`transition-opacity duration-300 ${isNavbarOpen ? "opacity-100" : "opacity-0"}`}>
          <div className="w-40 border-b border-bgSecondary mb-2 mx-auto"></div>
      
          <div className="flex justify-between items-center px-4 py-2">
            <span>{t('Your projects')}</span>
            <PlusIcon className="w-4 h-4 cursor-pointer" title="Create new project"/>
          </div>
          
          <Navbar />
        </div>
      </div>
      <div className="p-4">
        <div className="w-40 border-b border-bgSecondary mb-5 mx-auto"></div>
        <div className="w-12 h-12 rounded-full bg-bgPrimary border-2 border-bgSecondary flex justify-center items-center cursor-pointer text-sm">
          MB
        </div>
      </div>
    </header>
  );
}