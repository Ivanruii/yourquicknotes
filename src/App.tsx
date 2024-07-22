import { MainScene } from "@/scenes/main.scene";
import { WorkspaceProvider } from "./core/providers/workspace/workspace.provider";

export default function App() {
  return (
    <WorkspaceProvider>
      <MainScene />
    </WorkspaceProvider>
  );
}
