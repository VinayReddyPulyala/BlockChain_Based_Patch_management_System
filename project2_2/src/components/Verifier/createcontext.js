import { createContext } from "react";

const VerifierContext = createContext({
    contract : {},
    account : ""
});
export default VerifierContext;