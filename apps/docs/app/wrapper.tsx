import { body } from "@ui/typography";
import { ReactNode} from "react";

const Wrapper = ({children}: {children: ReactNode}) => {
  return (
    <main className={`${body} text-secondary bg-gray-900 fixed inset-0 w-screen h-screen flex justify-center items-center`}>
      <div className={`bg-black rounded-xl w-full h-full max-w-[390px] max-h-[844px] shadow-xl text-center relative`}>
        {children}
      </div>
    </main>
  );
}

export { Wrapper }