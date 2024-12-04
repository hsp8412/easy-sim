import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ChangeEvent, useState} from "react";

type Props = {
  defaultUrl?: string;
  buttonText?: string;
  handleImageChange?: (image: File | undefined) => void;
  loading: boolean;
};

const ImageUpload = ({
  defaultUrl,
  buttonText,
  handleImageChange,
  loading,
}: Props) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      if (handleImageChange) {
        handleImageChange(e.currentTarget.files[0]);
      }
      setImage(URL.createObjectURL(e.currentTarget.files[0]));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src={image || defaultUrl}
        alt={"logo"}
        className="w-[130px] cursor-pointer"
      />
      <input
        className="hidden"
        type="file"
        id="image-input"
        onChange={handleFileChange}
      />
      <label
        className="mt-5 bg-primary hover:bg-primaryDark text-white px-6 py-2 rounded-xl cursor-pointer"
        htmlFor="image-input"
      >
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="text-white me-2"
          size="sm"
        />
        {buttonText || "Change image"}
      </label>
    </div>
  );
};

export default ImageUpload;