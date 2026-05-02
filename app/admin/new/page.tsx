import { redirect } from "next/navigation";

export default function OldNewPostPage() {
  redirect("/admin/posts/new");
}
