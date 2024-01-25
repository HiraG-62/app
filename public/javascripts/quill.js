const toolbarOptions = [
    ['bold', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block', 'link'],

    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }, { 'font': [] }],          // dropdown with defaults from theme
];
const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Enterで改行しCtrl + Enterで投稿します。',
    modules: {
        toolbar: toolbarOptions,
    }
});

function submit() {
    document.getElementById('contents').value = quill.root.innerHTML;
    document.forms.post.submit();
}

function clickSubmit() {
    let content = document.querySelectorAll('div.ql-editor > p');
    for (c of content) {
        if (c.innerText.match(/\S/g)) {
            submit();
            return;
        }
    }

}