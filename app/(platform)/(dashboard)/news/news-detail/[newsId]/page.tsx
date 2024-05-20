import Image from "next/image";
import { TracingBeam } from "@/components/aceternity/tracing-beams";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/lib/db";
import { NewsDetailContent } from "./news-detail-content";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

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
          name: true,
        },
      },
    },
  });

  return (
    <div className="pt-20 overflow-hidden">
      <TracingBeam className="px-6 py-1  ">
        <div className="max-w-2xl antialiased mx-auto text-slate-200 ">
          <div className="flex items-center gap-x-2 mb-4">
            <Avatar className="">
              <AvatarImage src={newsDetails?.author.image} />
              <AvatarFallback />
            </Avatar>

            <div className="flex flex-col gap-x-1">
              <div className="uppercase font-bold">
                {newsDetails?.author.name}
              </div>
              <div className="font-semibold text-sm">
                {format(
                  new Date(newsDetails?.createdAt as Date),
                  "MMM d, yyyy 'at' h:mm a "
                )}
              </div>
            </div>
          </div>

          <h1 className="my-4 text-[#a8b3cf] text-2xl font-bold text-center">
            {newsDetails?.title}
          </h1>

          <Image
            src={newsDetails?.image!}
            height="1000"
            width="1000"
            className="aspect-video rounded-xl object-cover mb-8"
            alt="news-title"
          />
          <Separator />
          <div className="my-8">
            <NewsDetailContent content={newsDetails?.content!} />
          </div>
          {/* <p className="text-xl mb-4 text-slate-200">{newsDetails?.content}</p>
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
          <p className="text-xl mb-4 text-slate-200">{newsDetails?.content}</p> */}
        </div>
      </TracingBeam>
    </div>
  );
};

export default NewsIdPage;
