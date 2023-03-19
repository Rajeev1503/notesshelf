import Image from "next/image";

const MDXComponents = {
    wrapper: (props) => (
      <div className="text-[1rem] text-gray-200 md:text-justify text-left">
        <main>{props.children}</main>
      </div>
    ),
    p: (props) => (
      <p
        className="pb-8 text-[#c6c6c6]"
        style={{
          lineHeight: "1.77777778",
          fontSize: "1rem",
        }}
      >
        {props.children}
      </p>
    ),
  
    h3: (props) => (
      <h1 className="text-xl font-semibold py-6 mt-10 border-t-2 border-gray-800 border-opacity-50">
        {props.children}
      </h1>
    ),
    strong: (props) => (
      <strong className="text-lg font-bold text-gray-200">
        {props.children}
      </strong>
    ),
    em: (props) => <em className="text-lg">{props.children}</em>,
    li: (props) => (
      <ul className="list-disc ml-4 pb-2">
        <li className="text-[#c6c6c6]">{props.children}</li>
      </ul>
    ),
    img: (props) => <Image {...props} width={2250} height={1390} />,
  
    code: (props) => (
      <div className="bg-[#13131e] p-4 rounded-lg my-4">{props.children}</div>
    ),
  };

  export default MDXComponents;