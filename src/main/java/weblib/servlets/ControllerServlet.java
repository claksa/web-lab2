package weblib.servlets;


import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;


public class ControllerServlet extends HttpServlet {


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        if (request.getParameter("x_value") != null && request.getParameter("y_value") != null && request.getParameter("radius") != null) {
            request.getServletContext().getRequestDispatcher("/areaCheck").forward(request, response);
        } else {
//            перенаправляет обратно на страницу джсп с сообщением об ошибке (или другую джсп страницу)
//            ?? или остаёмся тут
        }
    }
}