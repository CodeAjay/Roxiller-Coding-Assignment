import { useState } from "react";
import CombinedData from "./CombinedData";
import TransactionsTable from "./TransactionTable";

const App = () => {
  const [data, setData] = useState("");

  const onDataChange = (newData: any) => {
    setData(newData);
  };
  return (
    <>
      <TransactionsTable onDataChange={onDataChange}  />
      <CombinedData data={data} />
    </>
  );
};

export default App;
