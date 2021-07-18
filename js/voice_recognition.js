// https://wicg.github.io/speech-api/
// https://www.google.com/intl/en/chrome/demos/speech.html

let recognition;
let markers_human_settlement_voice = [];
let markers_house_voice = [];
let markers_entrance_voice = [];

function voice_recognition() {
    recognition.start();
    // open_circles_preloader();
}

// Перевіряє чи браузер підтримує розпізнавання голосу
if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    // Відображає кнопку для ведення голосових команд
    document.getElementById("icon_voice_recognition").style.display = "inline";

    recognition = new webkitSpeechRecognition();

    const t_0 = performance.now();

    recognition.lang = "uk";
    // Означає, що коли користувач перестане говорити, розпізнавання мови закінчиться (Якщо встановлено значення false, користувальницький агент повинен повертати не більше одного остаточного результату)
    recognition.continuous = false;
    // Означає, чи повертаються проміжні результати (Якщо встановлено значення true, слід повертати проміжні результати)
    recognition.interimResults = false;

    // Виконується, коли служба розпізнавання почала прослуховувати аудіо з метою розпізнавання.
    recognition.onstart = (e) => {
        // console.log(`1 - recognition started (${performance.now() - t_0})`);
    };

    // Виконується, коли агент користувача починає захоплювати звук.
    recognition.onaudiostart = (e) => {
        // console.log(`2 - audiostart (${performance.now() - t_0})`);
    };

    // Виконується, коли виявлено якийсь звук, можливо, мова.
    recognition.onsoundstart = (e) => {
        // console.log(`3 - soundstart (${performance.now() - t_0})`);
    };

    // Виконується, коли розпочалася мова, яка буде використовуватися для розпізнавання мови.
    recognition.onspeechstart = (e) => {
        // console.log(`4 - speechstart (${performance.now() - t_0})`);
    };

    // Виконується коли служба розпізнавання мови повертає результат
    recognition.onresult = (e) => {
        // close_circles_preloader();

        const results = e.results;
        recognition.stop();
        //recognition.abort();

        const transcript = results[results.length - 1][0].transcript;

        // console.log(`5 - onresult:  (${performance.now() - t_0})`, transcript);
        determines_type_search_command(transcript, "voiсe");
    };

    // Виконується, коли мова, яка буде використана для розпізнавання мови, закінчиться.
    recognition.onspeechend = (e) => {
        // console.log(`6 - speechend (${performance.now() - t_0})`);
        // Метод зупинки представляє вказівку службі розпізнавання припинити прослуховування більше звуку та спробувати повернути результат, використовуючи лише той звук, який він вже отримав для цього розпізнавання.
        recognition.stop();
    };

    // Виконується, коли якийсь звук більше не виявляється
    recognition.onsoundend = (e) => {
        // console.log(`7 - soundend (${performance.now() - t_0})`);
    };

    // Виконується, коли агент користувача завершує зйомку звуку.
    recognition.onaudioend = (e) => {
        // console.log(`8 - audioend (${performance.now() - t_0})`);
    };

    // Виконується, коли послуга відключена. Подія завжди повинна генеруватися, коли сеанс закінчується незалежно від причини закінчення.
    recognition.onend = (e) => {
        // console.log(`9 - recognition stopped (${performance.now() - t_0})`);
    };

    // Виконується коли виникає помилка
    recognition.onerror = (e) => {
        switch (e.error) {
            case "not-allowed":
                open_dialog_error(`${error_text_43} (${e.error})`);
            case "network":
                open_dialog_error(`${error_text_44} (${e.error})`);
            case "no-speech":
                open_dialog_error(`${error_text_45} (${e.error})`);
            case "aborted":
                open_dialog_error(`${error_text_46} (${e.error})`);
            case "audio-capture":
                open_dialog_error(`${error_text_47} (${e.error})`);
            case "service-not-allowed":
                open_dialog_error(`${error_text_48} (${e.error})`);
            case "bad-grammar":
                open_dialog_error(`${error_text_49} (${e.error})`);
            case "language-not-supported":
                open_dialog_error(`${error_text_50} (${e.error})`);
            default:
                open_dialog_error(`${error_text_39} (${e.error})`);
        }
    };
} else {
    //open_dialog_error(error_text_51);
}

/* // Розпізнавання голосу
function voice_recognition() {
    if (!('webkitSpeechRecognition' in window)) {
        return open_dialog_error(error_text_51);
    };

    const recognition = new webkitSpeechRecognition();

    // setTimeout(() => recognition.stop(), 4000);

    recognition.lang = "uk";
    // Означає, що коли користувач перестане говорити, розпізнавання мови закінчиться
    recognition.continuous = false;
    recognition.interimResults = false;

    // Виконується коли мова перестає виявлятися
    recognition.onspeechend = function() {
        recognition.stop();
    };

    // Виконується коли служба розпізнавання мови повертає результат
    recognition.onresult = function (e) {
        const results = e.results;
        recognition.stop();

        const transcript = results[results.length - 1][0].transcript;
        voice_command_decoding(transcript);
    };

    // Виконується коли виникає помилка
    recognition.onerror = function (e) {
        switch (e.error) {
            case "not-allowed":
                open_dialog_error(`${error_text_43} (${e.error})`);
            case "network":
                open_dialog_error(`${error_text_44} (${e.error})`);
            case "no-speech":
                open_dialog_error(`${error_text_45} (${e.error})`);
            case "aborted":
                open_dialog_error(`${error_text_46} (${e.error})`);
            case "audio-capture":
                open_dialog_error(`${error_text_47} (${e.error})`);
            case "service-not-allowed":
                open_dialog_error(`${error_text_48} (${e.error})`);
            case "bad-grammar":
                open_dialog_error(`${error_text_49} (${e.error})`);
            case "language-not-supported":
                open_dialog_error(`${error_text_50} (${e.error})`);
            default:
                open_dialog_error(`${error_text_39} (${e.error})`);
        };
    };

    recognition.start();
} */