import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/common/components/ui/resizable";

interface MainLayoutProps {
  actions: React.ReactNode;
  tabs: React.ReactNode;
  aside: React.ReactNode;
  content: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
  const { actions, tabs, aside, content } = props;
  return (
    <ResizablePanelGroup direction="horizontal" className="flex min-h-screen">
      <ResizablePanel
        maxSize={50}
        minSize={15}
        defaultSize={15}
        className="text-white bg-[#21252B]"
      >
        <div className="mt-14 bg-[#282C34]">{actions}</div>
        <div className="p-4">{aside}</div>
      </ResizablePanel>
      <ResizableHandle className="bg-[#282C34]" />
      <ResizablePanel className="flex flex-col flex-1">
        <div className="p-4 text-white bg-[#21252B]">{tabs}</div>
        <div className="flex-1 p-4 bg-[#282C34]">{content}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
