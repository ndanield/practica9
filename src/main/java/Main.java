import Services.BootStrapServices;
import Services.PersonDao;
import encapsulation.EducationLevel;
import entities.Poll;
import freemarker.template.Configuration;
import spark.ModelAndView;
import spark.template.freemarker.FreeMarkerEngine;

import java.util.HashMap;
import java.util.Map;

import static spark.Spark.*;
import static spark.debug.DebugScreen.enableDebugScreen;

public class Main {

    public static PersonDao personDao;

    public static void main(String[] args) {

        BootStrapServices.getInstance().init();

        staticFiles.location("/public");

        port(getHerokuAsignatedPort());

        personDao = new PersonDao(Poll.class);

        Configuration configuration = new Configuration(Configuration.VERSION_2_3_23);
        configuration.setClassForTemplateLoading(Main.class, "/templates");
        FreeMarkerEngine freemarkerEngine = new FreeMarkerEngine(configuration);

        enableDebugScreen();

        get("/", (req, res) -> "Hello world");

        get("/poll",(request,response)->{
            Map<String, Object> model = new HashMap<>();
            model.put("title", "Información sobre la persona");
            return new ModelAndView(model,"personform.ftl");
        }, freemarkerEngine);

        post("/poll", (request,response) ->{
            Poll poll = new Poll();
            EducationLevel educationLevel = EducationLevel.valueOf(request.queryParams("education").toUpperCase());
            poll.setFirstName(request.queryParams("firstName"));
            poll.setLastName(request.queryParams("lastName"));

            switch (educationLevel){
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
            poll.setSector(request.queryParams("sector"));
            personDao.persist(poll);
            response.redirect("/");
            return null;
        });

    }
    private static int getHerokuAsignatedPort(){
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567;
    }
}
