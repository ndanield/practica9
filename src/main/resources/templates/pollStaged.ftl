<#-- @ftlvariable name="pollsStaged" type="java.util.List<entities.Poll>" -->
<#import "base.ftl" as b>

<@b.base>
    <div class="text-center">
        <a href="/poll" class="btn btn-sm btn-primary">Crear encuesta</a>
        <a href="#" class="btn btn-sm btn-success ml-1" onclick="syncronize()">Sincronizar</a>
    </div>

    <div id="pollsStaged"></div>
</@b.base>

<script src="/js/savePoll.js"></script>