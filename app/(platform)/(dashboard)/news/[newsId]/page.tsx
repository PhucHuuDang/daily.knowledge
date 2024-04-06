const NewsIdPage = ({ params }: { params: { newsId: string } }) => {
  return <div className="text-slate-300">NewsIdPage: {params.newsId}</div>;
};

export default NewsIdPage;
