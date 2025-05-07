import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Quill from "quill";
import { assets } from "../../assets/assets";

const EditCourse = ({ courseId, closeModal }) => {
  const { backendUrl, token } = useAppContext();
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseData, setCourseData] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const { data } = await axios.get(
          backendUrl + "/api/course/" + courseId
        );
        if (data.success) {
          setCourseData(data.courseData);
          setCourseTitle(data.courseData.courseTitle);
          setCoursePrice(data.courseData.coursePrice);
          setCourseDescription(data.courseData.courseDescription);
          setDiscount(data.courseData.discount);
          setImage(data.courseData.courseThumbnail);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchCourseDetails();
  }, [courseId, backendUrl, token]);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });

      if (courseDescription) {
        quillRef.current.root.innerHTML = courseDescription;
      }
    }
  }, [courseDescription]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const updatedDescription = quillRef.current.root.innerHTML;

      if (!image) {
        toast.error("Thumbnail is not selected");
        return;
      }

      const updatedCourse = {
        _id : courseId,
        courseTitle,
        coursePrice,
        discount,
        courseDescription: updatedDescription,
      };

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(updatedCourse));
      formData.append("image", image);

      const { data } = await axios.put(
        `${backendUrl}/api/educator/update-course/${courseId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        closeModal();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.53)] flex justify-end">
      <div
        className="md:w-1/3 w-full bg-white p-6 shadow-lg overflow-y-auto max-h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-600 font-semibold text-3xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-medium text-gray-900 pb-4">Edit Course</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label>Course Title</label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="outline-none py-2 px-3 rounded border border-gray-500"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>Course Description</p>
            <div
              ref={editorRef}
              className="bg-white border border-gray-500 rounded p-2 min-h-[100px]"
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-1 w-full max-w-[150px]">
              <label>Course Price</label>
              <input
                type="number"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                className="outline-none py-2 px-3 rounded border border-gray-500"
                required
              />
            </div>

            <div className="flex flex-col gap-1 w-full max-w-[150px]">
              <label>Discount %</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="outline-none py-2 px-3 rounded border border-gray-500"
                min={0}
                max={100}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p>Course Thumbnail</p>
            <label
              htmlFor="thumbnailImage"
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={assets.file_upload_icon}
                className="p-2 bg-blue-500 rounded"
              />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              {image ? (
                <img
                  className="max-h-10"
                  src={image}
                  alt="Thumbnail"
                />
              ) : (
                <span>Select Thumbnail</span>
              )}
            </label>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;