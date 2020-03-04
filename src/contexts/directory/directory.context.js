import {createContext} from "react";
import DIRECTORY_DATA from "./directory.data";

// We create a new context that holds the DIRECTORY_DATA
// which will be the initial value of our context
const DirectoryContext = createContext(DIRECTORY_DATA);

export default DirectoryContext;
