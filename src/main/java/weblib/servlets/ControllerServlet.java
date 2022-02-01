package weblib.servlets;

import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "controllerServlet", value = "/controller")
public class ControllerServlet extends HttpServlet {

//    TODO: придумать, что будет если запрос гет
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
    }


    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("text/html");
        String x = request.getParameter("x_value");
        String y = request.getParameter("y_value");
        String radius = request.getParameter("r_value");
        if (x!=null && y!=null && radius!=null) {
            //отправляем сервлету-обработчику
        } else {
            //сообщение об ошибке в джсп
        }
    }
}