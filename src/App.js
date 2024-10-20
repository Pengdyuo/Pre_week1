import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { Console } = require('@woowacourse/mission-utils');

class App {
  run() {
    return Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n')
      .then((input) => {
        const result = this.calculate(input);
        Console.print(`결과 : ${result}`);
      })
      .catch((error) => {
        Console.print(error.message);
        throw error; // 예외를 다시 던져 테스트에서 감지할 수 있도록 합니다.
      });
    // Console.close()를 제거했습니다.
  }

  calculate(input) {
    if (input === '' || input === null) return 0;

    const numbers = this.parseNumbers(input);
    this.validateNumbers(numbers);

    return numbers.reduce((sum, num) => sum + num, 0);
  }

  parseNumbers(input) {
    let delimiters = [',', ':'];
    let numbersString = input;

    const customDelimiterMatch = input.match(/^\/\/(.)\n(.*)/);
    if (customDelimiterMatch) {
      delimiters.push(customDelimiterMatch[1]);
      numbersString = customDelimiterMatch[2];
    }

    // 구분자를 정규식에서 안전하게 사용하도록 이스케이프 처리
    const escapedDelimiters = delimiters.map((d) => d.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const regex = new RegExp(escapedDelimiters.join('|'));

    return numbersString.split(regex).map((num) => parseInt(num, 10));
  }

  validateNumbers(numbers) {
    numbers.forEach((num) => {
      if (isNaN(num) || num < 0) {
        throw new Error('[ERROR] 올바른 양수를 입력해 주세요.');
      }
    });
  }
}

export default App;