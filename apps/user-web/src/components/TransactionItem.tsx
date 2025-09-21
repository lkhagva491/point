import { Transaction } from "../types";

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
}

const TransactionItem = ({ transaction, index }: TransactionItemProps) => {
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
          {transaction.status || "N/A"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
        {transaction.requestedAmount || "N/A"}
      </td>
    </tr>
  );
};

export default TransactionItem;
