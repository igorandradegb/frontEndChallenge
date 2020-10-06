function goToEmail () {
    let email = document.getElementById('email-friend').value
    let name = document.getElementById('name-friend').value
    if (email && email !== '' && validateEmail(email) && name && name !== '' > 2 && name.length > 2) {
        window.open('template-email.html?name='+name+'&email='+ email, '_self')
    } else {
        $('#error').html('Por favor, digite as informações válidas.').show(500)
        setTimeout(function () {
            $('#error').hide(500)
        }, 5000)
    }
}
function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function getOffers(link) {
    if (link === '') {
        link = 'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1'
    }
    $.ajax({
        type: "GET",
        url: link,
        dataType:'json',
        success: function (data) {
            let productsHtml = ''
            for (let i = 0; i < data.products.length; i++) {
                let html = '     <div class="col-sm-3 product d-none d-sm-block">\n' +
                    '                <img src="'+data.products[i].image+'" style="border: 1px solid #707070;">\n' +
                    '                <p class="name">'+data.products[i].name+'</p>\n' +
                    '                <p class="desc">'+data.products[i].description+'</p>\n' +
                    '                <p class="de">'+'De: R$'+data.products[i].oldPrice.toFixed(2).replace('.', ',')+'</p>\n' +
                    '                <p class="por">'+'Por: R$'+data.products[i].price.toFixed(2).replace('.', ',')+'</p>\n' +
                    '                <p class="ou">'+'Ou '+data.products[i].installments.count + 'x de R$'+data.products[i].installments.value.toFixed(2).replace('.', ',')+'</p>\n' +
                    '                <input class="button-comprar" type="submit" value="Comprar">\n' +
                    '            </div>'+
                    '     <div class="col-12 product d-sm-none">' +
                    '          <div class="row" style="padding: 0; margin: 0;">'+
                    '                <div class="col-5" style="margin: 0; padding: 0;"><img src="'+data.products[i].image+'" style="border: 1px solid #707070;width: 120px;"></div>' +
                    '                <div class="col-6"><p class="name">'+data.products[i].name+'</p>\n' +
                    '                <p class="de">'+'De: R$'+data.products[i].oldPrice.toFixed(2).replace('.', ',')+'</p>\n' +
                    '                <p class="por">'+'Por: R$'+data.products[i].price.toFixed(2).replace('.', ',')+'</p>\n' +
                    '                <p class="ou">'+'Ou '+data.products[i].installments.count + 'x de R$'+data.products[i].installments.value.toFixed(2).replace('.', ',')+'</p>\n' +
                    '                <input class="button-comprar" type="submit" value="Comprar"></div>\n' +
                    '          </div>'+
                    '     </div>'
                productsHtml += html
            }
            productsHtml += '<div class="col-12 center">\n' +
                '<input class="button-more-offers" type="submit" onclick="getOffers(\'https://'+data.nextPage+'\')"  value="Ainda mais produtos aqui!">\n' +
                '        </div>'
            let element = document.getElementById('offers');
            element.innerHTML = productsHtml
        }
    });
}

function getSpecialOffers() {
    let name = window.location.search.substring(1)
    if (name.length > 0) {
        name = unescape(name.split('=')[1].replace('&email', ''))
        if (!name && !name.length === 0) {
            name = 'Fulano'
        }
    }
    let link = 'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1'
    $.ajax({
        type: "GET",
        url: link,
        dataType:'json',
        success: function (data) {
            let productsHtml = '<h4>Olá, '+name+'</h4>\n' +
                '        <p>Fizemos uma lista especial de produtos apenas para você. Isso mesmo: nesta lista temos só produtos que você pode gostar. Seu amigo Ciclano lhe recomendou essa lista especial. Olha só:</p>' +
                '<div class="col-sm-6 product">\n' +
                '                <img src="'+data.products[0].image+'" style="border: 1px solid #707070;">\n' +
                '                <p class="name">'+data.products[0].name+'</p>\n' +
                '                <p class="desc">'+data.products[0].description+'</p>\n' +
                '                <p class="de">'+'De: R$'+data.products[0].oldPrice.toFixed(2).replace('.', ',')+'</p>\n' +
                '                <p class="por">'+'Por: R$'+data.products[0].price.toFixed(2).replace('.', ',')+'</p>\n' +
                '                <p class="ou">'+'Ou '+data.products[0].installments.count + 'x de R$'+data.products[0].installments.value.toFixed(2).replace('.', ',')+'</p>\n' +
                '                <input class="button-comprar" type="submit" value="Comprar">\n' +
                '            </div>'+
                '     <div class="col-sm-6 product">\n' +
                '                <img src="'+data.products[1].image+'" style="border: 1px solid #707070;">\n' +
                '                <p class="name">'+data.products[1].name+'</p>\n' +
                '                <p class="desc">'+data.products[1].description+'</p>\n' +
                '                <p class="de">'+'De: R$'+data.products[1].oldPrice.toFixed(2).replace('.', ',')+'</p>\n' +
                '                <p class="por">'+'Por: R$'+data.products[1].price.toFixed(2).replace('.', ',')+'</p>\n' +
                '                <p class="ou">'+'Ou '+data.products[1].installments.count + 'x de R$'+data.products[1].installments.value.toFixed(2).replace('.', ',')+'</p>\n' +
                '                <input class="button-comprar" type="submit" value="Comprar">\n' +
                '            </div>';
            let element = document.getElementById('special');
            element.innerHTML = productsHtml
        }
    });
}