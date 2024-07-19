import { MainScene } from "@/scenes/main.scene";
import { NotesProvider } from "./core/providers/notes/notes.provider";

export default function App() {
  return (
    <NotesProvider>
      <MainScene />
    </NotesProvider>
  );
}
