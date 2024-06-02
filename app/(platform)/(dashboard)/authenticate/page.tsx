import { cn } from "@/lib/utils";
import { DataTable } from "./data-table";
import { db } from "@/lib/db";

export async function generateMetadata() {
  return {
    title: "Manage Posts",
    description: "Manage posts that need to be censored",
    icon: [
      {
        url: "/admin-manage.jpeg",
        href: "/admin-manage.jpeg",
      },
    ],
  };
}

const AuthenticatePage = async () => {
  const getPostsNeedToBeCensored = await db.post.findMany({
    where: {
      censored: false,
      published: false,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div
      className={cn(
        "pt-20 px-8 text-white h-full bg-gradient-to-r from-slate-900 to-slate-700 overflow-y-auto"
      )}
    >
      <DataTable data={getPostsNeedToBeCensored} />
    </div>
  );
};

export default AuthenticatePage;
