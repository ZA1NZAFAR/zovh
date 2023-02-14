window.onload = function () {

    let codeInput = document.querySelector('#code-input');

    let editor = CodeMirror.fromTextArea(codeInput, {
        theme: 'monokai', lineNumbers: true, indentUnit: 4, tabSize: 4
    });

    let runButton = document.querySelector('#formatCode');

    runButton.addEventListener('click', function () {
        const radioButtonsDiv = document.getElementById("radioButtons");
        let selectedValue;
        const radioButtons = radioButtonsDiv.querySelectorAll("input[type=radio]");
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                selectedValue = radioButtons[i].value;
                break;
            }
        }

        switch (selectedValue) {
            case "xml":
                editor.setValue(vkbeautify.xml(editor.getValue()).toString());
                break;
            case "json":
                editor.setValue(vkbeautify.json(editor.getValue()).toString());
                break;
            case "css":
                editor.setValue(vkbeautify.css(editor.getValue()).toString());
                break;
            case "sql":
                editor.setValue(vkbeautify.sql(editor.getValue()).toString());
                break;
        }
        editor.refresh()

    });


    let enableLinesButton = document.querySelector('#enableLines');

    enableLinesButton.addEventListener('click', function () {
        let lineNumbers = editor.getOption('lineNumbers');
        editor.setOption('lineNumbers', !lineNumbers);
    });
};

