import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { GiToothbrush } from "react-icons/gi";

export default function Services() {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
      <FaChevronRight
        className={className}
        style={{ ...style, display: "flex", alignItems: 'center', justifyContent: 'center', color: 'white', height: '40px', width: '40px',backgroundColor:"rgb(114, 208, 255)",borderRadius:'4px',padding:"10px" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <FaChevronLeft
        className={className}
        style={{ ...style, display: "flex", alignItems: 'center', justifyContent: 'center', color: 'white', height: '40px', width: '40px',backgroundColor:"rgb(114, 208, 255)",borderRadius:'4px',padding:"10px" }}
        onClick={onClick}
      />
    );
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className='flex flex-row items-center justify-between gap-10'>
      <div className='w-1/3'>
        <h3 className='text-blue-400 font-bold'>Services</h3>
        <h1 className='text-3xl font-bold '>We Cover A Big Variety Of Medical Services</h1>
        <p className='mb-4 text-gray-500'>We provide the special tips and advice’s of heath care treatment and high level of best.</p>
        <Link to='/' className='bg-blue-400 rounded-3xl p-2 text-white'>All Services</Link>
      </div>
      <div className='w-full max-w-2xl shadow-md p-10 rounded-lg'>
        <Slider {...settings}>
            <div>
                <div className='p-5 flex flex-col items-center justify-center'>
                    <GiToothbrush className='text-blue-400 text-6xl' />
                    <h3 className='text-blue-400 font-bold'>Service </h3>
                    <p className='text-gray-500 text-center'>We Provide All type of vaccine on daily basis for Free</p>
                </div>
            </div>
            <div>
                <div className='p-5 flex flex-col items-center justify-center'>
                    <GiToothbrush className='text-blue-400 text-6xl' />
                    <h3 className='text-blue-400 font-bold'>Service </h3>
                    <p className='text-gray-500 text-center'>We Provide All type of vaccine on daily basis for Free</p>
                </div>
            </div>
          
          
        </Slider>
      </div>
    </div>
  );
}
