import { SecondaryButtonLong } from "../buttons/FormButtons";

const ItemForm = () => {
  return (
    <div
      className=""
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2 p-4 max-w-4/6 bg-white rounded-md text-black">
        <form>
          <div className="mb-4 w-12">
            <label htmlFor="image">
              <img src="https://placehold.co/48x48" alt="" width={48} />
            </label>
            <input type="file" name="image" id="image" alt="" hidden />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="itemName">Name</label>
            <input
              type="name"
              name="itemName"
              id="itemName"
              placeholder="Item Name"
              className="border border-gray-400 rounded-sm px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="itemCategory">Category</label>
            <select
              name="itemCategory"
              id="itemCategory"
              className="border border-gray-400 rounded-sm px-2 py-1"
            >
              <option value="">--Select Category--</option>
              <option value="">Category 1</option>
              <option value="">Category 2</option>
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
            />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="description">Description</label>
            <textarea
              rows={5}
              name="text"
              id="description"
              placeholder="Write here.."
              className="border border-gray-400 rounded-sm px-2 py-1"
            />
          </div>

          <SecondaryButtonLong>Save</SecondaryButtonLong>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
