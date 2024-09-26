import { MutableRefObject } from "react";

const AlertPopup = ({
  show,
  handleClickOutside,
  dropPopupRef,
}: {
  show: boolean;
  handleClickOutside: () => void;
  dropPopupRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  return (
    <div
      ref={dropPopupRef}
      className={
        show
          ? "h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 text-center"
          : "hidden"
      }
      onClick={() => handleClickOutside()}
    >
      <div className="w-1/4 bg-white rounded-md">
        <div className="p-8">
          <div className="font-bold text-xl">게시물을 삭제하시겠어요?</div>
          <div className="text-gray-500 text-sm mt-2">
            지금 나가면 수정 내용이 저장되지 않습니다.
          </div>
        </div>

        <div className="flex flex-col">
          <button className="text-red-500 font-bold py-3 border-t">삭제</button>
          <button className="py-3 border-t">취소</button>
        </div>
      </div>
    </div>
  );
};

export default AlertPopup;
