import ChangePasswordForm from "@/components/profiles/ChangePasswordForm";
import EditProfileForm from "@/components/profiles/EditProfileForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const EditProfile = async () => {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (!userSession?.user) {
    return <div>Please log in to edit your profile.</div>;
  }

  return (
    <section className="mx-auto max-w-2xl p-6 flex flex-col gap-5">
      <h1 className="mb-6 text-2xl font-bold">Edit Profile</h1>
      <EditProfileForm user={userSession.user} />
      <ChangePasswordForm/>
    </section>
  );
};

export default EditProfile;