import enquirer from "enquirer";

const { AutoComplete } = enquirer;

(async () => {
  const prompt = new AutoComplete({
    name: "flavor",
    message: "Pick your favorite flavor",
    limit: 10,
    initial: 2,
    choices: [
      "Almond",
      "Apple",
      "Banana",
      "Blackberry",
      "Blueberry",
      "Cherry",
      "Chocolate",
      "Cinnamon",
      "Coconut",
      "Cranberry",
      "Grapefruit",
      "Nougat",
      "Orange",
      "Pear",
      "Pineapple",
      "Raspberry",
      "Strawberry",
      "Vanilla",
      "Watermelon",
      "Winter",
    ],
  });

  const response = await prompt.run();
  console.log("Selected flavor:", response);
})();
