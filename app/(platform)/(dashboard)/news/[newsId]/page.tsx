import { auth, currentUser } from "@clerk/nextjs";
import { ImageUpload } from "./_components/image-upload";
import { PostItem } from "./_components/post-item";

const NewsIdPage = ({ params }: { params: { newsId: string } }) => {
  // const test = auth();

  // const user = await currentUser();

  return (
    <>
      <div>Feed setting</div>
      <div className="grid gap-8 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 text-slate-300 px-4 pt-10 lg:px-8 mb-8">
        {/* @params NewsIdPage: {params.newsId} */}
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        {/* <ImageUpload /> */}
      </div>
    </>
  );
};

export default NewsIdPage;
