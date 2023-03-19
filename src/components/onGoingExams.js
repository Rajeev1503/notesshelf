import Link from "next/link";

export default function OnGoingExams(props) {
  return (
    <div className="w-full border-2 border-border-dark border-opacity-30 shadow-md bg-opacity-50 backdrop-filter bg-card-dark rounded-full px-2 sm:px-4">
      <div className="w-full hideScrollBar overflow-x-scroll flex flex-row items-center justify-start gap-1 font-semibold text-xs md:text-sm">
        <div className="min-w-max flex flex-row items-center justify-start text-center rounded-lg py-2">
        Ongoing Exams
      </div>
      <div className="max-w-min flex flex-row items-center justify-start text-lg text-gray-700 py-2 px-2">
        |
      </div>
      <div className="w-full py-2">
        <div className="flex flex-row justify-start gap-2 w-full">
          
          {props.semesters.map((semester) => {
          return semester.subjects.map((subject) => {
            if (subject.isSubjectsExam) {
              return (
                <Link href={`${subject.slug}`} key={subject.id} className="hover:text-[#fff] cursor-pointer text-xs min-w-max bg-gray-700 bg-opacity-50 rounded-lg px-2 py-1">
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
