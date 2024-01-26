let mainThread = document.getElementById('main_thread_name').value;

let selectedMain = document.getElementById(`check_${mainThread}`);
selectedMain.checked = true;

let subThreadIndex = document.getElementById('sub_thread_index').value;

let selectedSub = document.getElementById(`check_${subThreadIndex}`);
selectedSub.checked = true;

let subThreadRadio = document.getElementsByClassName('check_sub_thread');
for (let i = 0; i < subThreadRadio.length; ++i) {
    (function (n) {
        subThreadRadio[i].addEventListener("change", { thread: subThreadRadio[i], index: i, handleEvent: radioChanged });
    }(i));
}

let header = document.getElementById('header_content')
let subIndex = document.getElementById('sub_thread_index')

function radioChanged() {
    header.innerHTML = this.thread.value;
    subIndex.value = this.index;
}