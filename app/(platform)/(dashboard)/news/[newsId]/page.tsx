import { auth, currentUser } from "@clerk/nextjs";

const NewsIdPage = ({ params }: { params: { newsId: string } }) => {
  // const test = auth();

  // const user = await currentUser();

  // console.log(params.newsId);

  return <div className="text-slate-300">NewsIdPage: {params.newsId}</div>;
};

export default NewsIdPage;
