const Employee = require("../lib/employee");
const Engineer = require("../lib/engineer");
const Intern = require("../lib/intern");
const Manager = require("../lib/manager");

// Test Employee class
describe("Employee", () => {
  it("is expected to show that the name of the employees show as expected", () => {
    const expected = "Dylan";
    const employee = new Employee("Dylan", 12345, "d@fake.com");
    expect(employee.getName()).toEqual(expected);
  });

  it("is expected to show that the name of the employees show as expected", () => {
    const expected = 12345;
    const employee = new Employee("Dylan", 12345, "d@fake.com");
    expect(employee.getId()).toEqual(expected);
  });

  it("is expected to show that the email of the employees show as expected", () => {
    const expected = "d@fake.com";
    const employee = new Employee("Dylan", 12345, "d@fake.com");
    expect(employee.getEmail()).toEqual(expected);
  });
});

// Test Engineer class
describe("Engineer", () => {
  it("is expected to show that the role of employees using the Engineer class shows as expected", () => {
    const expected = "Engineer";
    const employee = new Engineer(
      "Dylan",
      12345,
      "d@fake.com",
      "https://github.com/test"
    );
    expect(employee.getRole()).toEqual(expected);
  });

  it("is expected to show that the github of employees using the Engineer class shows as expected", () => {
    const expected = "https://github.com/test";
    const employee = new Engineer(
      "Dylan",
      12345,
      "d@fake.com",
      "https://github.com/test"
    );
    expect(employee.getGithub()).toEqual(expected);
  });
});

// Test Intern class
describe("Intern", () => {
  it("is expected to show that the role of employees using the Intern class shows as expected", () => {
    const expected = "Intern";
    const employee = new Intern("Dylan", 12345, "d@fake.com", "sample");
    expect(employee.getRole()).toEqual(expected);
  });

  it("is expected to show that the github of employees using the Engineer class shows as expected", () => {
    const expected = "sample";
    const employee = new Intern("Dylan", 12345, "d@fake.com", "sample");
    expect(employee.getSchool()).toEqual(expected);
  });
});

// Test Manager class
describe("Engineer", () => {
  it("is expected to show that the role of employees using the Engineer class shows as expected", () => {
    const expected = "Manager";
    const employee = new Manager("Dylan", 12345, "d@fake.com", "47");
    expect(employee.getRole()).toEqual(expected);
  });

  it("is expected to show that the github of employees using the Engineer class shows as expected", () => {
    const expected = "47";
    const employee = new Manager("Dylan", 12345, "d@fake.com", "47");
    expect(employee.getOfficeNum()).toEqual(expected);
  });
});
