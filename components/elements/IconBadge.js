import Badge from "./Badge";
import Icon from "./Icon";

export default function IconBadge({
  icon,
  iconClass,
  value,
  onClick,
  className,
}) {
  return (
    <div className={"flex " + iconClass + " " + className} onClick={onClick}>
      <Icon>{icon}</Icon>
      {value !== 0 && <Badge value={value} />}
    </div>
  );
}
