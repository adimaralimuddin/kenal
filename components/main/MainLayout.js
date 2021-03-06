import MainHeader from "./MainHeader";

export default function MainLayout({ children }) {
  return (
    <div className="bg-[#F7F8F9]d min-h-[100vh]">
      <MainHeader />
      {children}
    </div>
  );
}
