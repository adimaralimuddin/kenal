import MainLayout from "../components/main/MainLayout";
import SettingsPage from "../components/settings/SettingsPage";

export default function SettingsMainPage() {
  return (
    <MainLayout>
      <div className="flex-1 p-4 w-full max-w-4xl mx-auto">
        <SettingsPage mini={true} />
      </div>
    </MainLayout>
  );
}
