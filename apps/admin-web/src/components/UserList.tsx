import { User } from "../types";
import UserItem from "./UserItem";

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (email: string) => void;
}

const UserList = ({ users, onEdit, onDelete }: UserListProps) => {
  return (
    <div className="w-full mx-auto">
      <table className="min-w-full divide-y divide-gray-200 block sm:table">
        <thead className="bg-gray-50 hidden sm:table-header-group">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 w-full flex flex-col items-center sm:table-row-group">
          {users.map((user) => (
            <UserItem
              key={user.email}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
