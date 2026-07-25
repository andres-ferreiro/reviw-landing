import { Copy } from "lucide-react";
import { TextAnimate } from "./text-animate";

// AI Review Suggestions banner visual — sample suggested review text.
// No card/border here on purpose: it sits directly on the banner tile's
// ambient gradient glow rather than floating in its own boxed island.
export function MiniChatSuggestion() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <TextAnimate
        as="p"
        animation="blurInUp"
        by="character"
        once
        className="text-lg font-medium leading-relaxed sm:text-xl"
      >
        {"“Quick, friendly service and the staff really went out of their way to help. Highly recommend!”"}
      </TextAnimate>
      <span className="pointer-events-none inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1 text-xs font-medium text-muted-foreground">
        <Copy className="h-3 w-3" />
        Copy to Google
      </span>
    </div>
  );
}
