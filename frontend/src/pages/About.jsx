import Navbar from "../components/navbar";
import { useEffect } from "react";



function About()
{



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

    return(


        <>
        <Navbar/>
        <h1 className="hidden2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-pink-500 to-red-500 text-5xl mt-6 ml-6 mb-6 font-custom p-2">
        About This Website
        </h1>
        <div className="container-bg ">   
       

        <div className="hidden2 container-bg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-7 p-10  w-[100%]  items-center justify-center ">
        <p className="text-white font-custom m-6 p-2 text-[24px] leading-[3] indent-12">
            Welcome to My personal profile website - a personal portfolio that brings together my passion for photography. Every picture in my collection shows the places I've been. You will find a gallery featuring some of my favorite photographs, and what makes this gallery special is its integration with a map API, allowing you to see the exact locations where each picture was taken.
        </p>
        <img src="IMG_1797.jpg" className="h-[700px] w-full object-cover rounded-lg shadow-lg " alt="me" />
        </div>


       
        <div className=" hidden2 container-bg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-7 p-4  w-[100%] justify-center items-center ">
        <img src="MU4A1399.jpg" className="h-[600px] w-full object-cover rounded-lg shadow-lg " alt="me" />
        <p className="text-white font-custom m-6 p-2 text-[24px] leading-[3] indent-12 ">Whether it’s a breathtaking landscape, a bustling cityscape, or a serene moment in nature, the map provides context and invites you to explore the world through my lens. This feature adds depth to the images, turning them into a visual and geographical journey.</p>
        </div>
        
        

        <div className="container-bg hidden2">
        <div className="w-[90%] mx-auto ">
        <p className="text-white font-custom p-2 text-[24px] leading-[3] text-center mt-7 mb-20">This website is developed using Django for the back-end, React for the front-end, and Tailwind CSS for the styling. Django powers the server-side logic, data management, and API integration, while React provides a dynamic, interactive user interface. Tailwind CSS is used to create a clean, responsive design with customizable, utility-first classes, ensuring the website is visually appealing and easy to navigate. Together, these technologies create a seamless platform to showcase my photography, with an interactive gallery that integrates location tracking via a map API, offering visitors an immersive experience as they explore my work</p>
        </div>
        </div>

        <div className=" bg-gray-900">
        
        <div className="flex justify-center items-center p-7  h-[70px] hidden2">
            <img src="tailwind.png" className="h-[40px] mr-5" alt="me" />
            <img src="JavaScript.png" className="h-[50px] mr-5" alt="me" />
            <img src="react.png" className="h-[50px] mr-5" alt="me" />
            <img src="django.png" className="h-[50px] mr-5" alt="me" />
        </div>
       
        </div>
        </div>
        </>


    )
       
    
}


export default About

