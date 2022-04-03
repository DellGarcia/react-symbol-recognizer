import { createContext, ReactNode, useEffect, useState } from "react";
import { uid } from "uid";
import { Save } from "../models/Save";

type SaveContextData = {
  saves: Array<Save>;
  createSave: (saveName: string, saveString: string) => void;
}

export const SaveContext = createContext({} as SaveContextData);

type SaveProvider = {
  children: ReactNode;
}

export function SaveProvider(props: SaveProvider) {
  const [saves, setSaves] = useState<Array<Save>>([]);

  function createSave(saveName: string, saveString: string) {
    setSaves([
      ...saves,
      {
        uid: uid(),
        name: saveName,
        saveString
      }
    ]);
    localStorage.setItem("saves", JSON.stringify(saves));
  }

  useEffect(() => {
    const storedSaves = localStorage.getItem("saves");
    if(!storedSaves) 
      return;

    const tempSaves = JSON.parse(storedSaves);
    setSaves([...tempSaves]);
  }, []);

  return (
    <SaveContext.Provider value={{ saves, createSave }}>
      {props.children}
    </SaveContext.Provider>
  );
}