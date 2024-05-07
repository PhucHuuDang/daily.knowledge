import Image from "next/image";
import { TracingBeam } from "@/components/aceternity/tracing-beams";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/lib/db";

const NewsIdPage = async ({ params }: { params: { newsId: string } }) => {
  const { newsId } = params;

  const newsDetails = await db.post.findUnique({
    where: {
      id: newsId,
      published: true,
    },
    include: {
      author: {
        select: {
          image: true,
        },
      },
    },
  });

  return (
    <div className="pt-20 overflow-hidden">
      <TracingBeam className="px-6 py-1 bg-slate-400 ">
        <div className="max-w-2xl antialiased mx-auto text-slate-200 relative">
          <Avatar className="">
            <AvatarImage src={newsDetails?.author.image} />
            <AvatarFallback />
          </Avatar>

          <h1 className="space-y-2">{newsDetails?.title}</h1>

          <Image
            src={newsDetails?.image!}
            height="1000"
            width="1000"
            className="aspect-video rounded-xl object-cover mb-4"
            alt="news-title"
          />
          <p className="text-xl mb-4 text-slate-200">{newsDetails?.content}</p>
          <p className="text-xl mb-4 text-slate-200">{newsDetails?.content}</p>
          <Image
            src={newsDetails?.image!}
            height="1000"
            width="1000"
            className="aspect-video rounded-xl object-cover mb-4"
            alt="news-title"
          />
          <p className="text-xl mb-4 text-slate-200">{newsDetails?.content}</p>
          <p className="text-xl mb-4 text-slate-200">{newsDetails?.content}</p>
          <Image
            src={newsDetails?.image!}
            height="1000"
            width="1000"
            className="aspect-video rounded-xl object-cover mb-4"
            alt="news-title"
          />
          <p className="text-xl mb-4 text-slate-200">{newsDetails?.content}</p>
          <p className="text-xl mb-4 text-slate-200">{newsDetails?.content}</p>
          <Image
            src={newsDetails?.image!}
            height="1000"
            width="1000"
            className="aspect-video rounded-xl object-cover mb-4"
            alt="news-title"
          />
          <p className="text-xl mb-4 text-slate-200">{newsDetails?.content}</p>
          <p className="text-xl mb-4 text-slate-200">{newsDetails?.content}</p>
        </div>
      </TracingBeam>
    </div>
  );
};

export default NewsIdPage;
