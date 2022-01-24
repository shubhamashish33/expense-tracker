import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Outfit", sans-serif;
  align-items: center;
  margin: 10px;
  width: 100%;
  @media screen and (max-width: 478px) {
    margin: 0px;
    align-items: center;
  }
`;
const ExpenseContainer = styled.div`
  width: 100%;
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
  @media screen and (max-width: 478px) {
    width: 90%;
    align-items: center;
  }
`;
const ExpenseBox = styled.div`
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  padding: 15px 20px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 135px;
  & span {
    color: ${(props) => (props.isIncome ? "green" : "red")};
    font-weight: bold;
    font-size: 20px;
  }
  @media screen and (max-width: 478px) {
  }
`;
const Box = styled.div`
  background: #fdbb9b;
  color: #333;
  padding: 20px 15px;
  border-radius: 10px;
  font-size: 20px;
  width: 100%;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 478px) {
    margin-left: 10px;
    margin-right: 10px;
    width: 80%;
  }
`;

const AddTransaction = styled.div`
  background-color: #8bc6ec;
  background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
  color: white;
  text-align: center;
  padding: 15px 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  @media print{
    display: none !important;
  }
`;
const AddTransactionContainer = styled.div`
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  border: 1px solid #e6e8e9;
  gap: 10px;
  padding: 15px 10px;
  width: 100%;
  margin: 20px;
  & input {
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
    @media screen and (max-width: 478px) {
      align-items: center;
      max-width: 80%;
      margin: auto;
    }
  }
  @media screen and (max-width: 478px) {
    align-items: center;
    max-width: 80%;
  }
`;
const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin: 10px 0;
  & input {
    width: unset;
    margin: 0 10px;
`;

const AddTransactionView = (props) => {
  const [amount, setAmount] = useState();
  const [desc, setDesc] = useState();
  const [type, setType] = useState("EXPENSE");

  const addTransaction = () => {
    props.addTransaction({
      amount: Number(amount),
      desc,
      type,
      id: Date.now(),
    });
    props.toggleAddTxn();
  };

  return (
    <AddTransactionContainer>
      <input
        placeholder="Amount"
        value={amount}
        type="number"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <RadioBox>
        <input
          type="radio"
          id="expense"
          name="type"
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="expense"> Expense </label>
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          checked={type === "INCOME"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="income"> Income </label>
      </RadioBox>
      <AddTransaction onClick={addTransaction}>Add Transaction</AddTransaction>
    </AddTransactionContainer>
  );
};
const OverviewComponents = (props) => {
  const [isAddTxnVisible, toggleAddTxn] = useState(false);
  const printpdf = () => {
    window.print();
  };
  return (
    <Container>
      <Box>
        Balance: ₹{props.income - props.expense}
        <AddTransaction onClick={() => toggleAddTxn(!isAddTxnVisible)}>
          {isAddTxnVisible ? "Cancel" : "+"}
        </AddTransaction>
      </Box>
      {isAddTxnVisible && (
        <AddTransactionView
          toggleAddTxn={toggleAddTxn}
          addTransaction={props.addTransaction}
        />
      )}
      <ExpenseContainer>
        <ExpenseBox isIncome={false}>
          Expense <span>₹{props.expense}</span>
        </ExpenseBox>

        <ExpenseBox isIncome={true}>
          Income <span>₹{props.income}</span>
        </ExpenseBox>
      </ExpenseContainer>
      <AddTransaction onClick={printpdf}>Export as PDF</AddTransaction>
    </Container>
  );
};

export default OverviewComponents;
