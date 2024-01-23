let subIndex = 0;

let mainThread = document.getElementById('main_thread_name').innerHTML;

let selectedMain = document.getElementById(`check_${mainThread}`);
selectedMain.checked = true;

let subThreadIndex = document.getElementById('sub_thread_id').innerHTML;

let selectedSub = document.getElementById(`check_${subThreadIndex}`);
selectedSub.checked = true;

let subThreadRadio = document.getElementsByClassName('check_sub_thread');
for (let i = 0; i < subThreadRadio.length; ++i) {
    (function (n) {
        subThreadRadio[i].addEventListener("change", { thread: subThreadRadio[i], index: i, handleEvent: radioChanged });
    }(i));
}

let header = document.getElementById('header_content')


function radioChanged() {
    subIndex = this.index;
    header.innerHTML = this.thread.value;
}