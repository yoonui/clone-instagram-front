import { useParams } from "next/navigation";
import { useState } from "react";
import BoardWritePopup from "@/components/board/BoardWritePopup";

export default function Index() {
  const params = useParams();
  const [writePopup, setWritePopup] = useState(false);

  return (
    <div>
      <>{params ? params.id : "ddd"}</>
      <button
        className="flex p-2 bg-blue-400 w-[140px] rounded-md text-white"
        onClick={() => {
          setWritePopup(!writePopup);
        }}
      >
        <div>+ 만들기</div>
      </button>
      <BoardWritePopup show={writePopup} />
    </div>
  );
}
