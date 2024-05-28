//Import all modules required in this project
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

//Create an welcome function

const sleep = () => {
  return new Promise((res) => {
    setTimeout(res, 2000);
  });
};

async function welcome() {
  let rainbowTitle = chalkAnimation.rainbow(
    `Welcome to the Ramzan's "Library Management System`
  );
  await sleep();
  rainbowTitle.stop();
  console.log(chalk.green(`ℳ𝒶𝒹ℯ 𝒷𝓎 ℳ𝓊𝒽𝒶𝓂𝓂𝒶𝒹 ℛ𝒶𝓂𝓏𝒶𝓃 𝒜𝓀𝓇𝒶𝓂`));
}

await welcome();
//Declare types for Books

type Books = {
  id: number | string;
  title: string;
  author: string;
  isAvailable: boolean;
};

//create an empty array of books.

let books: Books[] = [];

//Create function to add books.

function addBook(
  id: number | string,
  title: string,
  author: string,
  isAvailable: boolean
) {
  if (books.some((book) => book.id.toString() === id.toString())) {
    console.log(
      chalk.red(
        `Book with Id ${id} is already exist. Please enter a another id.`
      )
    );
  }

  let newBook = { id: id.toString(), title, author, isAvailable };
  books.push(newBook);
  console.log(chalk.green(`Book having ${id} number is added successfully.`));
}

//Create function to edit books.

function editBook(
  id: number | string,
  title: string,
  author: string,
  isAvailable: boolean
) {
  let book = books.find((book) => book.id.toString() === id.toString());
  if (book) {
    (book.title = title),
      (book.author = author),
      (book.isAvailable = isAvailable),
      console.log(
        chalk.green(`Book having the Id number ${id} is edited successfully.`)
      );
  } else {
    console.log(chalk.red(`Book having the Id number ${id} is not found.`));
  }
}

//Create function to delete books.

function deleteBook(id: number | string) {
  books = books.filter((book) => book.id.toString() !== id.toString());
  console.log(
    chalk.green(`Book having the Id number ${id} is deleted successfully.`)
  );
}

//Create function to list all the available books.

function booksList() {
  console.table(books);
}

//Creating a validating function that make sure user enter a valid id either a number or a string.

function validate(value: string) {
  if (!isNaN(Number(value)) || typeof value === "string") {
    return true;
  }
  return chalk.red("Please enter a valid book ID (either a number or a text)");
}

//Crate a display menu function to interact with the user

async function displayMenu() {
  let userInputs = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do",
      choices: [
        "Add a new book",
        "Edit an existing book",
        "Delete an existing book",
        "See a list of all available books",
        "Exit",
      ],
    },
  ]);

  //Create an switch cases to act as per user inputs

  switch (userInputs.action) {
    case "Add a new book":
      let addAnswer = await inquirer.prompt([
        {
          type: "input",
          name: "id",
          message: chalk.yellow("Add a book Id."),
          validate: validate,
        },
        {
          type: "input",
          name: "title",
          message: chalk.yellow("Add a book Title."),
        },
        {
          type: "input",
          name: "author",
          message: chalk.yellow("Add a book Author name."),
        },
        {
          type: "confirm",
          name: "isAvailable",
          message: chalk.yellow("Is the book is available?"),
        },
      ]);
      addBook(
        addAnswer.id,
        addAnswer.title,
        addAnswer.author,
        addAnswer.isAvailable
      );
      break;

    case "Edit an existing book":
      let editAnswer = await inquirer.prompt([
        {
          type: "input",
          name: "id",
          message: chalk.yellow("Add a book Id you want to edit."),
          validate: validate,
        },
        {
          type: "input",
          name: "title",
          message: chalk.yellow("Add a new book Title."),
        },
        {
          type: "input",
          name: "author",
          message: chalk.yellow("Add a new book Author name."),
        },
        {
          type: "confirm",
          name: "isAvailable",
          message: chalk.yellow("Is the book is available."),
        },
      ]);
      editBook(
        editAnswer.id,
        editAnswer.title,
        editAnswer.author,
        editAnswer.isAvailable
      );
      break;

    case "Delete an existing book":
      let deleteAnswer = await inquirer.prompt([
        {
          type: "input",
          name: "id",
          message: chalk.yellow("Add a book Id you want to delete."),
          validate: validate,
        },
      ]);
      deleteBook(deleteAnswer.id);
      break;

    case "See a list of all available books":
      booksList();
      break;

    case "Exit":
      console.log(chalk.yellow("Exiting..."));
      return;
  }
}

//Add some example book to see the program is working or not
function initialBook() {
  let initialBook = [
    {
      id: 1,
      title: "Harry Porter",
      author: "ABC",
      isAvailable: true,
    },
    {
      id: 2,
      title: "Zavia 02",
      author: "Ashfaq Ahmed",
      isAvailable: true,
    },
    {
      id: 3,
      title: "Zavia 03",
      author: "Ashfaq Ahmed",
      isAvailable: true,
    },
  ];
  for (let i = 0; i < initialBook.length; i++) {
    books.push(initialBook[i]);
  }
}
initialBook();
console.table(books);
displayMenu();
