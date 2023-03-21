import { BackgroundColorContext } from "@/context/backgroundColorContext";
import Link from "next/link";
import { useContext } from "react";

export default function OnGoingExams(props) {

  
  const backgroundColorContext = useContext(BackgroundColorContext);

  return (
    <div className={`w-full shadow-md ${backgroundColorContext.backgroundColorState.card_background} rounded-full px-2 sm:px-4`}>
      <div className="w-full hideScrollBar overflow-x-scroll flex flex-row items-center justify-start gap-1 font-semibold text-xs md:text-sm">
        <div className="min-w-max flex flex-row items-center justify-start text-center rounded-lg py-2">
        Ongoing Exams
      </div>
      <div className={`max-w-min flex flex-row items-center justify-start text-lg ${backgroundColorContext.backgroundColorState.gray_text} py-2 px-2`}>
        |
      </div>
      <div className="w-full py-2">
        <div className="flex flex-row justify-start gap-2 w-full">
          
          {props.semesters.map((semester) => {
          return semester.subjects.map((subject) => {
            if (subject.isSubjectsExam) {
              return (
                <Link href={`${subject.slug}`} key={subject.id} className={`hover:bg-opacity-100 cursor-pointer text-xs min-w-max ${backgroundColorContext.backgroundColorState.card_background} rounded-lg px-2 py-1`}>
                  {subject.subjectName}
                </Link>
              );
            } else return;
          });
        })}
        </div>
        
      </div>
      </div>
      
    </div>
  );
}
