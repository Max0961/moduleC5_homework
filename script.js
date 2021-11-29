document.querySelector('#btn').addEventListener('click', submit);
let data = JSON.parse(localStorage.getItem('data'));

if (data) {
  createImgElements(data);
}

async function submit() {  
  let pageNumber = document.querySelector('#page-number').value;
  let limit = document.querySelector('#limit').value;
  console.log(pageNumber);
  
  document.querySelectorAll('span').forEach(span => {
    span.style.display = 'none';
  });
  
  if (isValidRange(pageNumber) && isValidRange(limit)) {
    pageNumber = Number(pageNumber);
    limit = Number(limit);
  } else if (!isValidRange(pageNumber) && isValidRange(limit)) {
    document.querySelector('#span-1').style.display = 'block';
  } else if (isValidRange(pageNumber) && !isValidRange(limit)) {
    document.querySelector('#span-2').style.display = 'block';
  } else {
    document.querySelector('#span-3').style.display = 'block';
  }
  
  data = await load(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`);
  localStorage.setItem('data', JSON.stringify(data));
  
  createImgElements(data, limit);
}

function createImgElements(data) {
  for (i = 0; i < data.length; i++) {
    document.body.innerHTML += `<img src=${data[i]['download_url']} width=500>`;
  }
}

function load(url) {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch(() => { 
      console.log('Fail')
    });
}

function isValidRange(input) {
  return Number(input) >= 1 && Number(input) <= 10;
}