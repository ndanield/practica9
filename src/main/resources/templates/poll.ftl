<#import "base.ftl" as b>

<@b.base>
    <div class="card mx-auto limit-width-on-lg-screen">
        <form action="/poll" method="post">
            <div class="card-body">
                Form aqui
            </div>
            <div class="card-footer">
                <button class="btn btn-primary" type="submit">Enviar</button>
            </div>
        </form>
    </div>
</@b.base>