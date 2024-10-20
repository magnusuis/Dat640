import "./ChatEmbedded.css";
import { ReactNode } from "react";

export default function ChatEmbedded({ children }: { children: ReactNode }) {
  return (
    <div className="row">
      <div className="">{children}</div>
    </div>
  );
}
