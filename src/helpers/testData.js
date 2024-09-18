const firstListInitialItemsItems = [
  {
    id: "Home",
    isGroup: false,
    name: "Home",
    checked: false,
    isDisbale: false,
    date: "2024-10-09",
  },
  {
    id: "Collections",
    name: "Collections",
    color: "239, 108, 0",
    isGroup: true,
    children: [
      {
        id: "Spring",
        name: "Spring",
        checked: false,
        isDisbale: false,
        date: "2024-10-09",
      },
      {
        id: "Summer",
        name: "Summer",
        checked: false,
        isDisbale: false,
        date: "2024-10-09",
      },
      {
        id: "Fall",
        name: "Fall",
        checked: false,
        isDisbale: false,
        date: "2024-10-09",
      },
      {
        id: "Winter",
        name: "Winter",
        checked: false,
        isDisbale: false,
        date: "2024-10-09",
      },
    ],
  },
  {
    id: "About Us",
    isGroup: false,
    name: "About Us",
    checked: false,
    isDisbale: false,
    date: "2024-10-09",
  },
  {
    id: "My Account",
    name: "My Account",
    isGroup: true,
    color: "46, 125, 50",
    children: [
      {
        id: "Addresses",
        name: "Addresses",
        checked: false,
        isDisbale: false,
        date: "2024-10-09",
      },
      {
        id: "Order History",
        name: "Order History",
        checked: false,
        isDisbale: false,
        date: "2024-10-09",
      },
    ],
  },
];

const secondListInitialItems = [
  {
    id: "Pass tests",
    name: "Pass tests",
    color: "239, 108, 0",
    isGroup: true,
    children: [
      {
        id: "Math",
        name: "Math",
        checked: false,
        isDisbale: false,
        date: "2024-10-09",
      },
      {
        id: "Language",
        name: "Language",
        checked: false,
        isDisbale: false,
        date: "2024-10-09",
      },
      {
        id: "Exam",
        name: "Exam",
        checked: false,
        isDisbale: false,
        date: "2024-10-09",
      },
    ],
  },
  {
    id: "Check homework",
    isGroup: false,
    name: "Check homework",
    checked: false,
    isDisbale: false,
    date: "2024-10-09",
  },
  {
    id: "Clean house",
    isGroup: false,
    name: "Clean house",
    checked: false,
    isDisbale: false,
    date: "2024-10-09",
  },
  {
    id: "Visit doctor",
    isGroup: false,
    name: "Visit doctor",
    checked: false,
    isDisbale: false,
    date: "2024-10-09",
  },
  {
    id: "Dance",
    isGroup: false,
    name: "Dance",
    checked: false,
    isDisbale: false,
    date: "2024-10-09",
  },
  {
    id: "Help friend",
    isGroup: false,
    name: "Help friend",
    checked: false,
    isDisbale: false,
    date: "2024-10-09",
  },
];

export const defaultLists = [
  {
    id: 1,
    name: "Task list 1",
    taskList: firstListInitialItemsItems,
  },
  {
    id: 2,
    name: "Task list 2",
    taskList: secondListInitialItems,
  },
];
