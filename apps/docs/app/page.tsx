import { Button } from "@repo/ui/components/ui/button";
import { Logo } from "@repo/ui/components/ui/logo";
import { body, h3 } from "@ui/typography";

export default function Page() {
  return (
    <main className={`bg-gray-900 fixed inset-0 w-screen h-screen flex justify-center items-center`}>
      <div className={`bg-black rounded-xl w-full h-full max-w-[390px] max-h-[844px] shadow-xl text-center`}>
        <div className={`px-10`}>
          <Logo />
          <h3 className={`${h3} text-primary`}>Your profile has potential!</h3>
          <p className={`${body} text-secondary`}>Receive an insightful analysis, check out our tips to help you put your best forward</p>
          <Button size={`lg`} className={`w-full`}>
            Unveil the Best You!
          </Button>
        </div>
      </div>
    </main>
  );
}