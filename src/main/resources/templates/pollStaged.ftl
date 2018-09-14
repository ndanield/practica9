<#-- @ftlvariable name="pollsStaged" type="java.util.List<entities.Poll>" -->
<#import "base.ftl" as b>

<@b.base>
    <div class="text-center">
        <a href="/poll" class="btn btn-sm btn-primary">Crear encuesta</a>
        <a href="#" class="btn btn-sm btn-success ml-1">Sincronizar</a>
    </div>


    <#--<#list pollsStaged>-->
        <#--<#items as pollStaged>-->
            <#--<div class="card mx-auto mb-4 limit-width-on-lg-screen">-->
                <#--<div class="card-header">-->
                    <#--<h4 class="card-title">Encuesta #${ pollStaged.id }</h4>-->
                    <#--<h6 class="card-subtitle text-muted">${ pollStaged.date }</h6>-->
                <#--</div>-->
                <#--<div class="card-body">-->
                    <#--<p class="card-text">Nombres: ${ pollStaged.firstName }</p>-->
                    <#--<p class="card-text">Apellidos: ${ pollStaged.lastName }</p>-->
                    <#--<p class="card-text">Sector: ${ pollStaged.sector }</p>-->
                    <#--<p class="card-text">Nivel de educación: ${ pollStaged.getEducationLvlFormated() }</p>-->
                <#--</div>-->
            <#--</div>-->
        <#--</#items>-->
    <#--</#list>-->
</@b.base>