<#import "base.ftl" as b>

<@b.base>
    <div class="card mx-auto limit-width-on-lg-screen">
        <fieldset class="card-body">
            <div class="form-group row">
                <label for="firstName" class="col-sm-4 col-form-label"> Nombres</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Nombres" id="firstName"  name="firstName">
                </div>
            </div>

            <div class="form-group row">
                <label for="lastName" class="col-sm-4 col-form-label"> Apellidos</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Apellidos" id="lastName"  name="lastName">
                </div>
            </div>

            <div class="form-group row">
                <label for="sector" class="col-sm-4 col-form-label"> Sector</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="sector" id="sector" name="sector">
                </div>
            </div>

            <div class="form-group row">
                <div class="col-sm-12">
                    <label for="education"> Nivel Educativo</label>
                    <select class="form-control" id="education" name="education">
                        <option value="PRIMARY">Educación Primaria</option>
                        <option value="SECONDARY">Educación Secundaria</option>
                        <option value="UNIVERSITY">Universidad</option>
                        <option value="MASTER">Maestría</option>
                        <option value="DOCTORATE">Doctorado</option>
                    </select>
                </div>
            </div>
        </fieldset>
        <div class="card-footer">
            <button class="btn btn-success mx-auto" onclick="addPoll(); alert('Encuesta registrada.')">Registrar</button>
        </div>
    </div>

</@b.base>

<script src="js/savePoll.js"></script>