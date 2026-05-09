import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type AdminManagerRole = "super-admin" | "moderator" | "content-manager";
export type AdminManagerStatus = "active" | "inactive";

export type AdminManager = {
  id: string;
  fullName: string;
  email: string;
  role: AdminManagerRole;
  status: AdminManagerStatus;
};

export type GetAdminManagersResponse = {
  data: AdminManager[];
};

const ADMIN_MANAGERS: AdminManager[] = [
  {
    id: "admin-1",
    fullName: "Rizky Firmansyah",
    email: "rizky.firmansyah@kreasi.com",
    role: "super-admin",
    status: "active",
  },
  {
    id: "admin-2",
    fullName: "Sari Dewi",
    email: "sari.dewi@kreasi.com",
    role: "moderator",
    status: "active",
  },
  {
    id: "admin-3",
    fullName: "Hendri Kusuma",
    email: "hendri.kusuma@kreasi.com",
    role: "content-manager",
    status: "active",
  },
  {
    id: "admin-4",
    fullName: "Laila Nurhayati",
    email: "laila.nurhayati@kreasi.com",
    role: "moderator",
    status: "inactive",
  },
  {
    id: "admin-5",
    fullName: "Fajar Wibowo",
    email: "fajar.wibowo@kreasi.com",
    role: "content-manager",
    status: "active",
  },
];

export async function getAdminManagers(
  control: MockControlInput = {},
): Promise<GetAdminManagersResponse> {
  await simulateMockRequest(control);

  return {
    data: ADMIN_MANAGERS,
  };
}

export default getAdminManagers;
