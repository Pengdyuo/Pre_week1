// App.js
import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      const input = await this.getInput();
      const result = this.calculateSum(input);
      this.printResult(result);
    } catch (error) {
      Console.print(error.message);
    }
  }

  async getInput() {
    // 비동기 입력 최적화: 즉시 실행 가능한 Promise로 입력 처리 단순화
    return new Promise((resolve) => {
      Console.readLineAsync("덧셈할 문자열을 입력해 주세요: ", (input) => {
        resolve(input);
      });
    });
  }

  calculateSum(input) {
    // 빈 문자열 처리 기능
    if (!input || input.trim() === "") {
      return 0;
    }

    let delimiters = /[,:]/;
    let numbersString = input;

    // 커스텀 구분자 처리
    if (input.startsWith("//")) {
      const customDelimiterMatch = input.match(/^\/\/(.)\n(.*)/);
      if (customDelimiterMatch) {
        delimiters = new RegExp(`[${customDelimiterMatch[1]}]`);
        numbersString = customDelimiterMatch[2];
      }
    }

    // 숫자 추출 및 유효성 검사
    const numbers = numbersString.split(delimiters).map((num) => {
      if (isNaN(num)) {
        throw new Error("[ERROR] 입력값에 숫자가 아닌 잘못된 값이 포함되어 있습니다.");
      }
      return Number(num);
    });

    // 음수 입력에 대한 에러 처리
    if (numbers.some((num) => num < 0)) {
      throw new Error("[ERROR] 음수는 허용되지 않습니다.");
    }

    // 숫자 합산 기능
    return numbers.reduce((sum, num) => sum + num, 0);
  }

  printResult(result) {
    // 비동기 출력 최적화: 출력 중에 지연을 줄이기 위해 간단하게 출력 처리
    Console.print(`결과 : ${result}`);
  }
}

export default App;
