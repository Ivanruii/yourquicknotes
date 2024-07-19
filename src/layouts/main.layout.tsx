interface MainLayoutProps {
  actions: React.ReactNode;
  tabs: React.ReactNode;
  aside: React.ReactNode;
  content: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
  const { actions, tabs, aside, content } = props;
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="bg-gray-900 p-4">{actions}</div>
        <div className="p-4">{aside}</div>
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white p-4">{tabs}</div>
        <div className="flex-1 p-4">{content}</div>
      </main>
    </div>
  );
};
