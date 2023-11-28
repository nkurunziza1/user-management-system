import React from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className='bg-home md:h-full md:w-full flex flex-col py-[250px] px-2 md:px-16 bg-no-repeat bg-cover bg-center'>
        <div className='text-white text-center md:text-left'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>
            Welcome to Our Task Management System
          </h1>
          <p className='text-lg md:text-xl mb-8'>
            Streamline your project management with our efficient task assigning system. Assign tasks to team members, set priorities, and track progress seamlessly. Our user-friendly interface ensures a smooth experience for managing tasks and projects of any scale. Stay organized, enhance collaboration, and boost productivity with our powerful task management solution.
          </p>
           <div>
            
           </div>
          <Link to="/signup"><button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
            Get Started
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
