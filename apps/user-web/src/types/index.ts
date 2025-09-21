export interface User {
  _id: string;
  email: string;
  username: string;
  userType: string;
  role: string;
  point?: number;
  permissions?: number;
}

export interface Transaction {
  _id: string;
  userId: string;
  points: number;
  type: "earn" | "redeem" | "deposit";
  status?: "pending" | "approved" | "declined";
  requestedAmount?: number;
  approvedByAdminId?: string;
  createdAt: string;
}