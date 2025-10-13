import { Outlet } from "react-router-dom";
export default function AppLayout() {
  return (
    <>
      <div className="  flex flex-row gap-2 justify-end bg-slate-700 py-2 ">
        <button>Login</button>
        <button>Signup</button>
      </div>
      <Outlet />
    </>
  );
}
