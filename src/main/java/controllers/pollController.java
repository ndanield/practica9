package controllers;

import spark.ModelAndView;
import spark.Route;
import util.Path;

import java.util.HashMap;
import java.util.Map;

public class pollController {
//    PollService pollService = new pollService();

    public static Route pollCreateGet = (req, res) -> {
        Map<Object, String> model = new HashMap<>();

        return new ModelAndView(model, Path.POLL);
    };

    public static Route pollCreatePost = (req, res) -> {
        res.redirect("/");

        return "(Prueba) Encuesta creada";
    };

    public static Route pollListingGet = (req, res) -> {
        Map<Object, String> model = new HashMap<>();



        return new ModelAndView(model, Path.POLL_LISTING);
    };

    public static Route pollLocationGet = (req, res) -> {
        Map<Object, String> model = new HashMap<>();



        return new ModelAndView(model, Path.POLL_LOCATION);
    };

    public static Route pollLocationPost = (req, res) -> {
        res.redirect("/");
        return null;
    };
}
