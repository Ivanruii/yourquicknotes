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
        className="text-white bg-[#181c21]"
      >
        <div className="p-4 bg-[#22232c]">{actions}</div>
        <div className="p-4">{aside}</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="flex flex-col flex-1">
        <div className="p-4 text-white bg-[#22232c]">{tabs}</div>
        <div className="flex-1 p-4 bg-[#22232c]">{content}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
