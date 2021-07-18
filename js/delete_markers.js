// https://developers.google.com/maps/documentation/javascript/markers#remove

// Видаляє усі накладення на карті
function delete_all_overlay_maps() {
    delete_markers();
    delete_markers_organization();
    delete_markers_route();
    delete_route();
    delete_voice_search_address_markers();
    delete_alternative_energy_facilities_markers();
    delete_bicycle_parking_markers();
    delete_billboards_markers();
    delete_bulletin_boards_markers();
    delete_city_lights_markers();
    delete_equipped_recreation_areas_markers();
    delete_public_transport_stops_markers();
    delete_recreation_areas_markers();
    delete_route_public_transport_markers();
    delete_parking_space_markers();
    delete_video_surveillance_markers();
    delete_traffic_flows_markers();
    delete_polyline_traffic_flow();
    delete_bicycle_service_center_markers();

    delete_heatmap_house_multifamily();
    delete_heatmap_house_private();
    delete_archival_photos_markers();

    close_info_window(info_window_video_surveillance);
    close_info_window(info_window_parking_space);
    close_info_window(info_window_recreation_areas);

    // Видаляє межі усіх населених пунктів
    polyline_community_boundary_or_added = false;
    delete_markers_1(polyline_arr);

    

    // Змінює колір кнопок
    const elements = document.querySelectorAll(".button_sidebar_add_map");
    elements.forEach((el) => (el.style.backgroundColor = "rgba(102, 255, 0, 0.6)"));
}

// Видаляє маркери адрес із карти
function delete_markers() {
    delete_markers_2(markers);

    arr_house_radius_current_coordinates = [];
    arr_house_radius_selected_coordinates = [];

    marker_current_coordinates_arr.forEach((el) => el.setMap(null));
    marker_current_coordinates_arr = [];
}

// Видаляє маркери організацій із карти
function delete_markers_organization() {
    delete_markers_2(markers_organization);
}

// Видаляє маркери маршрутних точок із карти
function delete_markers_route() {
    delete_markers_2(markers_route);
}

// Видаляє маршрут із карти
function delete_route() {
    //directionsDisplay.setDirections({routes: []});
    directionsDisplay.setMap(null);

    // Якщо потрібно видалити маршрут повністю
    //waypoints_arr = [];
    //waypoints_full_arr = [];

    delete_markers_route();
    markers_route = [];
}

// Очищає список із маршрутними точками
function delete_list_waypoints() {
    document.getElementById("id_list_waypoints").innerHTML = "";
    delete_route();
    waypoints_arr = [];
    waypoints_full_arr = [];
}

// Видаляє маркери адрес знайдені за допомогою голосового пошуку
function delete_voice_search_address_markers() {
    // Видаляє попередній маркер центра населеного пункту
    delete_markers_2(markers_human_settlement_voice);

    // Видаляє попередній маркер будинків
    delete_markers_2(markers_house_voice);

    // Видаляє попередній маркер підїздів
    delete_markers_2(markers_entrance_voice);
}

// Видаляє маркери адрес об'єктів альтернативної енергетики
function delete_alternative_energy_facilities_markers() {
    alternative_energy_facilities_or_added = false;
    delete_markers_2(markers_alternative_energy_facilities);
}

// Видаляє маркери велопарковок
function delete_bicycle_parking_markers() {
    bicycle_parking_or_added = false;
    delete_markers_2(markers_bicycle_parking);
}

// Видаляє маркери білбордів
function delete_billboards_markers() {
    billboards_or_added = false;
    delete_markers_2(markers_billboards);
}

// Видаляє маркери дошок оголошень
function delete_bulletin_boards_markers() {
    bulletin_boards_or_added = false;
    delete_markers_2(markers_bulletin_boards);
}

// Видаляє маркери сіті лайтів
function delete_city_lights_markers() {
    city_lights_or_added = false;
    delete_markers_2(markers_city_lights);
}

// Видаляє маркери облаштовані зони відпочинку
function delete_equipped_recreation_areas_markers() {
    equipped_recreation_areas_or_added = false;
    delete_markers_2(markers_equipped_recreation_areas);
}

// Видаляє маркери зупинки громадського транспорту
function delete_public_transport_stops_markers() {
    public_transport_stops_all_or_added = false;
    delete_markers_2(markers_public_transport_stops);
}

// Видаляє маркери зони відпочинку
function delete_recreation_areas_markers() {
    recreation_areas_all_or_added = false;
    delete_markers_1(areas_recreation_arr);
}

// Видаляє маркери маршрут руху громадського транспорту
function delete_route_public_transport_markers() {
    if (polyline_route_public_transport_arr.length) delete_markers_1(polyline_route_public_transport_arr);
}

// Видаляє маркери об'єкти паркувального простору
function delete_parking_space_markers() {
    delete_markers_1(parking_space_arr);
}

// Видаляє маркери камери відеоспостереження
function delete_video_surveillance_markers() {
    delete_markers_1(video_surveillance_arr);
}

// Видаляє маркери архівних фото
function delete_archival_photos_markers() {
    delete_markers_1(archival_photos_arr);
}

// Видаляє маркери транспортних потоків
function delete_traffic_flows_markers() {
    delete_markers_1(markers_traffic_flows);
}

// Видаляє полілінію транспортних потоків
function delete_polyline_traffic_flow() {
    delete_markers_1(polyline_traffic_flows_arr);
}

// Видаляє маркери веломайстернь
function delete_bicycle_service_center_markers() {
    bicycle_service_center_or_added = false;
    delete_markers_2(markers_bicycle_service_center);
}

function delete_markers_1(arr) {
    arr.forEach((el) => el.setMap(null));
    arr = [];
}

function delete_markers_2(arr) {
    arr.forEach((el) => {
        el.remove();
        el.setMap(null);
    });
    arr = [];
}

// Закриває діалогове вікно
function close_info_window(info_window) {
    if (info_window) info_window.close();
}