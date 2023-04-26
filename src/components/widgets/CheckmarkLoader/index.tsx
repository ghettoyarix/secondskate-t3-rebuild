import { useState, useEffect } from "react";
import Image from "next/image";
import Checkmark from "./Checkmark";
interface IProps {
  done: boolean;
}

function CircleLoader(props: IProps) {
  const [loading, setLoading] = useState(true);
  const { done } = props;

  const startLoading = async () => {};
  useEffect(() => {
    if (done) {
      setLoading(false);
    }
  }, [done]);

  return (
    <div className=" flex h-full w-full items-center justify-center">
      {loading ? (
        <div className="border-gray-200 h-24 w-24 animate-spin rounded-full border-8 border-t-8 border-primary border-t-transparent"></div>
      ) : done ? (
        <Image
          height={70}
          width={70}
          alt="cche"
          src={"/svg/checkmark-borderless.svg"}
        ></Image>
      ) : null}
    </div>
  );
}
export default CircleLoader;
