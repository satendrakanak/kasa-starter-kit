import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const LegacyRolesPage = () => {
  redirect("/admin/settings/access-control");
};

export default LegacyRolesPage;
