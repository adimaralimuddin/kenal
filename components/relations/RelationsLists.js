import UserItem from "../user/UserItem";

export default function RelationsLists({ data, text, authId, userId }) {
  return (
    <div className="flex flex-col text-center flex-1 cursor-pointer  hover:underline  animate-pop pb-2">
      <div className=" box flex min-h-[200px] flex-col py-0 px-0">
        <h3 className=" text-h2 text-medium font-medium p-3">
          {data?.length || 0} {text}
        </h3>
        <hr />
        <div className="p-6 flex flex-col gap-2">
          {data?.map((userId) => (
            <UserItem userId={userId} key={userId} />
          ))}
        </div>
        {(data?.length <= 0 || !data) && (
          <div className="text-gray-400 flex flex-col items-center justify-center flex-1">
            No {text} yet!
          </div>
        )}
      </div>
    </div>
  );
}
