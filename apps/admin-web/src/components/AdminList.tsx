import { Admin } from "../types";
import AdminItem from "./AdminItem";

interface AdminListProps {
  admins: Admin[];
  onEdit: (admin: Admin) => void;
  onDelete: (email: string) => void;
}

const AdminList = ({ admins, onEdit, onDelete }: AdminListProps) => {
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 w-full flex flex-col items-center sm:table-row-group">
          {admins.map((admin) => (
            <AdminItem
              key={admin.email}
              admin={admin}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminList;
