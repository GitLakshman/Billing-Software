import { useContext, useState } from "react";
import { AppContext } from "../../context";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { addItem } from "../../service/ItemService";

const ItemForm = () => {
  const { categories, setCategories, setItems, items } = useContext(AppContext);

  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState({
    itemName: "",
    categoryId: "",
    itemPrice: "",
    itemDescription: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onShubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please Select an Image");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("item", JSON.stringify(data));
    formData.append("file", image);
    try {
      const res = await addItem(formData);
      if (res.status === 201) {
        setItems([...items, res.data]);
        setCategories(
          categories.map((category) =>
            category.categoryId === res.data.categoryId
              ? { ...category, itemsCount: category.itemsCount + 1 }
              : category,
          ),
        );
        toast.success("Item added");
        setData({
          itemName: "",
          categoryId: "",
          itemPrice: "",
          itemDescription: "",
        });
        setImage(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while adding item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className=""
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2 p-4 max-w-5/6 bg-white rounded-md text-black">
        <form onSubmit={onShubmitHandler}>
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
              alt=""
              hidden
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="itemName">Name</label>
            <input
              type="text"
              name="itemName"
              id="itemName"
              placeholder="Item Name"
              className="border border-gray-400 rounded-sm px-2 py-1"
              onChange={onChangeHandler}
              value={data.itemName}
            />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="itemCategory">Category</label>
            <select
              name="categoryId"
              id="itemCategory"
              className="border border-gray-400 rounded-sm px-2 py-1"
              onChange={onChangeHandler}
              value={data.categoryId}
            >
              <option value="">-- Select Category --</option>
              {categories.map((category, index) => (
                <option key={index} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="itemPrice">Price</label>
            <input
              type="number"
              name="itemPrice"
              id="itemPrice"
              placeholder="&#8377;300"
              className="border border-gray-400 rounded-sm px-2 py-1"
              onChange={onChangeHandler}
              value={data.itemPrice}
            />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="itemDescription">Description</label>
            <textarea
              rows={5}
              name="itemDescription"
              id="itemDescription"
              placeholder="Write here.."
              className="border border-gray-400 rounded-sm px-2 py-1"
              onChange={onChangeHandler}
              value={data.itemDescription}
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center bg-yellow-400 px-2 py-1 w-full rounded-sm hover:opacity-95 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "loading..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
