import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import BoardWritePopup from "@/components/board/BoardWritePopup";
import AlertPopup from "@/components/board/AlertPopup";

export default function Index() {
  const params = useParams();
  const [writePopup, setWritePopup] = useState(false);
  const [closeAlertPopup, setCloseAlertPopup] = useState(false);

  const dropPopupRef = useRef<HTMLDivElement | null>(null);
  const dropPopupRef2 = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement>,
    imageSrc: string
  ) => {
    if (dropPopupRef.current === e.target) {
      // todo: 팝업 닫힐 때 값 초기화
      if (imageSrc) setCloseAlertPopup(true); // 사진을 하나라도 업로드한 경우
      else setWritePopup(false);
    }
  };

  const handleClickOutside2 = () => {
    setCloseAlertPopup(false);
    setWritePopup(false);
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
      <AlertPopup
        dropPopupRef={dropPopupRef2}
        show={closeAlertPopup}
        handleClickOutside={handleClickOutside2}
      />
    </div>
  );
}
