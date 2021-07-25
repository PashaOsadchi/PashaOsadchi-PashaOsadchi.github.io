let video_surveillance_arr = [];
let video_surveillance_additional_markers_arr = [];
let info_window_video_surveillance = null;

let all_cameras_added = false;
let all_cameras_one_owner_added = false;
let cameras_added_additional_markers = false;

let added_cameras_arr = [];

let code_last_camera_owner = 0;

// Додає на карту камери відеоспостереження
function add_map_video_surveillance_all() {
    let map_offset_arr = [];

    added_cameras_arr = [];

    change_color_show_hide_button_bloсk("id_details_video_surveillance_cameras");

    delete_video_surveillance_markers();

    data_surveillance_cameras_arr.forEach((el) => {
        const place_installation_surveillance_camera_arr = data_place_installation_surveillance_camera_arr.filter((e) => e.id == el.place_installation_id);

        const owners_surveillance_cameras_arr = data_owners_surveillance_cameras_arr.filter((e) => e.id == el.owners_code);

        const message_text = `
<b>Детальна інформація про камеру відеоспостереження</b><br>
<b>Номер:</b> ${el.id}<br>
<b>Власник:</b> ${owners_surveillance_cameras_arr[0].owners_name}<br>
`;

        add_map_video_surveillance_one(
            place_installation_surveillance_camera_arr[0].latitude,
            place_installation_surveillance_camera_arr[0].longitude,
            el.latitude_point_course,
            el.longitude_point_course,
            `video_surveillance_${el.id}`,
            message_text,
            el.viewing_angle,
            el.radius
        );

        const obj = {};
        obj.latitude = place_installation_surveillance_camera_arr[0].latitude;
        obj.longitude = place_installation_surveillance_camera_arr[0].longitude;
        map_offset_arr.push(obj);
    });

    added_cameras_arr = map_offset_arr;

    // Після додавання камер відеоспостереження маштабує карту
    map_offset(map_offset_arr);
}

// Додає на карту камери відеоспостереження однієї організації
function add_map_video_surveillance(owners_id = 0) {
    added_cameras_arr = [];

    change_color_show_hide_button_bloсk("id_details_video_surveillance_cameras");

    delete_video_surveillance_markers();

    let map_offset_arr = [];
    let arr = [];

    if (owners_id == 0) {
        arr = data_surveillance_cameras_arr;
    } else {
        arr = data_surveillance_cameras_arr.filter((e) => e.owners_code == owners_id);
    }

    added_cameras_arr = arr;

    arr.forEach((el) => {
        const place_installation_surveillance_camera_arr = data_place_installation_surveillance_camera_arr.filter((e) => e.id == el.place_installation_id);

        const owners_surveillance_cameras_arr = data_owners_surveillance_cameras_arr.filter((e) => e.id == owners_id);

        const message_text = `
<b>Детальна інформація про камеру відеоспостереження</b><br>
<b>Номер:</b> ${el.id}<br>
<b>Власник:</b> ${owners_surveillance_cameras_arr[0].owners_name}<br>
`;

        add_map_video_surveillance_one(
            place_installation_surveillance_camera_arr[0].latitude,
            place_installation_surveillance_camera_arr[0].longitude,
            el.latitude_point_course,
            el.longitude_point_course,
            `video_surveillance_${el.id}`,
            message_text,
            el.viewing_angle,
            el.radius
        );

        const obj = {};
        obj.latitude = place_installation_surveillance_camera_arr[0].latitude;
        obj.longitude = place_installation_surveillance_camera_arr[0].longitude;
        map_offset_arr.push(obj);
    });

    added_cameras_arr = map_offset_arr;

    // Після додавання камер відеоспостереження маштабує карту
    map_offset(map_offset_arr);
}

// Додає на карту камеру відеоспостереження
function add_map_video_surveillance_one(lat_1, lon_1, lat_2, lon_2, name_polygon, message_text, viewing_angle, radius) {
    const centerPoint = new google.maps.LatLng(lat_1, lon_1);

    const course = calculate_course(lat_1, lon_1, lat_2, lon_2);

    viewing_angle = viewing_angle / 2;

    // Створює є полілінію у вигляді сектора
    const arcPts = generates_polyline(centerPoint, course - viewing_angle, course + viewing_angle, radius);

    arcPts.push(centerPoint);

    window[name_polygon] = new google.maps.Polygon({
        paths: [arcPts],
        strokeColor: "#00FF00",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map,
    });
    window[name_polygon].setMap(map);
    video_surveillance_arr.push(window[name_polygon]);

    const content_info_window_video_surveillance = `<div style="font-size: 15px">${message_text}</div>`;

    info_window_video_surveillance = new google.maps.InfoWindow();

    google.maps.event.addListener(window[name_polygon], "click", (e) => {
        // Закриває попереднє відкрите вікно при клікові у слідуючому об'єкті паркувального простору
        close_info_window(info_window_video_surveillance);

        info_window_video_surveillance.setPosition(e.latLng);
        info_window_video_surveillance.setContent(content_info_window_video_surveillance);
        info_window_video_surveillance.open(map);
    });

    // Закриває попереднє відкрите вікно при клікові на карті
    google.maps.event.addListener(map, "click", () => close_info_window(info_window_video_surveillance));
}

// Додатково додає маркер до точки дерозміщена камера відеоспостереження
function add_map_video_surveillance_additional_markers() {
    if (cameras_added_additional_markers) {
        return delete_video_surveillance_additional_markers();
    }

    if (added_cameras_arr.length) {
        added_cameras_arr.forEach((el) => {

            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(el.latitude, el.longitude),
                icon: 'icon/blue-dot.png',
                map: map,
            });

            video_surveillance_additional_markers_arr.push(marker);
        });

        cameras_added_additional_markers = true;
    } else {
        change_color_show_hide_button_id("id_button_add_map_video_surveillance_additional_markers");
        open_dialog_error(error_text_52);
    }
}
