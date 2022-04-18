const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let api = 'http://localhost:3000/student'

function render() {
    async function getData() {
        const res = await fetch(api)
        const data = await res.json()
        var table = $('table')
        table.innerHTML = 
        `<tr>
        <th>STT</th>
        <th>Mã SV</th>
        <th>Họ và tên</th>
        <th>Lớp</th>
        <th></th>
        </tr>`;
        data.forEach(function (value, index) {
            table.innerHTML += `<tr>
                <td class="stt">${index + 1}</td>
                <td class="id">${value.id}</td>
                <td class="name">${value.name}</td>
                <td class="className">${value.class}</td>
                <td><button class="del">Xoá</button>
                <button class="edit">Edit</button>
                </td>
                </tr>`

            delStudent()  
            editStudent()
                
        })
    }
    getData()
}
render()

function delStudent() {

    const delBtn = document.querySelectorAll('.del')
    delBtn.forEach(function(btn) {
        btn.onclick = function () {
            var delID = btn.parentElement.parentElement.getElementsByClassName('id')[0].innerHTML;
            delData(api+`/${delID}`)
            .then(function() {
                btn.parentElement.parentElement.remove()
            })
        }
    })
}
   
function editStudent() {
    var editBtn = $$('.edit')
    editBtn.forEach(function(btn) {
        btn.onclick = function () {
            // btn.parentElement.parentElement.remove()
            var rowAll = $$('tr')
            rowAll.forEach(row => {
                row.style.backgroundColor = 'white';
            })
            
            var row = btn.parentElement.parentElement
            row.style.backgroundColor = '#c9c9c9';
            addBtn.style.backgroundColor = '#c9c9c9';
            addBtn.innerHTML = 'update'
            student.focus()
            if (addBtn.innerHTML == 'update') {
                update()
            }
            var editID = btn.parentElement.parentElement.getElementsByClassName('id')[0].innerHTML;

            var editName= btn.parentElement.parentElement.getElementsByClassName('name')[0].innerHTML;
            var editClass= btn.parentElement.parentElement.getElementsByClassName('className')[0].innerHTML;
            student.value = editName;
            className.value = editClass
            
            // var updateBtn = $$('.update')
            function update() {

                    addBtn.onclick = function () {
                        // btn.parentElement.parentElement.remove()
                        var editID = btn.parentElement.parentElement.getElementsByClassName('id')[0].innerHTML;
                        var edit = {
                            name: student.value,
                            class: className.value
                        }
                        editData(api+`/${editID}`, edit)
                        .then(function() {
                            render()
                            student.value = '';
                            className.value = '';
                            addBtn.innerHTML = 'Thêm'
                            addBtn.style.backgroundColor = 'white'
                            checkBtn()
                        })
                        // .then(function(data) {
                        //     console.log(data)
                        // })
                    }  

             
            }
        }  
    })
}

async function postData(api, data) {
        var options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const res = await fetch(api, options)
        // const data2 = await res.json()
        // console.log(data)
}

let student = $('.student');
let className = $('.className')

var addBtn = $('.add')
function checkBtn() {
    if(addBtn.innerHTML == 'Thêm') {

        addBtn.onclick = function() {
            var a = {
                name: student.value,
                class: className.value
            }
            postData(api, a)
            .then(function() {
        
                render()
            })
        }
    }
}
checkBtn()


async function delData(apiDel) {
    var options = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    }

    const res = await fetch(apiDel, options)
    // const data2 = await res.json()
    // console.log(data)
}


async function editData(apiEdit, data5) {
    var options = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data5)

    }

    const res = await fetch(apiEdit, options)
    const data3 = await res.json()
}
