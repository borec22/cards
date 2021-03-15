import React from 'react';
import {Routes} from '../Routes/Routes';
import {Header} from '../Header/Header';


export const Main: React.FC = () => {
   return (
      <>
         <Header/>

         <Routes/>
      </>
   );
};