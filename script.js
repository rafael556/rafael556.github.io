const body = document.querySelector('body')
const config = document.querySelector('.config')

const modalBg = document.querySelector('.modal-bg')
const modalCapa = document.querySelector('.modal-bg-capa')
const modal = document.querySelector('.modal')
const darkSwitch = document.querySelector('#dark-mode-switch')
const bcImage = document.querySelector('#bc-image')
const b1 = document.getElementById('modal-b1')
const b2 = document.getElementById('modal-b2')

const form = document.querySelector('.formulario')
const formBt = document.querySelector('.aditivo img')

const listaToDo = document.querySelectorAll('.listas div')

const doneP = document.querySelector('.done p')
const footer = document.querySelector('.footer')
const footerBt = document.querySelectorAll('.fBotao, .fecha')
const footerBtCookie = document.querySelector('.cookie')

let cookiePermissao = false
let toDoCount = 0
let doingCount = 0
let doneCount = 0

//fechamento do footer
footerBt.forEach(botao => {
  botao.addEventListener('click', () => {
    console.log('d')
    footer.classList.add('footer-close')
  })
})

//botao para permissao dos cookies
footerBtCookie.addEventListener('click', () => {
  console.log('permissao')
  cookiePermissao = true
  footer.classList.add('footer-close')
})

//trigger do modal para sua abertura
config.addEventListener('click', () => {
  console.log('f')

  modalBg.classList.add('bg-active')
  modalCapa.classList.add('bg-active')
})

//trigger para desativar o modal
modalCapa.addEventListener('click', () => {
  console.log('a')
  modalCapa.classList.remove('bg-active')
  modalBg.classList.remove('bg-active')
})

//limpa form do modal
b1.addEventListener('click', () => {
  bcImage.value = ''
  bcImage.focus()
})

//aplica plano de fundo segundo url
b2.addEventListener('click', () => {
  let url = bcImage.value
  if (url == '') {
    url = 'none'
  }
  if (cookiePermissao) {
    criaCookie('bc-Image', url)
  } else {
    body.style.backgroundImage = `url('${url}')`
  }
})

//Controle do Dark Mode-------------------------------------------------
darkSwitch.addEventListener('click', () => {
  if (cookiePermissao) {
    criaCookie('dark-mode', darkSwitch.checked)
    console.log('dark permissao')
  } else {
    if (darkSwitch.checked == true) {
      console.log('check')
      darkModeOn()
    } else {
      darkModeOff()
      console.log('unchecked')
    }
  }
})

function darkModeOn() {
  body.classList.add('bg-dark')
  form.classList.add('dark-placeholder')
  form.classList.add('form-dark')
  formBt.setAttribute('src', 'assets/maizinho-dark.svg')
  listaToDo.forEach(e => e.classList.add('listas-dark'))
  modal.classList.add('bg-dark-modal')
  bcImage.classList.add('bg-dark')
}

function darkModeOff() {
  body.classList.remove('bg-dark')
  form.classList.remove('dark-placeholder')
  form.classList.remove('form-dark')
  formBt.setAttribute('src', 'assets/maizinho.svg')
  listaToDo.forEach(e => e.classList.remove('listas-dark'))
  modal.classList.remove('bg-dark-modal')
  bcImage.classList.remove('bg-dark')
}

//bloco das listas--------------------------------------------------------
formBt.addEventListener('click', e => {
  e.preventDefault()
  if (cookiePermissao) {
    // console.log('hoe')
    criaCookie(`toDo${toDoCount}`, form.value)
  } else {
    // console.log('ehh')
    ftoDo(form.value)
  }
})

//magia negra não mexa
function ftoDo(valorP) {
  const ul = document.querySelector('.to-do ul')
  const li = document.createElement('li')
  const p = document.createElement('p')
  const seta = document.createElement('img')
  const remove = document.createElement('img')
  const valor = valorP
  ++toDoCount

  ul.appendChild(li)
  li.append(p, seta, remove)
  p.innerHTML = valor
  seta.setAttribute('src', '/assets/Seta.svg')
  remove.setAttribute('src', '/assets/menozinho.svg')
  seta.classList.add('seta')
  remove.classList.add('remove')
  form.value = ''
  //   console.log('dddddddddddd')

  seta.addEventListener('click', () => {
    --toDoCount
    li.remove()
    setinha(valor)
  })
  remove.addEventListener('click', () => {
    --toDoCount
    li.remove()
    console.log('b')
  })
}

