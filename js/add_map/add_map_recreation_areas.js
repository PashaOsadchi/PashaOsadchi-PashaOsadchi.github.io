let areas_recreation_arr = [];
let info_window_recreation_areas = null;
let recreation_areas_all_or_added = false;

// Додає на карту зону відпочинку
function add_map_recreation_areas(patch_arr, name_polygon, message_text) {
    window[name_polygon] = new google.maps.Polygon({
        path: patch_arr,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 3,
        fillColor: "#7FFF00",
        fillOpacity: 0.4,
        map: map,
    });
    window[name_polygon].setMap(map);
    areas_recreation_arr.push(window[name_polygon]);

    const content_info_window_recreation_areas = `<div style="font-size: 15px">${message_text}</div>`;

    info_window_recreation_areas = new google.maps.InfoWindow();

    google.maps.event.addListener(window[name_polygon], "click", (e) => {
        // Закриває попереднє відкрите вікно при клікові у слідуючі зоні відпочинку
        close_info_window(info_window_recreation_areas);

        info_window_recreation_areas.setPosition(e.latLng);
        info_window_recreation_areas.setContent(content_info_window_recreation_areas);
        info_window_recreation_areas.open(map);
    });

    // Закриває попереднє відкрите вікно при клікові на карті
    google.maps.event.addListener(map, "click", () => close_info_window(info_window_recreation_areas));
}

// Додає на карту зони відпочинку
function add_map_recreation_areas_all() {
   
    if (recreation_areas_all_or_added) return delete_recreation_areas_markers();

    data_recreation_areas_arr.forEach(el => {
        const message_text = `<b>${el.name}</b><br>${el.detailed_information}`;

        add_map_recreation_areas(el.patch, `recreation_area_${el.id}`, message_text);
    });

    recreation_areas_all_or_added = true;

    // Після додавання зон відпочинку маштабує карту
    map_offset_community_boundary();
}
