import Link from "next/link";
import { useTranslation } from "react-i18next";

const DashboardLinks = () => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-primary-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-primary-900 mb-2">{t('profile_title')}</h3>
        <p className="text-primary-700 mb-4">{t('profile_description')}</p>
        <Link href="/change-password" className="btn btn-primary">
          {t('change_password_link')}
        </Link>
      </div>

      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          {t('deposit_points_title')}
        </h3>
        <p className="text-green-700 mb-4">
          {t('deposit_points_description')}
        </p>
        <Link
          href="/deposit"
          className="btn bg-green-600 text-white hover:bg-green-700"
        >
          {t('deposit_link')}
        </Link>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-900 mb-2">
          {t('transaction_history_title')}
        </h3>
        <p className="text-purple-700 mb-4">
          {t('transaction_history_description')}
        </p>
        <Link
          href="/transaction-history"
          className="btn bg-purple-600 text-white hover:bg-purple-700"
        >
          {t('view_history_link')}
        </Link>
      </div>
    </div>
  );
};

export default DashboardLinks;