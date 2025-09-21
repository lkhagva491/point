export interface Transaction {
  _id: string;
  userEmail: string;
  points: number;
  type: "earn" | "redeem" | "deposit";
  status: "pending" | "approved" | "declined";
  requestedAmount: number;
  approvedByAdminEmail?: string;
  createdAt: string;
}

export interface User {
  email: string;
  username: string;
  userType: string;
  role: string;
  point?: number;
  permissions?: number;
}

export interface Admin {
  email: string;
  username: string;
  role: string;
}