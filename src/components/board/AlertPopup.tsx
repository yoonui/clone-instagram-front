import { Dispatch, SetStateAction } from "react";
import Modal from "../base/Modal";

const AlertPopup = ({
  show,
  setShow,
  deleteBtn,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  deleteBtn: () => void;
}) => {
  return (
    <Modal
      show={show}
      setShow={setShow}
      positive={
        <div
          className="text-red-500 font-bold"
          onClick={() => {
            deleteBtn();
          }}
        >
          삭제
        </div>
      }
      negative={
        <div
          onClick={() => {
            setShow(false);
          }}
        >
          취소
        </div>
      }
    >
      <>
        <div className="p-8">
          <div className="font-bold text-xl">게시물을 삭제하시겠어요?</div>
          <div className="text-gray-500 text-sm mt-2">
            지금 나가면 수정 내용이 저장되지 않습니다.
          </div>
        </div>
      </>
    </Modal>
  );
};

export default AlertPopup;
