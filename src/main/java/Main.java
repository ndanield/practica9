import Services.BootStrapServices;
import Services.PersonDao;
import encapsulation.EducationLevel;
import entities.Person;
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

        personDao = new PersonDao(Person.class);

        Configuration configuration = new Configuration(Configuration.VERSION_2_3_23);
        configuration.setClassForTemplateLoading(Main.class, "/templates");
        FreeMarkerEngine freemarkerEngine = new FreeMarkerEngine(configuration);

        enableDebugScreen();

        get("/", (req, res) -> "Hello world");

        get("/personInfo",(request,response)->{
            Map<String, Object> model = new HashMap<>();
            model.put("title", "Información sobre la persona");
            return new ModelAndView(model,"form.ftl");
        }, freemarkerEngine);

        post("personInfo", (request,response) ->{
            Person person = new Person();
            EducationLevel educationLevel = EducationLevel.valueOf(request.queryParams("education").toUpperCase());
            person.setFirstName(request.queryParams("firstName"));
            person.setLastName(request.queryParams("lastName"));

            switch (educationLevel){
                case PRIMARY:
                    person.setEducationLevel(EducationLevel.PRIMARY);
                    break;
                case SECONDARY:
                    person.setEducationLevel(EducationLevel.SECONDARY);
                    break;
                case UNIVERSITY:
                    person.setEducationLevel(EducationLevel.UNIVERSITY);
                    break;
                case MASTER:
                    person.setEducationLevel(EducationLevel.MASTER);
                    break;
                case DOCTORATE:
                    person.setEducationLevel(EducationLevel.DOCTORATE);
                    break;
            }
            person.setSector(request.queryParams("sector"));
            personDao.persist(person);
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
