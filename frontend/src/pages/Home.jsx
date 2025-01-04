import Navbar from "../components/navbar";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCamera, FaRunning, FaLinkedin,  FaInstagram, FaFacebook   } from "react-icons/fa";
import { ImAirplane } from "react-icons/im";


const Home = () => {
 


  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show2");
        } else {
          entry.target.classList.remove("show2");
        }
      });
    }, {});

    const hiddenElements = document.querySelectorAll(".hidden2");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-[600px] relative flex items-center justify-center ">
       
        <div 
          className="absolute inset-0 bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-black/20 before:backdrop-blur-[2px]"
          style={{ backgroundImage: "url('/IMG_2496.jpg')" }}
        ></div>

       
        <h1 className="font-custom text-white text-6xl text-center relative z-10 hidden2">
          Hello, I'm Matupoom
        </h1>
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-7 p-10  w-[100%]  items-center justify-center mb-12 hidden2">
        <div className="flex flex-col itmes-center justify-center ">
        <h1 className="text-white  font-custom m-6 p-2 text-[60px] ">About me</h1>
        <p className="text-[28px] text-white  font-custom m-6 p-2 leading-[2]"> I'm Matupoom Soontornthanon, a junior year computer science student at University of Illinois Urbana-Champaign. I'm passionate about photography and explore new places around the world , capturing the moments to reminisce about later. </p>
        </div>
        <div>
          <img src="/IMG_3339.jpg" className="h-[600px] w-full object-cover rounded-lg shadow-lg" alt="me" />
        </div>

        

        
      
      




      </div>
      <div className="bg-[#37324a] p-10 rounded-lg " >
        <h1 className="text-center font-custom text-white text-[60px] mb-6 hidden2">Hobbies and interests</h1>
        
        <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-7 p-10  w-[100%]  items-center justify-center mb-12  ">




        
        {/*First row*/ }
        <div className="flex flex-col  justify-center  col-span-2 hidden2">
          <div className="flex items-center justify-center mb-5">
          <h1 className="text-white text-3xl font-custom mr-3 ">Photography</h1> <FaCamera  className="text-white text-3xl" />
          
          </div>
          <p className="text-white text-2xl leading-[2]  font-custom" >Photography is my way of capturing moments and turning them into timeless memories. Whether the landscape of mountain, a city skyline, or Street photography that reflect everyday life, I find enjoy in freezing these memories through my lens. You can explore my gallery above, where I share my favorite shots along with the stories and locations behind them. </p>
        </div>

        <div className="flex flex-col itmes-center justify-center hidden2">
          <img src="/IMG_6776.jpg" className="rounded-[20px]"></img>
        </div>

         {/*Second row*/ }

         <div className="flex flex-col  justify-center  col-span-2 hidden2">
          <div className="flex items-center justify-center mb-5">
          <h1 className="text-white text-3xl font-custom mr-3 ">Travel</h1> <ImAirplane  className="text-white text-3xl" />
          
          </div>
          <p className="text-white text-2xl leading-[2]  font-custom">Exploring new places and cultures inspires my photography passion, and it also fulfills my bucket list to travel all around the world. From  urban landscapes to quiet countryside scenes, From the top of mountain to the beach, every trip gives me an new perspective about the world and different people and learn new more things. </p>
        </div>

        <div className="flex flex-col itmes-center justify-center hidden2 ">
          <img src="/IMG_6008-2.jpg" className="rounded-[20px]"></img>
        </div>

         {/*Third row*/ }

         <div className="flex flex-col  justify-center  col-span-2 hidden2">
          <div className="flex items-center justify-center mb-5">
          <h1 className="text-white text-3xl font-custom mr-3 ">Running</h1> <FaRunning  className="text-white text-3xl" />
          
          </div>
          <p className="text-white text-2xl leading-[2]  font-custom">I started running because I realized that I got tired too quickly while hiking, which is something I really enjoy. Initially, I wanted to build more stamina and endurance for outdoor activities like hiking, but running has turned into something much more than that. After running over and over, I could complete a half marathon, a running event of 13.1 miles (21.1 kilometers).    </p>
        </div>

        <div className="flex flex-col itmes-center justify-center hidden2">
          <img src="/race.jpg" className="rounded-[20px] "></img>
        </div>





        

        </div>
          
      </div>


      <div className="bg-[#413b59] p-10 rounded-lg" >
      <h1 className="text-center font-custom text-white text-[60px] mb-6 hidden2">Skills</h1>


      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-7 p-10  w-[100%]  justify-center mb-12  hidden2">
        <div className="flex flex-col  mb-5 ">

          
          <h1 className="text-white text-3xl font-custom mr-3 text-center mb-4  ">Technical Skills</h1>
         
          <div className="flex items-center" >
          <p className="text-white text-2xl  leading-[3]  font-custom  mr-2">Programming languages:  </p> <p className="text-gray-300 text-2xl  font-custom"> JavaScript, Python, C++</p>
          </div>

          <div className="flex items-center" >
          <p className="text-white text-2xl  leading-[3]    font-custom  mr-2">Web Development:  </p> <p className="text-gray-300 text-2xl   font-custom"> React, HTML, Tailwind CSS, CSS, Django (for back-end development)</p>
          </div>


          <div className="flex items-center" >
          <p className="text-white text-2xl  leading-[3]    font-custom  mr-2">Version Control:  </p> <p className="text-gray-300 text-2xl  font-custom">Git, GitHub</p>
          </div>


          <div className="flex items-center" >
          <p className="text-white text-2xl  leading-[3]    font-custom  mr-2">Databases:  </p> <p className="text-gray-300 text-2xl  font-custom">SQL</p>
          </div>


          <div className="flex items-center" >
          <p className="text-white text-2xl   leading-[3]   font-custom  mr-2">Photography:  </p> <p className="text-gray-300 text-2xl  font-custom">Adobe Lightroom, Photoshop</p>
          </div>


        </div>



        <div className="flex flex-col mb-5">
          <h1 className="text-white text-3xl font-custom mr-3 mb-3 text-center ">Soft Skills</h1>
          

          <div className="  items-center mb-5" >
          <p className="text-white text-2xl   leading-[3]   font-custom  mr-2">Problem Solving:  </p> <p className="text-gray-300 text-2xl  font-custom">Resolving the intricate problems that arise during the project in order to approach the solution</p>
          </div>

          <div className=" items-center  mb-5" >
          <p className="text-white text-2xl   leading-[3]   font-custom  mr-2">Communication:  </p> <p className="text-gray-300 text-2xl  font-custom">Clear communication between team member</p>
          </div>



          <div className=" items-center  mb-5" >
          <p className="text-white text-2xl   leading-[3]   font-custom  mr-2">Collaboration:  </p> <p className="text-gray-300 text-2xl  font-custom">Experience in working within the team in group project to achieve the goals</p>
          </div>

          <div className=" items-center  mb-5" >
          <p className="text-white text-2xl   leading-[3]   font-custom  mr-2">Time Management:  </p> <p className="text-gray-300 text-2xl  font-custom">Prioritizing the tasks and effectively manage the time to meet the deadlines</p>
          </div>
          

          
        </div>


      </div>

      
      </div>

      <div className=" bg-gray-900">
        
        <div className="flex justify-center items-center p-7  h-[70px] ">
          <h1 className="text-gray-200 text-xl font-custom mr-3">Follow</h1>

          <a href="https://www.linkedin.com/in/matupoom-soontornthanon-1b3155328/" target="_blank">
          <FaLinkedin className="text-white text-3xl mr-5 hover:cursor-pointer" />
          </a>

          <a href="https://www.facebook.com/Toon.STN" target="_blank">
          <FaFacebook className="text-white text-3xl mr-5 hover:cursor-pointer" />
          </a>


          <a href="https://www.instagram.com/toonn_16/" target="_blank">
            <FaInstagram className="text-white text-3xl mr-5 hover:cursor-pointer" />
          </a>
        </div>
       
        </div>
      
    </>
  );
};

export default Home;