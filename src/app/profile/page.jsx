import ProfileInfo from "@/components/profiles/ProfileInfo";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ProfilePage = async () => {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="mx-auto max-w-2xl space-y-8 p-6">
      <ProfileInfo user={userSession.user} />
    </section>
  );
};

export default ProfilePage;