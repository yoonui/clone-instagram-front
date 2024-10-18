import {
  ChangeEvent,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { TbPhotoVideo, TbArrowNarrowLeft } from "react-icons/tb";
import Image from "next/image";
import Modal from "../base/Modal";
import AlertPopup from "@/components/board/AlertPopup";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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
  // const [cropImageSrc, setCropImageSrc] = useState("");
  const [step, setStep] = useState(0);

  const [showAlertPopup, setShowAlertPopup] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cropImgRef = useRef<HTMLImageElement>(null);

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

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

  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 100,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  async function canvasPreview(
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    crop: PixelCrop,
    scale = 1,
    rotate = 0
  ) {
    if (!image || !canvasRef || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // const offscreen = new OffscreenCanvas(
    //   crop.width * scaleX,
    //   crop.height * scaleY
    // );
    // const ctx = offscreen.getContext("2d");
    // if (!ctx) {
    //   throw new Error("No 2d context");
    // }

    const pixelRatio = window.devicePixelRatio;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const rotateRads = (rotate * Math.PI) / 180;
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    ctx.save();

    // 5) Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    // 4) Move the origin to the center of the original position
    ctx.translate(centerX, centerY);
    // 3) Rotate around the origin
    ctx.rotate(rotateRads);
    // 2) Scale the image
    ctx.scale(scale, scale);
    // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );

    ctx.restore();

    // const scaleX = image.naturalWidth / image.width;
    // const scaleY = image.naturalHeight / image.height;

    // const offscreen = new OffscreenCanvas(
    //   crop.width * scaleX,
    //   crop.height * scaleY
    // );
    // const ctx = offscreen.getContext("2d");
    // if (!ctx) {
    //   throw new Error("No 2d context");
    // }

    // ctx.drawImage(
    //   image,
    //   0,
    //   0,
    //   image.width,
    //   image.height,
    //   0,
    //   0,
    //   offscreen.width,
    //   offscreen.height
    // );

    // const blob = await offscreen.convertToBlob();
    // setCropImageSrc(URL.createObjectURL(blob));
  }

  useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      cropImgRef.current &&
      canvasRef.current
    ) {
      // We use canvasPreview as it's much faster than imgPreview.
      canvasPreview(cropImgRef.current, canvasRef.current, completedCrop);
    }
  }, [completedCrop]);

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
                  if (imageSrc)
                    setShowAlertPopup(true); // 사진을 하나라도 업로드한 경우
                  else setStep(step - 1);
                }}
              >
                <TbArrowNarrowLeft size={25} />
              </button>
              <div>새 게시물 만들기</div>
              <button
                className="text-blue-400"
                onClick={() => {
                  setStep(step + 1);
                }}
              >
                다음
              </button>
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
                  accept=".png, .jpg, image/*"
                  // accept=".png, .jpg, image/*, .mp4"
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
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
            >
              <Image
                ref={cropImgRef}
                alt="Image Crop"
                src={imageSrc}
                onLoad={onImageLoad}
                width={500}
                height={500}
              />
            </ReactCrop>
            <canvas
              ref={canvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: "300px",
                height: "300px",
              }}
            />
          </>
        )}

        {step === 2 && (
          <>
            {/* <canvas
              ref={canvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: "300px",
                height: "300px",
              }}
            /> */}

            {/* <Image
              alt="Image Crop"
              src={cropImageSrc}
              onLoad={onImageLoad}
              width={500}
              height={500}
            /> */}
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
