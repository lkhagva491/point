import { User } from "../types";

interface AccountInfoProps {
  user: User | null;
}

const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Account Information
      </h3>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-600">Username:</span>
            <p className="text-gray-900 text-base">{user?.username}</p>
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-600">Email:</span>
            <p className="text-gray-900 text-base">{user?.email}</p>
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-600">Role:</span>
            <p className="text-gray-900 text-base capitalize">{user?.role}</p>
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-600">Points:</span>
            <p className="text-gray-900 text-base">{user?.point || 0}</p>
          </div>
          <div className="pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-600">
              Member Since:
            </span>
            <p className="text-gray-900 text-base">Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
