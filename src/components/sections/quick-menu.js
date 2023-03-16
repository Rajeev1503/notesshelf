import { useReducer, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
export default function QuickMenu(props) {
  function subjectReducer(subjectName, action) {
    switch (action.type) {
      case "toggle_subject": {
        return action.payload;
      }
      default:
        return "none";
    }
  }
  const [toggleSubjects, setToggleSubjects] = useState(false);
  const [subjectsToggleHandler, dispatch] = useReducer(
    subjectReducer,
    "first semester"
  );

  const { subjectId } = useRouter().query;

  return (
    <div className="flex flex-col gap-6 pb-24 sm:pb-0">
      <div>
        <p className="text-xs font-bold text-[#555] py-2">IPU CSE Subjects</p>
        <div className="flex flex-col justify-between text-xs font-semibold rounded-lg py-1 capitalize">
          {props.semesters.map((e) => {
            return (
              <div key={e.id}>
                <div
                  className="flex justify-between items-center bg-[#1a1a2e] rounded-lg px-2 py-2 mb-2 cursor-pointer"
                  onClick={() => {
                    if (toggleSubjects) {
                      dispatch({
                        type: "toggle_subject",
                        payload: e.semesterName,
                      });

                      return setToggleSubjects(false);
                    } else if (subjectsToggleHandler == e.semesterName) {
                      dispatch({
                        type: "none",
                      });
                      return setToggleSubjects(true);
                    } else {
                      dispatch({
                        type: "toggle_subject",
                        payload: e.semesterName,
                      });

                      return setToggleSubjects(false);
                    }
                  }}
                >
                  <p className=" text-sm sm:text-xs">
                    {e.semesterName} Subjects
                  </p>
                  <div className="cursor-pointer ">
                    {subjectsToggleHandler == e.semesterName ? (
                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    )}
                  </div>
                </div>
                <div
                  className={`${
                    subjectsToggleHandler == e.semesterName
                      ? toggleSubjects
                        ? "hidden"
                        : ""
                      : "hidden"
                  }`}
                >
                  {e.subjects.map((z) => {
                    return (
                      <Link
                        href={`/${z.slug}`}
                        key={z.id}
                        onClick={props.toggleMobileQuickMenu}
                      >
                        <div className="text-sm sm:text-xs mt-2 font-semibold pl-2">
                          <div
                            className={`w-full border border-[#1a1a2e] rounded-lg cursor-pointer px-2 py-2 ${
                              subjectId == z.slug
                                ? "border-r-[#896bff] text-[#896bff] scale-110"
                                : "border-r-[#1a1a2e] text-[#bbb] hover:text-[#fff] hover:scale-105"
                            }`}
                          >
                            <span>{z.subjectName}</span>
                            {/* <span className="w-[30%] text-[#666]"></span> */}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  <br />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
