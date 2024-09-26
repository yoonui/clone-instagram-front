import { ChangeEvent, useRef, useState, MutableRefObject } from "react";
import { TbPhotoVideo } from "react-icons/tb";
import Image from "next/image";

// todo: 사이드바가 있으면 언제든 작성이 가능하기 때문에, 추후 [id]/index.ts가 아닌 사이드바에 추가할 것
const BoardWritePopup = ({
  show,
  handleClickOutside,
  dropPopupRef,
}: {
  show: boolean;
  handleClickOutside: (
    e: React.MouseEvent<HTMLDivElement>,
    imageSrc: string
  ) => void;
  dropPopupRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  // todo: 드래그앤드롭 만들기
  const imgUploadRef = useRef<HTMLInputElement>(null);

  const [imageSrc, setImageSrc] = useState("");
  const [step, setStep] = useState(0);

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise<void>((resolve) => {
        reader.onload = () => {
          setImageSrc(reader.result?.toString() || ""); // 파일의 컨텐츠
          resolve();

          setStep(step + 1);
        };
      });
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
      onClick={(e) => handleClickOutside(e, imageSrc)}
    >
      {step === 0 && (
        <div className="w-1/3 bg-white rounded-md">
          <div className="border-b-2 p-3 font-bold">
            <span>새 게시물 만들기</span>
          </div>
          <div className="p-4 my-20 space-y-3">
            <TbPhotoVideo size="80" className="w-full" />
            <div className="text-xl">
              사진과 동영상을 여기에 끌어다 놓으세요
            </div>
            <div className="flex justify-center">
              <input
                ref={imgUploadRef}
                type="file"
                name="images"
                className="hidden"
                onChange={onUpload}
                accept=".png, .jpg, image/*, .mp4"
              />
              <button
                className="flex justify-center p-2 bg-blue-400 w-[140px] rounded-md text-white font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  if (imgUploadRef.current) imgUploadRef.current.click();
                }}
              >
                컴퓨터에서 선택
              </button>
            </div>
          </div>
        </div>
      )}
      {step === 1 && (
        <div className="w-1/3 bg-white rounded-md">
          <div className="border-b-2 p-3 font-bold">
            <span>새 게시물 만들기</span>
          </div>
          <Image
            src={imageSrc ?? ""}
            alt="첨부파일 미리보기"
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
};

export default BoardWritePopup;
