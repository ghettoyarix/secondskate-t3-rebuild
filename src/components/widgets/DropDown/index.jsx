import React from "react";

const options = [
  {
    title: "Рози",
    value: "roses",
    subOptions: [
      { title: "Рози", value: "roses" },
      { title: "Тюльпани", value: "tulips" },
      { title: "Іриси", value: "iris" },
      { title: "Букет", value: "mix" },
    ],
  },
  {
    title: "Букети",
    value: "buquetes",
    subOptions: [
      { title: "Рози", value: "roses" },
      { title: "Тюльпани", value: "tulips" },
      { title: "Іриси", value: "iris" },
      { title: "Букет", value: "mix" },
    ],
  },
  {
    title: "Букети",
    value: "buquetes",
    subOptions: [
      { title: "Рози", value: "roses" },
      { title: "Тюльпани", value: "tulips" },
      { title: "Іриси", value: "iris" },
      { title: "Букет", value: "mix" },
    ],
  },
];
const index = () => {
  return (
    <div className="group relative  left-[-120px] top-4  z-10 inline-block pb-12">
      <ul className="text-gray-700 absolute top-[30px]   hidden min-w-[240px] border border-2 border-purple  group-hover:block">
        {options.map((obj) => (
          <li className="" key={obj.title}>
            <a
              className="  whitespace-no-wrap group inline-block w-full bg-white px-4  py-2 text-black hover:bg-purple hover:text-white"
              href="#"
            >
              {obj.title}
            </a>
            <ul
              className="text-gray-700 absolute left-[240px] hidden   min-w-[240px]  
             border border-2 border-purple group-hover:block"
            >
              {obj.subOptions.map((obj) => (
                <li className="" key={obj.title}>
                  <a
                    className="   whitespace-no-wrap inline-block w-full bg-white
                     px-4  py-2 text-black hover:bg-purple hover:text-white"
                    href="#"
                  >
                    {obj.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default index;
