import { Transaction } from "../types";
import { Button } from "@point/ui";

interface RequestItemProps {
  request: Transaction;
  onStatusUpdate: (id: string, status: "approved" | "declined") => void;
  loading: boolean;
  index: number;
}

const RequestItem = ({ request, onStatusUpdate, loading, index }: RequestItemProps) => {
  const rowClass = index % 2 === 0 ? "bg-white" : "bg-gray-50";

  return (
    <tr
      className={`${rowClass} block sm:table-row mb-4 sm:mb-0 p-4 sm:p-0 rounded-lg shadow sm:shadow-none w-full max-w-xl mx-auto`}
    >
      <td
        data-label="Date:"
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 block sm:table-cell"
      >
        {new Date(request.createdAt).toLocaleString()}
      </td>
      <td
        data-label="User Email:"
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center block sm:table-cell"
      >
        {request.userEmail}
      </td>
      <td
        data-label="Requested Amount:"
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center block sm:table-cell"
      >
        {request.requestedAmount}
      </td>
      <td
        data-label="Actions:"
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center block sm:table-cell"
      >
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 justify-center">
          <Button
            onClick={() => onStatusUpdate(request._id, "approved")}
            className="btn bg-green-600 text-white hover:bg-green-700"
            size="sm"
            loading={loading}
          >
            Approve
          </Button>
          <Button
            onClick={() => onStatusUpdate(request._id, "declined")}
            className="btn bg-red-600 text-white hover:bg-red-700"
            size="sm"
            loading={loading}
          >
            Decline
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default RequestItem;
