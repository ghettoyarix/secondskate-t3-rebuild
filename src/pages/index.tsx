import { type NextPage } from "next";
import { useEffect } from "react";

import Discover from "~/components/Discover";
import { useDiscoverStore } from "~/zustand";
import { useRouter } from "next/router";
const Home: NextPage = () => {
  const { setUploader } = useDiscoverStore();
  const router = useRouter();
  useEffect(() => {
    setUploader("");
  }, [router]);

  return (
    <>
      <Discover></Discover>
    </>
  );
};

export default Home;
