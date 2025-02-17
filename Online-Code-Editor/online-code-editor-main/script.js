function run() {
    let htmlcode = document.getElementById("html").value;
    let csscode  = document.getElementById("css").value;
    let jscode   = document.getElementById("javascript").value;
    let output   = document.getElementById("output").contentWindow.document;

    output.open();
    output.write(htmlcode + "<style>" + csscode + "</style>");
    output.close();

    output.open();
    output.write(htmlcode + "<style>" + csscode + "</style>");
    output.close();

    output.body.innerHTML = htmlcode;
    output.head.innerHTML = "<style>" + csscode + "</style>";

    try {
        output.defaultView.eval(jscode);
    } catch (e) {
        console.error(e);
    }
}
