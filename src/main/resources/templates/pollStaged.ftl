<#-- @ftlvariable name="pollsStaged" type="java.util.List<entities.Poll>" -->
<#import "base.ftl" as b>

<@b.base>
    <div class="text-center mb-4">
        <a href="/poll" class="btn btn-sm btn-primary">Crear encuesta</a>
        <button class="btn btn-sm btn-success ml-1" onclick="synchronize()">Sincronizar</button>
    </div>

    <div id="pollsStaged"></div>
</@b.base>

<script src="js/savePoll.js"></script>
<script src="js/showPoll.js"></script>