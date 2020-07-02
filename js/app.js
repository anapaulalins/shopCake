// start nav
let navMenu = document.querySelector('.nav-bar-menu')
let navMenuUl = document.querySelector('.nav-bar-ul')
let btnClose = document.querySelector('.close')
let toggle = document.querySelector('.bars')
let cartInf = document.querySelector('.nav-info')
toggle.addEventListener('click', () => {
    navMenu.classList.toggle('active')
    navMenuUl.classList.toggle('active')
    btnClose.classList.toggle('active')
    toggle.classList.toggle('turnOff')
    cartInf.classList.toggle('active')
})
btnClose.addEventListener('click', () => {
    navMenu.classList.remove('active')
    navMenuUl.classList.remove('active')
    btnClose.classList.remove('active')
    toggle.classList.remove('turnOff')
    cartInf.classList.remove('active')
})
// end nav

// start show cart
cartInf.addEventListener('click', () => {
    const cart = document.querySelector('#cart')
    cart.classList.toggle('show-cart')
    console.log(cart)
})
// end show cart

// start filter search

let boxElement = document.querySelectorAll('.box-img')
const searchBar = document.querySelector('input').addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase()
    Array.from(boxElement).forEach((event) => {
        let title = event.lastElementChild.firstElementChild.textContent
        if (title.toLowerCase().indexOf(term) != -1) {
            event.style.display = 'block'
        } else {
            event.style.display = 'none'
        }
    })
})
// end filter search

// start filter elements

function filterSelection(valor) {
    for (let i = 0; i < boxElement.length; i++) {
        if (valor === 'all') {
            boxElement[i].style.display = 'block'
        } else if (boxElement[i].className.indexOf(valor) != -1) {
            boxElement[i].style.display = 'block'
            console.log(valor, boxElement[i])
        } else {
            boxElement[i].style.display = 'none'
        }
    }
}
// end filter elements

// start cart 
(function () {
    let cartBtn = document.querySelectorAll('.loja-cart')
    cartBtn.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            if (event.target.parentElement.classList.contains('loja-cart')) {
                let path = event.target.parentElement.previousElementSibling.src
                let part = path.indexOf('img') + 3
                let partPath = path.slice(part)

                const item = {}
                item.img = `imgLittle${partPath}`
                let name = event.target.parentElement.nextElementSibling.children[0].textContent// text item
                item.name = name
                let preco = event.target.parentElement.nextElementSibling.children[1].textContent // text preco
                let numberPreco = preco.slice(1)
                item.preco = numberPreco

                // console.log(name)
                // console.log(preco)
                // console.log(numberPreco)
                console.log(item)

                // add items to the cart
                const cartItem = document.createElement('div')
                cartItem.innerHTML = `
                <div class="cart-item">
                <img src="${item.img}" alt="">
                <div class="cart-text">
                    <p id="title-item-cart">${item.name}</p>
                    <span>$</span><span id="preco-item-cart">${item.preco}</span>
                </div>
                <a href="#header" id="remove-cart-item"><i class="fas fa-trash fa-lg"></i></a>
                </div>
                `

                const cart = document.querySelector('.container-cart')
                const total = document.querySelector('.cart-container-total')

                cart.appendChild(cartItem, total)
                alert(`Adicionar ${item.name} ao carrinho`)
                showTotal()
                // end items to the cart

            }
        })
    })

    // show totals
    function showTotal() {
        const total = []
        let items = document.querySelectorAll('#preco-item-cart')
        items.forEach((item) => {
            total.push(parseFloat(item.textContent))
        })
        let totalMoney = total.reduce((total, item) => {
            total += item
            return total
        }, 0)
        let ulTotal = totalMoney.toFixed(2)
        console.log(ulTotal)

        document.querySelector('#cart-total').textContent = ulTotal
        document.querySelector('.item-count').textContent = total.length
        document.querySelector('.item-total').textContent = ulTotal

        // start btn delete total
        let btnDelete = document.querySelector('#limpar-cart')
        btnDelete.addEventListener('click', () => {
            let item = document.querySelector('.cart-item')
            if (item.parentNode) {
                item.parentNode.removeChild(item)
            }
            showTotal()
        })
        // end btn delete total

        // start btn remove
        let btnRemoveItem = document.querySelectorAll('#remove-cart-item')
        for (let i = 0; i < btnRemoveItem.length; i++) {
            let btn = btnRemoveItem[i]
            btn.addEventListener('click', (event) => {
                let btnClick = event.target
                btnClick.parentElement.parentElement.remove()
                showTotal()
            })
        }
        // end btn remove

    }
    // end show totals
})()
// end cart


