import { createContext } from "react";
const AdminContext = createContext({
    contract : {},
    account : ""
});
export default AdminContext;