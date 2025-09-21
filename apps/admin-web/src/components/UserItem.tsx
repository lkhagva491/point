import { User } from "../types";

interface UserItemProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (email: string) => void;
}

const UserItem = ({ user, onEdit, onDelete }: UserItemProps) => {
  return (
    <tr
      className={`block sm:table-row mb-4 sm:mb-0 p-4 sm:p-0 rounded-lg shadow sm:shadow-none w-full max-w-4xl mx-auto`}
    >
      <td
        data-label="Name:"
        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 block sm:table-cell relative sm:before:content-none before:content-[attr(data-label)] before:font-bold before:block before:text-gray-700"
      >
        {user.username}
      </td>
      <td
        data-label="Email:"
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 block sm:table-cell relative sm:before:content-none before:content-[attr(data-label)] before:font-bold before:block before:text-gray-700"
      >
        {user.email}
      </td>
      <td
        data-label="Role:"
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 block sm:table-cell relative sm:before:content-none before:content-[attr(data-label)] before:font-bold before:block before:text-gray-700"
      >
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            user.role === "admin"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {user.role}
        </span>
      </td>
      <td
        data-label="Actions:"
        className="px-6 py-4 whitespace-nowrap text-sm font-medium block sm:table-cell relative sm:before:content-none before:content-[attr(data-label)] before:font-bold before:block before:text-gray-700"
      >
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 justify-center">
          <button
            onClick={() => onEdit(user)}
            className="text-primary-600 hover:text-primary-900 mr-3"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user.email)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserItem;
