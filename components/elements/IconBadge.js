import Icon from "./Icon";

export default function IconBadge({ icon, iconClass, value = 10, onClick }) {
  return (
    <div className={"flex " + iconClass} onClick={onClick}>
      <Icon>{icon}</Icon>
      {value !== 0 && (
        <div className="relative z-10">
          <div className="absolute -top-4 -right-2 ring-2 ring-white flex aspect-square bg-pink-400 text-white rounded-full items-center justify-center max-w-[21px] min-w-[21px] max-h-[21px] text-sm min-h-[21px]">
            <small className="text-[13px] font-semibold">{value}</small>
          </div>
        </div>
      )}
    </div>
  );
}
