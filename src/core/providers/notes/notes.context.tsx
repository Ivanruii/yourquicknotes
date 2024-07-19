import { createContext } from "react";
import { NotesContextModel } from "./notes.model";

export const NotesContext = createContext<NotesContextModel | null>(null);
