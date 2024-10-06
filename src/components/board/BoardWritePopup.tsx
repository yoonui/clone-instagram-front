import { ChangeEvent, useRef, useState, Dispatch, SetStateAction } from "react";
import { TbPhotoVideo, TbArrowNarrowLeft } from "react-icons/tb";
import Image from "next/image";
import Modal from "../base/Modal";
import AlertPopup from "@/components/board/AlertPopup";

// todo: 사이드바가 있으면 언제든 작성이 가능하기 때문에, 추후 [id]/index.ts가 아닌 사이드바에 추가할 것
const BoardWritePopup = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  // todo: 드래그앤드롭 만들기
  const imgUploadRef = useRef<HTMLInputElement>(null);

  const [imageSrc, setImageSrc] = useState("");
  const [step, setStep] = useState(0);

  const [showAlertPopup, setShowAlertPopup] = useState(false);

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

  const handleClickCond = (imageSrc: string) => {
    if (imageSrc) setShowAlertPopup(true); // 사진을 하나라도 업로드한 경우
    else setShow(false);
  };

  const deleteBtn = () => {
    setImageSrc("");
    setStep(0);
    setShowAlertPopup(false);
    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        setShow={setShow}
        handleClickCond={() => {
          handleClickCond(imageSrc);
        }}
        clasName="!w-1/3"
        title={
          step > 0 ? (
            <div className="flex content-between justify-between">
              <button
                onClick={() => {
                  setStep(step - 1);
                }}
              >
                <TbArrowNarrowLeft size={25} />
              </button>
              <div>새 게시물 만들기</div>
              <button className="text-blue-400">다음</button>
            </div>
          ) : (
            <>새 게시물 만들기</>
          )
        }
      >
        {step === 0 && (
          <>
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
          </>
        )}
        {step === 1 && (
          <>
            <Image
              src={imageSrc ?? ""}
              alt="첨부파일 미리보기"
              width={500}
              height={500}
            />
          </>
        )}
      </Modal>

      <AlertPopup
        show={showAlertPopup}
        setShow={setShowAlertPopup}
        deleteBtn={deleteBtn}
      />
    </>
  );
};

export default BoardWritePopup;
