import { Transaction } from "../types";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Points
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Requested Amount
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
            <TransactionItem key={transaction._id} transaction={transaction} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
