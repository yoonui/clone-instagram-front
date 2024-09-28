import { Dispatch, ReactNode, SetStateAction, useRef } from "react";

interface ModalPortalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title: string;
  clasName: string;
  positive: ReactNode;
  negative: ReactNode;
  handleClickCond: () => void;
}

const Modal = ({
  show,
  setShow,
  children,
  title,
  clasName,
  positive,
  negative,
  handleClickCond,
}: ModalPortalProps) => {
  const dropPopupRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dropPopupRef.current === e.target) {
      // todo: 팝업 닫힐 때 값 초기화
      if (handleClickCond) handleClickCond(); // 사진을 하나라도 업로드한 경우
      else setShow(false);
    }
  };

  return (
    <div
      ref={dropPopupRef}
      className={
        show
          ? "h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 text-center"
          : "hidden"
      }
      onClick={(e) => handleClickOutside(e)}
    >
      <div className={`${clasName} w-1/4 bg-white rounded-md`}>
        {title && (
          <div className="border-b-2 p-3 font-bold">
            <span>{title}</span>
          </div>
        )}

        <div>{children}</div>

        <div className="flex flex-col">
          {positive && <button className="py-3 border-t">{positive}</button>}
          {negative && <button className="py-3 border-t">{negative}</button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
