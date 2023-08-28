// e se a tela de escolha de media fosse estilizada como uma tela de cinema ?
// Talvez na V2

// Vars
let selected_list = { }
const contact = {
    'github': 'https://github.com/caio-rds',
    'linkedin': 'https://www.linkedin.com/in/caio-reis-04224a20a/'
}

$(document).ready(function(){
    refreshChoices();
});

// call the function to choice a media when the button is clicked
$(document).on('click','#result-list',function(){
    choiceMedia()
});

// a media is chosen randomly from the list
function choiceMedia() {
    console.log(selected_list, Object.keys(selected_list).length)
    if (Object.keys(selected_list).length === 0) {
        Swal.fire({
            title: 'Error',
            text: 'Escolhidos está sem itens',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return
    } else if (Object.keys(selected_list).length === 1) {
        Swal.fire({
            title: 'Error',
            text: 'Escolhidos só tem um item',
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
        showCancelButton: true,
        cancelButtonText: 'Escolher outra',
        icon: 'success',
        confirmButtonText: 'Ok',
        showDenyButton: true,
        denyButtonText: 'Remover das escolhas'
    }).then((result) => {
        if (result.isConfirmed) {
            return
        } else if (result.isDenied) {
            RemoveMedia(sorted_list[index_random])
        } else {
            choiceMedia()
        }
    })
};

// call the function to add a new media when the button is clicked
$(document).on('click','#add-media', function(){ newMedia() });

// add a new media to the list
async function newMedia() {    
    const { value: media } = await Swal.fire(
        {
            title: 'Insira o nome da media',
            input: 'text',            
            inputPlaceholder: 'Filme, série ou anime',
            inputValidator: (value) => {
                if (!value) {
                    return 'Você precisa inserir um nome'
                } else if (Object.values(selected_list).includes(value)) {
                    return 'Você já adicionou esse item'
                }
            } 
        }
    )
        
    if (media) {
        var formated_media = media.replaceAll(' ','_').replaceAll('.','_').toLowerCase()
        selected_list[formated_media] = media
        refreshChoices()
    }
};

$(document).on('click','.btn-rem', function(){    
    RemoveMedia($(this).attr('data'))
});

// remove a media from the list
function RemoveMedia(media) {
    $('.selected-list').html('')
    delete selected_list[media]        
    refreshChoices()
};

// list will be cleared and will be empty
$(document).on('click','#clear-list', function(){
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Não',
        confirmButtonText: 'Sim, limpe a lista'
    }).then((result) => {
        if (result.isConfirmed) {
            selected_list = {}
            refreshChoices()
        }
    })
});

// refresh the list of selected media, if the list is empty, show a message
function refreshChoices(){
    $('.selected-list').html('');    
    if (Object.keys(selected_list).length === 0) { 
        $('.selected-list').html(`<div class="empty-list">Você não adicionou nenhum item ainda, clique no botão "Adicionar" para adicionar um item</div>`)           
        return 
    }
    $.each(selected_list, function(index, value){
        $('.selected-list').append(`
            <div class="element">
                <div class="btn-rem" data=${index}>
                    <i class="fas fa-times"></i>
                </div>
                ${value}
            </div>
        `)
    });
};

// open the contact discord modal and copy username to clipboard
$(document).on('click','#my-discord', function(){
    navigator.clipboard.writeText('caiords')
    Swal.fire('Username copiado para a área de transferência, agora é só colar no discord')
});

// open a link in new tab, if link is not in var, then do nothing
function openLink(page) {
    if (page in contact) {      
        let newtab = window.open(contact[page], '_blank')
        newtab.focus()        
    }
    return
};

