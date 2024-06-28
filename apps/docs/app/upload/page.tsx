import { DragDropArea } from "@repo/ui/components/ui/dragDropArea";
import { Logo } from "@repo/ui/components/ui/logo";
import { body, h3 } from "@ui/typography";

export default function Upload() {
  return (
    <div className={`w-full h-full`}>
      <Logo className={`mx-auto mt-14`} />
      <div className={`px-10 space-y-2 mt-14`}>
        <h3 className={`${h3} text-primary`}>Upload your dating pics</h3>
        <p className={`${body} text-secondary pb-5`}>And get personalized feedback</p>
        <DragDropArea />
      </div>
    </div>
  );
}