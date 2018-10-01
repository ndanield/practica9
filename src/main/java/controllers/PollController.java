package controllers;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import encapsulation.EducationLevel;
import entities.Poll;
import service.PollService;
import spark.ModelAndView;
import spark.Request;
import spark.Response;
import spark.Route;
import util.Path;
import main.Main;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.*;

public class PollController {

    private static PollService pollService = new PollService(Poll.class);

    public static Route pollStagedGet = (Request req, Response res) -> {
        Map<String, Object> model = new HashMap<>();
        model.put("title", "Encuestas en fila");
        return Main.freemarkerEngine.render(new ModelAndView(model, Path.POLL_STAGED));
    };

    public static Route pollCreateGet = (Request req, Response res) -> {
        Map<String, Object> model = new HashMap<>();
        model.put("title", "Encuesta");
        return Main.freemarkerEngine.render(new ModelAndView(model, Path.POLL));
    };

    public static Route pollCreatePost = (Request req, Response res) -> {
        String pollsJSONstring = req.body();
        Type listType = new TypeToken<ArrayList<Map<String, String>>>() {} .getType();
        List<Map<String, String>> pollsList = new Gson().fromJson(pollsJSONstring, listType);

        for (Map<String, String> pollElement :
                pollsList) {
            Poll poll = new Poll();
            poll.setFirstName(pollElement.get("firstName"));
            poll.setLastName(pollElement.get("lastName"));
            poll.setSector(pollElement.get("sector"));
            poll.setDate(new SimpleDateFormat("yyyy-MM-dd").parse(pollElement.get("date")));
            poll.setEducationLevel(EducationLevel.valueOf(pollElement.get("education").toUpperCase()));
            poll.setLatitude(Double.parseDouble(pollElement.get("latitude")));
            poll.setLongitude(Double.parseDouble(pollElement.get("longitude")));

            pollService.persist(poll);
        }

        res.redirect("/");
        return "Encuesta registradas con exito!";

    };

    public static Route pollEditGet = (Request req, Response res) -> {
        Map<String, Object> model = new HashMap<>();
        model.put("title", "Editando encuesta");
        int pollIndexedDBId = Integer.parseInt(req.params("id"));
        model.put("pollIndexDBId", pollIndexedDBId);
        return Main.freemarkerEngine.render(new ModelAndView(model, Path.POLL_EDIT));
    };

    public static Route pollListingGet = (Request req, Response res) -> {
        Map<String, Object> model = new HashMap<>();

        model.put("title", "Encuestas");
        model.put("polls", pollService.findAll());

        return Main.freemarkerEngine.render(new ModelAndView(model, Path.POLL_LISTING));
    };

    public static Route pollLocationGet = (req, res) -> {
        Map<String, Object> model = new HashMap<>();

        List<Poll> allPolls = pollService.findAll();
        model.put("title", "Ubicaciones");
        model.put("polls", allPolls);

        return Main.freemarkerEngine.render(new ModelAndView(model, Path.POLL_LOCATION));
    };

//    private EducationLevel getEducationEnumValue(String educationString) {
//        EducationLevel educationLevel = ;
//        switch (educationLevel) {
//            case PRIMARY:
//                poll.setEducationLevel(EducationLevel.PRIMARY);
//                break;
//            case SECONDARY:
//                poll.setEducationLevel(EducationLevel.SECONDARY);
//                break;
//            case UNIVERSITY:
//                poll.setEducationLevel(EducationLevel.UNIVERSITY);
//                break;
//            case MASTER:
//                poll.setEducationLevel(EducationLevel.MASTER);
//                break;
//            case DOCTORATE:
//                poll.setEducationLevel(EducationLevel.DOCTORATE);
//                break;
//        }
//    }
}
