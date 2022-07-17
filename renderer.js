const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${api.chrome()}), Node.js (v${api.node()}), and Electron (v${api.electron()})`


console.log(window.api)

const func = async () => {
    window.api.receive("fromMain", (data) => {
        console.log(`Received ${data.data} from main process`);
    });
    window.api.send("toMain", "some data");
}



const btnPing = document.getElementById("btn-ping")
btnPing.addEventListener("click", () => {
    func().then(() => {
        document.getElementById('ping-res').innerText("Done")
    }).catch(() => console.log("error"))
})