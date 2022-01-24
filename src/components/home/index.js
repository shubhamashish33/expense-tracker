import styled from "styled-components";
import React, { useEffect, useState } from "react";
import OverviewComponents from "./OverviewComponents";
import TransactionComponents from "./TransactionComponents";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Outfit", sans-serif;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 10px;
  width: 360px;
`;
const Homecomponent = (props) => {
  const [transactions, updateTransactions] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  const addTransaction = (payload) => {
    const transactionArray = [...transactions];
    transactionArray.push(payload);
    updateTransactions(transactionArray);
  };
  const calculateBalance = () => {
    let exp = 0;
    let inc = 0;
    transactions.map((payload) =>
      payload.type === "EXPENSE"
        ? (exp = exp + payload.amount)
        : (inc = inc + payload.amount)
    );
    updateExpense(exp);
    updateIncome(inc);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => calculateBalance(), [transactions]);

  return (
    <Container>
      <OverviewComponents
        addTransaction={addTransaction}
        expense={expense}
        income={income}
      />
      <TransactionComponents transactions={transactions} />
    </Container>
  );
};

export default Homecomponent;
