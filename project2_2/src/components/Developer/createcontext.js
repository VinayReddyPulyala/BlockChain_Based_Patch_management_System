import { createContext } from "react";

const DeveloperContext = createContext({
    contract : {},
    account : ""
});
export default DeveloperContext;