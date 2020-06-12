import React, { Dispatch } from "react";

export const UserContext = React.createContext<{
  user: any;
  setUser: Dispatch<any>;
} | null>(null);
