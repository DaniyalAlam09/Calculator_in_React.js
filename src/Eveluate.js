export default function eveluate({
  previousOperend,
  currentOperend,
  operation,
}) {
  const previous = parseFloat(previousOperend);
  const current = parseFloat(currentOperend);
  if (isNaN(previous) || isNaN(current)) {
    return "";
  }
  let reslut = "";
  switch (operation) {
    case "+":
      reslut = previous + current;
      break;
    case "-":
      reslut = previous - current;
      break;
    case "/":
      reslut = previous / current;
      break;
    case "*":
      reslut = previous * current;
      break;
  }
  return reslut.toString();
}
