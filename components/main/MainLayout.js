import MainHeader from "./MainHeader";

export default function MainLayout({ children, className, headerCss }) {
  return (
    <div
      className={" min-h-[100vh] overflow-hidden flex flex-col " + className}
    >
      <MainHeader className={headerCss} />
      {children}
    </div>
  );
}
