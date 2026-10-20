import { CHAT_COPY } from "../constants/ChatUi";
import ChatShell from "./ChatShell";
import StatusNote from "./StatusNote";

export default function LoadingState() {
  return (
    <ChatShell>
      <div className="flex flex-1 items-center justify-center pb-16">
        <StatusNote label={CHAT_COPY.loading} pending />
      </div>
    </ChatShell>
  );
}