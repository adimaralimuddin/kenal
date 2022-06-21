import Image from "next/image";
import { useState } from "react";
import IconBtn from "./IconBtn";

export default function ImgViewer({ imgs }) {
    const [cur, setCur] = useState(0)
    const [open,setOpen] = useState(false)
    
    const Img = ({ ind = 0, css }) => <div onClick={_ => { setCur(ind);  setOpen(true)}} className={" cursor-pointer relative rounded-md overflow-hidden m-1 flex-1 " + css}>
        <Image  src={imgs?.[ind]?.url} layout='fill' objectFit="cover" />
    </div>

    const View=()=>{ switch (imgs?.length) {
    case 1:
        return  <Img ind={ 0} css='min-h-[400px]'/>
    case 2:
        return <div className="flex min-h-[300px] ">
                    <Img ind={0}/>
                    <Img ind={1}/>
                </div>
    case 3:
        return <div className="">
                <Img ind={0} css='min-h-[270px]' />
            <div className="flex min-h-[200px]">
                <Img ind={1} />
                <Img ind={2} />
            </div>
        </div>
    case 4:
        return <div className="flex min-h-[300px] ring-1">
        <button>he</button>
        <div className="flex-1">

        <Img ind={ 0} css='flex-2'/>
        </div>
        <div className="flex flex-1">
            <Img ind={1} />
            <Img ind={2} />
            <Img ind={3} />
        </div>
    </div>
    case 5:
        return <div className="flex flex-col">
            <div className="flex-1 flex min-h-[280px]">
                <Img ind={0} className='flex-2' />
                <div className="flex flex-col w-[40%]">
                    <Img ind={1} />
                    <Img ind={2} />
                </div>
            </div>
            <div className="flex-1 flex min-h-[160px]">
                <Img ind={3} />
                <Img ind={4} />
            </div>
        </div>
    case 6:
        return <div className="flex flex-col">
            <div className="flex-1 flex min-h-[270px]">
                <Img ind={0} className='flex-2' />
                <div className="flex flex-col w-[40%]">
                    <Img ind={1} />
                    <Img ind={2} />
                </div>
            </div>
            <div className="flex-1 flex min-h-[160px]">
                <Img ind={3} />
                <Img ind={4} />
                <Img ind={5} />
            </div>
        </div>
    case 7:
        return <div className="flex flex-col">
            <div className="flex-1 flex min-h-[270px]">
                <Img ind={0} className='flex-2' />
                <div className="flex flex-col w-[40%]">
                    <Img ind={1} />
                    <Img ind={2} />
                </div>
            </div>
            <div className="flex-1 flex min-h-[160px]">
                <Img ind={3} />
                <Img ind={4} />
                <div className="flex-1 m-1 flex relative">
                    <Img ind={5} css='m-0'/>
                    <button onClick={_ => { setCur(5);  setOpen(true)}} className="hover:bg-opacity-30 absolute w-full h-full text-center flex items-center justify-center text-xl text-white font-semibold bg-purple-900 bg-opacity-50">+{ imgs?.length-6} More</button>
                </div>
             
            </div>
        </div>

    default:
        return null;
}}

    return (
        <div>
            <View />
            {open && <div className="z-50 backdrop-blur-lg flex flex-col items-centerd justify-center  fixed top-0 left-0 w-full h-full bg-gray-900 overflow-y-auto bg-opacity-80">
                <button onClick={_=>setOpen(false)} className="absolute top-0 right-5 text-white font-semibold text-lg hover:font-bold">Close</button>
                <div className="flex flex-1 items-center justify-between  m-3 max-h-[70vh]">
                    <IconBtn onClick={_=>setCur(p=>p <= 0 ? imgs?.length-1 : p-1)}>arrow_back_ios</IconBtn>
                    <div className="flex-1 h-[100%] px-5 justify-center flex">
                        <img src={ imgs?.[cur]?.url} className='h-[100%] shadow-lg'/>
                    </div>
                    <IconBtn onClick={_=>setCur(p=>p>=imgs?.length-1 ? 0 : p+1)}>arrow_forward_ios</IconBtn>
                </div>
                <div  className="flex overflow-x-auto w-full justify-center items-center p-2">
                    {
                        imgs?.map((img, ind) => <div
                            
                            className={"flex rounded-md m-1 min-w-[100px] min-h-[100px] " + (ind==cur && 'ring-white ring-2')}>
                            <Img ind={ind} css='m-0' />
                        </div>)
                    }
                </div>
            </div>}
        </div>
    )
}