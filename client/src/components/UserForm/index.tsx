import { SecondaryButtonLong } from "../buttons/FormButtons";

const UserForm = () => {
  return (
    <div className="mx-2 mt-2 p-4 max-w-4/6 bg-white rounded-md text-black">
      <form>
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="userName">Name</label>
          <input
            type="name"
            name="userName"
            id="userName"
            placeholder="Jhon Doe"
            className="border border-gray-400 rounded-sm px-2 py-1"
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="userMail">Email</label>
          <input
            type="email"
            name="userMail"
            id="userMail"
            placeholder="jhondoe@example.com"
            className="border border-gray-400 rounded-sm px-2 py-1"
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="userPassword">Password</label>
          <input
            type="password"
            name="password"
            id="userPassword"
            placeholder="********"
            className="border border-gray-400 rounded-sm px-2 py-1"
          />
        </div>
        <SecondaryButtonLong>Save</SecondaryButtonLong>
      </form>
    </div>
  );
};

export default UserForm;
