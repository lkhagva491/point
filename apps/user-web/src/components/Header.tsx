import { User } from "../types";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-3xl font-bold text-gray-900">Point</h1>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <span className="text-sm text-gray-700">{t('welcome_message', { username: user?.username })}</span>
            <button onClick={onLogout} className="btn btn-secondary">
              {t('logout_button')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;