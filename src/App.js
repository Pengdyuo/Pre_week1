import { Console } from "@woowacourse/mission-utils";
class App {
  async run() { }
  constructor() {
    this.seps = [',', ':'];
    this.result = 0;
    this.inputs = "";
    this.debugFlag = false;
    this.customeFlag = false;
    this.error = false;
  }

  async read() {
    this.inputs = await Console.readLineAsync("enter the string with seperators: ");
  }

  isCustomSep() {
    if (
      this.inputs.slice(0, 2) === "//" &&
      this.inputs.slice(3, 5) === "\\n") {
      //// TODO //X\n 명확한 순서로 입력받은 경우로 수정할 필요있음
      this.seps.push(this.inputs[2]);
      this.customeFlag = true;
    } else {
      this.customeFlag = false;
    }
  }

  async sol() {
    let val = "";
    let sum = 0;

    for (let i = this.customeFlag ? 5 : 0; i < this.inputs.length; i++) {
      //this.inputs[i]
      //   //^\n1^23^4,6_10
      if (!isNaN(Number(this.inputs[i]))) { /// 숫자인 경우
        val += this.inputs[i];
      } else { /// 구분자인 경우
        if (val === "") {
          this.error = true;
          return;
        }

        if (this.seps.includes(this.inputs[i])) {
          sum += Number(val);
          val = "";
        } else {
          this.error = true;
          return;
        }
      }
    }

    sum += Number(val);

    await Console.print("결과 : " + sum);
  }

  errorHandling() {
    throw Error("[ERROR]");
  }

  debug(inputString, testCount) {
    Console.print("-------------------------------");

    Console.print(`${testCount + 1}번째 테스트 케이스 : ${inputString}`);

    let val = "";
    let sum = 0;

    this.error = false;
    this.inputs = inputString;
    this.customeFlag = false;
    this.seps = ['.', ','];

    this.isCustomSep();

    if (this.customeFlag) Console.print('custom flag on');
    else Console.print('custome flag off');


    for (let i = this.customeFlag ? 5 : 0; i < inputString.length; i++) {
      //this.inputs[i]
      //   //^\n1^23^4,6_10
      if (!isNaN(Number(inputString[i]))) { /// 숫자인 경우
        // Console.print(i + "번째 시행");
        // Console.print(i + "번째 값 : " + inputString[i]);
        val += inputString[i];
      } else { /// 구분자인 경우
        if (val === "") {
          this.error = true;
          break;
        }

        if (this.seps.includes(inputString[i])) {
          sum += Number(val);
          val = "";
        } else {
          this.error = true;
          break;
        }
      }
      // Console.print("tmp 값 : " + val);
      // Console.print(sum);
    }

    sum += Number(val);
    if (this.error) {
      Console.print(`[Error]발생`);
    } else {
      Console.print(`${testCount + 1}번째 테스트 케이스 결과 : ${sum}`);
    }


    Console.print("-------------------------------");
  }

  async run() {
    this.debugFlag = false;

    const testInput =
      ["//^\\n1^23^4,6,10", "1,2,3,4,5", "//^\\n-1^3,1,2",
        "//&\\n11&2&3,5,7", "1/2/3/4/5", "//(\\n1(2(3(4",
        "//-\\n1-2-34", ""
      ];

    if (this.debugFlag) {
      testInput.forEach((e, i) => {
        this.debug(e, i);
      });
    } else {
      await this.read();
      this.isCustomSep();
      this.sol();

      if (this.error) throw Error("[ERROR] : 잘 못된 문자열을 입력받았습니다");
    }
  }
}