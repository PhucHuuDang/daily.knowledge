import { auth, currentUser } from "@clerk/nextjs";
import { ImageUpload } from "./_components/image-upload";

const NewsIdPage = ({ params }: { params: { newsId: string } }) => {
  // const test = auth();

  // const user = await currentUser();

  // console.log(params.newsId);

  return (
    <div className="text-slate-300">
      NewsIdPage: {params.newsId}
      <ImageUpload />
    </div>
  );
};

export default NewsIdPage;
