import { Transaction } from "../types";
import { useTranslation } from "react-i18next";

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
}

const TransactionItem = ({ transaction, index }: TransactionItemProps) => {
  const { t } = useTranslation();
  const getStatusColorClass = (status?: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const rowClass = index % 2 === 0 ? "bg-white" : "bg-gray-50";

  const getStatusTranslation = (status?: string) => {
    if (!status) return t('not_applicable');
    switch (status) {
      case "approved":
        return t('status_approved');
      case "pending":
        return t('status_pending');
      case "declined":
        return t('status_declined');
      default:
        return status;
    }
  }

  return (
    <tr className={rowClass}>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(transaction.createdAt).toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
        {transaction.type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
        {transaction.points}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            getStatusColorClass(transaction.status)
          }`}
        >
          {getStatusTranslation(transaction.status)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
        {transaction.requestedAmount || t('not_applicable')}
      </td>
    </tr>
  );
};

export default TransactionItem;