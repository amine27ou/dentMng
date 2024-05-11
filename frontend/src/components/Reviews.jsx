import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
        <FaChevronRight
            className={className}
            style={{
                ...style,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "gray",
                height: "30px",
                width: "30px",
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <FaChevronLeft
            className={className}
            style={{
                ...style,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "gray",
                height: "30px",
                width: "30px",
            }}
            onClick={onClick}
        />
    );
}

function Reviews() {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <div className="slider-container p-10 max-w-4xl">
            <Slider {...settings}>
                <div className="flex items-center justify-center text-center p-10">
                    <div className="flex items-center justify-center flex-col">
                        <div className="flex  items-center gap-10">
                            <img
                                src="https://imgs.search.brave.com/X6jkh5g8H3qFDCcKBG659kFNBQbKJDgSBA9m2EOjQIA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/b3J0cmFpdC13aGl0/ZS1tYW4taXNvbGF0/ZWRfNTM4NzYtNDAz/MDYuanBnP3NpemU9/NjI2JmV4dD1qcGc"
                                className="w-[50px] object-cover h-[50px] rounded-full"
                                alt="user"
                            />
                            <div>
                                <p className="font-bold">Faycal</p>
                                <p className="text-gray">Patient</p>
                            </div>
                        </div>

                        <p className="p-5 text-gray-400">
                            This is the best hospital i have ever been to and i
                            recommend this to anyone,This is the place to come
                            in India
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center text-center p-10">
                    <div className="flex items-center justify-center flex-col">
                        <div className="flex  items-center gap-4">
                            <img
                                src="https://imgs.search.brave.com/X6jkh5g8H3qFDCcKBG659kFNBQbKJDgSBA9m2EOjQIA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/b3J0cmFpdC13aGl0/ZS1tYW4taXNvbGF0/ZWRfNTM4NzYtNDAz/MDYuanBnP3NpemU9/NjI2JmV4dD1qcGc"
                                className="w-[50px] object-cover h-[50px] rounded-full"
                                alt="user"
                            />
                            <div>
                                <p className="font-bold">Faycal</p>
                                <p className="text-gray">Patient</p>
                            </div>
                        </div>

                        <p className="p-5 text-gray-400">
                            This is the best hospital i have ever been to and i
                            recommend this to anyone,This is the place to come
                            in India
                        </p>
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default Reviews;
