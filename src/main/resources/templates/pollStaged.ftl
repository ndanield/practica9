<#-- @ftlvariable name="pollsStaged" type="java.util.List<entities.Poll>" -->
<#import "base.ftl" as b>

<@b.base>
    <div class="text-center mb-4">
        <a href="/poll" class="btn btn-sm btn-primary">Crear encuesta</a>
        <#-- Desactivado con la clase "disabled" por defecto para esperar a que la indexedDB se abrá -->
        <button id="syncButton" class="btn btn-sm btn-success ml-1 disabled" onclick="syncPost()">Sincronizar</button>
    </div>

    <div id="pollsStaged"></div>
</@b.base>

<#-- Por las actualizaciones y borrado individual de una encuesta-->
<script src="js/savePoll.js"></script>
<#-- Para mostrar las encuestas y sincronizarlas -->
<script src="js/showPoll.js"></script>