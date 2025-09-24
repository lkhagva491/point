import { useState } from "react";
import { Button } from "@point/ui";
import { useTranslation } from "react-i18next";

interface ChangePasswordFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
  error: string;
}

const ChangePasswordForm = ({ onSubmit, loading, error }: ChangePasswordFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-text-error-primary/10 border border-text-error-primary text-text-error-primary px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            {t('current_password_label')}
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            required
            className="input mt-1"
            value={formData.currentPassword}
            onChange={(e) =>
              setFormData({ ...formData, currentPassword: e.target.value })
            }
            autoComplete="off"
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            {t('new_password_label')}
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            required
            className="input mt-1"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            autoComplete="off"
          />
        </div>

        <div>
          <label
            htmlFor="confirmNewPassword"
            className="block text-sm font-medium text-gray-700"
          >
            {t('confirm_new_password_label')}
          </label>
          <input
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            required
            className="input mt-1"
            value={formData.confirmNewPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmNewPassword: e.target.value })
            }
            autoComplete="off"
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          loading={loading}
          className="w-full bg-button-primary hover:bg-button-primary/80 text-white"
          variant="primary"
        >
          {t('change_password_button')}
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;