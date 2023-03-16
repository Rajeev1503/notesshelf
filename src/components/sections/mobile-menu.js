import Link from "next/link";
export default function MobileMenu(props) {
  return (
    <div className="sm:hidden fixed text-sm bottom-0 w-full mt-2">
      <div className="flex flex-row justify-between items-center p-2 px-6 border-t border-gray-700 bg-[#13131e] bg-opacity-80 backdrop-blur text-white">
        <div
          onClick={props.toggleMobileQuickMenu}
          className="w-[80px] rounded-3xl text-xs font-semibold border-2 p-2 px-4 border-gray-600 border-opacity-40"
        >
          <div>Subjects</div>
        </div>
        <Link
          href="/"
          className="w-[120px] text-center rounded-3xl text-xs font-semibold border p-2 px-4 border-white text-white"
        >
          <div>Home</div>
        </Link>
        <Link
          href="/"
          className={` ${
            props.enableRelatedMenu ? "hidden" : "w-[80px] p-2 px-4 rounded-3xl text-xs font-semibold border border-transparent min-w-max"
          } `}
        >
          <div></div>
        </Link>
        {/* <Link className=" font-bold text-center" href="/"></Link> */}
        <div
          className={`${props.enableRelatedMenu ? "" : "hidden"} w-[80px] rounded-3xl text-xs font-semibold border-2 p-2 px-4 border-gray-600 border-opacity-40`}
          onClick={props.toggleMobileRelatedMenu}
        >
          <div className="">
            Related
          </div>
        </div>
      </div>
    </div>
  );
}
