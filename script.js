// 각 클래스들 지정
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
const number = document.querySelectorAll('.number');
const operatorBt = document.querySelectorAll('.operator')
const clear = document.querySelector('.c');
const dot = document.querySelector('.dot');
const equ = document.querySelector('.equ');
const state = document.querySelector('.state');
const turn = document.querySelector('#±');
const per = document.querySelector('#per');



// 피연산자와 연산자를 저장할 변수 선언
let firstOperand = null;
let secondOperand = null;
let operator = '';
let ResetDisplay = false;
let savedOp = '';
let stateNO = false;

// 계산해주는 함수 만들기 (표현식)
let cal = function(num1, num2, oper) {
  // parseFloat를 사용한 이유: 문자열을 숫자로 변경해주기 위함
  const a = parseFloat(num1);
  const b = parseFloat(num2);
  
  // 입력된 오퍼레이터 버튼이 무엇인지에 따라 스위치로 동작
  switch (oper) {
    // 더하기
    case '+':
      return a + b;
      // 빼기
      case '-':
        return a - b;
        // 곱하기
        case '*':
          return a * b;
          // 나누기
          case '/':
            // 0으로 나누려하면 오류
            if (b === 0) return '오류';
            return a / b;
            //이외의 기호는 무시
            default:
              ResetDisplay = true;
              return 'ERROR';
            }
          }
          
          // 화면이 켜지면 display에 0 넣기
          window.addEventListener('load', function() {
            display.textContent = '0';
          })
          
          // button에 대하여 순회
          buttons.forEach(function(button) {
            // click 이벤트가 발생 시
            button.addEventListener('click', function() {
              // 콘솔에 입력된 버튼의 value를 표시
              console.log(button.value);
            });
          });
          
          // number에 대하여 순회
          number.forEach(function(num){
            // click이벤트가 발생할 시
            num.addEventListener('click', function() {
              // ResetDisplay 상태에 따라 새로 쓸지 결정 추가
              if (ResetDisplay) {
                display.textContent = num.value;
                ResetDisplay = false;
                // 2. 빈 문자열이거나 0이면
              } else if (display.textContent === '' || display.textContent === '0'){
                // 입력한 숫자가 표시
                display.textContent = num.value
              } else {
                // 아닐 경우 숫자뒤에 입력한 숫자를 붙임
                display.textContent += num.value
              }
              
              stateNO = true;
            })
          })
          
          // . 버튼이 click 되었을 때
          dot.addEventListener('click', function() {
            // 1. 빈 문자열이 아닐 때
            if (display.textContent !== ''){
              // 2. 문자열에 operatorBt의 밸류가 없을 때
              if (!display.textContent.includes(operatorBt.value)){
                // 3. 앞서 .이 나오지 않았을 때
                if (!display.textContent.includes(dot.value)) {
                  // 조건을 만족하면 .을 추가
                  display.textContent += dot.value;
                }
              }
            }
          });
          
          // clear 전부 지우기고 '0' 남기기
          clear.addEventListener('click', function() {
            display.textContent = '0';
            state.textContent = ''
            firstOperand = null;
            secondOperand = null;
            operator = '';
            savedOp = '';
            ResetDisplay = false;
            stateNO = false;
          })
          
          // 오퍼레이터버튼 순회
          operatorBt.forEach(function(opr) {
            // 클릭 이벤트 발생 시
            opr.addEventListener('click' , function() {
              // firstOperand 가 null이라면
              // 연속해서 연산자를 눌렀을 때
              if (operator !== '') {
                // secondOperand에 display값을 저장
                secondOperand = display.textContent
                // 계산을 실행해서
                const result = cal(firstOperand, secondOperand, operator);
                // firstOperand에 값을 넣고
                firstOperand = result;
                // 새로 누른 오퍼버튼으로 변경
                operator = opr.value;
                // 계산값을 표시함
                display.textContent = result;
                state.textContent = `${display.textContent} ${operator} `;
                // ResetDisplay 값을 true로 변경하여 다음 숫자 입력 시 새로 표시
                ResetDisplay = true
                //operator와 secondOperand를 비움
                operator = opr.value;
                secondOperand = null;
              } else if (firstOperand === null) {
                // display에 입력되어있는 값을 firstOperand에 저장
                firstOperand = display.textContent;
                // operator에도 입력된 오퍼버튼의 밸류를 저장
                operator = opr.value;
                state.textContent = `${display.textContent} ${operator} `;
                ResetDisplay = true;
              }
              stateNO = false;
              // 콘솔에 저장된 두 값을 띄워서 확인
              console.log(`FO: ${firstOperand},OP: ${operator} `)
            })
          })
          
          // = 클릭 시 계산 실행
          equ.addEventListener('click', function() {
            // 함수 실행 조건: operator 가 비어있지 않아야하며
            if (operator !== '') {
              // firstOperand와 secondOperand가 비어있지 않아야 함( !== null)
              secondOperand = display.textContent
              if (firstOperand !== null && stateNO){
                // 만들어둔 cal()함수의 결과를 result 변수에 할당
                const result = cal(firstOperand, secondOperand, operator)
                // 이후 firstOperand를 비우기
                firstOperand = null;
                // 마지막으로 사용한 연산부호 저장
                savedOp = operator
                // operator는 비움
                operator = '';
                // 계산 결과result를 display에 출력
                display.textContent = result;
                // 리셋여부 상태를 불리언을 이용하여 결정
                ResetDisplay = true;
                state.textContent += `${secondOperand} = ${display.textContent}`;
                
                // firstOperand만 입력하고 실행시
              } else if (firstOperand !== null){
                // 첫번째 입력한 수와 동일한 수를 두번째에도 대입함
                secondOperand = firstOperand
                // 이후 동일하게 계산
                const result = cal(firstOperand, secondOperand, operator)
                firstOperand = null;
                savedOp = operator
                operator = '';
                display.textContent = result;
                ResetDisplay = true;
              }
              // 연속으로 =를 눌렀을 때
            } else if (operator === '') {
              // 현재의 값을 firstOperand에 저장
              firstOperand = display.textContent
              // 마지막으로 사용한 연산부호 savedOp를 불러와서 사용
              const result = cal(firstOperand, secondOperand, savedOp)
              // 계산결과 출력
              display.textContent = result;
              // firstOperand 비우기
              state.textContent = `${firstOperand} ${savedOp} ${secondOperand} = ${display.textContent}`;
              firstOperand = null;
            }
            
          })

          turn.addEventListener('click', function(){
            const dNum = parseFloat(display.textContent)
            display.textContent = dNum * -1;
          })

          per.addEventListener('click', function() {
            const dNum = parseFloat(display.textContent)
            display.textContent = firstOperand / 100 * dNum;
          })
          //...