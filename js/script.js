
/* GET ELEMENT ID QRCODE-FORM */
const qrcodeForm = document.getElementById('qrcode-form');
//

/* GET ELEMENT ID QRCODE-INPUT */
const qrcodeInput = document.getElementById('qrcode-input');
//

/* UNFINISHED */
const qrcodeButton = document.querySelector('#qrcode-form button');
//

/* GET ELEMENT QRCODE-IMG-CONTENT */
const qrcodeImgCtn = document.getElementById('qrcode-img-ctn');
//

/* GET ELEMENT QRCODE-IMG */
const qrcodeImg = document.getElementById('qrcode-img');
//

/* FUNCTION TO TRY_CONNECTION API */
const checkQrCodeAPI = async(qrcodeID) =>{
    const APIResponse = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrcodeID}`);

    if(APIResponse.status == 200){
        return APIResponse;
    }
}
//

/* FUNCTION TO GET RESULT FROM TRY_CONNECTION API */
const checkQrCodeID = async(qrcodeID) => {

    if(!qrcodeID) return;

    const data = await checkQrCodeAPI(qrcodeID);

    console.log(data);

    if(!("erro" in data)){
        qrcodeButton.innerText = "Gerando QR Code...";

        qrcodeImg.src = data.url;

        qrcodeImg.addEventListener("load", () => {

            qrcodeButton.innerText = "QR Code gerado!";

            qrcodeImgCtn.style = 'visibility: visible';

            console.log("QR Code gerado!");
        });
    }
}
//


qrcodeForm.addEventListener('submit', async (event) =>{
    event.preventDefault();

    try {
        await checkQrCodeID(qrcodeInput.value);
    } catch (error) {
        console.error("Erro ao tentar gerar QR CODE fornecido:", error.message);
    }
});

