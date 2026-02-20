import {
  useContext,
  useEffect,
  useState,
  type FC,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import {
  addCategory,
  type CategoryRequest,
} from "../../service/CategoryService";
import { AppContext } from "../../context";

const CategoryForm: FC = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const [data, setData] = useState<CategoryRequest>({
    categoryName: "",
    categoryDescription: "",
    categoryBgColor: "#2c2c2c",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please Select an Image");
      setLoading(false);
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("category", JSON.stringify(data));
    formData.append("file", image);
    try {
      const res = await addCategory(formData);
      if (res.status === 201) {
        setCategories([...categories, res.data]);
        toast.success("Category added");
        setData({
          categoryName: "",
          categoryDescription: "",
          categoryBgColor: "#2c2c2c",
        });
        setImage(null);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error! Category cannot Upload");
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 mt-2 p-4 max-w-5/6 bg-white rounded-md text-black">
      <form onSubmit={onSubmitHandler}>
        <div className="mb-4 w-12">
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload}
              alt=""
              width={48}
            />
          </label>
          <input
            type="file"
            name="image"
            id="image"
            hidden
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="categoryName"
            id="name"
            placeholder="Category Name"
            className="border border-gray-400 rounded-sm px-2 py-1"
            onChange={onChangeHandler}
            value={data.categoryName}
            required
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="description">Description</label>
          <textarea
            rows={5}
            name="categoryDescription"
            id="description"
            placeholder="Write here.."
            className="border border-gray-400 rounded-sm px-2 py-1"
            onChange={onChangeHandler}
            value={data.categoryDescription}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="backgroundColor">Background Color</label>
          <br />
          <input
            type="color"
            name="categoryBgColor"
            id="backgroundColor"
            placeholder="#ffffff"
            onChange={onChangeHandler}
            value={data.categoryBgColor}
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center bg-yellow-400 px-2 py-1 w-full rounded-sm hover:opacity-95 transition-colors duration-200"
          disabled={loading}
        >
          {loading ? "loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
