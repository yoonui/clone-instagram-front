import { useState } from "react";
import BoardWritePopup from "@/components/board/BoardWritePopup";

import Image from "next/image";
import logo from "../../../public/logo.png";

const Sidebar = () => {
  const [writePopup, setWritePopup] = useState(false);

  return (
    <>
      <div className="h-full pt-10 pl-6 pr-28 border-r">
        <Image src={logo} alt="인스타그램 로고" width={100} />

        <button
          className="flex p-2 bg-blue-400 w-[140px] rounded-md text-white"
          onClick={() => {
            setWritePopup(!writePopup);
          }}
        >
          <div>+ 만들기</div>
        </button>
      </div>

      <BoardWritePopup show={writePopup} setShow={setWritePopup} />
    </>
  );
};

export default Sidebar;
