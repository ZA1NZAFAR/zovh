window.onload = function () {

    let codeInput = document.querySelector('#code-input');

    let editor = CodeMirror.fromTextArea(codeInput, {
        theme: 'monokai', lineNumbers: true, indentUnit: 4, tabSize: 4
    });

    let runButton = document.querySelector('#formatCode');

    runButton.addEventListener('click', function () {
        let indentedCode = js_beautify(editor.getValue(), {
            indent_size: 4, indent_char: ' ', end_with_newline: true
        });
        editor.setValue(indentedCode.toString());
        editor.refresh();
    });


    let enableLinesButton = document.querySelector('#enableLines');

    enableLinesButton.addEventListener('click', function () {
        let lineNumbers = editor.getOption('lineNumbers');
        editor.setOption('lineNumbers', !lineNumbers);
    });
};

