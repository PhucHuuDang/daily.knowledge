import { auth, currentUser } from "@clerk/nextjs";
import { PostItem } from "./_components/post-item";
import { db } from "@/lib/db";

const NewsIdPage = async ({ params }: { params: { newsId: string } }) => {
  const test = auth();

  // console.log({ test });
  // const user = await currentUser();

  const getAllNews = await db.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      {/* <div>Feed setting</div> */}
      <div className="grid gap-8 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 text-slate-300 px-4 pt-10 lg:px-8 mb-8 min-h-screen 2xl:min-h-full">
        {/* @params NewsIdPage: {params.newsId} */}
        {getAllNews.map((news) => (
          <PostItem key={news.id} data={news} />
        ))}

        {/* <ImageUpload /> */}
      </div>
    </>
  );
};

export default NewsIdPage;
