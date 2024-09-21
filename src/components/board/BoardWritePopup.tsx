// import { Dispatch, SetStateAction } from "react";
import { TbPhotoVideo } from "react-icons/tb";

const BoardWritePopup = ({
  show,
}: // setShow,
{
  show: boolean;
  // setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  return show ? (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 text-center">
      <div className="w-1/3 bg-white rounded-md">
        <div className="border-b-2 p-3 font-bold">
          <span>새 게시물 만들기</span>
        </div>
        <div className="p-4 my-20 space-y-3">
          <TbPhotoVideo size="80" className="w-full" />
          <div className="text-xl">사진과 동영상을 여기에 끌어다 놓으세요</div>
          <div className="flex justify-center">
            <button className="flex justify-center p-2 bg-blue-400 w-[140px] rounded-md text-white font-bold">
              컴퓨터에서 선택
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default BoardWritePopup;
