// Змінює колір кнопки
function change_color_show_hide_button(el) {
    if (el.style.backgroundColor == "rgba(255, 0, 0, 0.9)") return (el.style.backgroundColor = "rgba(102, 255, 0, 0.6)");

    el.style.backgroundColor = "rgba(255, 0, 0, 0.9)";
}

// Змінює колір усіх кнопок у блоці
function change_color_show_hide_button_bloсk(id) {
    const el = document.getElementById(id);
    const elements = el.querySelectorAll(".button_sidebar_add_map");
    elements.forEach(el => el.style.backgroundColor = "rgba(102, 255, 0, 0.6)");
}

// Змінює колір кнопки
function change_color_show_hide_button_id(id) {
    const el = document.getElementById(id); 

    if (window.getComputedStyle(el).backgroundColor == 'rgba(102, 255, 0, 0.6)') {
        return el.style.backgroundColor = 'rgba(255, 0, 0, 0.9)'
    };

    el.style.backgroundColor = 'rgba(102, 255, 0, 0.6)';
}
