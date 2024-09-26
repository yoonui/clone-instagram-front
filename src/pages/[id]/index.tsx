import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import BoardWritePopup from "@/components/board/BoardWritePopup";

export default function Index() {
  const params = useParams();
  const [writePopup, setWritePopup] = useState(false);

  const dropPopupRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dropPopupRef.current === e.target) {
      setWritePopup(false);
    }
  };

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
      <BoardWritePopup
        dropPopupRef={dropPopupRef}
        show={writePopup}
        handleClickOutside={handleClickOutside}
      />
    </div>
  );
}
