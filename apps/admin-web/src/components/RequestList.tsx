import { Transaction } from "../types";
import RequestItem from "./RequestItem";

interface RequestListProps {
  requests: Transaction[];
  onStatusUpdate: (id: string, status: "approved" | "declined") => void;
  loading: boolean;
}

const RequestList = ({ requests, onStatusUpdate, loading }: RequestListProps) => {
  return (
    <div className="w-full mx-auto">
      <table className="min-w-full divide-y divide-gray-200 block sm:table">
        <thead className="bg-gray-50 hidden sm:table-header-group">
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
              User Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Requested Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 flex flex-col items-center sm:table-row-group">
          {requests.map((request) => (
            <RequestItem
              key={request._id}
              request={request}
              onStatusUpdate={onStatusUpdate}
              loading={loading}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestList;
