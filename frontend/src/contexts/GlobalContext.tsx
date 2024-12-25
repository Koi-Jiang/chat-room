import { FC, PropsWithChildren, createContext, useState } from "react";

export interface GlobalContextArgs {
  userName: string;
}

export const GlobalContext = createContext<GlobalContextArgs| null>(null);

const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userName, setUserName] = useState<string>("");

  return (
    <GlobalContext.Provider value={{ userName }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

