var suffix = window.location.pathname.split("/")[1];
var redirectTo;

switch (suffix) {
    case "note":
        redirectTo = "http://zain.ovh/Note/note.html";
        break;
    case "quotes":
        redirectTo = "http://zain.ovh/Quotes/quote.html";
        break;
    case "resume":
    case "cv":
        redirectTo = "http://zain.ovh/Resume/resume.html";
        break;
    case "beautify":
        redirectTo = "http://zain.ovh/Beautifiers/beautify.html";
        break;
    default:
        redirectTo = "http://zain.ovh";
}

if (redirectTo !== "http://zain.ovh") {
    setTimeout(function () {
        window.location.href = redirectTo;
    }, 5);
} else {
    setTimeout(function () {
        window.location.href = redirectTo;
    }, 5000);
}