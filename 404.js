var suffix = window.location.pathname.split("/")[1];
var redirectTo;

switch (suffix) {
    case "note":
        redirectTo = "https://zain.ovh/Note/note.html";
        break;
    case "snake":
        redirectTo = "https://zain.ovh/Snake/snake.html";
        break;
    case "resume":
    case "cv":
        redirectTo = "https://zain.ovh/Resume/resume.html";
        break;
    case "beautify":
        redirectTo = "https://zain.ovh/Beautifiers/beautify.html";
        break;
    case "home":
    case "nav":
        redirectTo = "https://zain.ovh:Navigation/navigation.html";
        break;
    default:
        redirectTo = "https://zain.ovh";
}

if (redirectTo !== "https://zain.ovh") {
    setTimeout(function () {
        window.location.href = redirectTo;
    }, 5);
} else {
    setTimeout(function () {
        window.location.href = redirectTo;
    }, 5000);
}