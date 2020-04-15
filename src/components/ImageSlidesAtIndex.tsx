import { useState } from "react";

const ImageSlidesAtIndex = () => {
  const [images, setImages] = useState<string[]>([
    "/assets/img/interior/img-interior-slide-02.jpg",
    "/assets/img/interior/img-interior-slide-05.jpg",
    "/assets/img/interior/img-interior-slide-06.jpg"
  ]);
  const [counter, setCounter] = useState<number>(0);

  return (
    <>
      <div
        className="previous"
        onClick={() =>
          counter === 0 ? setCounter(5) : setCounter(counter - 1)
        }
      >
        {" "}
        {"<"}{" "}
      </div>
      <div
        className="index-img-interior-child"
        style={{
          backgroundImage: `url(${images[counter]})`
        }}
      ></div>
      <div
        className="next"
        onClick={() =>
          counter === 2 ? setCounter(0) : setCounter(counter + 1)
        }
      >
        {" "}
        {">"}{" "}
      </div>
    </>
  );
};

export default ImageSlidesAtIndex;
