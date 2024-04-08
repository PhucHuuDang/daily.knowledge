import { OrganizationList } from "@clerk/nextjs";

const CreateOrganizationPage = () => {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/news/:id"
      afterCreateOrganizationUrl="/news/:id"
    />
  );
};

export default CreateOrganizationPage;
