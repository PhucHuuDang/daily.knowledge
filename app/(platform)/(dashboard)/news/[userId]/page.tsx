import { auth, currentUser } from "@clerk/nextjs";
import { PostItem } from "./_components/post-item";
import { db } from "@/lib/db";

const UserIdPage = async ({ params }: { params: { userId: string } }) => {
  const test = auth();

  // console.log({ test });
  // const user = await currentUser();

  console.log(params.userId);

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
      <div
        className="
            grid
            gap-8
            2xl:gap-10
            2xl:grid-cols-6
            xl:grid-cols-4
            lg:grid-cols-3
            grid-cols-2
            text-slate-300
            px-4
            pt-10
            lg:px-8
            mb-8
            min-h-screen
            2xl:min-h-full
        "
      >
        {/* @params UserIdPage: {params.newsId} */}
        {getAllNews.map((news) => (
          <>
            <PostItem key={news.id} data={news} />
            <PostItem key={news.id} data={news} />
            <PostItem key={news.id} data={news} />
          </>
        ))}

        {/* <ImageUpload /> */}
      </div>
    </>
  );
};

export default UserIdPage;
