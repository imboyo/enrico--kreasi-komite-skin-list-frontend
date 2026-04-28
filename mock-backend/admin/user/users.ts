import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type AdminUserStatus = "active" | "inactive" | "suspended";

export type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  status: AdminUserStatus;
};

export type GetAdminUsersResponse = {
  data: AdminUser[];
};

const ADMIN_USERS: AdminUser[] = [
  {
    id: "user-1",
    fullName: "Anisa Putri",
    email: "anisa.putri@example.com",
    status: "active",
  },
  {
    id: "user-2",
    fullName: "Bagas Pratama",
    email: "bagas.pratama@example.com",
    status: "inactive",
  },
  {
    id: "user-3",
    fullName: "Citra Lestari",
    email: "citra.lestari@example.com",
    status: "active",
  },
  {
    id: "user-4",
    fullName: "Dion Mahendra",
    email: "dion.mahendra@example.com",
    status: "suspended",
  },
];

export async function getAdminUsers(
  control: MockControlInput = {},
): Promise<GetAdminUsersResponse> {
  await simulateMockRequest(control);

  return {
    data: ADMIN_USERS,
  };
}

export default getAdminUsers;
