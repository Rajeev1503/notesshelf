import { useReducer, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
export default function QuickMenu({colorPalette, ...props}) {

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

    const {
    card_background,
    border_color,
    accent_text_color,
    gray_text,
    sub_text
  } = colorPalette;

  return (
    <div className="flex flex-col gap-6 pb-24">
      <div>
        <p className={`text-xs font-bold ${gray_text} py-2`}>IPU CSE Subjects</p>
        <div className="flex flex-col justify-between text-xs font-semibold rounded-lg py-1 capitalize">
          {props.semesters.map((e) => {
            return (
              <div key={e.id}>
                <div
                  className={`flex justify-between items-center ${card_background} rounded-lg px-2 py-2 mb-2 cursor-pointer`}
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
                        onClick={props.toggleAllMenus}
                      >
                        <div className="text-sm sm:text-xs mt-2 font-semibold pl-2">
                          <div
                            className={`w-full border ${border_color} border-opacity-20 hover:border-opacity-90 rounded-lg cursor-pointer px-2 py-2 ${
                              subjectId == z.slug
                                ? accent_text_color+" "+ 'scale-110'
                                : gray_text+" "+'hover:scale-105'
                            }`}
                          >
                            <span>{z.subjectName}</span>
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
