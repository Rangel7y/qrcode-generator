
/* GET ELEMENT ID QRCODE-FORM */
const qrcodeForm = document.getElementById('qrcode-form');
//

/* GET ELEMENT ID QRCODE-INPUT */
const qrcodeInput = document.getElementById('qrcode-input');
//

/* UNFINISHED */
const qrcodeButton = document.querySelector('#qrcode-form button');
//

/* GET ELEMENT IMG QRCODE-IMG */
const qrcodeImg = document.getElementById('qrcode-img');
//

/* FUNCTION TO TRY_CONNECTION API */
const checkQrCodeAPI = async(qrcodeID) =>{
    const APIResponse = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&format=png&data=${qrcodeID}`);

    if(APIResponse.status == 200){
        return APIResponse;
    }
}
//

/* FUNCTION TO GET RESULT FROM TRY_CONNECTION API */
const checkQrCodeID = async(qrcodeID) => {

    if(!qrcodeID) return;

    const data = await checkQrCodeAPI(qrcodeForm);

    console.log(data);

    if(!("erro" in data)){
        qrcodeButton.innerText = "Gerando QR Code...";

        qrcodeImg.src = data.url;

        qrcodeImg.addEventListener("load", () => {

            qrcodeButton.innerText = "QR Code gerado!";

            console.log("QR Code gerado!");
        });
    }
}
//


qrcodeForm.addEventListener('submit', async (event) =>{
    event.preventDefault();

    try {
        await checkQrCodeID(qrcodeInput.value)

        console.log("Gerando QR CODE...");
    } catch (error) {
        console.error("Erro ao tentar gerar QR CODE fornecido:", error.message);
    }
});

