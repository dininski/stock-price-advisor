import { NavLink } from "react-router";

export function Welcome({ message }: { message: string }) {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold">{message}</h1>
        </header>
        <div className="items-center flex">
          <NavLink
            to="/stock"
            className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
          >
            To app
          </NavLink>
        </div>
      </div>
    </main>
  );
}
