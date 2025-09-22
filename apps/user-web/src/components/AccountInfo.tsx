import { User } from "../types";
import { useTranslation } from "react-i18next";

interface AccountInfoProps {
  user: User | null;
}

const AccountInfo = ({ user }: AccountInfoProps) => {
  const { t } = useTranslation();
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('account_information_title')}
      </h3>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-600">{t('username_label')}</span>
            <p className="text-gray-900 text-base">{user?.username}</p>
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-600">{t('email_label_colon')}</span>
            <p className="text-gray-900 text-base">{user?.email}</p>
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-600">{t('role_label')}</span>
            <p className="text-gray-900 text-base capitalize">{user?.role}</p>
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-600">{t('points_label')}</span>
            <p className="text-gray-900 text-base">{user?.point || 0}</p>
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-600">
              {t('member_since_label')}
            </span>
            <p className="text-gray-900 text-base">{t('member_since_today')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;