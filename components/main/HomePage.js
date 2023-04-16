import Image from "next/image";
import React from "react";
import useUser from "../../controls/useUser";
import MainHeader from "./MainHeader";

const HomePage = () => {
  return (
    <div className=" bg-slate-100 dark:bg-slate-900 ">
      <MainHeader
        logoClass=" text-4xl"
        className={
          "bg-transparent max-w-6xl mx-auto py-2 font-semibold text-xl"
        }
      />
      <Hero />
    </div>
  );
};

const Hero = () => {
  const { LoginWIthEmail } = useUser();

  const onGetStarted = () => {
    LoginWIthEmail("mike@kenal.com", "user123", () => {
      location.replace("/feed");
    });
  };
  return (
    <div className="h-[85vh]  flex px-3">
      <div className="container mx-auto   justify-end items-center flex-col-reverse md:flex-row flex-wrap-reversed  max-w-6xl w-full p-6 flex gap-6">
        <section className=" flex flex-col gap-3 items-center md:items-start justify-center">
          <h1 className=" text-slate-800 dark:text-slate-200 text-center md:text-start text-[2.6rem] leading-10 sm:text-[3.7rem] dmd:text-[3rem] lg:text-[4rem] sm:leading-[3.6rem] font-extrabold">
            A Place For Great Thoughts!
          </h1>
          <h2 className="text-sky-700 dark:text-slate-400 text-center md:text-start font-medium  text-[1.1rem] sm:text-[1.5rem] leading-7 ">
            Lorem ipsum dolor sit amet.
          </h2>
          <button
            onClick={onGetStarted}
            className="bg-primary-light sm:my-3 text-slate-100  font-bold text-3xl px-12 rounded-full whitespace-nowrap"
          >
            Get Start
          </button>
        </section>
        <section className="relative ring-1d w-full flex flex-col items-center justify-end min-w-[230px] max-w-[40%] md:max-w-[50%] aspect-square  max-h-[99%] ">
          <div className=" -rotate-3 rounded-[10%] overflow-hidden relative w-full max-w-[400px] h-full flex flex-col justify-end  ">
            <div className="w-full h-full rounded-[10%]   bg-gradient-to-tr from-purple-500 aspect-square to-indigo-500 p-2 max-w-[400px] max-h-[90%]  "></div>
            <Image
              className=" aspect-square"
              src="/hero-image2.png"
              objectFit="contain"
              layout="fill"
              alt=""
            />
          </div>
          {/* <i className="absolute -left-10 ri-heart-fill text-[5rem]   text-pink-500  stroke-1 "></i> */}
          {/* <i className="absolute right-[5%] top-[5%] ri-heart-fill text-[5rem]   text-pink-500  stroke-1 "></i> */}
        </section>
      </div>
    </div>
  );
};
export default HomePage;
