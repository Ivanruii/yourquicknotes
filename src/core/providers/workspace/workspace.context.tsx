import { createContext } from "react";

import { WorkspaceContextModel } from "./workspace.model";

export const WorkspaceContext = createContext<WorkspaceContextModel | null>(
  null
);
