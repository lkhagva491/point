import Link from "next/link";
import { useTranslation } from "react-i18next";

const DashboardLinks = () => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-section-primary/10 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-section-primary/80 mb-2">{t('profile_title')}</h3>
        <p className="text-section-primary/60 mb-4">{t('profile_description')}</p>
        <Link href="/change-password" className="btn bg-section-primary/60 text-white hover:bg-section-primary">
          {t('change_password_link')}
        </Link>
      </div>

      <div className="bg-section-secondary/10 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-section-secondary/80 mb-2">
          {t('deposit_points_title')}
        </h3>
        <p className="text-section-secondary/60 mb-4">
          {t('deposit_points_description')}
        </p>
        <Link
          href="/deposit"
          className="btn bg-section-secondary/60 text-white hover:bg-section-secondary"
        >
          {t('deposit_link')}
        </Link>
      </div>

      <div className="bg-section-third/10 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-section-third mb-2">
          {t('transaction_history_title')}
        </h3>
        <p className="text-section-third/60 mb-4">
          {t('transaction_history_description')}
        </p>
        <Link
          href="/transaction-history"
          className="btn bg-section-third/60 text-white hover:bg-section-third"
        >
          {t('view_history_link')}
        </Link>
      </div>
    </div>
  );
};

export default DashboardLinks;