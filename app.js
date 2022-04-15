// 1. 요소 불러오기 (캔버스, 버튼, 색상들)
// 2. 만약 마우스가 캔버스 안에 있다면 3번의 이벤트 발생시켜 주기
// 3. 캔버스 안에서 마우스 이벤트 찾기 (Mousemove, mouseup, mousedown, mouseleave)
// 4. 캔버스에서 마우스가 움직일 때 실질적으로 캔버스 안에서 움직이는 마우스의 위치 찾아 주기 (offsetX, offsetY)
// 5. 캔버스를 클릭하는 순간을 인지하고, 그 순간에 Painting 시작 (mousedown)
// 5-1. 캔버스를 클릭하고 드래그하는 것을 이벤트로 구현하기 (painting이라는 새로운 변수 생성)
// 6. 그리고 그림을 그리는 선 (path)을 위한 2d 변수 생성 (ctx(=context) => 픽셀을 다루는 요소)
// 7. path를 포토샵 펜툴이라고 생각하지 말고 그냥 선을 긋는 용도라고 생각히기 (헷갈렸음..)
// * 일반 페인팅을 하지 않았을 때도 Path가 생성되고, 누른 순간 라인이 그어지게 생성

const canvas = document.getElementById('jsCanvas')
const ctx = canvas.getContext('2d') // 2d로 픽셀을 그리겠다는 선언

// The default value of a element 
canvas.width = document.getElementsByClassName('canvas')[0].offsetWidth;
canvas.height = document.getElementsByClassName('canvas')[0].offsetHeight;

ctx.strokeStyle = '#2c2c2c' // color
ctx.lineWidth = 2 // line width

let painting = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(e) { // 여기에서 모든 마우스의 움직임을 감지하고 선을 만들어야 함
  const x = e.offsetX;
  const y = e.offsetY;

  if (!painting) {
    ctx.beginPath(); // 페인팅을 하지 않았을 때도 path 생성 (경로 생성)
    ctx.moveTo(x, y) // offset의 x, y 좌표 감지 (선 시작 좌표 생성)
  } else { // 마우스를 클릭했을 때 (페인팅을 시작했을 때)
    ctx.lineTo(x, y) // beginPath랑 클릭했을 때의 지점(x, y)이랑 이어지게 (사실은 눈에 보이지 않지만) (선 끝 좌표)
    ctx.stroke() // fill이 아닌 이유는 일러를 조금이라도 해 봤으면 이해가 될 듯.. (선 그리기)
  }
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting); // 마우스를 누르면 페인팅 시작
  canvas.addEventListener('mouseup', stopPainting); // 마우스를 떼면 페인팅 중지
  canvas.addEventListener ('mouseleave', stopPainting) // 마우스가 캔버스를 벗어나면 페인팅 중지
}