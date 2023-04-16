import { useTheme } from "next-themes";
import Image from "next/image";
import HomePage from "../components/main/HomePage";
import MainLayout from "../components/main/MainLayout";

export default function Home() {
  return (
    // <MainLayout
    //   className=" bg-[#f3e8df]d bg-slate-50 dark:bg-[#15151c] "
    //   headerCss="bg-transparent shadow-none "
    // >
    <HomePage />
    // {/* <div
    //   className={` bg-[#f3e8df]d dark:bg-[#15151c]d bg-no-repeat bg-fill bg-center backdrop-blur-sm blur-smd flex flex-col text-center items-center justify-center  flex-1 pb-20 p-8 sm:flex-row `}
    // >
    //   <MainImage />

    //   <div className=" gap-3 flex flex-col text-left">
    //     <h1 className=" md:text-6xl text-4xl font-bold text-pink-400">
    //       Ideas Worth Sharing!
    //     </h1>
    //     <h2 className="sm:text-3xl text-2xl text-slate-600 dark:text-slate-500 max-w-xl">
    //       connect with your friends and families through Kenal.
    //     </h2>
    //   </div>
    // </div> */}
    // {/* </MainLayout> */}
  );
}

export function MainImage({ className, ...props }) {
  const { theme } = useTheme();
  return (
    <div
      {...props}
      className={
        " relative p-2 min-w-[300px]d max-w-[400px] w-full aspect-square " +
        className
      }
    >
      <Image
        src={theme == "dark" ? "/bgdark.gif" : "/bg1.gif"}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
