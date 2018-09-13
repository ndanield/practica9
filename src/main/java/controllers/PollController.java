package controllers;

import encapsulation.EducationLevel;
import entities.Poll;
import service.PollService;
import spark.ModelAndView;
import spark.Request;
import spark.Response;
import spark.Route;
import util.Path;
import main.Main;

import java.util.HashMap;
import java.util.Map;

public class PollController {
    private static PollService pollService = new PollService(Poll.class);

    public static Route pollCreateGet = (Request req, Response res) -> {
        Map<Object, String> model = new HashMap<>();
        model.put("title", "Encuesta");
        return Main.freemarkerEngine.render(new ModelAndView(model, Path.POLL));
    };

    public static Route pollCreatePost = (Request req, Response res) -> {
        Poll poll = new Poll();
        String educationValue = req.queryParams("education");
        EducationLevel educationLevel = EducationLevel.valueOf(educationValue.toUpperCase());
        poll.setFirstName(req.queryParams("firstName"));
        poll.setLastName(req.queryParams("lastName"));

        switch (educationLevel) {
            case PRIMARY:
                poll.setEducationLevel(EducationLevel.PRIMARY);
                break;
            case SECONDARY:
                poll.setEducationLevel(EducationLevel.SECONDARY);
                break;
            case UNIVERSITY:
                poll.setEducationLevel(EducationLevel.UNIVERSITY);
                break;
            case MASTER:
                poll.setEducationLevel(EducationLevel.MASTER);
                break;
            case DOCTORATE:
                poll.setEducationLevel(EducationLevel.DOCTORATE);
                break;
        }

        poll.setSector(req.queryParams("sector"));
        pollService.persist(poll);

        res.redirect("/");
        return null;

    };

    public static Route pollListingGet = (Request req, Response res) -> {
        Map<Object, String> model = new HashMap<>();



        return Main.freemarkerEngine.render(new ModelAndView(model, Path.POLL_LISTING));
    };

    public static Route pollLocationGet = (req, res) -> {
        Map<Object, String> model = new HashMap<>();



        return Main.freemarkerEngine.render(new ModelAndView(model, Path.POLL_LOCATION));
    };

    public static Route pollLocationPost = (req, res) -> {
        res.redirect("/");
        return null;
    };
}
