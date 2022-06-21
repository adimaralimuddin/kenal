import Icon from "../elements/Icon";


export default function StoryAdder() {
  return (
      <div style={{ backgroundImage: "url('img/storybg.webp')" }}
          className="bg-cover bg-no-repeat bg-centerd flex flex-col items-center justify-end rounded-lg  min-h-[160px] min-w-[100px] max-w-[100px] max-h-[200px] bg-orange-400d  text-white py-2 ">
          <button className="ring-[3px] mb-3 ring-white p-1 text-white ">
              <Icon className=' text-white '>add</Icon>
          </button>
          <button>Add Story</button>
    </div>
  )
}
