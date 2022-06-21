import Icon from "./Icon"


export default function ImgEditor({ imgs, set,name='imgs' }) {
  
  function onRemove(file) {
    const nImgs = imgs?.filter(i => i !== file)
    set({[name]:nImgs})
  }

  return (
    <div className="flex flex-wrap max-h-[300px] overflow-y-auto">
    {
        imgs?.map(file => (
          <div onClick={_ => onRemove(file)}
            className="cursor-pointer overflow-hidden min-w-[100px] min-h-[100px] bg-cover bg-no-repeat bg-center m-1 rounded-md" style={{ backgroundImage: `url('${file?.url}')` }}>
              <Icon className='text-xl opacity-0 hover:opacity-100 bg-opacity-30 m-0 bg-blue-900 w-full h-full flex items-center justify-center text-white '> close</Icon>
        </div>
      ))
    }
  </div>
  )
}
