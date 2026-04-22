import { useNavigate } from "react-router-dom";

export function NotFound() {

    const navigate = useNavigate();
    return (
      <>
        <main className="grid h-[100vh] place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className=" font-bold text-2xl text-orange-600">404</p>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-100 sm:text-7xl">
              Page not found
            </h1>
            <p className="mt-6 text-pretty text-lg font-medium text-white sm:text-xl/8">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                onClick={() => navigate(-1)}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Go back page
              </a>
             <p>
             <a className="text-sm font-semibold text-orange-600">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a> { " "} <span className="text-sm font-semibold text-gray-400">www.lmsbygolu@gmail.com</span>
             </p>
            </div>
          </div>
        </main>
      </>
    )
  }
  

export default NotFound;