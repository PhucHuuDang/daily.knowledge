import { db } from "@/lib/db";
import { PostItem } from "../_components/post-item";
import { auth } from "@clerk/nextjs";
import { NewsNotFound } from "@/components/news-not-found";

const NewsShared = async ({ params }: { params: { userId: string } }) => {
  // console.log(params.userId);
  const { orgId, userId } = auth();

  const authorNews = await db.post.findMany({
    where: {
      author: {
        userId: userId as string,
      },
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (authorNews.length === 0) {
    return <NewsNotFound />;
  }

  return (
    <div className="grid gap-8 2xl:gap-10 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-col-3 grid-cols-2 text-slate-300 px-4 pt-10 lg:px-8 mb-8 min-h-screen 2xl:min-h-full">
      {authorNews.map((news) => (
        <PostItem data={news} key={news.id} authorNews />
      ))}
    </div>
  );
};

export default NewsShared;
