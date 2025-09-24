import { useState } from "react";
import { Button } from "@point/ui";
import { useTranslation } from "react-i18next";

interface DepositFormProps {
  onSubmit: (amount: number) => void;
  loading: boolean;
  error: string;
}

const DepositForm = ({ onSubmit, loading, error }: DepositFormProps) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<number | string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof amount === "number" && amount > 0) {
      onSubmit(amount);
    }
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
            htmlFor="amount"
            className="block text-sm font-medium text-text-primary"
          >
            {t('amount_to_deposit_label')}
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            required
            className="input mt-1"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            min="1"
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
          {t('submit_deposit_request_button')}
        </Button>
      </div>
    </form>
  );
};

export default DepositForm;