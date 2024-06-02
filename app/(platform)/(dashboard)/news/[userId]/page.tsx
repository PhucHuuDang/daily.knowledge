import { auth, currentUser } from "@clerk/nextjs";
import { PostItem } from "./_components/post-item";
import { db } from "@/lib/db";

const UserIdPage = async ({ params }: { params: { userId: string } }) => {
  const test = auth();

  // console.log({ test });
  // const user = await currentUser();

  // console.log(params.userId);

  const getAllNews = await db.post.findMany({
    where: {
      published: true,
    },
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
          grid-cols-3
          lg:grid-cols-4
          2xl:gap-10
          2xl:grid-cols-6
          text-slate-300
          gap-8
          px-4
          pt-10
          lg:px-8
          mb-8
     "
      >
        {/* @params UserIdPage: {params.newsId} */}
        {getAllNews.map((news) => (
          <>
            <PostItem key={news.id} data={news} />
            <PostItem key={news.id} data={news} />
            <PostItem key={news.id} data={news} />
            <PostItem key={news.id} data={news} />
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
