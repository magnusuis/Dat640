import { Config } from "./types";
import ChatWidget from "./components/Widget/ChatWidget";
import ChatEmbedded from "./components/Embedded/ChatEmbedded";

export default function App(props: Config) {
  return props.useWidget ? (
    <ChatWidget {...props} />
  ) : (
    <ChatEmbedded {...props} />
  );
}
