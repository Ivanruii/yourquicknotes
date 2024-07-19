import { MainLayout } from "@/layouts/main.layout";
import { Actions } from "@/pods/actions/actions.component";
import { Aside } from "@/pods/aside/aside.component";
import { Content } from "@/pods/content/content.container";
import { Tabs } from "@/pods/tabs/tabs.component";

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