//magia negra não mexa
function setinha(valorP) {
  const ul = document.querySelector('.doing ul')
  const li = document.createElement('li')
  const p = document.createElement('p')
  const certinho = document.createElement('img')
  const remove = document.createElement('img')
  const valor = valorP

  ul.appendChild(li)
  li.append(p, certinho, remove)
  p.innerHTML = valor
  certinho.setAttribute('src', '/assets/certinho.svg')
  remove.setAttribute('src', '/assets/menozinho.svg')
  certinho.classList.add('certinho')
  remove.classList.add('remove')

  certinho.addEventListener('click', () => {
    li.remove()
    certo(valor)
    console.log('a')
  })
  remove.addEventListener('click', () => {
    li.remove()
    console.log('b')
  })
}

//magia negra não mexa
function certo(valorP) {
  const ul = document.querySelector('.done ul')
  const li = document.createElement('li')
  const p = document.createElement('p')
  const restart = document.createElement('img')
  const remove = document.createElement('img')
  const valor = valorP

  //bloco de criação de elementos
  ul.appendChild(li)
  li.append(p, restart, remove)
  p.innerHTML = valor
  restart.setAttribute('src', '/assets/restart.svg')
  remove.setAttribute('src', '/assets/menozinho.svg')
  restart.classList.add('restart')
  remove.classList.add('remove')

  restart.addEventListener('click', () => {
    //apaga o elemento na caixa atual e manda ela de volta para a primeira
    li.remove()
    ftoDo(valor)
    console.log('a')
  })
  remove.addEventListener('click', () => {
    li.remove()
    console.log('b')
  })
}

//Cookies ====================================================================
function criaCookie(cname, cvalue) {
  // FUNÇÃO DE DATA DE EXPIRAÇÃO
  let data = new Date()
  let segundos = 60
  data.setTime(data.getTime() + segundos * 1000)
  document.cookie = `${cname} = ${cvalue}; expires = ${data.toUTCString()}`
  console.log('ff')
  console.log(document.cookie)

  refresh()
}

function refresh() {
  // MANIPULA OS COOKIES E ACHA O {bc-Image}
  let bcImage
  try {
    bcImage = document.cookie //Recebe os Cookies
      .split('; ') //Separa eles por ;
      .find(item => item.startsWith('bc-Image=')) //Filtra o valor da key "bc-Image"
      .split('=')[1] //Separa pelo = e assume a posição [1]
  } catch {}

  //   console.log(bcImage)
  if (bcImage) {
    body.style.backgroundImage = `url('${bcImage}')`
  } else {
    // console.log('vazio')
  }

  let darkMode
  try {
    darkMode = document.cookie //Recebe os Cookies
      .split('; ') //Separa eles por ;
      .find(item => item.startsWith('dark-mode=')) //Filtra o valor da key "bc-Image"
      .split('=')[1] //Separa pelo = e assume a posição [1]
  } catch {}

  if (darkMode == 'true') {
    console.log('entra')
    darkSwitch.checked = true
    darkModeOn()
  } else if (darkMode == 'false') {
    console.log('sai')
    darkModeOff()
  } else {
    console.log('vazio')
  }

  //inserir no to-do
  let toDo
  let toDoList = new Array()
  let toDoExclude = new Array()
  let nome = 'toDo'
  try {
    toDo = document.cookie //Recebe os Cookies
      .split('; ') //Separa eles por ;
      .filter(e => e.startsWith('toDo'))
    for (let s of toDo) {
      if (s.substring(0, 4) == nome) {
        toDoList.push(s.substring(6, s.length)) //certo
      }
    } //coloca os elementos da lista no Array
  } catch {}

  console.log(toDo)
  if (toDo) {
    console.log(toDoList)

    console.log('ggggggggggg')
    if (toDoCount == 0) {
      //importante

      for (let s of toDoList) {
        ftoDo(s) //importante
        console.log('fffffffff')
      }
    } else {
      console.log('dark indevido')
      console.log(toDoList[toDoCount])
      if (toDoList[toDoCount] != undefined) {
        ftoDo(toDoList[toDoCount]) //importante
      }
    }
  } else {
    console.log('vazio')
  }

  //inserir no doing
  let doing
  try {
    doing = document.cookie //Recebe os Cookies
      .split('; ') //Separa eles por ;
      .find(item => item.startsWith('doing=')) //Filtra o valor da key "bc-Image"
      .split('=')[1] //Separa pelo = e assume a posição [1]
  } catch {}

  //   console.log(doing)
  if (doing) {
  } else {
    // console.log('vazio')
  }

  //inserir no done
  let done
  try {
    done = document.cookie //Recebe os Cookies
      .split('; ') //Separa eles por ;
      .find(item => item.startsWith('done=')) //Filtra o valor da key "bc-Image"
      .split('=')[1] //Separa pelo = e assume a posição [1]
  } catch {}

  //   console.log(done)
  if (done) {
  } else {
    // console.log('vazio')
  }
}

window.onload = refresh
