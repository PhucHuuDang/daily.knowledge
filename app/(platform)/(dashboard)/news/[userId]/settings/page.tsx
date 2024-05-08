import { OrganizationProfile, currentUser } from "@clerk/nextjs";

export async function generateMetadata() {
  const user = await currentUser();

  return {
    title: user?.username + " " + "Settings",
    icons: [
      {
        url: user?.imageUrl,
        href: user?.imageUrl,
      },
    ],
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
