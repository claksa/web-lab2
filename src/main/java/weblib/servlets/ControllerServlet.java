package weblib.servlets;


import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;


public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        if (request.getParameter("x_value") != null && request.getParameter("y_value") != null && request.getParameter("radius") != null) {
            request.getServletContext().getRequestDispatcher("/areaCheck").forward(request, response);
        } else {
            request.getServletContext().getRequestDispatcher("/index.jsp").forward(request,response);
        }
    }
}