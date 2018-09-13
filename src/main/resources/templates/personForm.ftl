<form action="/poll" method="post" autocomplete="off">
    <fieldset>
        <div class="form-row ">
            <label for="firstName" class="col-sm-4 col-form-label"> Nombres</label>
            <div class="form-group col-md-6">
                <input type="text" class="form-control" placeholder="Nombres" id="firstName">
            </div>
            <label for="lastName" class="col-sm-4 col-form-label"> Apellidos</label>
            <div class="form-group col-md-6">
                <input type="text" class="form-control" placeholder="Apellidos" id="lastName">
            </div>
        </div>
        <div class="form-row ">
            <label for="sector" class="col-sm-4 col-form-label"> Sector</label>
            <div class="form-group col-md-6">
                <input type="text" class="form-control" placeholder="sector" id="sector">
            </div>
        </div>
        <div class="form-row ">
            <div class="form-group col-md-6">
                <label for="education" class="col-sm-6 col-form-label"> Nivel Educativo</label>
                <select class="form-control" id="education">
                    <option value="PRIMARY">Educación Primaria</option>
                    <option value="SECONDARY">Educación Secundaria</option>
                    <option value="UNIVERSITY">Universidad</option>
                    <option value="MASTER">Maestría</option>
                    <option value="DOCTORATE">Doctorado</option>
                </select>
            </div>
        </div>
        <div class="form-group row">
            <button type="submit" class="btn btn-success mx-auto "><strong>Enviar</strong></button>
        </div>
    </fieldset>
</form>