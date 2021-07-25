// Формує список кнопок які додають камерам відеоспостереження
function generates_list_surveillance_cameras() {
    let report_str = `
    <summary class="summary_title_name">Камери відеоспостереження</summary>

    <button class="button_sidebar_add_map" id="id_button_add_map_video_surveillance_additional_markers"
                onclick="add_map_video_surveillance_additional_markers()">Відобразити маркери</button>

    <button class="button_sidebar_add_map" id="id_button_add_map_video_surveillance_cameras_all"
                onclick="add_map_video_surveillance_all()">Всі (${data_surveillance_cameras_arr.length} шт.)</button>
    `;

    let sort_arr = [];

    data_owners_surveillance_cameras_arr.forEach((el) => {
        const arr = data_surveillance_cameras_arr.filter((e) => e.owners_code == el.id);

        let obj = {};
        obj.id = el.id;
        obj.owners_name_for_button = el.owners_name_for_button;
        obj.amount = arr.length;

        sort_arr.push(obj);
    });

    sort_arr.sort((a, b) => b.amount - a.amount);

    sort_arr.forEach((el) => {
        const arr = data_surveillance_cameras_arr.filter((e) => e.owners_code == el.id);

        report_str += `<button class="button_sidebar_add_map" id="id_button_add_map_video_surveillance_cameras_owners_all_${el.id}"
        onclick="add_map_video_surveillance(${el.id})">${el.owners_name_for_button} (${arr.length} шт.)</button>
        `;
    });

    document.getElementById(`id_details_video_surveillance_cameras`).innerHTML = report_str;
}
