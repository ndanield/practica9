<#-- @ftlvariable name="polls" type="entities.Poll" -->
<#import "base.ftl" as b>

<@b.base>
    <#list polls>
        <#items as poll>
            <div class="card mx-auto limit-width-on-lg-screen">
                Nombre
                Sector
                Nivel escolar
            </div>
        </#items>
    </#list>
</@b.base>