package weblib.servlets;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class AreaCheckServlet extends HttpServlet {
    Result result;
    List<Result> resList;

    @Override
    public void init() throws ServletException {
        resList = new ArrayList<>();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long startTime = System.nanoTime();
        resp.setContentType("text/html");
        resp.setCharacterEncoding("UTF-8");
        String x = req.getParameter("x_value");
        String y = req.getParameter("y_value");
        String r = req.getParameter("radius");
        String workTime = String.valueOf(System.nanoTime() - startTime);
        result = new Result(parseDouble(x), parseDouble(y), parseDouble(r), workTime);
        resList.add(result);
        getServletContext().setAttribute("result-row", resList.toString());
        try (PrintWriter out = resp.getWriter()) {
            for (Result res : resList) {
                out.println(res);
            }
        }
    }

    private Double parseDouble(String s) {
        return Double.parseDouble(s);
    }


}
