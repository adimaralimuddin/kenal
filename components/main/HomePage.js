import Image from "next/image";
import React from "react";

const HomePage = () => {
  return (
    <div className="">
      <Hero />
    </div>
  );
};

const Hero = () => {
  return (
    <div className="h-[85vh]  flex">
      <div className="container mx-auto  max-w-6xl w-full p-6 flex gap-6">
        <section className="flex-1 flex flex-col gap-6 items-start justify-center">
          <h1 className=" text-indigo-500 text-[4rem] leading-[3.6rem] font-bold">
            Social Media App At the tip of your hand!
          </h1>
          <h2 className="font-medium text-[1.3rem] leading-7 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            illum,
          </h2>
        </section>
        <section className="flex-1 flex flex-col p-6 ">
          <div className=" relative rotate-3 flex-1 flex flex-col justify-end">
            <div className="bg-pink-400 p-2 rounded-[10%] flex-1 max-h-[90%] max-w-[85%] rotate-3d relative mx-auto w-full"></div>
            <Image
              className="-rotate-3"
              src="/hero-image.png"
              objectFit="cover"
              layout="fill"
              alt=""
            />
          </div>
        </section>
      </div>
    </div>
  );
};
export default HomePage;
