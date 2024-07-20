import { MainLayout } from "@/layouts/main.layout";
import { Actions, Aside, Content, Tabs } from "@/pods";

export const MainScene = () => {
  return (
    <MainLayout
      actions={<Actions />}
      aside={<Aside />}
      tabs={<Tabs />}
      content={<Content />}
    />
  );
};
