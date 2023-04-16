import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "./Icon";
import IconBadge from "./IconBadge";

const Menu = ({
  tab,
  tabText,
  text,
  icon,
  defaultTab,
  badgeValue,
  left,
  collapse = "md",
  textClass,
  className,
  IconClass,
  ...props
}) => {
  const router = useRouter();

  const query = { ...router.query, [tabText]: tab };
  const curTab = router.query?.[tabText] || defaultTab;

  return (
    <Link href={{ query }} scroll={false}>
      <div
        className={
          "flex items-center flex-1 gap-2 p-2.5 cursor-pointer text-h2 min-w-[10px] hover:bg-slate-50 dark:hover:bg-slate-700 " +
          (left ? " pl-3 border-l-[4px] " : " justify-center border-b-[4px] ") +
          (curTab === tab
            ? "   border-primary-light dark:border-primary-dark  "
            : "border-transparent ") +
          className
        }
      >
        <span className="relative ">
          {badgeValue > 0 && (
            <span className="relative ">
              <IconBadge value={badgeValue} className="absolute top-0 left-0" />
            </span>
          )}
          {icon && (
            <Icon
              className={
                "" +
                (curTab === tab &&
                  "  text-primary-light dark:text-primary-dark font-bold ") +
                IconClass
              }
            >
              {icon}
            </Icon>
          )}
        </span>

        <p
          className={
            "text-sm   first-letter:uppercase   " +
            (curTab === tab
              ? "  text-primary-light dark:text-slate-300 font-bold "
              : " font-medium ") +
            textClass
          }
        >
          {tab || text}
        </p>
      </div>
    </Link>
  );
};

export default Menu;
