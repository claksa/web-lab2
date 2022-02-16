$(document).ready(function () {
    let x, y, radius,
        alert = $("#message .error"),
        message,
        colour = "red", //default
        canvas = $("#canvas"),
        result_style = document.getElementById('row').style;

    const K = 68,
        AXIS = 110,
        Y_MIN = -3,
        Y_MAX = 3,
        X_VALUES = ['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'],
        R_VALUES = ['1', '2', '3', '4', '5'];


    function isCorrectInput(number) {
        return !isNaN(number);
    }

    function validateX() {
        x = $('input[name="x_value"]:checked').val();
        if (isCorrectInput(x) && X_VALUES.includes(x)) {
            alert.text("");
            alert.removeClass("active");
            return true;
        } else {
            alert.text("Введите значение X!");
            alert.addClass("active");
            return false;
        }
    }

    function validateY() {
        y = $("#y_val").val().replace(',', '.');
        if (isCorrectInput(y) && y <= Y_MAX && y >= Y_MIN) {
            alert.text("");
            alert.removeClass("active");
            return true;
        } else {
            alert.text("Введите значение Y в диапазоне от " + Y_MIN + " до " + Y_MAX);
            alert.addClass("active");
            return false;
        }
    }

    function validateR() {
        if (isCorrectInput(radius) && R_VALUES.includes(radius)) {
            alert.text("");
            alert.removeClass("active");
            return true;
        } else {
            alert.text("Введите значение R!");
            alert.addClass("active");
            return false;
        }
    }

    function validateAllInputs() {
        return validateX() && validateY() && validateR();
    }

    function checkFirstQuarter(x, y, r) {
        return x <= 0 && y >= 0 && x * x + y * y <= r / 2;
    }

    function checkSecondQuarter(x, y, r) {
        return x >= 0 && y >= 0 && x <= r / 2 && y <= r;
    }

    function checkForthQuarter(x, y, r) {
        return x >= 0 && y <= 0 && y >= x - r / 2;
    }

    function checkCoordinates(x, y, r) {
        return checkFirstQuarter(x, y, r) || checkSecondQuarter(x, y, r) || checkForthQuarter(x, y, r);
    }

    function clearCanvas() {
        canvas[0].getContext('2d').clearRect(0, 0, canvas.width(), canvas.height());
    }

    function drawPoint(x, y, color) {
        clearCanvas();
        let axes = canvas[0].getContext('2d');
        if (x > canvas.width() || x < -canvas.width() || y > canvas.height() || y < -canvas.height()) {
            return;
        }
        axes.setLineDash([2, 2]);
        axes.beginPath();
        axes.moveTo(x, 110);
        axes.lineTo(x, y);
        axes.moveTo(110, y);
        axes.lineTo(x, y);
        axes.stroke();
        axes.fillStyle = color;
        axes.arc(x, y, 2, 0, 2 * Math.PI);
        axes.fill();
    }

    function drawRowPoint(x, y, r, colour) {
        let ctxPoints = canvas[0].getContext('2d');
        ctxPoints.fillStyle = colour;
        ctxPoints.beginPath();
        ctxPoints.arc(x / r * K + AXIS, -y / r * K + AXIS, 2, 0, 2 * Math.PI);
        ctxPoints.fill();
    }

    function redrawAllPointers() {
        $("#row tr").each(function (index) {
            let data = $(this).find('td');
            let new_x = data.eq(0).text().trim();
            let new_y = data.eq(1).text().trim();
            console.log(index + " row-coordinates: x ( " + new_x + " ), y ( " + new_y + " ), r ( " + radius + " )");
            colour = checkCoordinates(new_x, new_y, radius) ? "green" : "red";
            drawRowPoint(new_x, new_y, radius, colour);
        })
    }

    function redrawFromInput(x, y, radius) {
        if (!validateAllInputs()) {
            clearCanvas();
            return;
        }
        colour = checkCoordinates(x, y, radius) ? "green" : "red";
        drawPoint(x * K / radius + AXIS, -(y / radius * K - AXIS), colour);
    }

    $(".set_r").on("click", function () {
        radius = $(this).val();
        let svgGraph = document.querySelector(".result-graph").getSVGDocument();
        svgGraph.querySelector('.coordinate-text_minus-Rx').textContent = (-radius).toString();
        svgGraph.querySelector('.coordinate-text_minus-Ry').textContent = (-radius).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Rx').textContent = (-radius / 2).toString();
        svgGraph.querySelector('.coordinate-text_minus-half-Ry').textContent = (-radius / 2).toString();
        svgGraph.querySelector('.coordinate-text_plus-Rx').textContent = (radius).toString();
        svgGraph.querySelector('.coordinate-text_plus-Ry').textContent = (radius).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Rx').textContent = (radius / 2).toString();
        svgGraph.querySelector('.coordinate-text_plus-half-Ry').textContent = (radius / 2).toString();
        redrawFromInput(x, y, radius);
    });

    $('#y_val').on('change', () => redrawFromInput(x, y, radius));
    $('.set_X').on('check', () => redrawFromInput(x, y, radius));

    canvas.on('click', function (event) {
        if (!validateR()) {
            return;
        }
        let x = (event.offsetX - AXIS) / K * radius;
        let minDiff = Infinity;
        let nearestXValue;
        for (let i = 0; i < X_VALUES.length; i++) {
            if (Math.abs(x - X_VALUES[i]) < minDiff) {
                minDiff = Math.abs(x - X_VALUES[i]);
                nearestXValue = X_VALUES[i];
            }
        }

        let y_value = (-event.offsetY + AXIS) / K * radius;
        if (y_value < Y_MIN) y_value = Y_MIN;
        if (y_value > Y_MAX) y_value = Y_MAX;

        colour = checkCoordinates(nearestXValue, y_value, radius) ? "green" : "red";

        let new_x = $('input[name="x_value"][value="' + nearestXValue.trim() + '"]');
        new_x.trigger("click");

        $("#y_val").val(y_value);
        $("#subbtn").trigger('click');

        drawPoint(K * nearestXValue / radius + AXIS, -(y / radius * K - AXIS), colour);
    });

    $("#form").on("submit", function (event) {
        event.preventDefault();

        if (!validateAllInputs()) {
            console.log("fail validation after click!");
            return;
        } else {
            // redrawFromInput();
            console.log("coordinates:" + " x: " + x + " y: " + y + " r: " + radius);
        }

        $.ajax({
            type: "POST",
            url: "controller",
            data: $(this).serialize() + "&radius=" + radius,
            beforeSend: function () {
                $(".send_form").attr("disabled", "disabled");
            },
            success: function (data) {
                console.log("ajax_success: " + data);
                $(".send_form").attr("disabled", false);
                result_style.display = 'table-row';
                document.getElementById('receiver').innerHTML = data;
            },
            error: function () {
                console.log("error");
                $(".send_form").attr("disabled", false);
            }
        })
        return true;
    });

    $('#form').on("reset", function (event) {
        $.ajax({
            type: 'POST',
            url: 'controller',
            data: 'msg=' + encodeURI(message),
            success: function () {
                result_style.display = 'none';
                clearCanvas();
            }
        })
    })

    setInterval(redrawAllPointers, 600);
});