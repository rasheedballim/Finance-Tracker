import { ImStatsDots } from "react-icons/im";

function Nav() {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User Info*/}
        <div className="flex items-center gap-2">
          {/* User Pic*/}
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://thispersondoesnotexist.com/"
              alt="Profile Pic"
            />
          </div>
          {/* User Name*/}
          <small>Hi Rasheed</small>
        </div>
        {/* Logout & Stats*/}
        <div className="flex items-center gap-4">
          <div>
            <ImStatsDots className=" text-2xl" />
          </div>
          <div>
            <button className="btn btn-red">Sign Out</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav;
