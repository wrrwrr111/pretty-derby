import { ClientOnly } from "./client";

export const metadata = {
  title: "支援 - 乌拉拉大胜利 - 赛马娘资料站",
};

export default function Page() {
  return <ClientOnly />; // We'll update this
}
