import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      const input = await this.getInput();
      const result = this.calculateSum(input);
      this.printResult(result);
    }
    catch (error) {
      Console.print(error.message);
    }
  }

  async getInput() {
    return new Promise((resolve) => {
      Console.readLineAsync("덧셈할 문자열을 입력해 주세요: ", (input) => { resolve(input); });
    });
  }

  calculateSum(input) {
    if (!input) {
      return 0;
    }

    const delimiters = /[,:]/;
    const numbers = input.split(delimiters).map(Number);

    if (numbers.some((num) => num < 0)) {
      throw new Error("[ERROR] 음수는 허용되지 않습니다.");
    }

    return numbers.reduce((sum, num) => sum + num, 0);
  }

  printResult(result) {
    Console.print(`결과 : ${result}`);
  }
}

export default App;