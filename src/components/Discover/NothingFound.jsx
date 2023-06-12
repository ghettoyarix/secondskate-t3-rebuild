import Link from "next/link";
import React, { useEffect } from "react";
import { isYourProfile } from "src/helpers/isYourProfile";

const NothingFound = () => {
  return (
    <div className="mx-auto mt-6 h-[417px] max-w-[50%] items-center text-center text-mid xs:text-big">
      {!isYourProfile() ? (
        "Unfortunately, there is nothing found with such properties"
      ) : (
        <p>
          Feel free to{" "}
          <span>
            <Link href={"/upload"} className="text-primary">
              upload{" "}
            </Link>
          </span>
          your stuff.
        </p>
      )}
    </div>
  );
};

export default NothingFound;
