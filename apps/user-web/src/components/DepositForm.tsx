import { useState } from "react";
import { Button } from "@point/ui";

interface DepositFormProps {
  onSubmit: (amount: number) => void;
  loading: boolean;
  error: string;
}

const DepositForm = ({ onSubmit, loading, error }: DepositFormProps) => {
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
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount to Deposit
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
          className="w-full"
          variant="primary"
        >
          Submit Deposit Request
        </Button>
      </div>
    </form>
  );
};

export default DepositForm;
