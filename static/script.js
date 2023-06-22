
const medias = ['Mr Robot', 'Cidade de Deus', 'Toc Toc']

let organized_list = { }
let selected_list = { }
let avaliable_list = { }

$(document).ready(function(){

    medias.map((media) => {
        var nombre = media.replaceAll(' ','_').replaceAll('.','_').toLowerCase()
        organized_list[nombre] = media
    });
    refreshAvaliable()
});


$(document).on('click','.btn-add', function(){    
    AddMedia($(this).attr('data'))
});

$(document).on('click','.btn-rem', function(){
    console.log('other here')
    RemoveMedia($(this).attr('data'))
});


function AddMedia(media) {
    if (selected_list[media]){ return null }
    selected_list[media] = organized_list[media]
    $('.selected-list').append(`
        <div class="element-selected">
            <div class="btn-rem" data=${media}>
                <i class="fas fa-times"></i>
            </div>
            ${organized_list[media]}
        </div>
    `)
}


function RemoveMedia(media) {
    $('.selected-list').html('')
    delete selected_list[media]        
    refreshChoices()
}

function refreshChoices(){
    $('.selected-list').html('');    
    if (Object.keys(selected_list).length === 0) { return }
    $.each(selected_list, function(index, value){
        $('.selected-list').append(`
            <div class="element-selected">
                <div class="btn-rem" data=${index}>
                    <i class="fas fa-times"></i>
                </div>
                ${value}
            </div>
        `)
    });
}

$(document).on('click','.result',function(){
    console.log(selected_list, Object.keys(selected_list).length)
    if (Object.keys(selected_list).length === 0) {
        Swal.fire({
            title: 'Error',
            text: 'Escolhidos está sem itens',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return
    }
    let sorted_list = []
    $.each(selected_list, function(index){        
        sorted_list.push(index)
    })

    var index_random = Math.floor(Math.random() * sorted_list.length);

    console.log(selected_list[sorted_list[index_random]])
    Swal.fire({
        title: selected_list[sorted_list[index_random]],
        text: 'Media Escolhida',
        icon: 'success',
        confirmButtonText: 'Ok'
    })
});

function refreshAvaliable() {
    $.each(organized_list, function(index, value){
        $('.show-list').append(`
            <div class="element">
                <div class="btn-add" data=${index}>
                    <i class="fas fa-plus"></i>
                </div>
                ${value}
            </div>
        `)
    });
}

$(document).on('click','.add-media', function(){
    let media = prompt('Insira o nome da media', 'Filme, série ou anime.')
    var formated_media = media.replaceAll(' ','_').replaceAll('.','_').toLowerCase()
    selected_list[formated_media] = media
    refreshChoices()
    return
})