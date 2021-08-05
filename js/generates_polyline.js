// https://stackoverflow.com/questions/24956616/draw-circles-arc-on-google-maps

// Створює є полілінію у вигляді сектора
function generates_polyline(center, initial_bearing, final_bearing, radius) {

    // https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBounds
    let bounds = new google.maps.LatLngBounds();

    // середній радіус Землі в метрах
    const r = 6378137;
    const points = 300;
    const extp = [];

    extp.push(center);

    // Розширте об'єкт Number, щоб перетворити градуси в радіани
    Number.prototype.toRad = function () {
        return (this * Math.PI) / 180;
    };

    // Розширте об'єкт Number, щоб перетворити радіани в градуси
    Number.prototype.toDeg = function () {
        return (this * 180) / Math.PI;
    };

    google.maps.LatLng.prototype.DestinationPoint = function (brng, distance) {
        brng = brng.toRad();
        const lat_1 = this.lat().toRad();
        const lon_1 = this.lng().toRad();
        const lat_2 = Math.asin(Math.sin(lat_1) * Math.cos(distance / r) + Math.cos(lat_1) * Math.sin(distance / r) * Math.cos(brng));
        const lon_2 = lon_1 + Math.atan2(Math.sin(brng) * Math.sin(distance / r) * Math.cos(lat_1), Math.cos(distance / r) - Math.sin(lat_1) * Math.sin(lat_2));

        return new google.maps.LatLng(lat_2.toDeg(), lon_2.toDeg());
    };

    if (initial_bearing > final_bearing) final_bearing += 360;

    let delta_bearing = final_bearing - initial_bearing;

    delta_bearing = delta_bearing / points;

    for (let i = 0; i < points + 1; i++) {
        extp.push(center.DestinationPoint(initial_bearing + i * delta_bearing, radius));
        bounds.extend(extp[extp.length - 1]);
    }

    return extp;
}

