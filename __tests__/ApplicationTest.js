// App.js
import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      const input = await this.getInput();
      const result = this.calculateSum(input);
      this.printResult(result);
    } catch (error) {
      this.printError(error.message);
    }
  }

  async getInput() {
    // 비동기 입력 최적화: 입력 즉시 처리되도록 개선
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
    // 출력 최적화: 결과 출력 동작을 명확하게 정의하여 출력 타이밍 문제 해결
    Console.print(`결과 : ${result}`);
  }

  printError(message) {
    // 에러 메시지 출력 동작을 별도로 정의하여 코드 가독성 및 처리 명확화
    Console.print(message);
  }
}

export default App;
