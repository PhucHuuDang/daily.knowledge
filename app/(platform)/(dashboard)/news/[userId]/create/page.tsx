import { auth } from "@clerk/nextjs";
import CreateNewsRoute from "./_components/create-news-route";

const CreateNewsPage = async () => {
  const { orgId, orgRole, organization, userId } = auth();

  // console.log({ orgId, orgRole, organization, userId });
  return (
    <>
      <CreateNewsRoute orgId={orgId ?? (userId as string)} />
    </>
  );
};

export default CreateNewsPage;
