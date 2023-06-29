import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import logoWhite from '../../Assets/astro-place-white.png';
import './styles.css';

const LandingPage = () => {
  const { setShowNavBar, setSearchByCategory } = useContext(ShoppingCartContext);
  const [bgColor, setBgColor] = useState('#CBB6DD');
  const [showModal, setShowModal] = useState(false);

  const currentPath = window.location.pathname;
  let stringCurrentPath = currentPath.substring(currentPath.lastIndexOf('/'));
  // console.log(stringCurrentPath);
  
  (stringCurrentPath === '/')
    ? setShowNavBar(false)
    : null;

  useEffect(() => {
    const interval = setInterval(() => {
      const randomColor = getRandomColor();
      setBgColor(randomColor);
    }, 20000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getRandomColor = () => {
    const colors = [
      '#CBB6DD',
      '#9381BF',
      '#3C437A',
      '#1D274A',
      '#232834',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleConoceMas = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex h-[100vh] items-center justify-center min-h-screen bg-gradient-animation" style={{ backgroundColor: bgColor }}>
        <div className="hidden md:block md:w-1/2 h-[100%] bg-black text-white py-16 px-8 text-center">
          <h2 className="relative top-[20vh] text-2xl font-bold mb-4">Astro Place</h2>
          <p className="relative top-[20vh] text-lg">
          Here is the final project of the "React.js con Vite.js y Tailwind CSS" course from Platzi. 
          My goal with the course was to put into practice web development skills and create an interactive, 
          responsive and customized e-commerce with my own style. I hope you like it!
          </p>
        </div>
        
        <div className="md:w-1/2">
          <div className="text-center">
            <img src={logoWhite} alt="Astro Place Logo" className="w-40 mx-auto mb-4" />
            <h1 className="text-white text-3xl font-bold mb-8">Welcome to  <br />  Astro Place</h1>
            <div className="md:hidden text-center">
              <button
                className="bg-black text-white px-6 py-3 rounded-full mt-4 mb-8 mx-auto"
                onClick={handleConoceMas}
              >
                About the project
              </button>
            </div>
            <NavLink
              to="/All"
              className="bg-white text-[#232834] px-6 py-3 rounded-full font-semibold hover:bg-purple-200 transition duration-300"
              onClick={() => {setShowNavBar(true), setSearchByCategory(null)}}
            >
              Explore
            </NavLink>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-gray-200 py-4 px-8 flex justify-center items-center">
            <span className="text-gray-800 mr-2">By Bryan Garay</span>
            <a
              href="https://github.com/BryanGaray99"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-2"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                alt="GitHub Logo"
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://linkedin.com/in/bg99astro/"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-2"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                alt="LinkedIn Logo"
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://www.instagram.com/astronomy_student/?igshid=MjEwN2IyYWYwYw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                alt="Instagram Logo"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-4 mx-2 md:w-1/2 max-w-lg">
            <h2 className="text-3xl font-bold mb-4 text-center">Astro Place</h2>
            <p className="text-lg text-center">
            Here is the final project of the "React.js con Vite.js y Tailwind CSS" course from Platzi. 
            My goal with the course was to put into practice web development skills and create an interactive, 
            responsive and customized e-commerce with my own style. <br/>I hope you like it!
            </p>
            <div className="flex justify-center">
              <button
                className="bg-black text-white px-4 py-2 rounded-full mt-4 mx-auto"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;

// import React, { useContext, useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { ShoppingCartContext } from '../../Context';
// import logoWhite from '../../Assets/astro-place-white.png';
// import './styles.css';

// const LandingPage = () => {
//   const { setShowNavBar } = useContext(ShoppingCartContext);
//   const [bgColor, setBgColor] = useState('#CBB6DD');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const randomColor = getRandomColor();
//       setBgColor(randomColor);
//     }, 20000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   const getRandomColor = () => {
//     const colors = [
//       '#CBB6DD',
//       '#9381BF',
//       '#3C437A',
//       '#1D274A',
//       '#232834',
//     ];
//     return colors[Math.floor(Math.random() * colors.length)];
//   };

//   return (
//     <div className="flex h-[100vh] items-center justify-center min-h-screen bg-gradient-animation" style={{ backgroundColor: bgColor }}>
//       <div className="w-1/2 h-[100%] bg-black text-white py-16 px-8 text-center">
//         <h2 className="relative top-[20vh] text-3xl font-bold mb-4">Astro Place</h2>
//         <p className="relative top-[20vh] text-lg">
//           Te presento el proyecto final del Curso de React.js con Vite.js y Tailwind CSS de Platzi. 
//           Mi objetivo con el curso fue poner en práctica habilidades de desarrollo web y crear un e-commerce interactivo, responsive y personalizado con mi estilo. Espero te guste! 
//         </p>
//       </div>
//       <div className="w-1/2">
//         <div className="text-center">
//           <img src={logoWhite} alt="Astro Place Logo" className="w-40 mx-auto mb-4" />
//           <h1 className="text-white text-3xl font-bold mb-8">Welcome to Astro Place</h1>
//           <NavLink
//             to="/All"
//             className="bg-white text-[#6936F5] px-6 py-3 rounded-full font-semibold hover:bg-purple-200 transition duration-300"
//             onClick={() => setShowNavBar(true)}
//           >
//             Explore
//           </NavLink>
//         </div>
//         <div className="absolute bottom-0 left-0 w-full bg-gray-200 py-4 px-8 flex justify-center items-center">
//           <span className="text-gray-800 mr-2">By Bryan Garay</span>
//           <a
//             href="https://github.com/BryanGaray99"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mr-2"
//           >
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
//               alt="GitHub Logo"
//               className="w-6 h-6"
//             />
//           </a>
//           <a
//             href="https://linkedin.com/in/bg99astro/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mr-2"
//           >
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
//               alt="LinkedIn Logo"
//               className="w-6 h-6"
//             />
//           </a>
//           <a
//             href="https://www.instagram.com/astronomy_student/?igshid=MjEwN2IyYWYwYw%3D%3D"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
//               alt="Instagram Logo"
//               className="w-6 h-6"
//             />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;
