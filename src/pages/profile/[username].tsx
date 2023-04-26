import React from "react";

import { useState } from "react";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import type { User } from "@prisma/client";
import Discover from "~/components/Discover";
import { useDiscoverStore } from "~/zustand";
import ProfileBar from "~/components/ProfileBar";
import { useEffect } from "react";
const Profile = () => {
  const x = useDiscoverStore();
  const { setUploader, reset, uploadedBy } = x;
  const { data: profile } = useSession();
  const user = profile?.user;
  const router = useRouter();
  const { username } = router.query;

  api.user.getPublicUserInfoByUsername.useQuery(
    {
      username: username !== "you" ? username?.toString() : user?.username,
    },
    {
      onSuccess: (data) => {
        setInfo(data);
        setUploader(data!.id);
        if (profile?.user.id === data?.id) {
          void router.push("/profile/you");
        }
      },
      refetchOnWindowFocus: false,
      enabled: (username as string)?.length > 0 || false,
    }
  );
  const [info, setInfo] = useState<Partial<User | null>>();

  return (
    <div className="wrapper flex flex-col py-16 xs:items-start">
      <p onClick={() => console.log(info?.id, profile?.user.id)}> </p>
      <ProfileBar
        info={info}
        isYourOwnAccount={info?.id === profile?.user.id}
      ></ProfileBar>
      {uploadedBy !== "" && <Discover></Discover>}
      {/* <EditBidModal></EditBidModal>
      <RemoveBidModal></RemoveBidModal> */}
    </div>
  );
};

export default Profile;
