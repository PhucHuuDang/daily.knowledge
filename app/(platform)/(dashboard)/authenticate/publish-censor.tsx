"use client";

import { updatePublishedCensoredPost } from "@/actions/published-censored";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAction } from "@/hooks/use-action";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

interface PublishedCensoredProps {
  postTitle: string;
  id: string;
}

export const PublishCensor = ({ postTitle, id }: PublishedCensoredProps) => {
  const { execute } = useAction(updatePublishedCensoredPost, {
    onSuccess: (data) => {
      toast.success(`Published & Censored the news "${postTitle}"`);
    },
  });

  const { user } = useUser();

  const published = true;
  const censored = true;

  const onSubmit = () => {
    execute({
      id,
      censored,
      published,
      censoredBy: user?.username!,
    });
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Do you want to publish this post?</AlertDialogTitle>
        <AlertDialogDescription>
          The post will be published for readers reference, this mean you also
          censored this post, please make sure the content is appropriate!
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
