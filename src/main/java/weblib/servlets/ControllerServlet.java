package weblib.servlets;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;


public class ControllerServlet extends HttpServlet {


//    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
//        PrintWriter out = response.getWriter();
//        try {
//            rd.forward(request,response);
//        } catch (ServletException e) {
//            //страница ошибки
//            out.println("Error: cannot find main page");
//        }
//    }


    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String x = request.getParameter("x_value");
        String y = request.getParameter("y_value");
        String radius = request.getParameter("r_value");
        if (x!=null && y!=null) {
           out.println("1234567");
        } else {
            //сообщение об ошибке в джсп
        }
    }
}