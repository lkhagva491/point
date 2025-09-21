import { Admin } from "../types";

interface AdminItemProps {
  admin: Admin;
  onEdit: (admin: Admin) => void;
  onDelete: (email: string) => void;
  index: number;
}

const AdminItem = ({ admin, onEdit, onDelete, index }: AdminItemProps) => {
  const rowClass = index % 2 === 0 ? "bg-white" : "bg-gray-50";

  return (
    <tr
      className={`${rowClass} block sm:table-row mb-4 sm:mb-0 p-4 sm:p-0 rounded-lg shadow sm:shadow-none w-full max-w-4xl mx-auto`}
    >
      <td
        data-label="Name:"
        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 block sm:table-cell relative sm:before:content-none before:content-[attr(data-label)] before:font-bold before:block before:text-gray-700"
      >
        {admin.username}
      </td>
      <td
        data-label="Email:"
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 block sm:table-cell relative sm:before:content-none before:content-[attr(data-label)] before:font-bold before:block before:text-gray-700"
      >
        {admin.email}
      </td>
      <td
        data-label="Actions:"
        className="px-6 py-4 whitespace-nowrap text-sm font-medium block sm:table-cell relative sm:before:content-none before:content-[attr(data-label)] before:font-bold before:block before:text-gray-700"
      >
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 justify-center">
          <button
            onClick={() => onEdit(admin)}
            className="text-primary-600 hover:text-primary-900 mr-3"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(admin.email)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminItem;
