// App.js
import { Console } from "@woowacourse/mission-utils";
import { StrSumFunc } from "./StrSumFunc";

class App {
  async run() {
    try {
      const input = await this.getInput();
      const result = StrSumFunc(input);
      this.printResult(result);
    } catch (error) {
      this.printError(error.message);
    }
  }

  async getInput() {
    return new Promise((resolve) => {
      Console.readLineAsync("덧셈할 문자열을 입력해 주세요: ", resolve);
    });
  }

  printResult(result) {
    Console.print(`결과: ${result}`);
  }

  printError(message) {
    Console.print(`오류: ${message}`);
  }
}

export default App;