package main;

import service.BootStrapServices;
import controllers.PollController;
import freemarker.template.Configuration;
import spark.template.freemarker.FreeMarkerEngine;

import static spark.Spark.*;
import static spark.debug.DebugScreen.enableDebugScreen;

public class Main {
    public static FreeMarkerEngine freemarkerEngine;
    public static void main(String[] args) {

        BootStrapServices.getInstance().init();

        staticFiles.location("/public");
        enableDebugScreen();

        port(getHerokuAsignatedPort());

        Configuration configuration = new Configuration(Configuration.VERSION_2_3_23);
        configuration.setClassForTemplateLoading(Main.class, "/templates");
        freemarkerEngine = new FreeMarkerEngine(configuration);

        get("/", PollController.pollStagedGet);
        get("/poll", "application/json", PollController.pollCreateGet);
        post("/poll", PollController.pollCreatePost);
        get("/location", PollController.pollLocationGet);
        get("/polls", PollController.pollListingGet);

    }
    private static int getHerokuAsignatedPort(){
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567;
    }
}
