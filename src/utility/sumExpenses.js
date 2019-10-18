const sumExpenses = expenses => {
  let sum = 0;

  for (let i = 0; i < expenses.length; i++) {
    sum += expenses[i].value;
  }

  return sum;
};

export default sumExpenses;
