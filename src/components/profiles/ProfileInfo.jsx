import Link from "next/link";
import { Button } from "@heroui/react";

const ProfileInfo = ({ user }) => {
  if (!user) return null;

  const { name, email, emailVerified, createdAt, role, profile } = user;

  const joinedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border border-white/20
        bg-white/10
        p-10
        backdrop-blur-xl
        shadow-xl
      "
    >
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="h-40 w-40 shrink-0 overflow-hidden rounded-full border-2 border-white/20 sm:h-48 sm:w-48">
          <img
            src={profile}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Name + role */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold">{name}</h1>
          <span
            className="
              rounded-full
              bg-primary/10
              px-3
              py-1
              text-xs
              font-medium
              text-primary
            "
          >
            {role}
          </span>
        </div>

        {/* Email + verification */}
        <div className="mt-3 flex flex-col items-center gap-2">
          <p className="text-default-500">{email}</p>
          <span
            className={`
              rounded-full
              px-2.5
              py-0.5
              text-xs
              font-medium
              ${
                emailVerified
                  ? "bg-green-500/10 text-green-600"
                  : "bg-amber-500/10 text-amber-600"
              }
            `}
          >
            {emailVerified ? "Verified" : "Not verified"}
          </span>
        </div>

        {/* Joined date */}
        <p className="mt-3 text-sm text-default-500">
          Member since {joinedDate}
        </p>

        {/* Update profile button */}
        <Link href="/profile/edit" className="mt-8 w-full sm:w-auto">
          <Button color="primary" className="w-full sm:w-auto sm:px-10">
            Update Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;