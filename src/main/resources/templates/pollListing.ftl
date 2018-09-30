<#-- @ftlvariable name="polls" type="java.util.List<entities.Poll>" -->
<#import "base.ftl" as b>

<@b.base>
    <#list polls>
        <#items as poll>
            <div class="card mx-auto mb-4 limit-width-on-lg-screen">
                <div class="card-header">
                    <h4 class="card-title">Encuesta #${ poll.id }</h4>
                    <h6 class="card-subtitle text-muted">${ poll.date }</h6>
                </div>
                <div class="card-body">
                    <p class="card-text">Nombres: ${ poll.firstName }</p>
                    <p class="card-text">Apellidos: ${ poll.lastName }</p>
                    <p class="card-text">Sector: ${ poll.sector }</p>
                    <p class="card-text">Nivel de educación: ${ poll.getEducationLvlFormated() }</p>
                </div>
            </div>
        </#items>
    </#list>
</@b.base>