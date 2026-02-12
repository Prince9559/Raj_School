import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { defaultSchoolCode } from "../main";

const Gallery = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState(null);

  const { user } = useContext(UserContext);
  const schoolCode = defaultSchoolCode;

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setMessage(null);
    if (!newFile) {
      setFile(null);
      return;
    }

    // Validate file type
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedFileTypes.includes(newFile.type)) {
      setFile(null);
      setIsError("Invalid file type. Please select a valid image file.");
      return;
    }

    setFile(newFile);
    setIsError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setIsError("Please select an image before uploading.");
      return;
    }
    if (file.size > 800000) {
      setIsError("File size should be less than 800kb");
      alert("File size should be less than 800kb");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("schoolCode", schoolCode);
    try {
      setIsError(null);
      setUploading(true);

      const response = await axios.post(`/gallery/${schoolCode}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImages((prevImages) => [...prevImages, response.data.filename]);
      setMessage(response.data.message);
      setFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsError("Error uploading image. Please try again.");
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename) => {
    try {
      setIsError(null);
      const response = await axios.delete(
        `/gallery/${schoolCode}/delete/${filename}`
      );
      setImages((prevImages) =>
        prevImages.filter((image) => image !== filename)
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error deleting image:", error);
      setIsError("Error deleting image. Please try again.");
    }
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await axios.get(`/gallery/${schoolCode}`);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
        setIsError("Error fetching images. Please try again.");
      }
    };
    getImages();
  }, [schoolCode]);

  // Function to remove file extension
  const getFileNameWithoutExtension = (filename) => {
    return filename.split(".").slice(0, -1).join(".");
  };

  return (
    <div className="pt-[120px]">
      {user && (
        <div className="m-10">
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-black rounded p-6"
          />
          <button
            className={`bg-green-500 rounded-lg p-6 m-2 font-bold ${
              uploading ? "cursor-not-allowed" : ""
            }`}
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {isError && <p className="bg-red-400">{message}</p>}
          {!isError && message && <p className="bg-green-400">{message}</p>}
        </div>
      )}
      {images.length > 0 && (
        <div className="m-10 flex flex-wrap gap-8 justify-center lg:ml-32">
          {images.map((image) => (
            <div
              className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden"
              key={image}
            >
              <div className="p-2 overflow-hidden">
                <img
                  width={400}
                  src={`${axios.defaults.baseURL}/gallery/${schoolCode}/${image}`}
                  alt={image}
                  onClick={() => openLightbox(image)}
                  className="w-full h-[310px] object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                />
              </div>
              <div className="pb-1 text-center">
                <p className="text-black font-[Roboto Slab] text-2xl">
                  {getFileNameWithoutExtension(image)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Lightbox/Modal */}
      {selectedImage && (
        <div
          className="fixed z-40 left-0 top-0 w-full h-full bg-black bg-opacity-75 flex flex-col items-center justify-center"
          onClick={closeLightbox}
        >
          <img
            src={`${axios.defaults.baseURL}/gallery/${schoolCode}/${selectedImage}`}
            alt="selected-schoolimage"
            className="w-[50vw] h-[50vh] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
