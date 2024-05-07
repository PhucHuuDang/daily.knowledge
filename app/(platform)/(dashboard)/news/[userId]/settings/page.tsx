import { OrganizationProfile, auth } from "@clerk/nextjs";

export function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: orgSlug + " " + "Settings",
  };
}

const SettingsPage = () => {
  return (
    <div className="w-full h-screen overflow-x-hidden">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "none",
              width: "100%",
              height: "100%",
            },
            card: {
              border: "1px solid #e5e5e5",
              height: "100%",
              width: "100%",
              boxShadow: "none",
            },
          },
        }}
      />
    </div>
  );
};

export default SettingsPage;
